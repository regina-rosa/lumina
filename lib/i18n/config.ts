export const LANGS = ["en", "id", "zh"] as const;
export type Lang = (typeof LANGS)[number];
export const DEFAULT_LANG: Lang = "en";
export const LANG_COOKIE = "lumina.lang";

export const LANG_LABELS: Record<Lang, { short: string; name: string; htmlLang: string; locale: string }> = {
  en: { short: "EN", name: "English", htmlLang: "en", locale: "en-US" },
  id: { short: "ID", name: "Bahasa Indonesia", htmlLang: "id", locale: "id-ID" },
  zh: { short: "中文", name: "中文 (简体)", htmlLang: "zh-CN", locale: "zh-CN" },
};

export function isLang(value: string | undefined | null): value is Lang {
  return !!value && (LANGS as readonly string[]).includes(value);
}

// Text in all three languages.
export type L = Record<Lang, string>;

// Bible book names. English is the key used in references like "Psalm 23:1".
const BOOKS: Record<string, { id: string; zh: string }> = {
  Genesis: { id: "Kejadian", zh: "创世记" },
  Exodus: { id: "Keluaran", zh: "出埃及记" },
  Deuteronomy: { id: "Ulangan", zh: "申命记" },
  Joshua: { id: "Yosua", zh: "约书亚记" },
  Judges: { id: "Hakim-hakim", zh: "士师记" },
  Ruth: { id: "Rut", zh: "路得记" },
  "1 Samuel": { id: "1 Samuel", zh: "撒母耳记上" },
  "2 Samuel": { id: "2 Samuel", zh: "撒母耳记下" },
  "1 Kings": { id: "1 Raja-raja", zh: "列王纪上" },
  "2 Kings": { id: "2 Raja-raja", zh: "列王纪下" },
  Nehemiah: { id: "Nehemia", zh: "尼希米记" },
  Esther: { id: "Ester", zh: "以斯帖记" },
  Job: { id: "Ayub", zh: "约伯记" },
  Psalm: { id: "Mazmur", zh: "诗篇" },
  Psalms: { id: "Mazmur", zh: "诗篇" },
  Proverbs: { id: "Amsal", zh: "箴言" },
  Ecclesiastes: { id: "Pengkhotbah", zh: "传道书" },
  Isaiah: { id: "Yesaya", zh: "以赛亚书" },
  Jeremiah: { id: "Yeremia", zh: "耶利米书" },
  Lamentations: { id: "Ratapan", zh: "耶利米哀歌" },
  Daniel: { id: "Daniel", zh: "但以理书" },
  Jonah: { id: "Yunus", zh: "约拿书" },
  Habakkuk: { id: "Habakuk", zh: "哈巴谷书" },
  Zephaniah: { id: "Zefanya", zh: "西番雅书" },
  Matthew: { id: "Matius", zh: "马太福音" },
  Mark: { id: "Markus", zh: "马可福音" },
  Luke: { id: "Lukas", zh: "路加福音" },
  John: { id: "Yohanes", zh: "约翰福音" },
  Acts: { id: "Kisah Para Rasul", zh: "使徒行传" },
  Romans: { id: "Roma", zh: "罗马书" },
  "1 Corinthians": { id: "1 Korintus", zh: "哥林多前书" },
  "2 Corinthians": { id: "2 Korintus", zh: "哥林多后书" },
  Galatians: { id: "Galatia", zh: "加拉太书" },
  Ephesians: { id: "Efesus", zh: "以弗所书" },
  Philippians: { id: "Filipi", zh: "腓立比书" },
  "1 Thessalonians": { id: "1 Tesalonika", zh: "帖撒罗尼迦前书" },
  "2 Timothy": { id: "2 Timotius", zh: "提摩太后书" },
  Hebrews: { id: "Ibrani", zh: "希伯来书" },
  James: { id: "Yakobus", zh: "雅各书" },
  "1 Peter": { id: "1 Petrus", zh: "彼得前书" },
  "1 John": { id: "1 Yohanes", zh: "约翰一书" },
  Revelation: { id: "Wahyu", zh: "启示录" },
};

// "Psalm 23:1" -> "Mazmur 23:1" / "诗篇 23:1". Also handles lists like "Joshua 2, 6".
export function localizeRef(ref: string, lang: Lang): string {
  if (lang === "en") return ref;
  const match = ref.match(/^((?:\d )?[A-Za-z]+)\s+(.*)$/);
  if (!match) return ref;
  const book = BOOKS[match[1]];
  if (!book) return ref;
  return lang === "zh" ? `${book.zh} ${match[2]}` : `${book.id} ${match[2]}`;
}

export function withLang(lang: Lang, path: string): string {
  return `/${lang}${path === "/" ? "" : path}`;
}
