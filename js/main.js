/**
 * House of Gambling — Main Application Entry Point
 * Modular Vanilla JavaScript ES6 architecture.
 */

import { initNavigation } from './modules/navigation.js';
import { initLanguageSwitcher, getCurrentLanguage } from './modules/i18n.js';
import { initReelsAndFeed } from './modules/reels.js';
import { initCalculator } from './modules/calculator.js';
import { initFaq } from './modules/faq.js';
import { initModals } from './modules/modals.js';
import { initForms } from './modules/forms.js';
import { initScrollReveal } from './modules/animations.js';
import { showToast } from './modules/toast.js';

document.addEventListener('DOMContentLoaded', () => {
  // Navigation & burger menu
  initNavigation();

  // Localization engine
  initLanguageSwitcher((lang) => {
    showToast(lang === 'RU' ? 'Язык интерфейса: RU' : 'Interface language: EN');
  });

  // Slot reels animation & payments scrollbar
  initReelsAndFeed((event) => {
    const isRu = getCurrentLanguage() === 'RU';
    if (event === 'spin_start') {
      showToast(isRu ? 'Слоты запущены! Удачи!' : 'Reels spinning! Good luck!');
    } else if (event === 'spin_end') {
      showToast(isRu ? 'Раунд завершен! Коэффициенты зафиксированы.' : 'Round complete! Rates locked in.');
    }
  });

  // Commission & ROI Calculator
  initCalculator();

  // FAQ Accordion
  initFaq();

  // Modals & Dialogs
  const { closeDialog } = initModals();

  // Form Submissions
  initForms(closeDialog);

  // Scroll reveal observer
  initScrollReveal();
});
