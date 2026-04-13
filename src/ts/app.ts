import { registerRoute, initApp } from './main';
import { renderHome } from './pages/home';
import { renderResearchList, renderResearchDetail } from './pages/research';
import { renderTimeline } from './pages/timeline';
import { renderAskArchive } from './pages/ask-archive';
import { renderMap } from './pages/map';
import { renderNetwork } from './pages/network';
import { renderGaps } from './pages/gaps';
import { renderComparator } from './pages/comparator';
import { renderToolsHub } from './pages/tools-hub';
import { renderReturnee } from './pages/returnee';
import { renderTraining, renderTrainingModule } from './pages/training';
import { renderRetention } from './pages/retention';
import { renderHeritage } from './pages/heritage';
import { renderMartyrs } from './pages/heritage-martyrs';
import { renderScript } from './pages/heritage-script';
import { renderPersonasHub } from './pages/personas';
import { renderPersonaChat } from './pages/persona-chat';
import { renderAbout } from './pages/about';
import { initSearch } from './search';

// Home
registerRoute('/', renderHome);

// Research
registerRoute('/research', renderResearchList);
registerRoute('/research/timeline', renderTimeline);
registerRoute('/research/map', renderMap);
registerRoute('/research/network', renderNetwork);
registerRoute('/research/gaps', renderGaps);
registerRoute('/research/comparator', renderComparator);
registerRoute('/research/ask', renderAskArchive);
registerRoute('/research/:id', renderResearchDetail);

// Tools
registerRoute('/tools', renderToolsHub);
registerRoute('/tools/ask', renderAskArchive);
registerRoute('/tools/returnee', renderReturnee);
registerRoute('/tools/training', renderTraining);
registerRoute('/tools/training/:moduleId', renderTrainingModule);
registerRoute('/tools/retention', renderRetention);
registerRoute('/tools/map', renderMap);
registerRoute('/tools/network', renderNetwork);

// Heritage
registerRoute('/heritage', renderHeritage);
registerRoute('/heritage/martyrs', renderMartyrs);
registerRoute('/heritage/script', renderScript);

// Personas
registerRoute('/personas', renderPersonasHub);
registerRoute('/personas/:id', renderPersonaChat);

// About
registerRoute('/about', renderAbout);

// Initialize
initApp();
initSearch();
