// Copyright (c) 2020 Florian Klampfer <https://qwtel.com/>
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

// ⚡️ DANGER ZONE ⚡️
// ================
// 

// The shell cache keeps "landmark" resources, like CSS and JS, web fonts, etc.
// which won't change between content updates.
// 
// 
const SHELL_CACHE = "shell-9.0.4--v7--sw/AlphaBetEcon/";

// A separate assets cache that won't be invalidated when there's a newer version of Hydejack.
// NOTE: Whenever you make changes to any of the files in yor `assets` folder,
//       increase the cache number, otherwise the changes will *never* be visible to returning visitors.
const ASSETS_CACHE = "assets--v7--sw/AlphaBetEcon/";

// The cache for regular content, which will be invalidated every time you make a new build.
const CONTENT_CACHE = "content--2022-07-22T21:38:58+01:00--sw/AlphaBetEcon/";

// A URL search parameter you can add to external assets to cache them in the service worker.
const SW_CACHE_SEARCH_PARAM = "sw-cache";
const NO_CACHE_SEARCH_PARAM = "no-cache";

// The regular expression used to find URLs in webfont style sheets.
const RE_CSS_URL = /url\s*\(['"]?(([^'"\\]|\\.)*)['"]?\)/u;

const ICON_FONT = "/AlphaBetEcon/assets/icomoon/style.css";
const KATEX_FONT = "/AlphaBetEcon/assets/bower_components/katex/dist/katex.min.css";

// 
// 
const GOOGLE_FONTS = "https://fonts.googleapis.com/css?family=Roboto+Slab:700%7CNoto+Sans:400,400i,700,700i&display=swap";
// 

const SHELL_FILES = [
  "/AlphaBetEcon/assets/css/hydejack-9.0.4.css",
  "/AlphaBetEcon/assets/js/search-worker-9.0.4.js",
  "/AlphaBetEcon/assets/js/service-worker.js",
];

