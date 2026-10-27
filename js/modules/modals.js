/**
 * Native HTML5 <dialog> modal controller and case studies reader.
 */

const blogArticles = {
  1: {
    title: 'Scaling LatAm Casino Traffic in 2026: Tier 2 Case Study (ROI 240%)',
    tag: 'Case Study',
    content:
      'Over 6 months, our media buying partner scaled Brazilian and Chilean iGaming traffic using hyper-localized Pix payment pre-landers. Key takeaways: 1. Instant local currency deposits boosted conversion by 48%. 2. Native PWA push notification funnels delivered 32% return player deposits. 3. Final stats: 14,200 FTDs with an overall ROI of 240% on RevShare model.'
  },
  2: {
    title: 'PWA vs Native iOS Apps in iGaming Media Buying: 2026 Benchmark',
    tag: 'Tech Guide',
    content:
      'Comparing webview native iOS apps versus lightweight PWAs. Results show PWAs provide 3x faster deployment, zero risk of sudden App Store bans, and 94% installation completion rates when using a dedicated PWA engine.'
  },
  3: {
    title: 'How to Maximize RevShare Lifetime Value with VIP Retention Funnels',
    tag: 'Strategy',
    content:
      'Long-term revenue share success depends on CRM retention. Automated tournaments, personalized cashback, and re-engagement triggers create an average player retention of 11.4 months.'
  }
};

export function initModals() {
  const partnerModal = document.getElementById('partnerModal');
  const loginModal = document.getElementById('loginModal');
  const articleModal = document.getElementById('articleModal');

  const openDialog = (dlg) => {
    if (dlg && typeof dlg.showModal === 'function') {
      dlg.showModal();
    }
  };

  const closeDialog = (dlg) => {
    if (dlg && typeof dlg.close === 'function') {
      dlg.close();
    }
  };

  document.querySelectorAll("[data-open-modal='partner']").forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openDialog(partnerModal);
    });
  });

  document.querySelectorAll("[data-open-modal='login']").forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openDialog(loginModal);
    });
  });

  document.querySelectorAll('.dialog-close').forEach((btn) => {
    btn.addEventListener('click', () => {
      const dlg = btn.closest('dialog');
      closeDialog(dlg);
    });
  });

  [partnerModal, loginModal, articleModal].forEach((dlg) => {
    if (!dlg) return;
    dlg.addEventListener('click', (e) => {
      if (e.target === dlg) {
        closeDialog(dlg);
      }
    });
  });

  // Blog case study reader
  document.querySelectorAll('.blog-read-more').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-article-id');
      const article = blogArticles[id] || blogArticles[1];

      const modalTitle = document.getElementById('articleModalTitle');
      const modalBody = document.getElementById('articleModalBody');
      const modalTag = document.getElementById('articleModalTag');

      if (modalTitle) modalTitle.textContent = article.title;
      if (modalBody) modalBody.textContent = article.content;
      if (modalTag) modalTag.textContent = article.tag;

      openDialog(articleModal);
    });
  });

  return {
    closeDialog
  };
}
