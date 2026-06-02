/**
 * Site motion — one GSAP instance for the whole page.
 * Scroll reveals, hero word reveal, hero video, kinetic statement, Lenis smooth
 * scroll, custom cursor, magnetic buttons, count-up stats, icon stroke-draw, and
 * the preloader dismiss. Everything respects prefers-reduced-motion and touch.
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(pointer: fine)').matches;

/* ── Preloader dismiss (fast, skip on repeat visits) ───────── */
function dismissPreloader() {
  const pre = document.getElementById('preloader');
  if (!pre) return;
  const seen = sessionStorage.getItem('vr_intro');
  if (seen || reduce) {
    pre.remove();
    return;
  }
  sessionStorage.setItem('vr_intro', '1');
  gsap.to(pre, {
    yPercent: -100,
    duration: 0.7,
    ease: 'power3.inOut',
    delay: 0.35,
    onComplete: () => pre.remove(),
  });
}

/* ── Lenis smooth scroll, wired to ScrollTrigger ───────────── */
function initLenis() {
  if (reduce) return;
  const lenis = new Lenis({ lerp: 0.1, smoothWheel: true, syncTouch: false });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
}

/* ── Scroll reveals + hero + kinetic ───────────────────────── */
function initReveals() {
  const els = gsap.utils.toArray<HTMLElement>('[data-reveal]');
  if (reduce) {
    els.forEach((el) => gsap.set(el, { opacity: 1, y: 0 }));
  } else {
    els.forEach((el) => {
      const delay = parseFloat(el.dataset.revealDelay || '0');
      gsap.fromTo(
        el,
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.9, delay, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 85%', once: true } }
      );
    });
  }

  const headline = document.querySelector<HTMLElement>('[data-words]');
  if (headline && !reduce) {
    const words = headline.querySelectorAll('.word');
    gsap.fromTo(words, { opacity: 0, y: '0.4em', rotateX: -40 }, { opacity: 1, y: 0, rotateX: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out', delay: 0.2 });
    setTimeout(() => gsap.set(words, { opacity: 1, y: 0, rotateX: 0 }), 1600);
  }

  const heroVideo = document.querySelector<HTMLVideoElement>('[data-hero-video]');
  if (heroVideo && !reduce) heroVideo.play().catch(() => {});

  const heroMedia = document.querySelector<HTMLElement>('[data-hero-media]');
  if (heroMedia && !reduce) {
    gsap.to(heroMedia, { scale: 1.15, ease: 'none', scrollTrigger: { trigger: heroMedia, start: 'top top', end: 'bottom top', scrub: true } });
  }

  if (!reduce) {
    gsap.utils.toArray<HTMLElement>('[data-kinetic-line]').forEach((line) => {
      gsap.fromTo(line, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: line, start: 'top 88%', once: true } });
    });
  }
}

/* ── Count-up stats ────────────────────────────────────────── */
function initCountUp() {
  gsap.utils.toArray<HTMLElement>('[data-countup]').forEach((el) => {
    const target = parseFloat(el.dataset.countup || '0');
    if (reduce) {
      el.textContent = String(target);
      return;
    }
    const obj = { v: 0 };
    gsap.to(obj, {
      v: target,
      duration: 1.4,
      ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 90%', once: true },
      onUpdate: () => {
        el.textContent = String(Math.round(obj.v));
      },
    });
  });
}

/* ── Icon stroke-draw ──────────────────────────────────────── */
function initIconDraw() {
  gsap.utils.toArray<SVGPathElement>('[data-draw]').forEach((path) => {
    const len = path.getTotalLength?.() ?? 0;
    if (!len) return;
    if (reduce) {
      gsap.set(path, { strokeDasharray: 'none', strokeDashoffset: 0 });
      return;
    }
    gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
    gsap.to(path, { strokeDashoffset: 0, duration: 1.1, ease: 'power2.out', scrollTrigger: { trigger: path, start: 'top 90%', once: true } });
  });
}

/* ── Custom cursor (desktop, fine pointer only) ────────────── */
function initCursor() {
  if (!finePointer || reduce) return;
  const dot = document.createElement('div');
  const ring = document.createElement('div');
  dot.className = 'cursor-dot';
  ring.className = 'cursor-ring';
  document.body.append(dot, ring);
  document.documentElement.classList.add('has-cursor');

  const xDot = gsap.quickTo(dot, 'x', { duration: 0.08, ease: 'power3' });
  const yDot = gsap.quickTo(dot, 'y', { duration: 0.08, ease: 'power3' });
  const xRing = gsap.quickTo(ring, 'x', { duration: 0.28, ease: 'power3' });
  const yRing = gsap.quickTo(ring, 'y', { duration: 0.28, ease: 'power3' });

  window.addEventListener('mousemove', (e) => {
    xDot(e.clientX); yDot(e.clientY); xRing(e.clientX); yRing(e.clientY);
  });
  const hoverSel = 'a, button, [data-modal-open], input, select, textarea, .ba-slider';
  document.addEventListener('mouseover', (e) => {
    if ((e.target as HTMLElement).closest(hoverSel)) ring.classList.add('cursor-ring--active');
  });
  document.addEventListener('mouseout', (e) => {
    if ((e.target as HTMLElement).closest(hoverSel)) ring.classList.remove('cursor-ring--active');
  });
}

/* ── Magnetic buttons (desktop only) ───────────────────────── */
function initMagnetic() {
  if (!finePointer || reduce) return;
  document.querySelectorAll<HTMLElement>('.btn, [data-magnetic]').forEach((el) => {
    const strength = 0.3;
    el.addEventListener('mousemove', (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - (r.left + r.width / 2)) * strength;
      const y = (e.clientY - (r.top + r.height / 2)) * strength;
      gsap.to(el, { x, y, duration: 0.4, ease: 'power3.out' });
    });
    el.addEventListener('mouseleave', () => gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1,0.4)' }));
  });
}

function init() {
  dismissPreloader();
  initLenis();
  initReveals();
  initCountUp();
  initIconDraw();
  initCursor();
  initMagnetic();
}

if (document.readyState !== 'loading') init();
else document.addEventListener('DOMContentLoaded', init);
