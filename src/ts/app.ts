import { registerRoute, initApp } from './main';
import { renderHome } from './pages/home';
import { initSearch } from './search';

// Home — eagerly loaded (landing page)
registerRoute('/', renderHome);

// Research — lazily loaded
registerRoute('/research', () => import('./pages/research').then(m => m.renderResearchList()));
registerRoute('/research/timeline', () => import('./pages/timeline').then(m => m.renderTimeline()));
registerRoute('/research/map', () => import('./pages/map').then(m => m.renderMap()));
registerRoute('/research/network', () => import('./pages/network').then(m => m.renderNetwork()));
registerRoute('/research/gaps', () => import('./pages/gaps').then(m => m.renderGaps()));
registerRoute('/research/comparator', () => import('./pages/comparator').then(m => m.renderComparator()));
registerRoute('/research/ask', () => import('./pages/ask-archive').then(m => m.renderAskArchive()));
registerRoute('/research/:id', () => import('./pages/research').then(m => m.renderResearchDetail()));

// Tools — lazily loaded
registerRoute('/tools', () => import('./pages/tools-hub').then(m => m.renderToolsHub()));
registerRoute('/tools/ask', () => import('./pages/ask-archive').then(m => m.renderAskArchive()));
registerRoute('/tools/returnee', () => import('./pages/returnee').then(m => m.renderReturnee()));
registerRoute('/tools/training', () => import('./pages/training').then(m => m.renderTraining()));
registerRoute('/tools/training/:moduleId', () => import('./pages/training').then(m => m.renderTrainingModule()));
registerRoute('/tools/retention', () => import('./pages/retention').then(m => m.renderRetention()));
registerRoute('/tools/map', () => import('./pages/map').then(m => m.renderMap()));
registerRoute('/tools/network', () => import('./pages/network').then(m => m.renderNetwork()));

// Heritage — lazily loaded
registerRoute('/heritage', () => import('./pages/heritage').then(m => m.renderHeritage()));
registerRoute('/heritage/martyrs', () => import('./pages/heritage-martyrs').then(m => m.renderMartyrs()));
registerRoute('/heritage/script', () => import('./pages/heritage-script').then(m => m.renderScript()));

// Personas — lazily loaded
registerRoute('/personas', () => import('./pages/personas').then(m => m.renderPersonasHub()));
registerRoute('/personas/:id', () => import('./pages/persona-chat').then(m => m.renderPersonaChat()));

// About — lazily loaded
registerRoute('/about', () => import('./pages/about').then(m => m.renderAbout()));

// Initialize
initApp();
initSearch();
