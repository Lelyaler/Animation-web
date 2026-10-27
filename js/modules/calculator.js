/**
 * Interactive ROI and commission revenue calculator.
 */

export function initCalculator() {
  const ftdRange = document.getElementById('calcFtd');
  const ftdVal = document.getElementById('calcFtdVal');
  const depRange = document.getElementById('calcDep');
  const depVal = document.getElementById('calcDepVal');
  const resMonth = document.getElementById('calcResultMonth');
  const resYear = document.getElementById('calcResultYear');
  const calcTabs = document.querySelectorAll('.calc-tab');

  if (!ftdRange || !depRange || !resMonth) return;

  let currentModel = 'cpa';

  const calculate = () => {
    const ftds = parseInt(ftdRange.value, 10) || 0;
    const avgDeposit = parseInt(depRange.value, 10) || 0;

    if (ftdVal) ftdVal.textContent = ftds.toLocaleString();
    if (depVal) depVal.textContent = `$${avgDeposit.toLocaleString()}`;

    let monthly = 0;

    switch (currentModel) {
      case 'cpa': {
        const cpaRate = ftds >= 300 ? 350 : ftds >= 100 ? 280 : 220;
        monthly = ftds * cpaRate;
        break;
      }
      case 'revshare': {
        // Industry baseline: active player repeat factor ~2.4, net revenue share 45%
        const grossNGR = ftds * avgDeposit * 2.4;
        monthly = Math.round(grossNGR * 0.45);
        break;
      }
      case 'hybrid':
      default: {
        const fixedCPA = ftds * 140;
        const hybridRS = ftds * avgDeposit * 2.4 * 0.25;
        monthly = Math.round(fixedCPA + hybridRS);
        break;
      }
    }

    const yearly = monthly * 12;

    resMonth.textContent = `$${monthly.toLocaleString()}`;
    if (resYear) {
      resYear.textContent = `$${yearly.toLocaleString()}`;
    }
  };

  ftdRange.addEventListener('input', calculate);
  depRange.addEventListener('input', calculate);

  calcTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      calcTabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
      currentModel = tab.getAttribute('data-model') || 'cpa';
      calculate();
    });
  });

  calculate();
}
