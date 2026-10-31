# PELAGIA — Image, fact and software credits

## Image sources used by the website

The website uses remote image URLs from the exact pages below. The captions in the website link back to each source page. Image source pages were opened and checked during preparation; the environment did not allow the files themselves to be downloaded into this ZIP. Image dimensions, compression and offline bundling are therefore still outstanding.

| Image / subject | Credit shown on source page | Source page | Rights note |
|---|---|---|---|
| Blue Marble Earth | NASA Goddard Space Flight Center; image by Reto Stöckli with NASA/USGS data | https://science.nasa.gov/resource/blue-marble/ | NASA imagery is generally reusable under NASA's media guidelines, subject to logo/endorsement restrictions; retain the stated credit. |
| Hydrothermal activity | UW/NSF-OOI/WHOI J2-1730; V25 | https://oceanexplorer.noaa.gov/multimedia/hydrothermal-activity/ | Partner credit appears on the source page. Confirm permission/terms for redistribution before public release. |
| Sea turtle | NOAA Ocean Exploration, Galápagos Rift Expedition 2011 | https://oceanexplorer.noaa.gov/multimedia/daily-image-media-20210126/ | Retain NOAA credit and check the current NOAA image reuse guidance. |
| Anglerfish | NOAA Ocean Exploration, Windows to the Deep 2018 | https://oceanexplorer.noaa.gov/multimedia/okeanos-explorations-ex1907-logs-nov1-media-anglerfish/ | Retain NOAA credit and check the current NOAA image reuse guidance. |
| Deep-sea coral habitat | NOAA Ocean Exploration, Windows to the Deep 2019 | https://oceanexplorer.noaa.gov/multimedia/okeanos-explorations-ex2107-features-plan-media-highway/ | Retain NOAA credit and check the current NOAA image reuse guidance. |
| Octopus | NOAA Ocean Exploration, 2025 Beyond the Blue | https://oceanexplorer.noaa.gov/multimedia/octopus/ | Retain NOAA credit and check the current NOAA image reuse guidance. |
| Jellyfish | Deployable Artificial Intelligence for Exploration and Discovery in the Deep Sea / MBARI | https://oceanexplorer.noaa.gov/multimedia/jellyfish-4/ | Third-party credit appears on the source page. Confirm permission/terms before public redistribution. |
| Squid | NOAA Ocean Exploration, Voyage to the Ridge 2022 | https://oceanexplorer.noaa.gov/multimedia/squid-4/ | Retain NOAA credit and check the current NOAA image reuse guidance. |
| Mesophotic coral reef | Ocean Exploration Trust | https://oceanexplorer.noaa.gov/multimedia/mesophotic-corals/ | Third-party credit appears on the source page. Confirm permission/terms before public redistribution. |
| Deep-sea coral | NOAA / Oceaneering International, Inc. | https://oceanexplorer.noaa.gov/multimedia/deep-sea-coral/ | Partner credit appears on the source page. Confirm permission/terms before public redistribution. |

NOAA's media resources explain that NOAA Ocean Exploration images are public domain where they were collected by NOAA, but the credit line must be retained; third-party partner imagery may have separate rights. See https://oceanexplorer.noaa.gov/media-resources-ex2606/ for NOAA's general media note and confirm rights on each image page.

## Scientific references

- NASA, “Blue marble”: https://science.nasa.gov/resource/blue-marble/
- NOAA Ocean Exploration, “What causes ocean currents?”: https://oceanexplorer.noaa.gov/ocean-fact/currents/
- NOAA Ocean Exploration, “Hydrothermal Vents and Volcanoes”: https://oceanexplorer.noaa.gov/education/hydrothermal-vents-volcanoes/
- Smithsonian Ocean, “A Look at Life in the Deep Sea”: https://ocean.si.edu/ocean-life/invertebrates/look-life-deep-sea
- USGS Water Science School, “Water cycle”: https://www.usgs.gov/special-topics/water-science-school/science/water-cycle
- NOAA Ocean Exploration multimedia library: https://oceanexplorer.noaa.gov/multimedia/

Values such as “about 71% of Earth's surface is ocean” and “about 97% of Earth's water is in the ocean” are retained from the original site as rounded educational figures. They should be rechecked against the source notes before formal publication.

## Fonts and libraries

- System font stacks are used for body copy, with Cormorant Garamond / Georgia as the display-heading fallback stack already present in the original page. No font files are bundled, and no external font CDN is required by this build.
- No third-party JavaScript libraries or npm runtime dependencies are required.
- The two supplied React Bits source text files are retained in `reference-components/TechText-source.txt` and `reference-components/CursorGrid-source.txt`. They are reference material, not runtime dependencies.

## Known outstanding licensing/media work

- Remote images are not bundled locally because image downloads were unavailable in the execution environment.
- This build is not fully offline-tolerant for photography.
- Several images have third-party credits; permissions should be confirmed before redistributing a public deployment. If permission cannot be verified, replace those images with confirmed public-domain alternatives.