const STATIC_FILES = [
  /**/"/AlphaBetEcon/assets/BenitoYoungTalk.pdf",
  /**/"/AlphaBetEcon/assets/BoEDoesIT.pdf",
  /**/"/AlphaBetEcon/assets/Brexit.pdf",
  /**/"/AlphaBetEcon/assets/CVabRmd.pdf",
  /**/"/AlphaBetEcon/assets/Working_in_Finance.pdf",
  /**/"/AlphaBetEcon/assets/benitoYoungIZA.pdf",
  /**/"/AlphaBetEcon/assets/benitoYoungUpdate.pdf",
  /**/"/AlphaBetEcon/assets/cbComms.pdf",
  /**/"/AlphaBetEcon/assets/cv-latex.tex",
  /**/"/AlphaBetEcon/assets/cvAB.pdf",
  /**/"/AlphaBetEcon/assets/cv_ab_sept19.pdf",
  /**/"/AlphaBetEcon/assets/cv_ab_sept19.tex",
  /**/"/AlphaBetEcon/assets/ecbHistory.pdf",
  /**/"/AlphaBetEcon/assets/ecbHistoryv2.pdf",
  /**/"/AlphaBetEcon/assets/img/blog/COLOURlovers.com-Hydejack.png",
  /**/"/AlphaBetEcon/assets/img/blog/Sargent_Sweden_final.pdf",
  /**/"/AlphaBetEcon/assets/img/blog/blog-layout.jpg",
  /**/"/AlphaBetEcon/assets/img/blog/boe.jpg",
  /**/"/AlphaBetEcon/assets/img/blog/brexit.jpeg",
  /**/"/AlphaBetEcon/assets/img/blog/caleb-george-old.jpg",
  /**/"/AlphaBetEcon/assets/img/blog/caleb-george.jpg",
  /**/"/AlphaBetEcon/assets/img/blog/cover-page.jpg",
  /**/"/AlphaBetEcon/assets/img/blog/covid19symptoms.jpg",
  /**/"/AlphaBetEcon/assets/img/blog/dark-mode-ii.jpg",
  /**/"/AlphaBetEcon/assets/img/blog/dark-mode.jpg",
  /**/"/AlphaBetEcon/assets/img/blog/euro2.jpg",
  /**/"/AlphaBetEcon/assets/img/blog/example-content-ii.jpg",
  /**/"/AlphaBetEcon/assets/img/blog/example-content-iii.jpg",
  /**/"/AlphaBetEcon/assets/img/blog/example-content-iii@0,25x.jpg",
  /**/"/AlphaBetEcon/assets/img/blog/example-content-iii@0,5x.jpg",
  /**/"/AlphaBetEcon/assets/img/blog/grid.jpg",
  /**/"/AlphaBetEcon/assets/img/blog/hydejack-8.jpg",
  /**/"/AlphaBetEcon/assets/img/blog/hydejack-8.png",
  /**/"/AlphaBetEcon/assets/img/blog/hydejack-8@0,25x.jpg",
  /**/"/AlphaBetEcon/assets/img/blog/hydejack-8@0,25x.png",
  /**/"/AlphaBetEcon/assets/img/blog/hydejack-8@0,5x.jpg",
  /**/"/AlphaBetEcon/assets/img/blog/hydejack-8@0,5x.png",
  /**/"/AlphaBetEcon/assets/img/blog/hydejack-9-dark.jpg",
  /**/"/AlphaBetEcon/assets/img/blog/hydejack-9-dark@0,25x.jpg",
  /**/"/AlphaBetEcon/assets/img/blog/hydejack-9-dark@0,5x.jpg",
  /**/"/AlphaBetEcon/assets/img/blog/hydejack-9.jpg",
  /**/"/AlphaBetEcon/assets/img/blog/hydejack-9@0,25x.jpg",
  /**/"/AlphaBetEcon/assets/img/blog/hydejack-9@0,5x.jpg",
  /**/"/AlphaBetEcon/assets/img/blog/iimport1.pdf",
  /**/"/AlphaBetEcon/assets/img/blog/import2.pdf",
  /**/"/AlphaBetEcon/assets/img/blog/lazy-images.jpg",
  /**/"/AlphaBetEcon/assets/img/blog/lego_statue.jpg",
  /**/"/AlphaBetEcon/assets/img/blog/louis-hansel.jpg",
  /**/"/AlphaBetEcon/assets/img/blog/louis-hansel@0,25x.jpg",
  /**/"/AlphaBetEcon/assets/img/blog/louis-hansel@0,5x.jpg",
  /**/"/AlphaBetEcon/assets/img/blog/resume.png",
  /**/"/AlphaBetEcon/assets/img/blog/steve-harvey.jpg",
  /**/"/AlphaBetEcon/assets/img/blog/steve-harvey@0,125x.jpg",
  /**/"/AlphaBetEcon/assets/img/blog/steve-harvey@0,25x.jpg",
  /**/"/AlphaBetEcon/assets/img/blog/steve-harvey@0,5x.jpg",
  /**/"/AlphaBetEcon/assets/img/blog/talk.jpg",
  /**/"/AlphaBetEcon/assets/img/blog/talk2.jpg",
  /**/"/AlphaBetEcon/assets/img/blog/togetherCreate.jpg",
  /**/"/AlphaBetEcon/assets/img/blog/w3m.png",
  /**/"/AlphaBetEcon/assets/img/blog/wade-lambert.jpg",
  /**/"/AlphaBetEcon/assets/img/docs/chrome-print.png",
  /**/"/AlphaBetEcon/assets/img/docs/google-fonts.png",
  /**/"/AlphaBetEcon/assets/img/projects/Covid-19-symptoms.jpg",
  /**/"/AlphaBetEcon/assets/img/projects/boe.jpeg",
  /**/"/AlphaBetEcon/assets/img/projects/companies.jpeg",
  /**/"/AlphaBetEcon/assets/img/projects/families.jpeg",
  /**/"/AlphaBetEcon/assets/img/projects/housing.jpeg",
  /**/"/AlphaBetEcon/assets/img/projects/hy-drawer.svg",
  /**/"/AlphaBetEcon/assets/img/projects/hy-img.svg",
  /**/"/AlphaBetEcon/assets/img/projects/hy-push-state.svg",
  /**/"/AlphaBetEcon/assets/img/projects/hydejack-site.jpg",
  /**/"/AlphaBetEcon/assets/img/projects/hydejack-site@0,25x.jpg",
  /**/"/AlphaBetEcon/assets/img/projects/hydejack-site@0,5x.jpg",
  /**/"/AlphaBetEcon/assets/img/projects/jobs.jpeg",
  /**/"/AlphaBetEcon/assets/img/projects/qwtel.jpg",
  /**/"/AlphaBetEcon/assets/img/projects/qwtel@0,25x.jpg",
  /**/"/AlphaBetEcon/assets/img/projects/qwtel@0,5x.jpg",
  /**/"/AlphaBetEcon/assets/jobsMarketCovid.pdf",
  /**/"/AlphaBetEcon/assets/pygmalion.pdf",
  /**/"/AlphaBetEcon/favicon.ico",
  /**/"/AlphaBetEcon/favicon.png",
  /**/"/AlphaBetEcon/google3b5c923c56d5f6be.html",
  /**/"/AlphaBetEcon/licenses/Apache-2.0.md",
  /**/"/AlphaBetEcon/licenses/GPL-3.0.md",
  /**/"/AlphaBetEcon/licenses/MIT.md",
  /**/"/AlphaBetEcon/licenses/PRO.md",
  /**/"/AlphaBetEcon/licenses/README.md",
  /**/"/AlphaBetEcon/licenses/W3C-20150513.md",
  /**/"/AlphaBetEcon/netlify.toml",
  /**/"/AlphaBetEcon/assets/bower.json",
  /**/"/AlphaBetEcon/assets/bower_components/MathJax/.bower.json",
  /**/"/AlphaBetEcon/assets/bower_components/MathJax/LICENSE",
  /**/"/AlphaBetEcon/assets/bower_components/MathJax/bower.json",
  /**/"/AlphaBetEcon/assets/bower_components/MathJax/composer.json",
  /**/"/AlphaBetEcon/assets/bower_components/MathJax/es5/a11y/assistive-mml.js",
  /**/"/AlphaBetEcon/assets/bower_components/MathJax/es5/a11y/complexity.js",
  /**/"/AlphaBetEcon/assets/bower_components/MathJax/es5/a11y/explorer.js",
  /**/"/AlphaBetEcon/assets/bower_components/MathJax/es5/a11y/semantic-enrich.js",
  /**/"/AlphaBetEcon/assets/bower_components/MathJax/es5/adaptors/liteDOM.js",
  /**/"/AlphaBetEcon/assets/bower_components/MathJax/es5/core.js",
  /**/"/AlphaBetEcon/assets/bower_components/MathJax/es5/input/asciimath.js",
  /**/"/AlphaBetEcon/assets/bower_components/MathJax/es5/input/mml/entities.js",
  /**/"/AlphaBetEcon/assets/bower_components/MathJax/es5/input/mml.js",
  /**/"/AlphaBetEcon/assets/bower_components/MathJax/es5/input/tex/extensions/action.js",
  /**/"/AlphaBetEcon/assets/bower_components/MathJax/es5/input/tex/extensions/all-packages.js",
  /**/"/AlphaBetEcon/assets/bower_components/MathJax/es5/input/tex/extensions/ams.js",
  /**/"/AlphaBetEcon/assets/bower_components/MathJax/es5/input/tex/extensions/amscd.js",
  /**/"/AlphaBetEcon/assets/bower_components/MathJax/es5/input/tex/extensions/autoload.js",
  /**/"/AlphaBetEcon/assets/bower_components/MathJax/es5/input/tex/extensions/bbox.js",
  /**/"/AlphaBetEcon/assets/bower_components/MathJax/es5/input/tex/extensions/boldsymbol.js",
  /**/"/AlphaBetEcon/assets/bower_components/MathJax/es5/input/tex/extensions/braket.js",
  /**/"/AlphaBetEcon/assets/bower_components/MathJax/es5/input/tex/extensions/bussproofs.js",
  /**/"/AlphaBetEcon/assets/bower_components/MathJax/es5/input/tex/extensions/cancel.js",
  /**/"/AlphaBetEcon/assets/bower_components/MathJax/es5/input/tex/extensions/color.js",
  /**/"/AlphaBetEcon/assets/bower_components/MathJax/es5/input/tex/extensions/colorV2.js",
  /**/"/AlphaBetEcon/assets/bower_components/MathJax/es5/input/tex/extensions/configMacros.js",
  /**/"/AlphaBetEcon/assets/bower_components/MathJax/es5/input/tex/extensions/enclose.js",
  /**/"/AlphaBetEcon/assets/bower_components/MathJax/es5/input/tex/extensions/extpfeil.js",
  /**/"/AlphaBetEcon/assets/bower_components/MathJax/es5/input/tex/extensions/html.js",
  /**/"/AlphaBetEcon/assets/bower_components/MathJax/es5/input/tex/extensions/mhchem.js",
  /**/"/AlphaBetEcon/assets/bower_components/MathJax/es5/input/tex/extensions/newcommand.js",
  /**/"/AlphaBetEcon/assets/bower_components/MathJax/es5/input/tex/extensions/noerrors.js",
  /**/"/AlphaBetEcon/assets/bower_components/MathJax/es5/input/tex/extensions/noundefined.js",
  /**/"/AlphaBetEcon/assets/bower_components/MathJax/es5/input/tex/extensions/physics.js",
  /**/"/AlphaBetEcon/assets/bower_components/MathJax/es5/input/tex/extensions/require.js",
  /**/"/AlphaBetEcon/assets/bower_components/MathJax/es5/input/tex/extensions/tagFormat.js",
  /**/"/AlphaBetEcon/assets/bower_components/MathJax/es5/input/tex/extensions/unicode.js",
  /**/"/AlphaBetEcon/assets/bower_components/MathJax/es5/input/tex/extensions/verb.js",
  /**/"/AlphaBetEcon/assets/bower_components/MathJax/es5/input/tex-base.js",
  /**/"/AlphaBetEcon/assets/bower_components/MathJax/es5/input/tex-full.js",
  /**/"/AlphaBetEcon/assets/bower_components/MathJax/es5/input/tex.js",
  /**/"/AlphaBetEcon/assets/bower_components/MathJax/es5/latest.js",
  /**/"/AlphaBetEcon/assets/bower_components/MathJax/es5/loader.js",
  /**/"/AlphaBetEcon/assets/bower_components/MathJax/es5/mml-chtml.js",
  /**/"/AlphaBetEcon/assets/bower_components/MathJax/es5/mml-svg.js",
  /**/"/AlphaBetEcon/assets/bower_components/MathJax/es5/node-main.js",
  /**/"/AlphaBetEcon/assets/bower_components/MathJax/es5/output/chtml/fonts/tex.js",
  /**/"/AlphaBetEcon/assets/bower_components/MathJax/es5/output/chtml/fonts/woff-v2/MathJax_AMS-Regular.woff",
  /**/"/AlphaBetEcon/assets/bower_components/MathJax/es5/output/chtml/fonts/woff-v2/MathJax_Calligraphic-Bold.woff",
  /**/"/AlphaBetEcon/assets/bower_components/MathJax/es5/output/chtml/fonts/woff-v2/MathJax_Calligraphic-Regular.woff",
  /**/"/AlphaBetEcon/assets/bower_components/MathJax/es5/output/chtml/fonts/woff-v2/MathJax_Fraktur-Bold.woff",
  /**/"/AlphaBetEcon/assets/bower_components/MathJax/es5/output/chtml/fonts/woff-v2/MathJax_Fraktur-Regular.woff",
  /**/"/AlphaBetEcon/assets/bower_components/MathJax/es5/output/chtml/fonts/woff-v2/MathJax_Main-Bold.woff",
  /**/"/AlphaBetEcon/assets/bower_components/MathJax/es5/output/chtml/fonts/woff-v2/MathJax_Main-Italic.woff",
  /**/"/AlphaBetEcon/assets/bower_components/MathJax/es5/output/chtml/fonts/woff-v2/MathJax_Main-Regular.woff",
  /**/"/AlphaBetEcon/assets/bower_components/MathJax/es5/output/chtml/fonts/woff-v2/MathJax_Math-BoldItalic.woff",
  /**/"/AlphaBetEcon/assets/bower_components/MathJax/es5/output/chtml/fonts/woff-v2/MathJax_Math-Italic.woff",
  /**/"/AlphaBetEcon/assets/bower_components/MathJax/es5/output/chtml/fonts/woff-v2/MathJax_Math-Regular.woff",
  /**/"/AlphaBetEcon/assets/bower_components/MathJax/es5/output/chtml/fonts/woff-v2/MathJax_SansSerif-Bold.woff",
  /**/"/AlphaBetEcon/assets/bower_components/MathJax/es5/output/chtml/fonts/woff-v2/MathJax_SansSerif-Italic.woff",
  /**/"/AlphaBetEcon/assets/bower_components/MathJax/es5/output/chtml/fonts/woff-v2/MathJax_SansSerif-Regular.woff",
  /**/"/AlphaBetEcon/assets/bower_components/MathJax/es5/output/chtml/fonts/woff-v2/MathJax_Script-Regular.woff",
  /**/"/AlphaBetEcon/assets/bower_components/MathJax/es5/output/chtml/fonts/woff-v2/MathJax_Size1-Regular.woff",
  /**/"/AlphaBetEcon/assets/bower_components/MathJax/es5/output/chtml/fonts/woff-v2/MathJax_Size2-Regular.woff",
  /**/"/AlphaBetEcon/assets/bower_components/MathJax/es5/output/chtml/fonts/woff-v2/MathJax_Size3-Regular.woff",
  /**/"/AlphaBetEcon/assets/bower_components/MathJax/es5/output/chtml/fonts/woff-v2/MathJax_Size4-Regular.woff",
  /**/"/AlphaBetEcon/assets/bower_components/MathJax/es5/output/chtml/fonts/woff-v2/MathJax_Typewriter-Regular.woff",
  /**/"/AlphaBetEcon/assets/bower_components/MathJax/es5/output/chtml/fonts/woff-v2/MathJax_Vector-Bold.woff",
  /**/"/AlphaBetEcon/assets/bower_components/MathJax/es5/output/chtml/fonts/woff-v2/MathJax_Vector-Regular.woff",
  /**/"/AlphaBetEcon/assets/bower_components/MathJax/es5/output/chtml/fonts/woff-v2/MathJax_Zero.woff",
  /**/"/AlphaBetEcon/assets/bower_components/MathJax/es5/output/chtml.js",
  /**/"/AlphaBetEcon/assets/bower_components/MathJax/es5/output/svg/fonts/tex.js",
  /**/"/AlphaBetEcon/assets/bower_components/MathJax/es5/output/svg.js",
  /**/"/AlphaBetEcon/assets/bower_components/MathJax/es5/sre/mathmaps/en.js",
  /**/"/AlphaBetEcon/assets/bower_components/MathJax/es5/sre/mathmaps/es.js",
  /**/"/AlphaBetEcon/assets/bower_components/MathJax/es5/sre/mathmaps/fr.js",
  /**/"/AlphaBetEcon/assets/bower_components/MathJax/es5/sre/mathmaps/mathmaps_ie.js",
  /**/"/AlphaBetEcon/assets/bower_components/MathJax/es5/sre/mathmaps/nemeth.js",
  /**/"/AlphaBetEcon/assets/bower_components/MathJax/es5/sre/sre_browser.js",
  /**/"/AlphaBetEcon/assets/bower_components/MathJax/es5/startup.js",
  /**/"/AlphaBetEcon/assets/bower_components/MathJax/es5/tex-chtml-full.js",
  /**/"/AlphaBetEcon/assets/bower_components/MathJax/es5/tex-chtml.js",
  /**/"/AlphaBetEcon/assets/bower_components/MathJax/es5/tex-mml-chtml.js",
  /**/"/AlphaBetEcon/assets/bower_components/MathJax/es5/tex-mml-svg.js",
  /**/"/AlphaBetEcon/assets/bower_components/MathJax/es5/tex-svg-full.js",
  /**/"/AlphaBetEcon/assets/bower_components/MathJax/es5/tex-svg.js",
  /**/"/AlphaBetEcon/assets/bower_components/MathJax/es5/ui/menu.js",
  /**/"/AlphaBetEcon/assets/bower_components/MathJax/package.json",
  /**/"/AlphaBetEcon/assets/bower_components/html5shiv/.bower.json",
  /**/"/AlphaBetEcon/assets/bower_components/html5shiv/Gruntfile.js",
  /**/"/AlphaBetEcon/assets/bower_components/html5shiv/bower.json",
  /**/"/AlphaBetEcon/assets/bower_components/html5shiv/dist/html5shiv-printshiv.js",
  /**/"/AlphaBetEcon/assets/bower_components/html5shiv/dist/html5shiv-printshiv.min.js",
  /**/"/AlphaBetEcon/assets/bower_components/html5shiv/dist/html5shiv.js",
  /**/"/AlphaBetEcon/assets/bower_components/html5shiv/dist/html5shiv.min.js",
  /**/"/AlphaBetEcon/assets/bower_components/html5shiv/package.json",
  /**/"/AlphaBetEcon/assets/bower_components/katex/.bower.json",
  /**/"/AlphaBetEcon/assets/bower_components/katex/LICENSE",
  /**/"/AlphaBetEcon/assets/bower_components/katex/bower.json",
  /**/"/AlphaBetEcon/assets/bower_components/katex/dist/contrib/auto-render.js",
  /**/"/AlphaBetEcon/assets/bower_components/katex/dist/contrib/auto-render.min.js",
  /**/"/AlphaBetEcon/assets/bower_components/katex/dist/contrib/auto-render.mjs",
  /**/"/AlphaBetEcon/assets/bower_components/katex/dist/contrib/copy-tex.css",
  /**/"/AlphaBetEcon/assets/bower_components/katex/dist/contrib/copy-tex.js",
  /**/"/AlphaBetEcon/assets/bower_components/katex/dist/contrib/copy-tex.min.css",
  /**/"/AlphaBetEcon/assets/bower_components/katex/dist/contrib/copy-tex.min.js",
  /**/"/AlphaBetEcon/assets/bower_components/katex/dist/contrib/copy-tex.mjs",
  /**/"/AlphaBetEcon/assets/bower_components/katex/dist/contrib/mathtex-script-type.js",
  /**/"/AlphaBetEcon/assets/bower_components/katex/dist/contrib/mathtex-script-type.min.js",
  /**/"/AlphaBetEcon/assets/bower_components/katex/dist/contrib/mathtex-script-type.mjs",
  /**/"/AlphaBetEcon/assets/bower_components/katex/dist/contrib/mhchem.js",
  /**/"/AlphaBetEcon/assets/bower_components/katex/dist/contrib/mhchem.min.js",
  /**/"/AlphaBetEcon/assets/bower_components/katex/dist/contrib/mhchem.mjs",
  /**/"/AlphaBetEcon/assets/bower_components/katex/dist/fonts/KaTeX_AMS-Regular.ttf",
  /**/"/AlphaBetEcon/assets/bower_components/katex/dist/fonts/KaTeX_AMS-Regular.woff",
  /**/"/AlphaBetEcon/assets/bower_components/katex/dist/fonts/KaTeX_AMS-Regular.woff2",
  /**/"/AlphaBetEcon/assets/bower_components/katex/dist/fonts/KaTeX_Caligraphic-Bold.ttf",
  /**/"/AlphaBetEcon/assets/bower_components/katex/dist/fonts/KaTeX_Caligraphic-Bold.woff",
  /**/"/AlphaBetEcon/assets/bower_components/katex/dist/fonts/KaTeX_Caligraphic-Bold.woff2",
  /**/"/AlphaBetEcon/assets/bower_components/katex/dist/fonts/KaTeX_Caligraphic-Regular.ttf",
  /**/"/AlphaBetEcon/assets/bower_components/katex/dist/fonts/KaTeX_Caligraphic-Regular.woff",
  /**/"/AlphaBetEcon/assets/bower_components/katex/dist/fonts/KaTeX_Caligraphic-Regular.woff2",
  /**/"/AlphaBetEcon/assets/bower_components/katex/dist/fonts/KaTeX_Fraktur-Bold.ttf",
  /**/"/AlphaBetEcon/assets/bower_components/katex/dist/fonts/KaTeX_Fraktur-Bold.woff",
  /**/"/AlphaBetEcon/assets/bower_components/katex/dist/fonts/KaTeX_Fraktur-Bold.woff2",
  /**/"/AlphaBetEcon/assets/bower_components/katex/dist/fonts/KaTeX_Fraktur-Regular.ttf",
  /**/"/AlphaBetEcon/assets/bower_components/katex/dist/fonts/KaTeX_Fraktur-Regular.woff",
  /**/"/AlphaBetEcon/assets/bower_components/katex/dist/fonts/KaTeX_Fraktur-Regular.woff2",
  /**/"/AlphaBetEcon/assets/bower_components/katex/dist/fonts/KaTeX_Main-Bold.ttf",
  /**/"/AlphaBetEcon/assets/bower_components/katex/dist/fonts/KaTeX_Main-Bold.woff",
  /**/"/AlphaBetEcon/assets/bower_components/katex/dist/fonts/KaTeX_Main-Bold.woff2",
  /**/"/AlphaBetEcon/assets/bower_components/katex/dist/fonts/KaTeX_Main-BoldItalic.ttf",
  /**/"/AlphaBetEcon/assets/bower_components/katex/dist/fonts/KaTeX_Main-BoldItalic.woff",
  /**/"/AlphaBetEcon/assets/bower_components/katex/dist/fonts/KaTeX_Main-BoldItalic.woff2",
  /**/"/AlphaBetEcon/assets/bower_components/katex/dist/fonts/KaTeX_Main-Italic.ttf",
  /**/"/AlphaBetEcon/assets/bower_components/katex/dist/fonts/KaTeX_Main-Italic.woff",
  /**/"/AlphaBetEcon/assets/bower_components/katex/dist/fonts/KaTeX_Main-Italic.woff2",
  /**/"/AlphaBetEcon/assets/bower_components/katex/dist/fonts/KaTeX_Main-Regular.ttf",
  /**/"/AlphaBetEcon/assets/bower_components/katex/dist/fonts/KaTeX_Main-Regular.woff",
  /**/"/AlphaBetEcon/assets/bower_components/katex/dist/fonts/KaTeX_Main-Regular.woff2",
  /**/"/AlphaBetEcon/assets/bower_components/katex/dist/fonts/KaTeX_Math-BoldItalic.ttf",
  /**/"/AlphaBetEcon/assets/bower_components/katex/dist/fonts/KaTeX_Math-BoldItalic.woff",
  /**/"/AlphaBetEcon/assets/bower_components/katex/dist/fonts/KaTeX_Math-BoldItalic.woff2",
  /**/"/AlphaBetEcon/assets/bower_components/katex/dist/fonts/KaTeX_Math-Italic.ttf",
  /**/"/AlphaBetEcon/assets/bower_components/katex/dist/fonts/KaTeX_Math-Italic.woff",
  /**/"/AlphaBetEcon/assets/bower_components/katex/dist/fonts/KaTeX_Math-Italic.woff2",
  /**/"/AlphaBetEcon/assets/bower_components/katex/dist/fonts/KaTeX_SansSerif-Bold.ttf",
  /**/"/AlphaBetEcon/assets/bower_components/katex/dist/fonts/KaTeX_SansSerif-Bold.woff",
  /**/"/AlphaBetEcon/assets/bower_components/katex/dist/fonts/KaTeX_SansSerif-Bold.woff2",
  /**/"/AlphaBetEcon/assets/bower_components/katex/dist/fonts/KaTeX_SansSerif-Italic.ttf",
  /**/"/AlphaBetEcon/assets/bower_components/katex/dist/fonts/KaTeX_SansSerif-Italic.woff",
  /**/"/AlphaBetEcon/assets/bower_components/katex/dist/fonts/KaTeX_SansSerif-Italic.woff2",
  /**/"/AlphaBetEcon/assets/bower_components/katex/dist/fonts/KaTeX_SansSerif-Regular.ttf",
  /**/"/AlphaBetEcon/assets/bower_components/katex/dist/fonts/KaTeX_SansSerif-Regular.woff",
  /**/"/AlphaBetEcon/assets/bower_components/katex/dist/fonts/KaTeX_SansSerif-Regular.woff2",
  /**/"/AlphaBetEcon/assets/bower_components/katex/dist/fonts/KaTeX_Script-Regular.ttf",
  /**/"/AlphaBetEcon/assets/bower_components/katex/dist/fonts/KaTeX_Script-Regular.woff",
  /**/"/AlphaBetEcon/assets/bower_components/katex/dist/fonts/KaTeX_Script-Regular.woff2",
  /**/"/AlphaBetEcon/assets/bower_components/katex/dist/fonts/KaTeX_Size1-Regular.ttf",
  /**/"/AlphaBetEcon/assets/bower_components/katex/dist/fonts/KaTeX_Size1-Regular.woff",
  /**/"/AlphaBetEcon/assets/bower_components/katex/dist/fonts/KaTeX_Size1-Regular.woff2",
  /**/"/AlphaBetEcon/assets/bower_components/katex/dist/fonts/KaTeX_Size2-Regular.ttf",
  /**/"/AlphaBetEcon/assets/bower_components/katex/dist/fonts/KaTeX_Size2-Regular.woff",
  /**/"/AlphaBetEcon/assets/bower_components/katex/dist/fonts/KaTeX_Size2-Regular.woff2",
  /**/"/AlphaBetEcon/assets/bower_components/katex/dist/fonts/KaTeX_Size3-Regular.ttf",
  /**/"/AlphaBetEcon/assets/bower_components/katex/dist/fonts/KaTeX_Size3-Regular.woff",
  /**/"/AlphaBetEcon/assets/bower_components/katex/dist/fonts/KaTeX_Size3-Regular.woff2",
  /**/"/AlphaBetEcon/assets/bower_components/katex/dist/fonts/KaTeX_Size4-Regular.ttf",
  /**/"/AlphaBetEcon/assets/bower_components/katex/dist/fonts/KaTeX_Size4-Regular.woff",
  /**/"/AlphaBetEcon/assets/bower_components/katex/dist/fonts/KaTeX_Size4-Regular.woff2",
  /**/"/AlphaBetEcon/assets/bower_components/katex/dist/fonts/KaTeX_Typewriter-Regular.ttf",
  /**/"/AlphaBetEcon/assets/bower_components/katex/dist/fonts/KaTeX_Typewriter-Regular.woff",
  /**/"/AlphaBetEcon/assets/bower_components/katex/dist/fonts/KaTeX_Typewriter-Regular.woff2",
  /**/"/AlphaBetEcon/assets/bower_components/katex/dist/katex.css",
  /**/"/AlphaBetEcon/assets/bower_components/katex/dist/katex.js",
  /**/"/AlphaBetEcon/assets/bower_components/katex/dist/katex.min.css",
  /**/"/AlphaBetEcon/assets/bower_components/katex/dist/katex.min.js",
  /**/"/AlphaBetEcon/assets/bower_components/katex/dist/katex.mjs",
  /**/"/AlphaBetEcon/assets/bower_components/katex/yarn.lock",
  /**/"/AlphaBetEcon/assets/icomoon/fonts/icomoon.eot",
  /**/"/AlphaBetEcon/assets/icomoon/fonts/icomoon.svg",
  /**/"/AlphaBetEcon/assets/icomoon/fonts/icomoon.ttf",
  /**/"/AlphaBetEcon/assets/icomoon/fonts/icomoon.woff",
  /**/"/AlphaBetEcon/assets/icomoon/selection.json",
  /**/"/AlphaBetEcon/assets/icomoon/style.css",
  /**/"/AlphaBetEcon/assets/icons/favicon.ico",
  /**/"/AlphaBetEcon/assets/icons/icon-128x128.png",
  /**/"/AlphaBetEcon/assets/icons/icon-144x144.png",
  /**/"/AlphaBetEcon/assets/icons/icon-152x152.png",
  /**/"/AlphaBetEcon/assets/icons/icon-192x192.png",
  /**/"/AlphaBetEcon/assets/icons/icon-384x384.png",
  /**/"/AlphaBetEcon/assets/icons/icon-512x512.png",
  /**/"/AlphaBetEcon/assets/icons/icon-72x72.png",
  /**/"/AlphaBetEcon/assets/icons/icon-96x96.png",
  /**/"/AlphaBetEcon/assets/img/logo.png",
  /**/"/AlphaBetEcon/assets/img/sidebar-bg.jpg",
  /**/"/AlphaBetEcon/assets/img/swipe.svg",
  /**/"/AlphaBetEcon/assets/js/LEGACY-drawer-hydejack-9.0.4.js",
  /**/"/AlphaBetEcon/assets/js/LEGACY-fetch-hydejack-9.0.4.js",
  /**/"/AlphaBetEcon/assets/js/LEGACY-hydejack-9.0.4.js",
  /**/"/AlphaBetEcon/assets/js/LEGACY-navbar-hydejack-9.0.4.js",
  /**/"/AlphaBetEcon/assets/js/LEGACY-push-state-hydejack-9.0.4.js",
  /**/"/AlphaBetEcon/assets/js/LEGACY-resize-observer-hydejack-9.0.4.js",
  /**/"/AlphaBetEcon/assets/js/LEGACY-search-hydejack-9.0.4.js",
  /**/"/AlphaBetEcon/assets/js/LEGACY-shadydom-hydejack-9.0.4.js",
  /**/"/AlphaBetEcon/assets/js/LEGACY-toc-hydejack-9.0.4.js",
  /**/"/AlphaBetEcon/assets/js/LEGACY-vendors~drawer-hydejack-9.0.4.js",
  /**/"/AlphaBetEcon/assets/js/LEGACY-vendors~drawer~push-state-hydejack-9.0.4.js",
  /**/"/AlphaBetEcon/assets/js/LEGACY-vendors~drawer~push-state~search-hydejack-9.0.4.js",
  /**/"/AlphaBetEcon/assets/js/LEGACY-vendors~fetch-hydejack-9.0.4.js",
  /**/"/AlphaBetEcon/assets/js/LEGACY-vendors~intersection-observer-hydejack-9.0.4.js",
  /**/"/AlphaBetEcon/assets/js/LEGACY-vendors~push-state-hydejack-9.0.4.js",
  /**/"/AlphaBetEcon/assets/js/LEGACY-vendors~search-hydejack-9.0.4.js",
  /**/"/AlphaBetEcon/assets/js/LEGACY-vendors~shadydom-hydejack-9.0.4.js",
  /**/"/AlphaBetEcon/assets/js/LEGACY-vendors~webanimations-hydejack-9.0.4.js",
  /**/"/AlphaBetEcon/assets/js/LEGACY-vendors~webcomponents-hydejack-9.0.4.js",
  /**/"/AlphaBetEcon/assets/js/LEGACY-webcomponents-hydejack-9.0.4.js",
  /**/"/AlphaBetEcon/assets/js/drawer-hydejack-9.0.4.js",
  /**/"/AlphaBetEcon/assets/js/fetch-hydejack-9.0.4.js",
  /**/"/AlphaBetEcon/assets/js/hydejack-9.0.4.js",
  /**/"/AlphaBetEcon/assets/js/kv-storage-polyfill/dist/kv-storage-polyfill.umd.js",
  /**/"/AlphaBetEcon/assets/js/kv-storage-polyfill/dist/kv-storage-polyfill.umd.js.map",
  /**/"/AlphaBetEcon/assets/js/kv-storage-polyfill/package.json",
  /**/"/AlphaBetEcon/assets/js/minisearch/dist/umd/index.js",
  /**/"/AlphaBetEcon/assets/js/minisearch/dist/umd/index.min.js",
  /**/"/AlphaBetEcon/assets/js/minisearch/dist/umd/index.min.js.map",
  /**/"/AlphaBetEcon/assets/js/minisearch/package.json",
  /**/"/AlphaBetEcon/assets/js/navbar-hydejack-9.0.4.js",
  /**/"/AlphaBetEcon/assets/js/push-state-hydejack-9.0.4.js",
  /**/"/AlphaBetEcon/assets/js/resize-observer-hydejack-9.0.4.js",
  /**/"/AlphaBetEcon/assets/js/search-hydejack-9.0.4.js",
  /**/"/AlphaBetEcon/assets/js/shadydom-hydejack-9.0.4.js",
  /**/"/AlphaBetEcon/assets/js/toc-hydejack-9.0.4.js",
  /**/"/AlphaBetEcon/assets/js/vendors~drawer-hydejack-9.0.4.js",
  /**/"/AlphaBetEcon/assets/js/vendors~drawer~push-state-hydejack-9.0.4.js",
  /**/"/AlphaBetEcon/assets/js/vendors~drawer~push-state~search-hydejack-9.0.4.js",
  /**/"/AlphaBetEcon/assets/js/vendors~fetch-hydejack-9.0.4.js",
  /**/"/AlphaBetEcon/assets/js/vendors~intersection-observer-hydejack-9.0.4.js",
  /**/"/AlphaBetEcon/assets/js/vendors~push-state-hydejack-9.0.4.js",
  /**/"/AlphaBetEcon/assets/js/vendors~search-hydejack-9.0.4.js",
  /**/"/AlphaBetEcon/assets/js/vendors~shadydom-hydejack-9.0.4.js",
  /**/"/AlphaBetEcon/assets/js/vendors~webanimations-hydejack-9.0.4.js",
  /**/"/AlphaBetEcon/assets/js/webcomponents-hydejack-9.0.4.js",
  /**/"/AlphaBetEcon/assets/version.json",
  /**/
];

