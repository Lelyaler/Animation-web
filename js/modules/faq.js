/**
 * FAQ accordion component.
 */

export function initFaq() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach((item) => {
    const questionBtn = item.querySelector('.faq-question');
    if (!questionBtn) return;

    questionBtn.addEventListener('click', () => {
      const wasOpen = item.classList.contains('active');
      faqItems.forEach((other) => other.classList.remove('active'));
      if (!wasOpen) {
        item.classList.add('active');
      }
    });
  });
}
