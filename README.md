# Установка и запуск

# Дев
- cp .env.development.example .env.development и установка корректных значений переменных

- для старта дев версии приложения (дев сервер webpack)
npm run docker:dev:build

# Прод

- cp .env.production.example .env.production и установка корректных значений переменных

- для старта прод версии приложения (оптимизированный билд и сервер)
npm run docker:prod:build

# PS
dotenv -e .env.development --
приписка нужна для указания пути до енв при локальных действиях с призмой
