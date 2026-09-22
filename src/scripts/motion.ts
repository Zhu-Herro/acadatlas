/**
 * ─────────────────────────────────────────────────────────────────────────────
 * MOTION CONTROLLER
 * ─────────────────────────────────────────────────────────────────────────────
 * One small, dependency-free module powering the whole scroll system. It is
 * intentionally conservative:
 *
 *   • reveals elements once, then stops observing them
 *   • never animates anything the reader cannot already see
 *   • bails out entirely under `prefers-reduced-motion: reduce`
 *   • falls back to "show everything" when IntersectionObserver is missing
 *
 * Elements opt in with data attributes declared in `global.css`:
 *   data-reveal="up | fade | mask | rule"
 *   data-stagger                     (children animate in sequence)
 *   .u-rule                          (hairline that draws itself)
 *   data-count-to="45"               (number that counts up)
 */

const REVEAL_SELECTOR = '[data-reveal], [data-stagger], .u-rule';
const COUNT_SELECTOR = '[data-count-to]';

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** Reveal every target immediately (reduced motion / no observer support). */
function revealAll(targets: Iterable<Element>): void {
  for (const target of targets) target.classList.add('is-revealed');
}

/** Count a number up from zero with an ease-out curve. */
function animateCount(element: HTMLElement): void {
  const target = Number.parseFloat(element.dataset.countTo ?? '');
  if (Number.isNaN(target)) return;

  const decimals = Number.parseInt(element.dataset.countDecimals ?? '0', 10);
  const duration = Number.parseFloat(element.dataset.countDuration ?? '1200');
  const prefix = element.dataset.countPrefix ?? '';
  const suffix = element.dataset.countSuffix ?? '';
  const start = performance.now();

  const format = (value: number) =>
    `${prefix}${value.toFixed(decimals)}${suffix}`;

  const step = (now: number) => {
    const progress = Math.min((now - start) / duration, 1);
    // easeOutCubic — decelerating, never bouncy.
    const eased = 1 - Math.pow(1 - progress, 3);
    element.textContent = format(target * eased);

    if (progress < 1) window.requestAnimationFrame(step);
    else element.textContent = format(target);
  };

  window.requestAnimationFrame(step);
}

export function initMotion(): void {
  const revealTargets = Array.from(document.querySelectorAll(REVEAL_SELECTOR));
  const countTargets = Array.from(document.querySelectorAll<HTMLElement>(COUNT_SELECTOR));

  if (prefersReducedMotion() || typeof IntersectionObserver === 'undefined') {
    revealAll(revealTargets);
    for (const element of countTargets) {
      const value = element.dataset.countTo ?? '';
      element.textContent = `${element.dataset.countPrefix ?? ''}${value}${element.dataset.countSuffix ?? ''}`;
    }
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;

        entry.target.classList.add('is-revealed');

        if (entry.target instanceof HTMLElement) {
          entry.target
            .querySelectorAll<HTMLElement>(COUNT_SELECTOR)
            .forEach((counter) => animateCount(counter));

          if (entry.target.matches(COUNT_SELECTOR)) animateCount(entry.target);
        }

        observer.unobserve(entry.target);
      }
    },
    {
      // Fire slightly before the element reaches the viewport edge so the
      // motion feels like it belongs to the scroll rather than reacting to it.
      rootMargin: '0px 0px -10% 0px',
      threshold: 0.05,
    },
  );

  for (const target of revealTargets) observer.observe(target);

  // Counters that are not nested inside a reveal target still need an observer.
  for (const counter of countTargets) {
    if (!counter.closest(REVEAL_SELECTOR)) observer.observe(counter);
  }

  /**
   * Safety net: anything already in view on load must be visible even if the
   * observer callback is delayed by a slow font/asset load.
   */
  window.addEventListener('load', () => {
    for (const target of revealTargets) {
      const rect = target.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        target.classList.add('is-revealed');
      }
    }
  });
}
