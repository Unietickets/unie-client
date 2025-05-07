FROM node:18-alpine

WORKDIR /app

# Устанавливаем необходимые зависимости для Prisma и OpenSSL
RUN apk add --no-cache openssl

# Копируем package.json и package-lock.json
COPY package*.json ./

# Копируем файлы Prisma
COPY prisma ./prisma/

# Устанавливаем зависимости
RUN npm install

# Генерируем Prisma клиент
RUN npx prisma generate

# Копируем исходный код
COPY . .

# Устанавливаем переменную окружения для Docker
ENV NODE_ENV=docker

# Собираем приложение
RUN npm run build

EXPOSE 3002

CMD ["node", "dist/main.js"]
