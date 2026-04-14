import { t } from '../i18n';
import { renderFooter } from '../shared/footer';

export function renderHome(): void {
  const app = document.getElementById('app');
  if (!app) return;

  app.innerHTML = `
    <!-- Hero — Asymmetric Split -->
    <section class="hero">
      <div class="hero-content">
        <div class="hero-eyebrow" data-i18n="hero.eyebrow">${t('hero.eyebrow')}</div>
        <h1 data-i18n="hero.title">${t('hero.title')}</h1>
        <p class="hero-intro" data-i18n="hero.intro">${t('hero.intro')}</p>
        <div class="hero-ctas">
          <a href="#/research/ask" class="btn-cinnabar" data-i18n="hero.cta.explore">${t('hero.cta.explore')}</a>
          <a href="#/research" class="btn-gold-ghost" data-i18n="hero.cta.research">${t('hero.cta.research')}</a>
        </div>
      </div>
      <div class="hero-panel">
        <div class="hero-panel-title" data-i18n="hero.panel.title">${t('hero.panel.title')}</div>
        <div class="hero-stats">
          <div class="hero-stat">
            <span class="number" data-i18n="hero.stat.christians">${t('hero.stat.christians')}</span>
            <span class="label" data-i18n="hero.stat.christians.label">${t('hero.stat.christians.label')}</span>
          </div>
          <div class="hero-stat">
            <span class="number" data-i18n="hero.stat.martyrs">${t('hero.stat.martyrs')}</span>
            <span class="label" data-i18n="hero.stat.martyrs.label">${t('hero.stat.martyrs.label')}</span>
          </div>
          <div class="hero-stat">
            <span class="number" data-i18n="hero.stat.script">${t('hero.stat.script')}</span>
            <span class="label" data-i18n="hero.stat.script.label">${t('hero.stat.script.label')}</span>
          </div>
          <div class="hero-stat">
            <span class="number" data-i18n="hero.stat.years">${t('hero.stat.years')}</span>
            <span class="label" data-i18n="hero.stat.years.label">${t('hero.stat.years.label')}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Three Pillars -->
    <section class="section">
      <div class="section-eyebrow" data-i18n="pillars.eyebrow">${t('pillars.eyebrow')}</div>
      <h2 data-i18n="pillars.title">${t('pillars.title')}</h2>
      <div class="gold-divider"></div>
      <div class="pillars-grid">
        <div class="pillar-card">
          <div class="pillar-count" data-i18n="pillars.research.count">${t('pillars.research.count')}</div>
          <h3 data-i18n="pillars.research.title">${t('pillars.research.title')}</h3>
          <p data-i18n="pillars.research.desc">${t('pillars.research.desc')}</p>
          <a href="#/research" data-i18n="pillars.research.cta">${t('pillars.research.cta')} &rarr;</a>
        </div>
        <div class="pillar-card">
          <div class="pillar-count" data-i18n="pillars.tools.count">${t('pillars.tools.count')}</div>
          <h3 data-i18n="pillars.tools.title">${t('pillars.tools.title')}</h3>
          <p data-i18n="pillars.tools.desc">${t('pillars.tools.desc')}</p>
          <a href="#/tools" data-i18n="pillars.tools.cta">${t('pillars.tools.cta')} &rarr;</a>
        </div>
        <div class="pillar-card">
          <div class="pillar-count" data-i18n="pillars.heritage.count">${t('pillars.heritage.count')}</div>
          <h3 data-i18n="pillars.heritage.title">${t('pillars.heritage.title')}</h3>
          <p data-i18n="pillars.heritage.desc">${t('pillars.heritage.desc')}</p>
          <a href="#/heritage" data-i18n="pillars.heritage.cta">${t('pillars.heritage.cta')} &rarr;</a>
        </div>
      </div>
    </section>

    <!-- Timeline Preview -->
    <section class="section">
      <div class="section-eyebrow" data-i18n="timeline.eyebrow">${t('timeline.eyebrow')}</div>
      <h2 data-i18n="timeline.title">${t('timeline.title')}</h2>
      <div class="gold-divider"></div>
      <div class="timeline-preview">
        <a href="#/research/timeline" class="timeline-dot">
          <span class="year">1533</span>
          <span class="event">${t('era.early')}</span>
        </a>
        <a href="#/research/timeline" class="timeline-dot">
          <span class="year">1615</span>
          <span class="event">${t('era.jesuit')}</span>
        </a>
        <a href="#/research/timeline" class="timeline-dot">
          <span class="year">1651</span>
          <span class="event" data-i18n="timeline.event.1651">${t('timeline.event.1651')}</span>
        </a>
        <a href="#/research/timeline" class="timeline-dot">
          <span class="year">1833</span>
          <span class="event">${t('era.persecution')}</span>
        </a>
        <a href="#/research/timeline" class="timeline-dot">
          <span class="year">1988</span>
          <span class="event" data-i18n="timeline.event.1988">${t('timeline.event.1988')}</span>
        </a>
        <a href="#/research/timeline" class="timeline-dot">
          <span class="year">2016</span>
          <span class="event">${t('era.modern')}</span>
        </a>
      </div>
      <div style="margin-top: var(--space-lg);">
        <a href="#/research/timeline" class="btn-gold-ghost" data-i18n="timeline.cta">${t('timeline.cta')}</a>
      </div>
    </section>

    <!-- The Asia Trilogy -->
    <section class="section">
      <div class="section-eyebrow" data-i18n="trilogy.eyebrow">${t('trilogy.eyebrow')}</div>
      <h2 data-i18n="trilogy.title">${t('trilogy.title')}</h2>
      <div class="gold-divider"></div>
      <div class="trilogy-grid">
        <div class="trilogy-card">
          <div class="trilogy-name">宣研</div>
          <div class="trilogy-han">XuanYan</div>
          <div class="trilogy-country" data-i18n="trilogy.china">${t('trilogy.china')}</div>
          <div class="trilogy-stat" style="color: #D4A44C;" data-i18n="trilogy.china.stat">${t('trilogy.china.stat')}</div>
        </div>
        <div class="trilogy-card">
          <div class="trilogy-name">宣道</div>
          <div class="trilogy-han">Sendō</div>
          <div class="trilogy-country" data-i18n="trilogy.japan">${t('trilogy.japan')}</div>
          <div class="trilogy-stat" style="color: #C8323C;" data-i18n="trilogy.japan.stat">${t('trilogy.japan.stat')}</div>
        </div>
        <div class="trilogy-card current">
          <div class="trilogy-name">傳道</div>
          <div class="trilogy-han">TruyềnĐạo</div>
          <div class="trilogy-country" data-i18n="trilogy.vietnam">${t('trilogy.vietnam')}</div>
          <div class="trilogy-stat" style="color: var(--accent-cinnabar);" data-i18n="trilogy.vietnam.stat">${t('trilogy.vietnam.stat')}</div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    ${renderFooter()}
  `;
}
