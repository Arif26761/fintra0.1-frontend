/**
 * Canonical breakpoint table shared by diff.mjs and baseline.mjs.
 *
 * `dir` is appended to every baseline/actual/diff path so the two sets
 * never collide on the same filename:
 *
 *   tests/visual/baseline/faq.png          <- desktop
 *   tests/visual/baseline/mobile/faq.png   <- mobile
 */
export const BREAKPOINTS = {
  desktop: { width: 1440, height: 900, dir: '' },
  mobile: { width: 402, height: 874, dir: 'mobile/' },
};
