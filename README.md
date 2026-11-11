# GRYZ — лендинг теста спроса (UA / PL)

Одностраничный лендинг для проверки интереса к продукту быстрого полноценного обеда. Оффер: бесплатная проба за имя + e-mail.

## Стек

- React + Vite + TypeScript
- Tailwind CSS v4
- i18next (UA / PL / RU)
- Заявки → Google Apps Script → Google Sheets + email

## Запуск

```bash
npm install
cp .env.example .env
npm run dev
```

Подключение Sheets/email: [docs/google-apps-script.md](docs/google-apps-script.md).

## Языки и рынки

- UI: UA (по умолчанию), PL, RU (RU только для просмотра; целевые рынки — UA и PL)
- Язык определяется по браузеру / `localStorage`
- В заявку пишется `market` (UA | PL | OTHER) по IP geo с fallback на язык
