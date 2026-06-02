/**
 * GSAP scroll-reveal + hero motion.
 * Imported by pages that want cinematic motion. Respects prefers-reduced-motion
 * and degrades gracefully (elements are made visible if GSAP can't run).
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function init() {
  const els = gsap.utils.toArray<HTMLElement>('[data-reveal]');

  if (reduce) {
    els.forEach((el) => gsap.set(el, { opacity: 1, y: 0 }));
    return;
  }

  els.forEach((el) => {
    const delay = parseFloat(el.dataset.revealDelay || '0');
    gsap.fromTo(
      el,
      { opacity: 0, y: 28 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        delay,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 85%', once: true },
      }
    );
  });

  // Word-by-word headline reveal (hero)
  const headline = document.querySelector<HTMLElement>('[data-words]');
  if (headline) {
    const words = headline.querySelectorAll('.word');
    gsap.fromTo(
      words,
      { opacity: 0, y: '0.4em', rotateX: -40 },
      { opacity: 1, y: 0, rotateX: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out', delay: 0.2 }
    );
  }

  // Hero video slow scale on scroll
  const heroMedia = document.querySelector<HTMLElement>('[data-hero-media]');
  if (heroMedia) {
    gsap.to(heroMedia, {
      scale: 1.15,
      ease: 'none',
      scrollTrigger: { trigger: heroMedia, start: 'top top', end: 'bottom top', scrub: true },
    });
  }
}

if (document.readyState !== 'loading') init();
else document.addEventListener('DOMContentLoaded', init);
