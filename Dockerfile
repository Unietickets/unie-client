FROM node:18-slim AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

# Установка необходимых пакетов
RUN apt-get update && apt-get install -y \
    postgresql-client \
    netcat-traditional \
    && rm -rf /var/lib/apt/lists/*

COPY package.json package-lock.json* ./
COPY prisma ./prisma/
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app

# Устанавливаем переменные окружения
ENV DATABASE_URL=${DATABASE_URL}
ENV DATABASE_HOST=${DATABASE_HOST}
ENV DATABASE_PORT=${DATABASE_PORT}
ENV DATABASE_USER=${DATABASE_USER}
ENV DATABASE_PASSWORD=${DATABASE_PASSWORD}
ENV DATABASE_NAME=${DATABASE_NAME}
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_OPTIONS="--experimental-json-modules"

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npx prisma generate
# TODO удалить флаг
RUN npm run build --debug
# Проверяем содержимое директории .next
RUN ls -la /app/.next || echo "Директория .next не существует"
# Проверяем наличие директории standalone и создаем ее, если она не существует
RUN if [ ! -d "/app/.next/standalone" ]; then \
    echo "Директория standalone не существует, создаем ее вручную"; \
    mkdir -p /app/.next/standalone; \
    cp -r /app/.next/server /app/.next/standalone/; \
    cp -r /app/.next/static /app/.next/standalone/; \
    cp /app/package.json /app/.next/standalone/; \
    cp -r /app/public /app/.next/standalone/; \
    cp /app/.next/required-server-files.json /app/.next/standalone/; \
    echo "Директория standalone создана вручную"; \
    ls -la /app/.next/standalone; \
fi

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_OPTIONS="--experimental-json-modules"

# Установка необходимых пакетов
RUN apt-get update && apt-get install -y \
    postgresql-client \
    netcat-traditional \
    && rm -rf /var/lib/apt/lists/*

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Копируем необходимые файлы
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/package.json ./package.json
COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
# Копируем всю директорию .next для корректной работы next start
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/prisma ./prisma

# Создаем скрипт для проверки доступности базы данных
RUN echo '#!/bin/bash\n\
echo "Waiting for database to be ready..."\n\
\n\
while ! nc -z $DATABASE_HOST $DATABASE_PORT; do\n\
  echo "Database is not ready - sleeping for 2 seconds"\n\
  sleep 2\n\
done\n\
\n\
echo "Database is ready!"\n\
echo "Running database migrations..."\n\
npx prisma migrate deploy\n\
\n\
echo "Starting application..."\n\
if [ -f "/app/server.js" ]; then\n\
  NODE_OPTIONS="--experimental-json-modules" exec node .next/standalone/server.js\n\
else\n\
  echo "server.js not found, trying to start with next start"\n\
  NODE_OPTIONS="--experimental-json-modules" exec npx next start\n\
fi\n\
' > /app/wait-for-db.sh

RUN chmod +x /app/wait-for-db.sh

USER nextjs

EXPOSE 3000

CMD ["/app/wait-for-db.sh"]
