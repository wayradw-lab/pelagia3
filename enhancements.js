/* PELAGIA enhancement layer: vanilla, low-GPU equivalents for the requested visual components. */
(() => {
  'use strict';
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];
  const reduceMotion = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
  const photo = {
    earth: { src: 'https://assets.science.nasa.gov/dynamicimage/assets/science/esd/climate/2023/12/ImageWall5_1920x1200-80.jpg', alt: 'Earth seen from space, with blue oceans, clouds and land', credit: 'NASA Goddard Space Flight Center; image by Reto Stöckli with NASA/USGS data', page: 'https://science.nasa.gov/resource/blue-marble/' },
    vent: { src: 'https://oceanexplorer.noaa.gov/wp-content/uploads/2025/11/at-50-41-casm-venting.jpg', alt: 'Hydrothermal vent chimney releasing a dark plume on the deep seafloor', credit: 'UW/NSF-OOI/WHOI J2-1730; V25, via NOAA Ocean Exploration', page: 'https://oceanexplorer.noaa.gov/multimedia/hydrothermal-activity/' },
    turtle: { src: 'https://oceanexplorer.noaa.gov/wp-content/uploads/2021/01/20210126-hires.jpg', alt: 'Sea turtle swimming toward an underwater exploration vehicle', credit: 'NOAA Ocean Exploration, Galápagos Rift Expedition 2011', page: 'https://oceanexplorer.noaa.gov/multimedia/daily-image-media-20210126/' },
    angler: { src: 'https://oceanexplorer.noaa.gov/wp-content/uploads/2025/04/anglerfish-hires.jpg', alt: 'Deep-sea anglerfish resting on the seafloor', credit: 'NOAA Ocean Exploration, Windows to the Deep 2018', page: 'https://oceanexplorer.noaa.gov/multimedia/okeanos-explorations-ex1907-logs-nov1-media-anglerfish/' },
    coral: { src: 'https://oceanexplorer.noaa.gov/wp-content/uploads/2025/05/highway-hires.jpg', alt: 'A dense deep-sea coral habitat lit by an exploration vehicle', credit: 'NOAA Ocean Exploration, Windows to the Deep 2019', page: 'https://oceanexplorer.noaa.gov/multimedia/okeanos-explorations-ex2107-features-plan-media-highway/' },
    octopus: { src: 'https://oceanexplorer.noaa.gov/wp-content/uploads/2025/08/dive11-octopus.jpg', alt: 'Close view of an orange octopus on the seafloor', credit: 'NOAA Ocean Exploration, 2025 Beyond the Blue', page: 'https://oceanexplorer.noaa.gov/multimedia/octopus/' },
    jelly: { src: 'https://oceanexplorer.noaa.gov/wp-content/uploads/2026/02/jelly.jpg', alt: 'Small jellyfish drifting in dark water among suspended particles', credit: 'Deployable Artificial Intelligence for Exploration and Discovery in the Deep Sea / MBARI, via NOAA Ocean Exploration', page: 'https://oceanexplorer.noaa.gov/multimedia/jellyfish-4/' },
    squid: { src: 'https://oceanexplorer.noaa.gov/wp-content/uploads/2025/12/ex2206-squid.jpg', alt: 'Squid suspended in deep blue water', credit: 'NOAA Ocean Exploration, Voyage to the Ridge 2022', page: 'https://oceanexplorer.noaa.gov/multimedia/squid-4/' },
    reef: { src: 'https://oceanexplorer.noaa.gov/wp-content/uploads/2026/02/mesophotic-corals.jpg', alt: 'Coral reef habitat with small reef fish', credit: 'Ocean Exploration Trust, via NOAA Ocean Exploration', page: 'https://oceanexplorer.noaa.gov/multimedia/mesophotic-corals/' },
    deepcoral: { src: 'https://oceanexplorer.noaa.gov/wp-content/uploads/2025/09/mdbc-2025-corals.jpg', alt: 'Deep-sea coral with associated marine life', credit: 'NOAA and Oceaneering International, Inc.', page: 'https://oceanexplorer.noaa.gov/multimedia/deep-sea-coral/' }
  };
  const notes = [
    { say: ['Hello everyone. Our presentation is called PELAGIA, and it is about the ocean and the water cycle.', 'The ocean is more than a huge body of water: it affects weather, climate, food webs and human life.', 'We will travel from the surface into the deep sea, meet some unusual animals, and follow water as it moves around Earth.', 'We will finish by connecting the ideas and testing what we learned together.'], time: '0:40 · running total 0:40', cue: 'Press Begin presentation, then use Next to move through the deck.', handoff: 'First, let’s look at just how much of our planet is ocean.', recovery: 'This presentation follows the ocean, its life, the water cycle and conservation.' },
    { say: ['Earth is often called the blue planet because oceans cover about 71 percent of its surface.', 'About 97 percent of Earth’s water is salty ocean water, so only a small fraction is fresh water.', 'We name five ocean basins, but they are connected parts of one global ocean.', 'Ocean water carries heat and nutrients around the planet, linking distant places.'], time: '0:55 · running total 1:35', cue: 'Select each basin button or map hotspot and read one key fact.', handoff: 'Now let’s move downward and see how conditions change with depth.', recovery: 'Remember: one connected ocean, commonly described through five basins.' },
    { say: ['Sunlight does not reach every part of the ocean equally.', 'The sunlight zone supports photosynthesis, while the twilight zone receives only faint light.', 'Below that, the midnight and abyssal zones are dark, cold and under high pressure.', 'The hadal zone includes the deepest ocean trenches, where specially adapted animals can survive.', 'These depth boundaries are useful guides, not exact walls everywhere.'], time: '1:00 · running total 2:35', cue: 'Press Descend or select a depth zone to reveal its conditions.', handoff: 'Different conditions create different challenges, and marine animals have remarkable adaptations.', recovery: 'As depth increases, light falls and pressure rises.' },
    { say: ['Ocean animals have adaptations that help them survive in their habitats.', 'Sea turtles use flippers for swimming, while dolphins use sound to help locate prey.', 'Octopuses can change colour and texture, and many deep-sea animals make their own light.', 'A species’ habitat and diet also affect its role in the food web.', 'These examples show how life is connected to the conditions around it.'], time: '1:05 · running total 3:40', cue: 'Open an animal card or gallery photo; share its adaptation and ecological role.', handoff: 'Animals live in the ocean, but water itself is always moving between ocean, air and land.', recovery: 'Pick one animal and explain how one adaptation helps it survive.' },
    { say: ['The water cycle describes how water moves between the surface and the atmosphere.', 'Sunlight provides energy for evaporation, and plants add water vapour through transpiration.', 'As moist air cools, water vapour condenses into tiny droplets or ice crystals that form clouds.', 'Water returns as precipitation, then may run over land, soak into soil or enter groundwater.', 'There is not one fixed route: water can follow many pathways before reaching the ocean again.'], time: '1:10 · running total 4:50', cue: 'Use the stage controls and Play cycle; pause on a stage to explain it.', handoff: 'Water also moves within the ocean itself, carrying heat and nutrients.', recovery: 'Evaporation, condensation, precipitation, runoff and infiltration are key stages.' },
    { say: ['Ocean currents are large-scale movements of seawater.', 'Wind drives many surface currents, and Earth’s rotation helps bend their paths.', 'Differences in temperature and salinity change water density and help drive deep circulation.', 'Currents move heat, oxygen and nutrients, affecting weather and marine ecosystems.', 'They are influenced by several factors working together, not by just one cause.'], time: '0:55 · running total 5:45', cue: 'Select wind, density or rotation to reveal how each factor contributes.', handoff: 'Scientists use these ocean processes to understand discoveries that were once hidden from view.', recovery: 'Surface currents are strongly affected by wind; deep circulation is linked to density.' },
    { say: ['The ocean still contains places that are difficult to reach and study.', 'Hydrothermal vents release hot, mineral-rich water from the seafloor and support communities that do not depend directly on sunlight for their energy source.', 'Deep-sea cameras have revealed animals and habitats that people rarely see.', 'Phytoplankton, although tiny, photosynthesize and support many ocean food webs.', 'Each discovery adds to our understanding of how life survives and how the planet works.'], time: '0:55 · running total 6:40', cue: 'Choose a discovery card to read its date, finding and significance.', handoff: 'Discovery also reminds us that the ocean needs care and protection.', recovery: 'Hydrothermal vents show that deep-sea ecosystems can use chemical energy.' },
    { say: ['The ocean faces several pressures, including plastic pollution, overfishing, habitat damage and warming.', 'These pressures can affect animals, food webs and the communities that depend on the sea.', 'There is no single action that fixes every problem, but many practical choices can help.', 'The simulator is a simplified classroom model to compare choices, not a scientific prediction.', 'The most useful approach is to reduce harm consistently and support wider solutions.'], time: '0:55 · running total 7:35', cue: 'Toggle the actions and watch the illustrative ocean-health meter change.', handoff: 'The next diagram brings together the ocean, the water cycle, climate, life and people.', recovery: 'Several pressures act together, so solutions also need to work together.' },
    { say: ['The ocean is linked to the atmosphere through evaporation, clouds and precipitation.', 'Currents move heat and nutrients, and marine life depends on the habitats those processes help shape.', 'People are part of the same system: we rely on ocean food, transport, climate regulation and livelihoods.', 'A change in one part can affect another, sometimes far away.', 'Thinking in connections helps us understand why ocean protection matters.'], time: '0:45 · running total 8:20', cue: 'Tap a diagram node to highlight the connection and revisit a related slide.', handoff: 'Before we finish, let’s look at the sources behind our scientific facts.', recovery: 'Water, energy, climate, life and people are connected.' },
    { say: ['We used science resources from NASA, NOAA and Smithsonian Ocean to support the main ideas.', 'The links here lead to topic-specific pages rather than just organization homepages.', 'Some values, such as the percentage of Earth covered by ocean, are rounded for a school presentation.', 'Photo credits identify the source page and the credited organization or photographer.', 'If you want to learn more, these pages are a good starting point.'], time: '0:35 · running total 8:55', cue: 'Open a source link if the teacher asks where a fact came from.', handoff: 'Now we will introduce the six students who prepared the expedition.', recovery: 'Our main references include NASA Earth imagery, NOAA ocean science and Smithsonian Ocean.' },
    { say: ['We worked together to explore the ocean and explain why it matters.', 'Each person presented a different part, from the blue planet and depth zones to the water cycle and conservation.', 'The sections connect to one another, so the whole presentation tells one story.', 'Thank you for listening and taking part in the interactions.', 'Now we can check our understanding with a short class quiz.'], time: '0:35 · running total 9:30', cue: 'Introduce the team, then press Start the quiz.', handoff: 'Let’s see what we remember from our ocean expedition.', recovery: 'Name the six presenters and the topics they covered.' },
    { say: ['Welcome to Deep Sea Discovery, our final review game.', 'There are fourteen questions about ocean facts, marine life, the water cycle, currents and conservation.', 'The class can vote by raising hands, and the operator selects the answer and confirms it.', 'After each choice, read the explanation so the game is also a chance to learn.', 'At the end, we will see the score and can replay the quiz or return to any slide.'], time: '1:30 · running total 11:00', cue: 'Start the quiz, select an answer, confirm it and read the feedback.', handoff: 'Thank you for exploring PELAGIA with us. Let’s take one small action to protect our blue planet.', recovery: 'Read each question aloud, let the class vote, then confirm and discuss the explanation.' }
  ];
  const gallery = [
    ['Sea turtle','Surface & coastal waters','Flippers help it travel through the water.',photo.turtle],
    ['Anglerfish','Deep sea','A lure can attract prey in low-light habitats.',photo.angler],
    ['Octopus','Seafloor habitats','Camouflage helps it blend into complex surroundings.',photo.octopus],
    ['Deep-sea squid','Open water','Squid are active predators in the water column.',photo.squid],
    ['Jellyfish','Open water','Jellies drift and pulse through the water column.',photo.jelly],
    ['Deep-sea coral','Deep reef','Corals provide structure and shelter for other animals.',photo.deepcoral],
    ['Coral habitat','Seamounts & reefs','Reef structures create living space for many species.',photo.coral],
    ['Hydrothermal vent','Deep seafloor','Chemical energy supports communities around vents.',photo.vent],
    ['Blue planet','Earth from orbit','Satellite observations reveal ocean colour and global patterns.',photo.earth],
    ['Ocean explorer','Scientific observation','Remote vehicles help scientists study places people cannot easily visit.',photo.angler]
  ];
  const notesHtml = n => `<h2 class="notes-heading">Presenter notes · ${String(n+1).padStart(2,'0')} / 12</h2><p class="notes-kicker">WHAT TO SAY</p><ol>${notes[n].say.map(s=>`<li>${s}</li>`).join('')}</ol><p><b>Timing:</b> ${notes[n].time}</p><p><b>Interaction cue:</b> ${notes[n].cue}</p><p><b>Handoff:</b> ${notes[n].handoff}</p><p><b>If you forget:</b> ${notes[n].recovery}</p><div class="row"><button id="print-notes" type="button">Print all notes</button><button id="hide-notes" type="button">Hide notes</button></div>`;
  function makePhoto(item, cls='slide-photo') {
    const fig = document.createElement('figure'); fig.className = cls; fig.dataset.photo = item.page;
    const img = document.createElement('img'); img.src = item.src; img.alt = item.alt; img.loading = 'lazy'; img.decoding = 'async'; img.width = 1200; img.height = 700;
    img.addEventListener('error', () => { fig.classList.add('photo-unavailable'); img.remove(); const label = document.createElement('span'); label.className = 'photo-fallback-label'; label.textContent = 'Ocean imagery is unavailable offline'; fig.append(label); }, { once: true });
    const cap = document.createElement('figcaption'); cap.innerHTML = `<a href="${item.page}" target="_blank" rel="noopener noreferrer">Image source ↗</a><span>${item.credit}</span>`;
    fig.append(img, cap); return fig;
  }
  function injectPhotos() {
    const bySlide = {0:photo.reef,1:photo.earth,2:photo.squid,3:photo.turtle,4:photo.jelly,5:photo.coral,6:photo.vent,7:photo.reef,8:photo.octopus,9:photo.deepcoral,10:photo.turtle};
    Object.entries(bySlide).forEach(([index,item]) => {
      const slide = $('#s'+index); if (!slide || slide.querySelector('.slide-photo')) return;
      const fig = makePhoto(item, index==='0' ? 'slide-photo hero-photo' : 'slide-photo');
      if(index==='0'){ const im=$('img',fig); if(im){im.loading='eager'; im.fetchPriority='high';} }
      const title = $('h2, h1',slide); const by = $('.by',slide);
      if (index==='0') slide.querySelector('.hero')?.prepend(fig);
      else if (by) by.insertAdjacentElement('afterend',fig);
      else if (title) title.insertAdjacentElement('afterend',fig);
      else slide.prepend(fig);
    });
    const hero = $('#s0 .hero'); if (hero) { hero.classList.add('hero-enhanced'); const h1 = $('h1',hero); if (h1) { h1.dataset.techtext = 'true'; h1.setAttribute('aria-label','PELAGIA'); } }
  }
  function injectBasinMap() {
    const slide = $('#s1'); if (!slide || $('#basin-map')) return;
    const map = document.createElement('section'); map.id='basin-map'; map.className='basin-map card-stack-demo'; map.setAttribute('aria-label','Interactive schematic map of the five ocean basins');
    map.innerHTML = `<div class="map-copy"><p class="eyebrow">ONE CONNECTED OCEAN</p><h3>Five basins. One blue planet.</h3><p>Choose a basin on the schematic map or use the accessible buttons below it.</p><div id="map-basin-detail" class="map-detail" aria-live="polite">Select a basin to explore its place in the global ocean.</div><div class="atlas-flip"><button id="atlas-flip-toggle" type="button" aria-pressed="false">Open the ocean atlas ↻</button><div class="atlas-card" id="atlas-card"><div class="atlas-face"><strong>Field journal · 01</strong><span>Five named basins, one connected ocean.</span></div><div class="atlas-face atlas-back"><strong>Look for the links</strong><span>Heat, currents, nutrients and marine life move between basins.</span></div></div></div></div><div class="ocean-map-wrap"><div class="cursor-grid" aria-hidden="true"></div><svg class="world-map" viewBox="0 0 720 360" role="img" aria-label="Schematic world map with five labelled ocean basins; not to scale"><defs><linearGradient id="seaGrad" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stop-color="#0d5870"/><stop offset="1" stop-color="#061521"/></linearGradient></defs><rect width="720" height="360" rx="18" fill="url(#seaGrad)"/><g fill="#8ab6ad" stroke="#b8e5de" stroke-width="1.2" opacity=".82"><path d="M85 73l42-25 46 9 25 22-14 28-27 10-14 34-30 4-17-26-28-16zM166 159l29 10 23 39-10 36-17 36-21-21-8-44-17-25zM280 71l29-13 42 7 17 18-21 20-31-3-12 16-20-13zM327 121l36 3 31 27 13 41-20 44-27 26-17-39-4-34-22-28zM405 71l36-20 42 11 25-9 41 17 21 22-11 21-39-5-23 20-26-12-23 14-26-24-27 2-18-17zM478 161l38-5 31 18 17 30-28 22-26 39-24-19-10-39zM575 267l25-7 23 15-7 17-24 6-21-12z"/></g><g fill="#45c6c0" stroke="#b8e5de" stroke-width="1.4"><circle cx="150" cy="186" r="15"/><circle cx="320" cy="170" r="15"/><circle cx="470" cy="224" r="15"/><circle cx="390" cy="316" r="15"/><circle cx="510" cy="62" r="15"/></g><g fill="#03111b" font-size="11" font-weight="800" text-anchor="middle"><text x="150" y="190">P</text><text x="320" y="174">A</text><text x="470" y="228">I</text><text x="390" y="320">S</text><text x="510" y="66">Ar</text></g></svg><div class="basin-hotspots"><button data-basin="Pacific">Pacific</button><button data-basin="Atlantic">Atlantic</button><button data-basin="Indian">Indian</button><button data-basin="Southern">Southern</button><button data-basin="Arctic">Arctic</button></div><p class="map-note">Schematic illustration · not a navigational map</p></div></section>`;
    const existing = $('#oc',slide); if (existing) existing.insertAdjacentElement('beforebegin',map); else slide.append(map);
    const descriptions = {
      Pacific:'The largest ocean basin; it contains the Mariana Trench, the deepest known part of the ocean.',
      Atlantic:'The Atlantic separates the Americas from Europe and Africa; currents such as the Gulf Stream transport heat.',
      Indian:'The Indian Ocean is strongly influenced by seasonal monsoon winds and currents.',
      Southern:'The Southern Ocean surrounds Antarctica; the Antarctic Circumpolar Current links the major ocean basins.',
      Arctic:'The Arctic Ocean is the smallest ocean basin and is strongly affected by seasonal sea ice.'
    };
    $('#atlas-flip-toggle',map)?.addEventListener('click',e=>{const card=$('#atlas-card',map);const flipped=card.classList.toggle('is-flipped');e.currentTarget.setAttribute('aria-pressed',String(flipped));e.currentTarget.textContent=flipped?'Close the ocean atlas ↻':'Open the ocean atlas ↻';});
    $$('.basin-hotspots button',map).forEach(btn => btn.addEventListener('click',()=>{
      $$('.basin-hotspots button',map).forEach(b=>b.classList.toggle('on',b===btn));
      $('#map-basin-detail').innerHTML=`<strong>${btn.dataset.basin} Ocean</strong><p>${descriptions[btn.dataset.basin]}</p>`;
      const old = $$('#oc button',slide).find(b=>b.textContent.trim()===btn.dataset.basin); if(old) old.click();
    }));
  }
  function injectGallery() {
    const slide=$('#s3'); if(!slide || $('#ocean-gallery')) return;
    const section=document.createElement('section'); section.id='ocean-gallery'; section.className='gallery-block';
    section.innerHTML=`<div class="section-heading"><p class="eyebrow">FIELD GUIDE</p><h3>Meet life in the blue</h3><p>Choose a photo to open its field note. Swipe or scroll sideways to explore.</p></div><div class="photo-carousel" aria-label="Ocean photo gallery">${gallery.map((g,i)=>`<button class="photo-card" data-gallery="${i}" aria-label="Open field note: ${g[0]}"><span class="photo-card-image"><img src="${g[3].src}" alt="${g[3].alt}" loading="lazy" decoding="async" width="600" height="420"></span><span class="photo-card-copy"><small>FIELD NOTE ${String(i+1).padStart(2,'0')}</small><strong>${g[0]}</strong><span>${g[1]}</span></span></button>`).join('')}</div>`;
    const grid=$('.grid',slide); if(grid) grid.insertAdjacentElement('beforebegin',section); else slide.append(section);
    $$('.photo-card',section).forEach(btn=>btn.addEventListener('click',()=>{
      const g=gallery[+btn.dataset.gallery], d=$('#dg');
      d.innerHTML=`<div class="field-modal"><img src="${g[3].src}" alt="${g[3].alt}" width="900" height="600"><p class="eyebrow">FIELD NOTE ${String(+btn.dataset.gallery+1).padStart(2,'0')}</p><h2>${g[0]}</h2><p class="modal-habitat">${g[1]}</p><p>${g[2]}</p><p class="credit-line">Image credit: ${g[3].credit}</p><div class="row"><a class="b" href="${g[3].page}" target="_blank" rel="noopener noreferrer">View source page ↗</a><button id="gallery-close">Close</button></div></div>`;
      d.showModal(); $('#gallery-close').onclick=()=>d.close();
    }));
  }
  function injectTimeline() {
    const slide=$('#s6'); if(!slide || $('#discovery-timeline')) return;
    const section=document.createElement('section'); section.id='discovery-timeline'; section.className='discovery-timeline';
    section.innerHTML=`<div class="section-heading"><p class="eyebrow">FROM THE FIELD</p><h3>What exploration reveals</h3><p>Each mission adds a piece to the ocean story.</p></div><div class="timeline-grid"><article class="timeline-card"><img src="${photo.vent.src}" alt="Hydrothermal vent on the deep seafloor" loading="lazy" width="800" height="450"><p class="eyebrow">1977</p><h4>Hydrothermal vents</h4><p>Scientists exploring near the Galápagos Rift found communities living around hot vents, expanding ideas about deep-sea ecosystems.</p><a href="https://oceanexplorer.noaa.gov/education/hydrothermal-vents-volcanoes/" target="_blank" rel="noopener noreferrer">Why vents matter ↗</a></article><article class="timeline-card"><img src="${photo.angler.src}" alt="Deep-sea fish observed by a remotely operated vehicle" loading="lazy" width="800" height="450"><p class="eyebrow">Ongoing</p><h4>Deep-sea observations</h4><p>Remotely operated vehicles let scientists document animals and habitats that are hard to reach directly.</p><a href="https://oceanexplorer.noaa.gov/multimedia/" target="_blank" rel="noopener noreferrer">Explore NOAA images ↗</a></article><article class="timeline-card"><img src="${photo.coral.src}" alt="Deep-sea coral community" loading="lazy" width="800" height="450"><p class="eyebrow">Ongoing</p><h4>Hidden habitats</h4><p>Mapping and imaging reveal coral and sponge communities that provide structure and shelter for marine life.</p><a href="https://oceanexplorer.noaa.gov/multimedia/okeanos-explorations-ex2107-features-plan-media-highway/" target="_blank" rel="noopener noreferrer">View the coral discovery ↗</a></article></div>`;
    const heading=$('h2',slide); if(heading) { let target=heading; while(target.parentElement && target.parentElement!==slide && target.parentElement.classList.contains('g')) target=target.parentElement; target.insertAdjacentElement('afterend',section); } else slide.append(section);
  }
  function injectConservationMeter() {
    const slide=$('#s7'); if(!slide || $('#impact-simulator')) return;
    const box=document.createElement('section'); box.id='impact-simulator'; box.className='impact-simulator g';
    box.innerHTML=`<div><p class="eyebrow">CLASSROOM SCENARIO</p><h3>Your ocean impact</h3><p>This meter is an illustrative model for comparing choices. It is not a measured environmental score or a scientific prediction.</p><div class="health-meter" role="progressbar" aria-label="Illustrative ocean health meter" aria-valuemin="0" aria-valuemax="100" aria-valuenow="40"><span id="health-meter-fill"></span></div><p id="health-meter-label" aria-live="polite">Starting point · choose actions above.</p></div><div class="guardian" id="impact-receipt"><svg id="g-badge" viewBox="0 0 120 120" role="img" aria-label="Ocean Guardian badge"><defs><linearGradient id="gb" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#b8e5de"/><stop offset="1" stop-color="#126782"/></linearGradient></defs><path d="M60 6l46 18v36c0 28-20 48-46 56C34 108 14 88 14 60V24z" fill="url(#gb)" stroke="#fff" stroke-opacity=".6" stroke-width="2"/><path d="M28 64q8-10 16 0t16 0 16 0 16 0" fill="none" stroke="#04111d" stroke-width="5" stroke-linecap="round"/><path d="M34 80q8-8 13 0t13 0 13 0 13 0" fill="none" stroke="#04111d" stroke-opacity=".5" stroke-width="4" stroke-linecap="round"/><text id="g-n" x="60" y="48" text-anchor="middle" font-size="26" font-weight="700" fill="#04111d">0</text></svg><div><p class="rk">PELAGIA · OCEAN GUARDIAN</p><h4 id="g-rank">Tide Watcher</h4><p id="receipt-tip">Choose one realistic action and repeat it consistently.</p><p style="font-size:.8rem;opacity:.8"><span id="receipt-count">0 / 4</span> actions · scenario score <span id="receipt-score">40 / 100</span></p><button id="print-receipt" type="button">Save my Guardian card</button></div></div>`;
    const target=$('#hd',slide); if(target) target.insertAdjacentElement('afterend',box); else slide.append(box);
    const update=()=>{
      const buttons=$$('#hl button',slide), n=buttons.filter(b=>b.getAttribute('aria-pressed')==='true').length, score=Math.min(100,40+n*15), fill=$('#health-meter-fill'), meter=$('.health-meter',box);
      if(fill) fill.style.width=score+'%'; if(meter) meter.setAttribute('aria-valuenow',score);
      $('#health-meter-label').textContent=['Starting point','One helpful choice','Two choices selected','Three choices selected','All four choices selected'][Math.min(n,4)]+' · illustrative score '+score+'/100';
      $('#receipt-count').textContent=n+' / '+buttons.length; $('#receipt-score').textContent=score+' / 100';
      const tips=['Tip: choose one realistic action and repeat it consistently.','Tip: use a reusable item when practical.','Tip: sort and dispose of waste responsibly.','Tip: support habitat protection and responsible seafood choices.','Tip: keep these habits going and encourage others to join.'];
      $('#receipt-tip').textContent=tips[Math.min(n,4)].replace('Tip: ','');$('#g-n').textContent=n;$('#g-rank').textContent=['Tide Watcher','Wave Starter','Reef Defender','Ocean Guardian','Deep-Sea Champion'][Math.min(n,4)];
    };
    $$('#hl button',slide).forEach(b=>b.addEventListener('click',()=>setTimeout(update,0))); update();
    $('#print-receipt').addEventListener('click',()=>{const c=document.createElement('canvas');c.width=900;c.height=520;const g=c.getContext('2d'),gr=g.createLinearGradient(0,0,900,520);gr.addColorStop(0,'#0c3a52');gr.addColorStop(1,'#04111d');g.fillStyle=gr;g.fillRect(0,0,900,520);g.strokeStyle='#b8e5de';g.lineWidth=4;g.strokeRect(24,24,852,472);g.fillStyle='#45c6c0';g.font='700 22px sans-serif';g.fillText('PELAGIA · OCEAN GUARDIAN CARD',64,90);g.fillStyle='#f2f7f7';g.font='72px Georgia,serif';g.fillText($('#g-rank').textContent,64,200);g.font='26px sans-serif';g.fillText($('#receipt-count').textContent+' actions chosen · scenario score '+$('#receipt-score').textContent,64,270);g.fillStyle='#b9cdd5';g.font='italic 24px Georgia,serif';g.fillText('Every drop has a story. Every ocean connects us.',64,420);const a=document.createElement('a');a.download='pelagia-guardian-card.png';a.href=c.toDataURL('image/png');a.click();});
  }
  function injectConnectionDiagram() {
    const slide=$('#s8'); if(!slide || $('#connection-diagram')) return;
    const wrap=document.createElement('section'); wrap.id='connection-diagram'; wrap.className='connection-diagram';
    wrap.innerHTML=`<div class="section-heading"><p class="eyebrow">SYSTEMS THINKING</p><h3>Everything is connected</h3><p>Choose a node to see the link and jump back to that part of the presentation.</p></div><div class="connection-layout"><svg viewBox="0 0 700 340" aria-hidden="true"><path d="M350 170L150 70M350 170L550 70M350 170L150 270M350 170L550 270"/><path d="M150 70L550 70M150 270L550 270"/></svg><div class="connection-nodes"><button data-node="1"><span>01</span><strong>Ocean basins</strong><small>Water connects places</small></button><button data-node="4"><span>02</span><strong>Water cycle</strong><small>Water moves through air and land</small></button><button data-node="5"><span>03</span><strong>Currents</strong><small>Heat and nutrients travel</small></button><button data-node="3"><span>04</span><strong>Marine life</strong><small>Habitats support food webs</small></button><button data-node="7"><span>05</span><strong>People & climate</strong><small>Choices affect ecosystems</small></button></div><p id="connection-explanation" aria-live="polite">Select a node to explore one connection.</p></div>`;
    const target=$('h2',slide); if(target) target.insertAdjacentElement('afterend',wrap); else slide.append(wrap);
    const expl={1:'The five named basins are connected as one global ocean.',4:'Evaporation, clouds, precipitation and runoff link ocean, land and atmosphere.',5:'Currents redistribute heat, oxygen and nutrients through the ocean.',3:'Marine organisms depend on habitats, food webs and changing ocean conditions.',7:'Human choices and climate pressures can change the health of marine ecosystems.'};
    $$('.connection-nodes button',wrap).forEach(b=>b.addEventListener('click',()=>{ $$('.connection-nodes button',wrap).forEach(x=>x.classList.toggle('on',x===b)); $('#connection-explanation').textContent=expl[b.dataset.node]; b.setAttribute('aria-pressed','true'); $$('.connection-nodes button',wrap).filter(x=>x!==b).forEach(x=>x.setAttribute('aria-pressed','false')); }));
  }
  function replaceSourceLinks() {
    const slide=$('#s9'); if(!slide || $('#verified-sources')) return;
    const box=document.createElement('section'); box.id='verified-sources'; box.className='verified-sources g';
    const refs=[
      ['NASA · Blue Marble Earth imagery','https://science.nasa.gov/resource/blue-marble/','Earth imagery and satellite observations.'],
      ['NOAA · What causes ocean currents?','https://oceanexplorer.noaa.gov/ocean-fact/currents/','Wind, density, rotation and other drivers of currents.'],
      ['NOAA · Hydrothermal vents and volcanoes','https://oceanexplorer.noaa.gov/education/hydrothermal-vents-volcanoes/','How vents form and how chemosynthesis supports communities.'],
      ['Smithsonian Ocean · A look at life in the deep sea','https://ocean.si.edu/ocean-life/invertebrates/look-life-deep-sea','Deep-sea habitats and animal adaptations.'],
      ['USGS · The water cycle','https://www.usgs.gov/special-topics/water-science-school/science/water-cycle','Evaporation, condensation, precipitation and groundwater.'],
      ['NOAA · Ocean exploration multimedia','https://oceanexplorer.noaa.gov/multimedia/','Photo records and exploration observations.']
    ];
    box.innerHTML=`<p class="eyebrow">CHECK THE SOURCE</p><h3>Topic-specific science references</h3><div class="source-list">${refs.map(r=>`<a href="${r[1]}" target="_blank" rel="noopener noreferrer"><strong>${r[0]}</strong><span>${r[2]}</span><em>Open source ↗</em></a>`).join('')}</div><p class="source-caveat">Figures are rounded for a school presentation. Image credits and image-page links are listed in CREDITS.md.</p>`;
    const grid=$('.grid',slide); if(grid) grid.insertAdjacentElement('afterend',box); else slide.append(box);
    const old=$$('a',slide).filter(a=>/NOAA|NASA|Smithsonian|USGS/i.test(a.textContent)); old.forEach(a=>{ if(a.href.endsWith('.org')||a.href.endsWith('.gov')) a.remove(); });
    const p=$$('p',slide).find(p=>/Links go to each organization's main site/i.test(p.textContent)); if(p) p.textContent='Links now lead to topic-specific source pages for the facts and imagery used in this presentation.';
  }
  function buildNotesPrint() {
    const panel=$('#notes'); if(!panel) return;
    const print=document.createElement('section'); print.id='all-print-notes'; print.className='all-print-notes';
    print.innerHTML=`<h1>PELAGIA · Presenter notes</h1><p>Estimated presentation time: about 11 minutes, plus class discussion and quiz time.</p>${notes.map((n,i)=>`<article><h2>${i+1}. ${['Introducing PELAGIA','Our Blue Planet','Journey into the Ocean Depths','Marine Life and Survival','The Water Cycle','Ocean Currents and Movement','Amazing Ocean Discoveries','Why the Ocean Needs Our Help','Connecting Everything','Sources and Scientific Credibility','The Six Explorers','Deep Sea Discovery'][i]}</h2><h3>What to say</h3><ol>${n.say.map(s=>`<li>${s}</li>`).join('')}</ol><p><b>Timing:</b> ${n.time}</p><p><b>Interaction cue:</b> ${n.cue}</p><p><b>Handoff:</b> ${n.handoff}</p><p><b>If you forget:</b> ${n.recovery}</p></article>`).join('')}`;
    document.body.append(print);
  }
  function addPresenterControls() {
    const head=$('header'); if(head && !$('#timer')) { const span=document.createElement('span'); span.id='timer'; span.className='timer-pill'; span.setAttribute('aria-label','Elapsed presentation time'); span.textContent='00:00'; const row=$('.row',head); if(row) row.insertAdjacentElement('beforebegin',span); }
    const notesPanel=$('#notes'); if(notesPanel && !notesPanel.dataset.enhanced) { notesPanel.dataset.enhanced='true'; notesPanel.innerHTML=notesHtml(0); }
    const printNotes=()=>{document.body.classList.add('print-notes-mode');window.print();setTimeout(()=>document.body.classList.remove('print-notes-mode'),400);};
    document.addEventListener('click',e=>{
      if(e.target.closest('#print-notes')) printNotes();
      if(e.target.closest('#hide-notes')) { $('#notes')?.classList.remove('on'); $('#nt')?.setAttribute('aria-pressed','false'); }
    });
    const start=Date.now(); setInterval(()=>{const seconds=Math.floor((Date.now()-start)/1000); const el=$('#timer'); if(el) el.textContent=String(Math.floor(seconds/60)).padStart(2,'0')+':'+String(seconds%60).padStart(2,'0');},1000);
    document.addEventListener('keydown',e=>{
      if($('#dg')?.open || /INPUT|TEXTAREA|SELECT/.test(e.target.tagName)) return;
      if(e.key.toLowerCase()==='p') { const panel=$('#notes'); if(panel) { const on=panel.classList.toggle('on'); $('#nt')?.setAttribute('aria-pressed',String(on)); } }
      if(e.key==='Home') { e.preventDefault(); window.go?.(0); }
      if(e.key==='End') { e.preventDefault(); window.go?.(11); }
      if(e.key===' ' && !['BUTTON','A'].includes(e.target.tagName)) { e.preventDefault(); window.go?.((+$('[id="num"]')?.textContent?.split('/')[0]||1)); }
    });
    let startX=0,startY=0;
    const main=$('#m'); main?.addEventListener('touchstart',e=>{const t=e.changedTouches[0];startX=t.clientX;startY=t.clientY;},{passive:true});
    main?.addEventListener('touchend',e=>{const t=e.changedTouches[0],dx=t.clientX-startX,dy=t.clientY-startY;if(Math.abs(dx)>70&&Math.abs(dx)>Math.abs(dy)*1.2){const n=parseInt($('#num')?.textContent||'1',10);window.go?.(Math.max(0,Math.min(11,n-1+(dx<0?1:-1))));}},{passive:true});
  }
  function setCurrentSlide(i) {
    const panel=$('#notes'); if(panel) panel.innerHTML=notesHtml(i);
    const current=$('#s'+i); if(current) current.querySelectorAll('img').forEach(img=>{ if(img.loading==='lazy' && img.getBoundingClientRect().top<window.innerHeight) img.loading='eager'; });
    const active=$('#num'); if(active) active.setAttribute('aria-live','polite');
    const ttl=$('#ttl'); if(ttl) ttl.textContent=({0:'Begin the expedition',1:'Our blue planet',2:'Ocean depth zones',3:'Marine life',4:'Water cycle',5:'Ocean currents',6:'Discoveries',7:'Conservation',8:'Connections',9:'Sources',10:'The team',11:'Quiz'})[i]||'';
    const progress=$('#bar i'); if(progress) progress.style.width=((i+1)/12*100)+'%';
    if(i===11 && !reduceMotion()) document.body.classList.add('quiz-active'); else document.body.classList.remove('quiz-active');
  }
  function hookNavigation() {
    if(typeof window.go!=='function' || window.go.__pelagiaWrapped) return;
    const original=window.go;
    const wrapped=function(i){ original(i); setCurrentSlide(Math.max(0,Math.min(11,Number(i)||0))); };
    wrapped.__pelagiaWrapped=true; window.go=wrapped; setCurrentSlide(0);
    $('#nt')?.addEventListener('click',()=>{const on=$('#notes')?.classList.contains('on');$('#nt')?.setAttribute('aria-pressed',String(!!on));});
  }
  function init() {
    injectPhotos(); injectBasinMap(); injectGallery(); injectTimeline(); injectConservationMeter(); injectConnectionDiagram(); replaceSourceLinks(); buildNotesPrint(); addPresenterControls(); hookNavigation();
    // Small vanilla equivalents for the requested UI/motion components.
    $$('.slide h2, .g, .timeline-card, .photo-card').forEach((el,i)=>{el.classList.add('reveal-ready');el.style.setProperty('--reveal-delay',Math.min(i%5,4)*55+'ms');});
    const heroTitle=$('#s0 h1'); heroTitle?.addEventListener('click',()=>{heroTitle.classList.remove('tech-kick');void heroTitle.offsetWidth;heroTitle.classList.add('tech-kick');});
    const hero=$('#s0 .hero'); if(hero && !$('.dynamic-word',hero)){const w=document.createElement('p');w.className='dynamic-word';w.setAttribute('aria-live','polite');w.textContent='PACIFIC';const h2=$('h2',hero);if(h2)h2.insertAdjacentElement('afterend',w);const words=['PACIFIC','ATLANTIC','INDIAN','SOUTHERN','ARCTIC'];let wi=0;if(!reduceMotion())setInterval(()=>{wi=(wi+1)%words.length;w.textContent=words[wi];},2600);}
    // Highlight existing key vocabulary without replacing the supplied slide text.
    $$('#s1 .stat').forEach(el=>el.classList.add('marker-text'));
    // Graceful image fallback: local gradients and labels remain if an external source is offline.
    const guardImages=root=>$$('img',root).forEach(img=>{if(img.dataset.guarded)return;img.dataset.guarded='true';img.addEventListener('error',()=>{img.style.display='none';img.parentElement?.classList.add('photo-unavailable');if(img.parentElement && !$('.photo-fallback-label',img.parentElement)){const t=document.createElement('span');t.className='photo-fallback-label';t.textContent='Photo needs an internet connection';img.parentElement.append(t);}}, {once:true});});guardImages();
    const water=$('#s4'); if(water) water.classList.add('rain-glass-stage');
    // Add one gentle cursor grid to the basin map without creating a WebGL context.
    const grid=$('.cursor-grid'); if(grid) { grid.addEventListener('pointermove',e=>{const r=grid.getBoundingClientRect();grid.style.setProperty('--mx',(e.clientX-r.left)+'px');grid.style.setProperty('--my',(e.clientY-r.top)+'px');}); grid.addEventListener('pointerleave',()=>{grid.style.setProperty('--mx','-1000px');grid.style.setProperty('--my','-1000px');}); }
    // Reduce work when the tab is hidden; CSS animations are disabled by the global reduced-motion rule.
    document.addEventListener('visibilitychange',()=>document.body.classList.toggle('paused',document.hidden||reduceMotion()));
    window.addEventListener('resize',()=>{if(window.innerWidth<640) document.body.classList.add('compact-layout');else document.body.classList.remove('compact-layout');},{passive:true});
    if(reduceMotion()) document.body.classList.add('reduce-motion');
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init,{once:true}); else init();
})();
