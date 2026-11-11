/**
 * Google Apps Script — paste into Extensions → Apps Script of your Sheet.
 * 1. Create a Google Sheet with header row:
 *    timestamp | name | email | market | detectedCountry | marketSource | uiLanguage | userAgent | consent
 * 2. Set NOTIFICATION_EMAIL below.
 * 3. Deploy → New deployment → Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 4. Copy the Web App URL into VITE_GAS_ENDPOINT
 *
 * After editing this file in Apps Script, deploy a new version
 * (Deploy → Manage deployments → Edit → New version).
 */

const SHEET_NAME = 'Leads'
const NOTIFICATION_EMAIL = 'gryzfood@gmail.com'
const EMAIL_COLUMN = 3 // C: timestamp | name | email | …

function doOptions() {
  return jsonResponse({ ok: true })
}

function doPost(e) {
  try {
    const raw = e.postData && e.postData.contents ? e.postData.contents : '{}'
    const data = JSON.parse(raw)

    const email = String(data.email || '')
      .trim()
      .toLowerCase()
    if (!email || email.indexOf('@') === -1) {
      return jsonResponse({ ok: false, error: 'invalid_email' })
    }

    const sheet = getOrCreateSheet_()
    if (emailExists_(sheet, email)) {
      return jsonResponse({ ok: false, error: 'duplicate' })
    }

    const row = [
      data.timestamp || new Date().toISOString(),
      data.name || '',
      email,
      data.market || '',
      data.detectedCountry || '',
      data.marketSource || '',
      data.uiLanguage || '',
      data.userAgent || '',
      data.consent === true ? 'yes' : 'no',
    ]

    sheet.appendRow(row)

    const subject = `[GRYZ] New lead · ${data.market || '?'} · ${email}`
    const body = [
      `Name: ${data.name || ''}`,
      `Email: ${email}`,
      `Market: ${data.market || ''}`,
      `Country: ${data.detectedCountry || ''}`,
      `Market source: ${data.marketSource || ''}`,
      `UI language: ${data.uiLanguage || ''}`,
      `Timestamp: ${data.timestamp || ''}`,
      `User-Agent: ${data.userAgent || ''}`,
    ].join('\n')

    MailApp.sendEmail(NOTIFICATION_EMAIL, subject, body)

    return jsonResponse({ ok: true })
  } catch (err) {
    return jsonResponse({ ok: false, error: String(err) })
  }
}

function doGet() {
  return jsonResponse({ ok: true, service: 'gryz-waitlist' })
}

function emailExists_(sheet, email) {
  const lastRow = sheet.getLastRow()
  if (lastRow < 2) return false

  const values = sheet.getRange(2, EMAIL_COLUMN, lastRow, EMAIL_COLUMN).getValues()
  for (let i = 0; i < values.length; i++) {
    const cell = String(values[i][0] || '')
      .trim()
      .toLowerCase()
    if (cell === email) return true
  }
  return false
}

function getOrCreateSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet()
  let sheet = ss.getSheetByName(SHEET_NAME)
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME)
    sheet.appendRow([
      'timestamp',
      'name',
      'email',
      'market',
      'detectedCountry',
      'marketSource',
      'uiLanguage',
      'userAgent',
      'consent',
    ])
  }
  return sheet
}

function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON,
  )
}