const PRE_CACHED_ASSETS = [
  '/AlphaBetEcon/assets/icons/favicon.ico',
  /**/"/AlphaBetEcon/assets/img/sidebar-bg.jpg",/**/
  /**/
  /**/"/AlphaBetEcon/assets/img/swipe.svg",
  /**/
];

// Files we add on every service worker installation.
const CONTENT_FILES = [
  "/AlphaBetEcon/",
  "/AlphaBetEcon/offline.html",
  /**/
];

const SITE_URL = new URL("/AlphaBetEcon/", self.location);
const OFFLINE_PAGE_URL = new URL("/AlphaBetEcon/offline.html", self.location);

self.addEventListener("install", e => e.waitUntil(onInstall(e)));
self.addEventListener("activate", e => e.waitUntil(onActivate(e)));
self.addEventListener("fetch", e => e.respondWith(onFetch(e)));

// Takes a URL with pathname like `/foo/bar/file.txt` and returns just the dirname like `/foo/bar/`.
const dirname = ({ pathname }) => pathname.replace(/[^/]*$/, "");

function matchAll(text, regExp) {
  const globalRegExp = new RegExp(regExp, 'g'); // force global regexp to prevent infinite loop
  const matches = [];
  let lastMatch;
  while (lastMatch = globalRegExp.exec(text)) matches.push(lastMatch);
  return matches;
}

