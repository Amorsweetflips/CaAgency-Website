/**
 * Reading-progress bar driven entirely by CSS scroll-driven animations
 * (animation-timeline: scroll()) — zero JavaScript, runs on the compositor
 * thread. Browsers without support (~Firefox) simply never show the bar:
 * the element stays scaled to 0 via the @supports gate in globals.css.
 *
 * Server component by design: replacing the previous motion/react version
 * removed this element's entire JS cost from the bundle.
 */
export default function ScrollProgress() {
  return <div className="scroll-progress" aria-hidden="true" />
}
