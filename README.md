# PELAGIA — The Ocean Discovery Experience

A responsive, classroom-ready Grade 9 ocean-science presentation. The original 12-slide sequence, student presenters, speaker notes, interactive ocean basin map, field guide, water-cycle model, conservation activity and 14-question quiz are preserved. The project is enhanced with a cinematic click-to-load YouTube showcase, improved metadata, a skip link, a custom favicon and ready-to-run scripts.

## Run locally

**Important:** open the site through a local web server, not by double-clicking `index.html` or using `file://`. YouTube embedding and some remote photographs require an internet connection.

Requirements: Node.js 18 or newer. There are no third-party npm dependencies.

- Windows: double-click `start.bat`.
- macOS/Linux: run `./start.command` from Terminal.
- Any platform: run `npm run dev` and open `http://localhost:4173`.
- Alternative one-command server: `npx serve .` (then open the URL printed by the command).
- Python alternative: `python -m http.server 8000` (then open `http://localhost:8000`).

Create a static production build with `npm run build`. The output is written to `dist/`. Preview it with `npm run preview`.

## Video

The opening slide includes a responsive 16:9 YouTube facade for video ID `zBnKgwnn7i4`. It uses the privacy-enhanced `youtube-nocookie.com` embed and loads the iframe only after the Play button is selected. The thumbnail tries `maxresdefault.jpg` and falls back to `hqdefault.jpg`. A separate **Watch on YouTube** link remains visible as a fallback. Playback requires an internet connection and may be affected by browser, network, or YouTube restrictions.

To change the video, edit `VIDEO_ID` in `js/video.js`. The thumbnail and watch link update automatically.

## Controls

- **Next / Prev** or **Right / Left arrows**: change slide.
- **Home / End**: jump to first / last slide.
- **P** or **Presenter mode · P**: show or hide speaker notes.
- **Full screen**: enter or exit browser fullscreen.
- **Overview**: jump directly to a slide.
- **Swipe left / right** on the slide area: navigate on touch screens.
- The presenter notes panel has a **Print all notes** action. The conservation receipt can be printed separately.
- The elapsed timer appears in the header.

## Project structure

```text
index.html                 Main 12-slide presentation and original content
css/video.css              Video facade and accessibility refinements
js/video.js                Click-to-load YouTube integration
enhancements.js            Interactive enhancements, notes, gallery and navigation
assets/pelagia-mark.svg    Favicon
reference-components/      Supplied TechText and CursorGrid source references
scripts/                   Local server and static build scripts
README.md                  Setup and deployment guide
CREDITS.md                 Image and source credits
```

## Deploy free

### Netlify
1. Push the project to a Git repository or upload it to Netlify.
2. Set build command to `npm run build` and publish directory to `dist`.
3. Deploy. The included `netlify.toml` supplies the build settings.

### Vercel
1. Import the repository into Vercel.
2. Choose **Other** as the framework preset.
3. Set build command to `npm run build` and output directory to `dist`.
4. Deploy. The included `vercel.json` provides clean URL settings.

### GitHub Pages
1. Run `npm run build` and publish the `dist/` directory using a GitHub Pages workflow.
2. In repository Settings → Pages, select the publishing workflow or branch.
3. If deploying under a project subpath, ensure the workflow preserves relative paths.

## Editing

- **Slide text and content:** edit the slide definitions and templates in `index.html`.
- **Colours and typography:** edit the CSS variables at the top of the inline stylesheet in `index.html`; additional video styles are in `css/video.css`.
- **Video:** edit `VIDEO_ID` in `js/video.js`.
- **Images:** the enhancement layer currently uses credited NASA/NOAA remote image URLs. Replace them in `enhancements.js` with local files in `assets/` if you need an offline image experience.

## Known limitations

- The YouTube video and remote NASA/NOAA photography require internet access. The video embed cannot be guaranteed to play in every restricted network or browser; the direct YouTube link is provided as a fallback.
- This environment does not provide real-device browser testing or Lighthouse runs. The package has been syntax-checked and its static build verified, but that is not a substitute for full browser QA.
- `sitemap.xml` and `robots.txt` use `example.com` as a deployment placeholder. Replace it with the final public domain before publishing.

## Verification

- JavaScript syntax: checked with Node.js `--check`.
- Production build: `npm run build`.
- ZIP integrity: checked after packaging.
- Browser automation, actual iPhone/iPad hardware testing, Lighthouse scoring, and live YouTube playback: not independently verified in this environment.