// Returns the second element of an iterable (first match in RegExp match array)
const second = ([, _]) => _;

const toAbsoluteURL = url => new URL(url, self.location);

// Creates a URL that bypasses the browser's HTTP cache by appending a random search parameter.
function noCache(url) {
  return new Request(url, { cache: 'no-store' });
}

// Removes the sw search paramter, if present.
function noSWParam(url) {
  const url2 = new URL(url);
  if (url2.searchParams.has(SW_CACHE_SEARCH_PARAM)) {
    url2.searchParams.delete(SW_CACHE_SEARCH_PARAM);
    return url2.href;
  }
  return url;
}

const warn = (e) => {
  console.warn(e);
  return new Response(e.message, { status: 500 });
}

async function getIconFontFiles() {
  const fontURLs = STATIC_FILES.filter(x => (
    x.startsWith('/AlphaBetEcon/assets/icomoon/fonts/') &&
    x.endsWith('.woff') 
  ));
  return [ICON_FONT, ...fontURLs];
}
 
async function getKaTeXFontFiles() {
  const fontURLs = STATIC_FILES.filter(x => (
    x.startsWith('/AlphaBetEcon/assets/bower_components/katex/dist/fonts/') &&
    x.endsWith('.woff2')
  ));
  return [KATEX_FONT, ...fontURLs];
}

