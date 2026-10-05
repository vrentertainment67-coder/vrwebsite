/**
 * Theme control. The initial theme is set before paint in BaseHead's inline script.
 * This wires every [data-theme-btn] toggle instance on the page, keeps them in sync,
 * persists the choice for the session, and announces changes to interactive islands.
 */
type Theme = 'day' | 'evening' | 'night';

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  try {
    sessionStorage.setItem('vr-theme', theme);
  } catch {
    /* private mode — ignore */
  }
  // Sync all toggle buttons
  document.querySelectorAll<HTMLButtonElement>('[data-theme-btn]').forEach((btn) => {
    btn.setAttribute('aria-pressed', btn.dataset.themeBtn === theme ? 'true' : 'false');
  });
  // Tell islands (concierge card, etc.) to react
  document.dispatchEvent(new CustomEvent('vr:theme', { detail: theme }));
  // Analytics
  (window as unknown as { umami?: { track?: (e: string, d?: unknown) => void } }).umami?.track?.(
    'theme_toggle',
    { theme }
  );
}

function init() {
  const current = (document.documentElement.dataset.theme as Theme) || 'night';
  document.querySelectorAll<HTMLButtonElement>('[data-theme-btn]').forEach((btn) => {
    btn.setAttribute('aria-pressed', btn.dataset.themeBtn === current ? 'true' : 'false');
    btn.addEventListener('click', () => applyTheme(btn.dataset.themeBtn as Theme));
  });
}

if (document.readyState !== 'loading') init();
else document.addEventListener('DOMContentLoaded', init);
