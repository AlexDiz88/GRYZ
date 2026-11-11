# Подключение Google Sheets + email

Лендинг отправляет заявки (имя, email, рынок UA/PL/OTHER и метаданные) на URL Google Apps Script Web App. Скрипт пишет строку в Sheet и шлёт письмо.

## 1. Таблица

1. Создайте [Google Sheet](https://sheets.google.com).
2. Имя листа: `Leads` (или оставьте пустым — скрипт создаст сам).
3. Заголовки (если создаёте вручную):

`timestamp | name | email | market | detectedCountry | marketSource | uiLanguage | userAgent | consent`

## 2. Apps Script

1. В Sheet: **Extensions → Apps Script**.
2. Вставьте код из [`scripts/gas-waitlist.js`](../scripts/gas-waitlist.js).
3. Замените `NOTIFICATION_EMAIL` на ваш адрес.
4. **Deploy → New deployment → Web app**:
   - Execute as: **Me**
   - Who has access: **Anyone**
5. Скопируйте URL вида `https://script.google.com/macros/s/.../exec`.

## 3. Фронтенд

1. Скопируйте `.env.example` → `.env`.
2. Укажите:

```env
VITE_GAS_ENDPOINT=https://script.google.com/macros/s/YOUR_ID/exec
```

3. Перезапустите `npm run dev`.

## 4. Проверка

Отправьте тестовую заявку с лендинга. В Sheet должна появиться строка, на почту — письмо с темой `[GRYZ] New lead · …`.

Повторная заявка с тем же e-mail (без учёта регистра) не пишется в Sheet и не шлёт письмо — скрипт отвечает `{ ok: false, error: "duplicate" }`, на лендинге показывается сообщение «уже в списке».

После любых правок в Apps Script: **Deploy → Manage deployments → ✎ → Version: New version → Deploy**.

## Рынки

Поле `market`: `UA` | `PL` | `OTHER` (IP geo через ipapi.co, fallback — язык браузера). Язык UI (`uiLanguage`) хранится отдельно — RU нужен только для просмотра интерфейса, не как целевой рынок.
