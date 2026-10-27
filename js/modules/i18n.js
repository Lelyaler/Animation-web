/**
 * Asynchronous localization service with external JSON dictionaries.
 */

let currentLang = 'RU';
const localesCache = {};

try {
  const saved = localStorage.getItem('site_lang');
  if (saved === 'RU' || saved === 'EN') {
    currentLang = saved;
  }
} catch {}

export function getCurrentLanguage() {
  return currentLang;
}

export async function loadLocaleDictionary(lang) {
  if (localesCache[lang]) {
    return localesCache[lang];
  }

  const fileName = lang.toLowerCase();
  try {
    const res = await fetch(`./data/locales/${fileName}.json`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    localesCache[lang] = data;
    return data;
  } catch (err) {
    console.warn(`[i18n] Failed to load ./data/locales/${fileName}.json:`, err);
    return localesCache[lang] || {};
  }
}

export async function updatePageTexts(lang = currentLang) {
  const dict = await loadLocaleDictionary(lang);
  if (!dict) return;

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) {
      el.textContent = dict[key];
    }
  });
}

export function initLanguageSwitcher(onLanguageChange) {
  const languageToggle = document.getElementById('languageToggle');
  const mobileLanguageToggle = document.getElementById('mobileLanguageToggle');
  const languageText = document.getElementById('languageText');
  const mobileLangText = document.querySelector('.mobile-lang__text');

  const setLang = async (nextLang) => {
    currentLang = nextLang;
    try {
      localStorage.setItem('site_lang', currentLang);
    } catch {}

    if (languageText) languageText.textContent = currentLang;
    if (mobileLangText) mobileLangText.textContent = currentLang;

    await updatePageTexts(currentLang);

    if (typeof onLanguageChange === 'function') {
      onLanguageChange(currentLang);
    }
  };

  const toggleLang = () => {
    const next = currentLang === 'RU' ? 'EN' : 'RU';
    setLang(next);
  };

  [languageToggle, mobileLanguageToggle].forEach((btn) => {
    if (!btn) return;
    btn.addEventListener('click', toggleLang);
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleLang();
      }
    });
  });

  // Initial load
  if (languageText) languageText.textContent = currentLang;
  if (mobileLangText) mobileLangText.textContent = currentLang;
  updatePageTexts(currentLang);
}
