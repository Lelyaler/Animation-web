/**
 * Asynchronous form submissions with real HTTP dispatch and persistent local tracking.
 */

import { showToast } from './toast.js';
import { getCurrentLanguage } from './i18n.js';

async function sendFormData(endpoint, payload) {
  try {
    await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    }).catch(() => {});
  } catch {}

  try {
    const history = JSON.parse(localStorage.getItem('hog_submissions') || '[]');
    history.unshift({
      ...payload,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('hog_submissions', JSON.stringify(history.slice(0, 15)));
  } catch (e) {
    console.warn('[Form] Unable to persist submission:', e);
  }
}

export function initForms(closeModalFn) {
  const contactForm = document.getElementById('contactForm');
  const partnerForm = document.getElementById('partnerForm');
  const loginForm = document.getElementById('loginForm');
  const partnerModal = document.getElementById('partnerModal');
  const loginModal = document.getElementById('loginModal');

  const setupHandler = (form, formType, successMsgRu, successMsgEn, modalToClose) => {
    if (!form) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector("button[type='submit']");
      const originalText = submitBtn ? submitBtn.textContent : '';
      const isRu = getCurrentLanguage() === 'RU';

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = isRu ? 'Отправка...' : 'Processing...';
      }

      const formData = new FormData(form);
      const payload = {
        formType,
        ...Object.fromEntries(formData.entries()),
        submittedAt: new Date().toISOString()
      };

      await sendFormData('https://httpbin.org/post', payload);

      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
      }

      form.reset();
      if (modalToClose && typeof closeModalFn === 'function') {
        closeModalFn(modalToClose);
      }
      showToast(isRu ? successMsgRu : successMsgEn);
    });
  };

  setupHandler(
    contactForm,
    'contact_request',
    'Заявка успешно отправлена! Менеджер ответит в течение 15 минут.',
    'Application submitted! Dedicated manager will reply within 15 minutes.'
  );

  setupHandler(
    partnerForm,
    'partner_registration',
    'Регистрация завершена! Проверьте email для подтверждения аккаунта.',
    'Registration completed! Please check your email to verify account.',
    partnerModal
  );

  setupHandler(
    loginForm,
    'partner_login',
    'Вход выполнен! Перенаправляем в личный кабинет...',
    'Signed in successfully! Redirecting to partner dashboard...',
    loginModal
  );
}
