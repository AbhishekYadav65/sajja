/* ==========================================================================
   CONFIG – the numbers you are most likely to want to change.
   (Colours and sizes live in css/tokens.css.)
   ========================================================================== */

const CONFIG = {

  /* The pathway is drawn on an imaginary board of this size.
     All coordinates below use it: x runs 0 -> 1152, y runs 0 -> 648.
     (0,0) is the top-left corner. The board is scaled to the screen. */
  BOARD: { width: 1152, height: 648 },

  /* Points the line passes through, from bottom-left to top-right.
     The script joins them with a smooth curve.
     Add, remove or move points to reshape the path. */
  PATH_POINTS: [
    [-10, 640],   //  0  starts just off the left edge
    [90, 596],    //  1  "Order" stop
    [281, 525],   //  2  stop 1
    [520, 448],   //  3  stop 2
    [585, 385],   //  4
    [650, 310],   //  5
    [715, 240],   //  6
    [850, 190],   //  7  stop 3
    [1010, 128],  //  8  stop 4
    [1170, 88],   //  9  runs off the right edge
  ],

  /* Which path point each stop sits on.
     Keys match data-stop="..." in index.html; values are indexes above. */
  STOPS: {
    order:       1,
    confirmed:   2,
    handcrafted: 3,
    packed:      7,
    delivered:   8,
  },

  /* The parcel that travels along the line */
  PARCEL: {
    DURATION_MS: 9000,  // time for one trip
    START_AT: 0.10,     // 0 = very start of the line, 1 = very end
    END_AT:   0.90,
  },

  /* Screens at or below this width (px) get the stacked mobile layout.
     Keep in sync with the media query in css/mobile.css. */
  MOBILE_MAX_WIDTH: 900,
};
