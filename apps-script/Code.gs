/**
 * Lumina mailbox — Google Apps Script backend.
 *
 * Paste this into Extensions → Apps Script of a Google Sheet, set the
 * SECRET script property, and deploy as a web app. See apps-script/README.md.
 *
 * Sheet "Inbox" columns:
 *   A Time | B Type | C Name | D Message | E Language | F OK to share
 *   G Approved (tick to show on the site) | H Your reply (shown under it)
 */

const SHEET_NAME = "Inbox";
const HEADERS = ["Time", "Type", "Name", "Message", "Language", "OK to share", "Approved", "Your reply"];
const TYPES = ["story", "letter", "quiz", "feature", "prayer", "hi"];
const MAX_PER_HOUR = 5; // per visitor
const WALL_SIZE = 30;

function secret_() {
  return PropertiesService.getScriptProperties().getProperty("SECRET");
}

function json_(value) {
  return ContentService.createTextOutput(JSON.stringify(value)).setMimeType(ContentService.MimeType.JSON);
}

function sheet_() {
  const book = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = book.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = book.insertSheet(SHEET_NAME);
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
    sheet.getRange("1:1").setFontWeight("bold");
    sheet.setColumnWidth(4, 420);
    sheet.setColumnWidth(8, 300);
  }
  return sheet;
}

// Stop text like "=IMPORTXML(...)" from being treated as a formula.
function safe_(value, max) {
  let text = String(value || "").replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "").trim().slice(0, max);
  if (/^[=+\-@\t\r]/.test(text)) text = "'" + text;
  return text;
}

/** Visitors' notes arrive here (sent by the Lumina server, never the browser). */
function doPost(e) {
  let body;
  try {
    body = JSON.parse(e.postData.contents);
  } catch (err) {
    return json_({ ok: false, error: "bad_request" });
  }
  if (!secret_() || body.secret !== secret_()) return json_({ ok: false, error: "unauthorized" });

  const type = TYPES.indexOf(body.type) >= 0 ? body.type : "hi";
  const message = safe_(body.message, 1000);
  if (message.length < 3) return json_({ ok: false, error: "too_short" });

  // A few notes per visitor per hour; the client key is an anonymous hash.
  const cache = CacheService.getScriptCache();
  const key = "rate_" + safe_(body.client, 64);
  const count = Number(cache.get(key) || 0);
  if (count >= MAX_PER_HOUR) return json_({ ok: false, error: "rate_limited" });
  cache.put(key, String(count + 1), 3600);

  const share = type !== "prayer" && body.share === true;
  sheet_().appendRow([
    new Date(),
    type,
    safe_(body.name, 40),
    message,
    safe_(body.lang, 5),
    share,
    false,
    "",
  ]);
  const row = sheet_().getLastRow();
  sheet_().getRange(row, 7).insertCheckboxes();

  return json_({ ok: true });
}

/** The site asks for approved notes to show on the wall. */
function doGet(e) {
  if (!secret_() || (e.parameter && e.parameter.secret) !== secret_()) {
    return json_({ ok: false, error: "unauthorized" });
  }
  const rows = sheet_().getDataRange().getValues().slice(1);
  const notes = rows
    .filter(function (r) {
      return r[1] !== "prayer" && r[5] === true && r[6] === true;
    })
    .reverse()
    .slice(0, WALL_SIZE)
    .map(function (r) {
      return {
        time: r[0] instanceof Date ? r[0].toISOString() : String(r[0]),
        type: String(r[1]),
        name: String(r[2]).replace(/^'/, ""),
        message: String(r[3]).replace(/^'/, ""),
        reply: String(r[7] || ""),
      };
    });
  return json_({ ok: true, notes: notes });
}

/** Run once from the editor to create the Inbox tab and check permissions. */
function setup() {
  sheet_();
  if (!secret_()) {
    throw new Error("Add a script property named SECRET first (Project Settings → Script properties).");
  }
}
