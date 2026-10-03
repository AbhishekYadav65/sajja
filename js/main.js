/* ==========================================================================
   MAIN – draws the pathway, places the stops, moves the parcel, tilts the cards.
   Settings live in js/config.js. This file needs no editing for content changes.
   ========================================================================== */

(() => {
  'use strict';

  const { BOARD, PATH_POINTS, STOPS, PARCEL, MOBILE_MAX_WIDTH } = CONFIG;

  const hero    = document.querySelector('.hero');
  const stops   = hero.querySelectorAll('.stop');
  const parcel  = hero.querySelector('.parcel');
  const trail   = hero.querySelectorAll('.trail path');
  const mainLine = hero.querySelector('.trail__line');

  const isDesktop = () => matchMedia(`(min-width: ${MOBILE_MAX_WIDTH + 1}px)`).matches;
  const prefersReducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;


  /* ---- Pathway ---------------------------------------------------------- */

  /* Turns a list of [x, y] points into a smooth SVG curve (Catmull-Rom
     converted to Bezier segments). */
  function buildSmoothPath(points) {
    let d = `M${points[0]}`;

    for (let i = 0; i < points.length - 1; i++) {
      const before = points[i - 1] || points[i];
      const from   = points[i];
      const to     = points[i + 1];
      const after  = points[i + 2] || to;

      const control1 = [from[0] + (to[0] - before[0]) / 6, from[1] + (to[1] - before[1]) / 6];
      const control2 = [to[0] - (after[0] - from[0]) / 6,  to[1] - (after[1] - from[1]) / 6];

      d += ` C${control1} ${control2} ${to}`;
    }
    return d;
  }

  function drawTrail() {
    const d = buildSmoothPath(PATH_POINTS);
    trail.forEach((path) => path.setAttribute('d', d));
  }


  /* ---- Stops ------------------------------------------------------------ */

  /* Converts board coordinates to a percentage position. */
  const toPercent = ([x, y]) => [(x / BOARD.width) * 100, (y / BOARD.height) * 100];

  function placeStops() {
    stops.forEach((stop) => {
      const pointIndex = STOPS[stop.dataset.stop];
      const [x, y] = toPercent(PATH_POINTS[pointIndex]);
      stop.style.setProperty('--x', `${x}%`);
      stop.style.setProperty('--y', `${y}%`);
    });
  }


  /* ---- Parcel ----------------------------------------------------------- */

  function moveParcelTo(progress) {
    const length = mainLine.getTotalLength();
    const distance = length * (PARCEL.START_AT + (PARCEL.END_AT - PARCEL.START_AT) * progress);
    const point = mainLine.getPointAtLength(distance);
    const [x, y] = toPercent([point.x, point.y]);
    parcel.style.left = `${x}%`;
    parcel.style.top  = `${y}%`;
  }

  function animateParcel() {
    if (prefersReducedMotion) {
      moveParcelTo(0.5);               // park it mid-way, no animation
      return;
    }
    const frame = (time) => {
      if (isDesktop()) moveParcelTo((time / PARCEL.DURATION_MS) % 1);
      requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  }


  /* ---- 3D tilt on mouse move -------------------------------------------- */
  /* Writes --mx / --my (-0.5 to 0.5) on the hero; the cards read them in CSS. */

  function enableTilt() {
    const setTilt = (x, y) => {
      hero.style.setProperty('--mx', x);
      hero.style.setProperty('--my', y);
    };

    hero.addEventListener('pointermove', (event) => {
      if (!isDesktop()) return;
      const box = hero.getBoundingClientRect();
      setTilt(((event.clientX - box.left) / box.width  - 0.5).toFixed(3),
              ((event.clientY - box.top)  / box.height - 0.5).toFixed(3));
    });
    hero.addEventListener('pointerleave', () => setTilt(0, 0));
  }


  /* ---- Start ------------------------------------------------------------ */

  drawTrail();
  placeStops();
  animateParcel();
  enableTilt();
})();
