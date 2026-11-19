// Base pixel is initialized once in the document head. Track real user clicks,
// including dynamically rendered controls, without delaying navigation.
(() => {
 const clean = value => (value || '').replace(/[↗←→↓＋+Ⅱ▶]/g, '').replace(/\s+/g, ' ').trim().slice(0, 100);
 document.addEventListener('click', event => {
  const control = event.target instanceof Element ? event.target.closest('a, button, summary') : null;
  if (!control || control.matches('[disabled], [aria-disabled="true"], .skip')) return;
  const href = control.getAttribute('href') || '';
  let action = 'button', eventName = 'ButtonClick', destination = '';
  if (href.startsWith('tel:')) { action = 'phone'; eventName = 'PhoneClick'; }
  else if (href.startsWith('#')) action = 'navigation';
  else if (href) {
   try {
    const url = new URL(href, location.href);
    destination = url.hostname + url.pathname;
    if (url.hostname === 'pf.kakao.com') { action = 'kakao_consult'; eventName = 'KakaoConsultClick'; }
    else if (url.hostname.endsWith('naver.com') && url.pathname.includes('/booking')) { action = 'naver_booking'; eventName = 'NaverBookingClick'; }
    else if (url.hostname === 'naver.me') { action = 'naver_place'; eventName = 'NaverPlaceClick'; }
    else action = 'external_link';
   } catch (_) { return; }
  } else if (control.matches('summary')) action = 'faq';
  else if (control.hasAttribute('data-filter')) action = 'case_filter';
  else if (control.closest('.testimonial-controls')) action = 'review_navigation';
  const section = control.closest('section, header, footer, aside');
  const params = {
   button_name: clean(control.getAttribute('aria-label') || control.textContent),
   button_category: action,
   section: section ? (section.id || section.className || section.tagName.toLowerCase()).toString().slice(0, 80) : 'page',
   destination
  };
  try {
   if (typeof window.fbq === 'function') {
    window.fbq('trackCustom', eventName, params);
    control.dataset.metaEvent = eventName;
   }
  } catch (_) { /* Analytics must never interrupt consultation or booking. */ }
 }, true);
})();
