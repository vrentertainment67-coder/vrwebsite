import { MODULES } from '@/data/modules';

function init() {
  const tabs = Array.from(document.querySelectorAll<HTMLButtonElement>('#mod-tabs .tab'));
  const panelInner = document.getElementById('mod-panel-inner');
  const panel = document.getElementById('mod-panel');
  if (!tabs.length || !panelInner || !panel) return;

  function render(i: number) {
    const m = MODULES[i];
    panelInner!.innerHTML = `
      <div class="panel-head">
        <span class="mono kv">${m.n} · ${m.verb}</span>
        <span class="panel-h">${m.headline}</span>
        <span class="panel-body">${m.body}</span>
      </div>
      <div class="rows">
        ${m.rows.map((r) => `<div class="r"><span class="muted">${r.k}</span><span class="rv">${r.v}</span></div>`).join('')}
      </div>`;
    // retrigger the fade
    panelInner!.classList.remove('vr-fade');
    void panelInner!.offsetWidth;
    panelInner!.classList.add('vr-fade');
    panel!.setAttribute('aria-labelledby', `mtab-${i}`);
  }

  function select(i: number, focus = false) {
    tabs.forEach((t, j) => {
      const on = j === i;
      t.classList.toggle('is-on', on);
      t.setAttribute('aria-selected', on ? 'true' : 'false');
      t.setAttribute('tabindex', on ? '0' : '-1');
    });
    render(i);
    if (focus) tabs[i].focus();
  }

  tabs.forEach((t, i) => {
    t.addEventListener('click', () => select(i));
    t.addEventListener('keydown', (e) => {
      let next = -1;
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') next = (i + 1) % tabs.length;
      else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') next = (i - 1 + tabs.length) % tabs.length;
      else if (e.key === 'Home') next = 0;
      else if (e.key === 'End') next = tabs.length - 1;
      if (next >= 0) { e.preventDefault(); select(next, true); }
    });
  });
}

if (document.readyState !== 'loading') init();
else document.addEventListener('DOMContentLoaded', init);