async function getMathJaxFiles() {
  // NOTE: Removed due to MathJax' enormous size. 
  // Uncomment if you're using MathJax and don't mind forcing a 50 MB download on every visitor...
  /*
  const mathJaxFiles = STATIC_FILES.filter(x => (
    x.startsWith('/AlphaBetEcon/assets/bower_components/MathJax/es5/') &&
    x.endsWith('.js')
  ));
  const fontURLs = STATIC_FILES.filter(x => (
    x.startsWith('/AlphaBetEcon/assets/bower_components/MathJax/es5/output/chtml/fonts/woff-v2') &&
    x.endsWith('.woff')
  ));
  return [...mathJaxFiles, ...fontURLs];
  */
}

async function getGoogleFontsFiles() {
  const googleFontRes = await fetch(noCache(GOOGLE_FONTS)).catch(warn);
  if (googleFontRes.ok) {
    const text = await googleFontRes.text();
    return [GOOGLE_FONTS, ...matchAll(text, RE_CSS_URL).map(second)];
  }
  return [];
}

function addAll(cache, urls) {
  return Promise.all(
    urls.map(url => (
      fetch(noCache(toAbsoluteURL(url)))
        .then(res => cache.put(url, res))
        .catch(warn)
      )
    )
  );
}

async function cacheShell(cache) {
  const fontFiles = await Promise.all([
    getIconFontFiles(),
    /**/getGoogleFontsFiles(),/**/
    /**/
    /**/getMathJaxFiles(),/**/
  ]);

  const jsFiles = STATIC_FILES.filter(url => (
    url.startsWith('/AlphaBetEcon/assets/js/') &&
    url.endsWith('.js') && !url.includes('LEGACY')
  ));

  const urls = SHELL_FILES.concat(jsFiles, ...fontFiles).filter(x => !!x);
  return addAll(cache, urls);
}

