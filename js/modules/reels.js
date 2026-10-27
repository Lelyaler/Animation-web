/**
 * Slot reels CSS animation controls and payments feed scrollbar.
 */

export function initReelsAndFeed(showToastCallback) {
  const bannerContainer = document.querySelector('.banner');
  const spinBtn = document.getElementById('spinReelsBtn');
  const spinLinks = document.querySelectorAll("[data-action='spin']");

  const triggerReelsSpin = () => {
    if (!bannerContainer || bannerContainer.classList.contains('reels-spinning')) return;

    bannerContainer.classList.add('reels-spinning');
    if (showToastCallback) {
      showToastCallback('spin_start');
    }

    setTimeout(() => {
      bannerContainer.classList.remove('reels-spinning');
      if (showToastCallback) {
        showToastCallback('spin_end');
      }
    }, 1800);
  };

  if (spinBtn) {
    spinBtn.addEventListener('click', triggerReelsSpin);
  }

  spinLinks.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      triggerReelsSpin();
    });
  });

  // Custom scrollbar indicator for payments feed
  const paymentContent = document.querySelector('.banner-blog__payment-content');
  const scrollbarThumb = document.querySelector('.custom-scrollbar-thumb');
  const scrollbarTrack = document.querySelector('.custom-scrollbar-track');

  if (paymentContent && scrollbarThumb && scrollbarTrack) {
    paymentContent.addEventListener(
      'scroll',
      () => {
        const { scrollHeight, clientHeight, scrollTop } = paymentContent;
        const maxScroll = scrollHeight - clientHeight;
        if (maxScroll > 0) {
          const trackHeight = scrollbarTrack.clientHeight;
          const thumbHeight = scrollbarThumb.clientHeight;
          const topPercent = scrollTop / maxScroll;
          scrollbarThumb.style.top = `${(trackHeight - thumbHeight) * topPercent}px`;
        }
      },
      { passive: true }
    );
  }
}
