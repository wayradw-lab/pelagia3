# Change log

## 1.0.0 — Ocean presentation refinement

### Kept, no change to core content/order
- Preserved the original 12 slide titles and order.
- Kept the original plain HTML/CSS/JavaScript architecture to minimize migration risk.
- Retained the existing slide content, named presenters, depth-zone facts, water-cycle stages, currents explanations, conservation choices and 14-question quiz.
- Retained existing navigation, overview dialog, fullscreen control, water-cycle controls, depth-zone controls, quiz scoring and quiz review.

### Upgraded
- Refined the shared deep-ocean design tokens, typography, card surfaces, responsive spacing, focus states and motion.
- Added a NASA/NOAA image-led treatment to the slides with source captions and graceful fallback states.
- Added a schematic interactive five-basin map with accessible basin buttons and an ocean-atlas flip card.
- Added a ten-item touch-scrollable ocean field-guide photo carousel with accessible field-note dialogs.
- Added a discovery timeline for deep-sea exploration and hydrothermal vents.
- Added an explicitly labelled illustrative conservation meter and printable impact receipt.
- Added a connected-systems diagram linking basins, water cycle, currents, marine life and people/climate.
- Replaced the generic source panel with topic-specific science links.
- Expanded presenter notes to 4–5 natural sentences per slide with timing, interaction cues, handoffs and recovery cues.
- Added P-key presenter mode, print-all-notes, elapsed timer, Home/End keyboard navigation and swipe navigation.
- Added CSS equivalents of the requested visual component patterns; no WebGL contexts are created by this enhancement layer.
- Added README, CREDITS, changelog, a no-dependency static build script and local preview server.

### Added
- `enhancements.js`
- `scripts/build.mjs`
- `scripts/serve.mjs`
- `package.json`, `netlify.toml`, `_redirects`, `vercel.json`
- `CREDITS.md`, `README.md`, this changelog
- Reference copies of the two uploaded React Bits source texts

### Known limitations / not verified
- The four React Bits source files AnimatedContent, LaserFlow, FlexCarousel and Aurora were not supplied. Visual equivalents were implemented; their original code was not guessed or recreated.
- The image files could not be downloaded into this environment, so image URLs are remote and photographs are not available offline. The site degrades gracefully, but the prompt's local-image requirement is not met.
- Rights/permissions for several partner-credited images require confirmation before public redistribution.
- No real iPhone/iPad, projector or touch-device test was performed.
- Lighthouse scores and actual browser-console behavior were not measured here.

## 1.1.0 — 3D water cycle, image fixes, Guardian card
- Water cycle is now a real WebGL 3D model (Three.js r160, bundled in `vendor/`, works offline): animated ocean waves, sun, clouds, mountain, trees, soil and groundwater cross-section, with a particle flow for each of the six steps. Drag to orbit; it stays synced with the step buttons. Falls back to the original SVG if WebGL is unavailable.
- Photo mapping fixed: the NASA space image no longer appears on the ocean-depth and water-cycle slides (Earth now only on the "Blue Planet" slide).
- "Print receipt" replaced by an Ocean Guardian rank card with badge and a Save-as-PNG button.

## 1.2.0 — Live scenes
- Depth slide: canvas submarine dive with unique visuals, creatures and gauges per zone (no repeated photo).
- Water cycle: labelled 3D parts plus a step caption. Currents: animated world-map flows per factor. Connecting Everything: clickable node web. Team avatar cards. Quiz: descent meter, icons, bubble bursts.

## 1.3.0 — Saltwake motion and type layer (blue and white)
- Thick rounded frame, Goudy Bookletter / Sorts Mill Goudy / Josefin Sans / Open Sans type system, pill buttons with offset shadow.
- Live hand-drawn wave layers on slide 1; the sea rises over every slide change and falls back. Drifting frond-light shade. Ring cursor with click ping.
- Restyled Overview dialog. Referrer policy set to no-referrer to help hot-linked photos load.

## 1.4.0 — Video background and clearer Connecting Everything
- Your animated ocean loop now plays behind every slide (WebM + MP4, compressed to about 0.6 MB each, with a poster image; paused for reduced-motion users).
- Connecting Everything: labelled links ("evaporation & rain", "carry heat around"…), automatic story mode that walks through each link, click any circle to take control; the old confusing line graphic and duplicate cards are hidden.