async function cacheAssets(cache) {
  const urls = PRE_CACHED_ASSETS.filter(x => !!x);
  return addAll(cache, urls);
}

async function cacheContent(cache) {
  const urls = CONTENT_FILES.filter(x => !!x);
  return addAll(cache, urls);
}

async function preCache() {
  const keys = await caches.keys();

  if (keys.includes(SHELL_CACHE) && keys.includes(ASSETS_CACHE)) {
    const contentCache = await caches.open(CONTENT_CACHE);
    return cacheContent(contentCache);
  } else {
    const [shellCache, assetsCache, contentCache] = await Promise.all([
      caches.open(SHELL_CACHE),
      caches.open(ASSETS_CACHE),
      caches.open(CONTENT_CACHE),
    ]);
    return Promise.all([
      cacheShell(shellCache),
      cacheAssets(assetsCache),
      cacheContent(contentCache),
    ]);
  }
}

async function onInstall() {
  await preCache();
  return self.skipWaiting();
}

const isSameSite = ({ origin, pathname }) => origin === SITE_URL.origin && pathname.startsWith(SITE_URL.pathname);
const isAsset = ({ pathname }) => pathname.startsWith("/AlphaBetEcon/assets");
const hasSWParam = ({ searchParams }) => searchParams.has(SW_CACHE_SEARCH_PARAM);
const hasNoCacheParam = ({ searchParams }) => searchParams.has(NO_CACHE_SEARCH_PARAM);
const isGoogleFonts = ({ hostname }) => hostname === 'fonts.googleapis.com' || hostname === 'fonts.gstatic.com'

