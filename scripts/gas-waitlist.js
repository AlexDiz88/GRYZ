/**
 * Google Apps Script — paste into Extensions → Apps Script of your Sheet.
 * 1. Create a Google Sheet with header row:
 *    timestamp | name | email | market | detectedCountry | marketSource | uiLanguage | userAgent | consent
 * 2. Set NOTIFICATION_EMAIL below.
 * 3. Deploy → New deployment → Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 4. Copy the Web App URL into VITE_GAS_ENDPOINT
 */

const SHEET_NAME = 'Leads'
const NOTIFICATION_EMAIL = 'info@gmail.com' // change me

function doOptions() {
  return jsonResponse({ ok: true })
}

function doPost(e) {
  try {
    const raw = e.postData && e.postData.contents ? e.postData.contents : '{}'
    const data = JSON.parse(raw)

    const row = [
      data.timestamp || new Date().toISOString(),
      data.name || '',
      data.email || '',
      data.market || '',
      data.detectedCountry || '',
      data.marketSource || '',
      data.uiLanguage || '',
      data.userAgent || '',
      data.consent === true ? 'yes' : 'no',
    ]

    const sheet = getOrCreateSheet_()
    sheet.appendRow(row)

    const subject = `[ГРИЗ] New lead · ${data.market || '?'} · ${data.email || ''}`
    const body = [
      `Name: ${data.name || ''}`,
      `Email: ${data.email || ''}`,
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
