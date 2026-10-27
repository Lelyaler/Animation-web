/**
 * Toast notifications manager.
 */

let toastTimer = null;

export function showToast(message) {
  const toastEl = document.getElementById('toastMsg');
  if (!toastEl) return;

  const textNode = toastEl.querySelector('.toast-text');
  if (textNode) textNode.textContent = message;

  toastEl.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toastEl.classList.remove('show');
  }, 3200);
}