async function cacheResponse(cacheName, req, res) {
  const cache = await caches.open(cacheName);
  return cache.put(req, res);
}

async function onActivate() {
  await self.clients.claim();

  const keys = await caches.keys();

  return Promise.all(
    keys
      // Only consider caches created by this baseurl, i.e. allow multiple Hydejack installations on same domain.
      .filter(key => key.endsWith("sw/AlphaBetEcon/"))
      // Delete old caches
      .filter(key => key !== SHELL_CACHE && key !== ASSETS_CACHE && key !== CONTENT_CACHE)
      .map(key => caches.delete(key))
  );
}

const NEVER = new Promise(() => {});

// Returns the first promise that resolves with non-nullish value,
// or `undefined` if all promises resolve with a nullish value.
// Note that this inherits the behavior of `Promise.race`,
// where the returned promise rejects as soon as one input promise rejects.
async function raceTruthy(iterable) {
  const ps = [...iterable].map(_ => Promise.resolve(_));
  let { length } = ps;
  const continueWhenNullish = value => value != null
    ? value
    : --length > 0
      ? NEVER
      : undefined;
  return Promise.race(ps.map(p => p.then(continueWhenNullish)));
}

async function fromNetwork(url, ...args) {
  const cacheName = isAsset(url) || hasSWParam(url) ? ASSETS_CACHE : CONTENT_CACHE;
  return fetchAndCache(cacheName, url, ...args);
}

