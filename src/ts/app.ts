import { registerRoute, initApp } from './main';
import { renderHome } from './pages/home';
import { renderResearchList, renderResearchDetail } from './pages/research';
import { renderTimeline } from './pages/timeline';
import { renderAskArchive } from './pages/ask-archive';
import { renderToolsHub } from './pages/tools-hub';
import { renderHeritage } from './pages/heritage';
import { renderPersonasHub } from './pages/personas';
import { renderAbout } from './pages/about';
import { initSearch } from './search';

// Home
registerRoute('/', renderHome);

// Research
registerRoute('/research', renderResearchList);
registerRoute('/research/timeline', renderTimeline);
registerRoute('/research/ask', renderAskArchive);
registerRoute('/research/:id', renderResearchDetail);

// Tools
registerRoute('/tools', renderToolsHub);
registerRoute('/tools/ask', renderAskArchive);

// Heritage
registerRoute('/heritage', renderHeritage);

// Personas
registerRoute('/personas', renderPersonasHub);

// About
registerRoute('/about', renderAbout);

// Initialize
initApp();
initSearch();
