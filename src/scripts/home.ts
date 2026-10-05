import { SCENES, THEME_LABELS, PROJECTS, type ThemeKey } from '@/lib/content';

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const $ = <T extends Element = HTMLElement>(s: string) => document.querySelector<T>(s);
const theme = (): ThemeKey => (document.documentElement.dataset.theme as ThemeKey) || 'night';

/* ── Live clock + mode label ───────────────────────────── */
function clock() {
  return new Date()
    .toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', hour: 'numeric', minute: '2-digit', hour12: true })
    .toUpperCase();
}
function paintClock() {
  const el = $('#hero-clock');
  if (el) el.textContent = clock();
}
function paintMode() {
  const label = THEME_LABELS[theme()];
  const m = $('#hero-mode');
  if (m) m.textContent = label;
  const live = $('#sc-live');
  if (live) live.textContent = `Live · ${label}`;
}

/* ── Rotating hero word ────────────────────────────────── */
function initWords() {
  const col = $('#hero-words');
  if (!col || reduce) return; // reduced-motion shows "answer." only
  let i = 0;
  setInterval(() => {
    i = (i + 1) % 5;
    col.style.transform = `translateY(-${i * 0.98}em)`;
  }, 2400);
}

/* ── Concierge scene + typewriter ──────────────────────── */
let typingTimer: number | undefined;
function renderScene(restartTyping: boolean) {
  const scene = SCENES[theme()];
  const set = (sel: string, text: string) => { const el = $(sel); if (el) el.textContent = text; };
  set('#sc-kicker', scene.kicker);
  set('#sc-title', scene.title);
  set('#sc-sub', scene.sub);
  set('#sc-guest', scene.guest);

  const reply = $('#sc-reply');
  const chips = $('#sc-chips');
  if (chips) chips.innerHTML = scene.chips.map((c) => `<span class="chip">${c}</span>`).join('');

  if (!reply) return;
  if (reduce || !restartTyping) { reply.textContent = scene.reply; return; }

  // typewriter
  window.clearInterval(typingTimer);
  reply.textContent = '';
  if (chips) chips.style.visibility = 'hidden';
  let n = 0;
  typingTimer = window.setInterval(() => {
    n++;
    reply.textContent = scene.reply.slice(0, n);
    if (n >= scene.reply.length) {
      window.clearInterval(typingTimer);
      if (chips) chips.style.visibility = 'visible';
    }
  }, 26);
}

/* ── Work showcase ─────────────────────────────────────── */
function initWork() {
  const items = Array.from(document.querySelectorAll<HTMLElement>('.work-item'));
  const shots = Array.from(document.querySelectorAll<HTMLImageElement>('.shot'));
  const frame = $<HTMLAnchorElement>('#work-frame');
  const domain = $('#work-domain');
  const num = $('#work-num');
  if (!items.length || !frame) return;

  let cur = 0;
  let timer: number | undefined;

  function select(i: number) {
    cur = i;
    items.forEach((it, j) => it.classList.toggle('is-active', j === i));
    items.forEach((it) => it.querySelector('.work-btn')?.toggleAttribute('aria-current', false));
    items[i].querySelector('.work-btn')?.setAttribute('aria-current', 'true');
    shots.forEach((s, j) => s.classList.toggle('is-on', j === i));
    const p = PROJECTS[i];
    if (p) { frame!.href = p.url; if (domain) domain.textContent = p.domain; }
    if (num) num.textContent = '0' + (i + 1);
  }

  items.forEach((it, i) => it.querySelector('.work-btn')?.addEventListener('click', () => { select(i); restart(); }));

  function advance() { select((cur + 1) % items.length); }
  function restart() {
    if (reduce) return; // no auto-advance under reduced-motion
    window.clearInterval(timer);
    timer = window.setInterval(advance, 7000);
  }
  const sec = document.getElementById('work');
  sec?.addEventListener('mouseenter', () => window.clearInterval(timer));
  sec?.addEventListener('mouseleave', restart);
  sec?.addEventListener('focusin', () => window.clearInterval(timer));
  sec?.addEventListener('focusout', restart);
  restart();
}

/* ── Stat counters ─────────────────────────────────────── */
function initCounters() {
  const nums = Array.from(document.querySelectorAll<HTMLElement>('[data-countup]'));
  if (!nums.length) return;
  const run = (el: HTMLElement) => {
    const to = Number(el.dataset.countup || '0');
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    if (reduce) { el.textContent = prefix + to + suffix; return; }
    const t0 = performance.now();
    const step = (t: number) => {
      const k = Math.min(1, (t - t0) / 1600);
      const eased = 1 - Math.pow(1 - k, 3);
      el.textContent = prefix + Math.round(to * eased) + suffix;
      if (k < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { run(e.target as HTMLElement); io.unobserve(e.target); } });
  }, { threshold: 0.4 });
  nums.forEach((n) => io.observe(n));
}

/* ── Boot ──────────────────────────────────────────────── */
function init() {
  paintClock();
  paintMode();
  setInterval(paintClock, 30000);
  initWords();
  renderScene(true);
  initWork();
  initCounters();
  document.addEventListener('vr:theme', () => { paintMode(); renderScene(true); });
}

if (document.readyState !== 'loading') init();
else document.addEventListener('DOMContentLoaded', init);
