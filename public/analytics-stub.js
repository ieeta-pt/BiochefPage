// Privacy-respecting analytics stub: logs events to console; replace with real endpoint if desired.
(() => {
  function track(event, payload = {}) {
    if (window?.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      // no-op, still log
    }
    console.info('[Analytics]', event, payload);
  }
  document.addEventListener('click', (e) => {
    const target = e.target.closest('[data-analytics]');
    if (target) {
      track(target.getAttribute('data-analytics') || 'click', {
        href: target.getAttribute('href'),
        text: target.textContent?.trim()
      });
    }
  });
})();
