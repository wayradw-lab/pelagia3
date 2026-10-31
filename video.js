/* Click-to-load YouTube facade. The iframe is not created until the learner presses Play. */
(() => {
  'use strict';
  const VIDEO_ID = 'zBnKgwnn7i4';
  const VIDEO_URL = `https://www.youtube.com/watch?v=${VIDEO_ID}`;
  const EMBED_URL = `https://www.youtube-nocookie.com/embed/${VIDEO_ID}?rel=0&modestbranding=1&playsinline=1&enablejsapi=1`;
  const addShowcase = () => {
    const hero = document.querySelector('#s0 .hero');
    if (!hero || document.querySelector('#pelagia-video')) return;
    const section = document.createElement('section');
    section.id = 'pelagia-video';
    section.className = 'video-showcase';
    section.setAttribute('aria-labelledby', 'pelagia-video-title');
    section.innerHTML = `
      <p class="video-kicker">A closer look · watch the expedition</p>
      <h3 id="pelagia-video-title">Dive deeper into our blue planet.</h3>
      <p class="video-intro">Watch the film, then begin the interactive classroom journey through ocean life, water and conservation.</p>
      <div class="video-frame" id="pelagia-video-frame">
        <img id="pelagia-video-thumb" src="https://i.ytimg.com/vi/${VIDEO_ID}/maxresdefault.jpg"
          alt="Video thumbnail for the PELAGIA ocean discovery film" loading="lazy"
          onerror="this.onerror=null;this.src='https://i.ytimg.com/vi/${VIDEO_ID}/hqdefault.jpg'">
        <button class="video-play" id="pelagia-video-play" type="button" aria-label="Play the PELAGIA ocean discovery video">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4.8c0-.8.9-1.3 1.6-.9l11 6.7a1.6 1.6 0 0 1 0 2.8l-11 6.7c-.7.4-1.6-.1-1.6-.9V4.8Z" fill="currentColor"/></svg>
        </button>
        <span class="video-status">Press play to load video</span>
      </div>
      <div class="video-caption">
        <span>Privacy-enhanced YouTube player · loads only when selected</span>
        <a href="${VIDEO_URL}" target="_blank" rel="noopener noreferrer">Watch on YouTube ↗</a>
      </div>`;
    hero.insertAdjacentElement('afterend', section);
    const frame = section.querySelector('#pelagia-video-frame');
    const play = section.querySelector('#pelagia-video-play');
    play.addEventListener('click', () => {
      if (frame.classList.contains('is-playing')) return;
      const iframe = document.createElement('iframe');
      iframe.title = 'PELAGIA ocean discovery video';
      iframe.src = EMBED_URL;
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
      iframe.allowFullscreen = true;
      iframe.referrerPolicy = 'strict-origin-when-cross-origin';
      iframe.loading = 'eager';
      iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
      iframe.src += '&autoplay=1';
      frame.replaceChildren(iframe);
      frame.classList.add('is-playing');
    });
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', addShowcase, {once:true});
  else addShowcase();
})();
