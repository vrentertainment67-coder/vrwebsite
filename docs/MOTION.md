# Motion spec

Global easing `cubic-bezier(.2,.7,.1,1)` (ease-out). Use GSAP + ScrollTrigger for scroll-driven effects and Lenis for smooth scroll (lerp 0.1). Small loops are CSS.

| Element | Trigger | Animation | Duration / easing | Reduced motion |
|---|---|---|---|---|
| Page load: status line, H1, hero body | load | rise 28px + fade, staggered 0 / 0.15 / 0.3s | 1.1s ease-out | appear instantly |
| Hero rotating word | every 2.4s | vertical roll to the next word (answer → book → rank → adapt → report) | 0.9s `cubic-bezier(.7,0,.2,1)` | show "answer." only |
| Theme change | toggle or load | bg, fg, card and line colours cross-fade | 1.2s ease | instant |
| Live dots (header pill, status) | loop | opacity 1 → .35, scale 1 → .8 | 1.8s ease-in-out | static |
| Concierge reply | on scene start | typewriter at about 26ms/char with a blinking 2px caret (1s steps). Chips fade in when it finishes. | none | full text shown |
| Client marquee | loop | translateX 0 → −50% (duplicated track) | 38s linear, pause on hover | static row |
| Stat counters | first time in view | 0 → value | 1.6s ease-out cubic | final value |
| Section headings and blocks | scroll into view | rise 28px + fade, scrubbed between entry 0% and 35% | ScrollTrigger | none |
| Work showcase | every 7s or on click | image cross-fade 0.9s plus scale 1.06 → 1 over 1.6s. List item expands. | ease-out | cross-fade only, no auto-advance |
| Work frame | hover | translateY −4px | 0.6s ease-out | none |
| Module rows | hover | padding-left 0 → 24px, arrow fades in from −12px | 0.5s ease-out | colour change only |
| Tier cards | hover | translateY −6px | 0.6s ease-out | none |
| FAQ "+" | open/close | rotate 0 → 45° | 0.4s ease-out | instant |

Ideas for later phases (only if performance stays at or above 95):
- Magnetic CTA buttons (±6px pull toward the cursor)
- Short muted MP4 loops of each client site instead of stills in the work showcase
- A page transition that wipes in the theme's `--bg` between routes (Astro View Transitions)