async function fetchAndCache(cacheName, url, request, e) {
  const response = await fetch(noCache(noSWParam(url)));
  if (response.ok) e.waitUntil(cacheResponse(cacheName, request, response.clone()));
  return response;
}

async function onFetch(e) {
  const { request } = e;
  const url = new URL(request.url);

  // Bypass
  // ------
  // Go to network for non-GET request and Google Analytics right away.
  const shouldCache = isSameSite(url) || hasSWParam(url) || isGoogleFonts(url);
  if (request.method !== "GET" || !shouldCache || hasNoCacheParam(url)) {
    return fetch(request).catch(e => Promise.reject(e));
  }

  try {
    // Caches
    // ------
    const matching = await raceTruthy([
      caches.open(SHELL_CACHE).then(c => c.match(url.href, { ignoreSearch: true })),
      caches.open(ASSETS_CACHE).then(c => c.match(url.href, { ignoreSearch: true })),
      caches.open(CONTENT_CACHE).then(c => c.match(url.href, { ignoreSearch: true })),
    ]);

    if (matching) return matching;

    // Network
    // -------
    // Got to network otherwise. Show 404 when there's a network error.
    // TODO: Use separate offline site instead of 404!?
    return await fromNetwork(url, request, e);
  } catch (err) {
    // console.error(err)
    const cache = await caches.open(CONTENT_CACHE);
    return cache.match(OFFLINE_PAGE_URL);
  }
}

// 

