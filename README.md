# Sajja homepage

Open `index.html` in a browser. No build step. Fonts load from Google Fonts (needs internet).

## Where to change things

| I want to…                              | Edit                                              |
|-----------------------------------------|---------------------------------------------------|
| Change colours or fonts                 | `css/tokens.css`                                  |
| Change text, links, step wording        | `index.html`                                      |
| Swap a photo or the logo                | replace the file in `assets/` (keep the name)     |
| Move or resize a photo card             | `css/style.css` section 6 (`--x --y --w --h`)     |
| Move the headline                       | `css/style.css` section 5                         |
| Reshape the pathway / move a stop       | `js/config.js` (`PATH_POINTS`, `STOPS`)           |
| Change parcel speed                     | `js/config.js` (`PARCEL.DURATION_MS`)             |
| Change the phone layout                 | `css/mobile.css`                                  |

## Adding a 5th step
1. Add a point to `PATH_POINTS` and a name to `STOPS` in `js/config.js`.
2. Copy one `<li class="stop" data-stop="...">` block in `index.html` and set `data-stop` to the new name.
