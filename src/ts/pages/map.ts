import { t, getLang } from '../i18n';
import { setCleanup } from '../main';
import { renderFooter } from '../shared/footer';
import { setPageMeta } from '../shared/page-meta';

declare const L: any;

interface MapPoint {
  lat: number;
  lng: number;
  year: number;
  type: 'catholic' | 'protestant' | 'both';
  name: { en: string; vi: string };
  description: { en: string; vi: string };
}

function loadLeafletCSS(): void {
  if (document.getElementById('leaflet-css')) return;
  const link = document.createElement('link');
  link.id = 'leaflet-css';
  link.rel = 'stylesheet';
  link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
  link.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
  link.crossOrigin = '';
  document.head.appendChild(link);
}

function loadLeafletJS(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof L !== 'undefined') {
      resolve();
      return;
    }
    if (document.getElementById('leaflet-js')) {
      // Script tag exists but L not yet defined — wait for it
      const existing = document.getElementById('leaflet-js') as HTMLScriptElement;
      existing.addEventListener('load', () => resolve());
      existing.addEventListener('error', () => reject(new Error('Failed to load Leaflet')));
      return;
    }
    const script = document.createElement('script');
    script.id = 'leaflet-js';
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.integrity = 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=';
    script.crossOrigin = '';
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load Leaflet'));
    document.head.appendChild(script);
  });
}

const COLORS = {
  catholic: '#9B2335',
  protestant: '#C9A84C',
  both: '#9B2335',
} as const;

const TYPE_LABELS = {
  en: { catholic: 'Catholic', protestant: 'Protestant', both: 'Both' },
  vi: { catholic: 'Công giáo', protestant: 'Tin lành', both: 'Cả hai' },
} as const;

const PAGE_TITLE = { en: 'Animated Spread Map', vi: 'Bản đồ lan tỏa động' };

export async function renderMap(): Promise<void> {
  const app = document.getElementById('app');
  if (!app) return;
  setPageMeta({ titleKey: 'meta.map.title', descKey: 'meta.map.description' });

  const lang = getLang();
  const loc = (obj: { en: string; vi: string }) => obj[lang] || obj.en;

  // Show loading state
  app.innerHTML = `
    <div class="map-page" style="padding-top: calc(64px + var(--space-2xl)); padding-left: var(--space-lg); padding-right: var(--space-lg);">
      <div class="section-eyebrow">${t('nav.research')}</div>
      <h1 style="font-family: var(--font-serif); color: var(--text-primary); margin-bottom: var(--space-md);">${loc(PAGE_TITLE)}</h1>
      <div class="skeleton" style="height: calc(100vh - 200px);"></div>
    </div>
  `;

  // Load dependencies in parallel
  loadLeafletCSS();
  const [mod] = await Promise.all([
    import('../../data/map-data.json'),
    loadLeafletJS(),
  ]);

  const points = mod.default as MapPoint[];

  // Compute year range from data
  const years = points.map(p => p.year);
  const minYear = Math.min(...years, 1533);
  const maxYear = Math.max(...years, 2026);

  // Render page layout
  app.innerHTML = `
    <div class="map-page" style="padding-top: calc(64px + var(--space-2xl)); padding-left: var(--space-lg); padding-right: var(--space-lg);">
      <div class="section-eyebrow">${t('nav.research')}</div>
      <h1 style="font-family: var(--font-serif); color: var(--text-primary); margin-bottom: var(--space-md);">${loc(PAGE_TITLE)}</h1>

      <div id="map-container" style="
        width: 100%;
        height: calc(100vh - 200px);
        border-radius: 8px;
        overflow: hidden;
        border: 1px solid var(--border-subtle);
        position: relative;
      "></div>

      <div class="map-controls" style="
        display: flex;
        align-items: center;
        gap: var(--space-md);
        padding: var(--space-md) 0;
        flex-wrap: wrap;
      ">
        <button id="map-play-btn" style="
          background: var(--accent-cinnabar);
          color: var(--text-primary);
          border: none;
          border-radius: 6px;
          padding: 8px 20px;
          cursor: pointer;
          font-family: var(--font-sans);
          font-size: 14px;
          font-weight: 600;
          white-space: nowrap;
          transition: background 0.2s;
        ">&#9654; ${lang === 'vi' ? 'Phát' : 'Play'}</button>

        <input
          type="range"
          id="map-timeline-slider"
          min="${minYear}"
          max="${maxYear}"
          value="${minYear}"
          step="1"
          style="flex: 1; min-width: 200px;"
        />

        <div id="map-year-display" style="
          font-family: var(--font-mono);
          font-size: 24px;
          font-weight: 700;
          color: var(--accent-cinnabar);
          min-width: 70px;
          text-align: right;
        ">${minYear}</div>
      </div>

      <div class="map-legend" style="
        display: flex;
        gap: var(--space-lg);
        padding: var(--space-sm) 0 var(--space-lg);
        flex-wrap: wrap;
      ">
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="
            display: inline-block;
            width: 14px;
            height: 14px;
            border-radius: 50%;
            background: #9B2335;
          "></span>
          <span style="color: var(--text-secondary); font-size: 14px;">${TYPE_LABELS[lang]?.catholic || TYPE_LABELS.en.catholic}</span>
        </div>
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="
            display: inline-block;
            width: 14px;
            height: 14px;
            border-radius: 50%;
            background: #C9A84C;
          "></span>
          <span style="color: var(--text-secondary); font-size: 14px;">${TYPE_LABELS[lang]?.protestant || TYPE_LABELS.en.protestant}</span>
        </div>
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="
            display: inline-block;
            width: 14px;
            height: 14px;
            border-radius: 50%;
            background: linear-gradient(135deg, #9B2335 50%, #C9A84C 50%);
          "></span>
          <span style="color: var(--text-secondary); font-size: 14px;">${TYPE_LABELS[lang]?.both || TYPE_LABELS.en.both}</span>
        </div>
      </div>
    </div>

    ${renderFooter()}

    <style>
      #map-timeline-slider {
        -webkit-appearance: none;
        appearance: none;
        height: 6px;
        background: var(--bg-surface);
        border-radius: 3px;
        outline: none;
      }
      #map-timeline-slider::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 18px;
        height: 18px;
        border-radius: 50%;
        background: var(--accent-cinnabar);
        cursor: pointer;
        border: 2px solid var(--text-primary);
        transition: transform 0.15s;
      }
      #map-timeline-slider::-webkit-slider-thumb:hover {
        transform: scale(1.2);
      }
      #map-timeline-slider::-moz-range-thumb {
        width: 18px;
        height: 18px;
        border-radius: 50%;
        background: var(--accent-cinnabar);
        cursor: pointer;
        border: 2px solid var(--text-primary);
      }
      #map-timeline-slider::-webkit-slider-runnable-track {
        height: 6px;
        border-radius: 3px;
        background: linear-gradient(
          to right,
          var(--accent-cinnabar) 0%,
          var(--accent-cinnabar) var(--slider-pct, 0%),
          var(--bg-surface) var(--slider-pct, 0%),
          var(--bg-surface) 100%
        );
      }
      #map-timeline-slider::-moz-range-track {
        height: 6px;
        border-radius: 3px;
        background: var(--bg-surface);
      }
      #map-timeline-slider::-moz-range-progress {
        height: 6px;
        border-radius: 3px;
        background: var(--accent-cinnabar);
      }
      #map-play-btn:hover {
        background: var(--accent-cinnabar-hover) !important;
      }
      #map-play-btn:active {
        background: var(--accent-cinnabar-pressed) !important;
      }
      .leaflet-popup-content-wrapper {
        background: var(--bg-surface) !important;
        color: var(--text-primary) !important;
        border: 1px solid var(--border-subtle) !important;
        border-radius: 8px !important;
        box-shadow: 0 4px 20px rgba(0,0,0,0.5) !important;
      }
      .leaflet-popup-tip {
        background: var(--bg-surface) !important;
        border: 1px solid var(--border-subtle) !important;
      }
      .leaflet-popup-content {
        font-family: var(--font-sans) !important;
        font-size: 14px !important;
        line-height: 1.5 !important;
        margin: 12px 16px !important;
      }
      .leaflet-popup-content .popup-name {
        font-family: var(--font-serif);
        font-size: 16px;
        font-weight: 700;
        margin-bottom: 4px;
        color: var(--text-primary);
      }
      .leaflet-popup-content .popup-year {
        font-family: var(--font-mono);
        font-size: 13px;
        color: var(--accent-cinnabar);
        margin-bottom: 6px;
      }
      .leaflet-popup-content .popup-desc {
        color: var(--text-secondary);
        font-size: 13px;
      }
      .leaflet-popup-close-button {
        color: var(--text-tertiary) !important;
      }
      .leaflet-popup-close-button:hover {
        color: var(--text-primary) !important;
      }
      .leaflet-control-zoom a {
        background: var(--bg-surface) !important;
        color: var(--text-primary) !important;
        border-color: var(--border-subtle) !important;
      }
      .leaflet-control-zoom a:hover {
        background: var(--bg-base) !important;
      }
      .leaflet-control-attribution {
        background: rgba(18, 9, 11, 0.8) !important;
        color: var(--text-tertiary) !important;
        font-size: 11px !important;
      }
      .leaflet-control-attribution a {
        color: var(--text-tertiary) !important;
      }
    </style>
  `;

  // Initialize Leaflet map
  const map = L.map('map-container', {
    center: [16.5, 107.5],
    zoom: 6,
    zoomControl: true,
    scrollWheelZoom: true,
  });

  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 19,
  }).addTo(map);

  // Create markers
  interface MarkerEntry {
    marker: any;
    point: MapPoint;
  }

  const markers: MarkerEntry[] = points.map(point => {
    const isBoth = point.type === 'both';
    const color = isBoth ? COLORS.catholic : COLORS[point.type];

    const marker = L.circleMarker([point.lat, point.lng], {
      radius: 7,
      fillColor: color,
      color: isBoth ? COLORS.protestant : color,
      weight: isBoth ? 3 : 2,
      opacity: 0.9,
      fillOpacity: 0.75,
    });

    marker.bindPopup(`
      <div class="popup-name">${loc(point.name)}</div>
      <div class="popup-year">${point.year} &middot; ${TYPE_LABELS[lang]?.[point.type] || TYPE_LABELS.en[point.type]}</div>
      <div class="popup-desc">${loc(point.description)}</div>
    `);

    return { marker, point };
  });

  // Slider controls
  const slider = document.getElementById('map-timeline-slider') as HTMLInputElement;
  const yearDisplay = document.getElementById('map-year-display')!;
  const playBtn = document.getElementById('map-play-btn')!;

  function updateSliderTrack(): void {
    const pct = ((parseInt(slider.value) - minYear) / (maxYear - minYear)) * 100;
    slider.style.setProperty('--slider-pct', `${pct}%`);
  }

  function filterByYear(year: number): void {
    markers.forEach(({ marker, point }) => {
      if (point.year <= year) {
        if (!map.hasLayer(marker)) {
          marker.addTo(map);
        }
      } else {
        if (map.hasLayer(marker)) {
          map.removeLayer(marker);
        }
      }
    });
  }

  // Initial state: no markers visible
  filterByYear(minYear);
  updateSliderTrack();

  slider.addEventListener('input', () => {
    const year = parseInt(slider.value);
    yearDisplay.textContent = String(year);
    filterByYear(year);
    updateSliderTrack();
  });

  // Play animation
  let animationId: number | null = null;
  let isPlaying = false;

  function stopAnimation(): void {
    isPlaying = false;
    if (animationId !== null) {
      cancelAnimationFrame(animationId);
      animationId = null;
    }
    playBtn.innerHTML = `&#9654; ${lang === 'vi' ? 'Phát' : 'Play'}`;
  }

  function startAnimation(): void {
    isPlaying = true;
    playBtn.innerHTML = `&#9646;&#9646; ${lang === 'vi' ? 'Dừng' : 'Pause'}`;

    // If at end, restart from beginning
    if (parseInt(slider.value) >= maxYear) {
      slider.value = String(minYear);
      filterByYear(minYear);
      yearDisplay.textContent = String(minYear);
      updateSliderTrack();
    }

    let lastTime = 0;
    const msPerYear = 40; // Speed: 40ms per year

    function step(timestamp: number): void {
      if (!isPlaying) return;

      if (lastTime === 0) lastTime = timestamp;
      const elapsed = timestamp - lastTime;

      if (elapsed >= msPerYear) {
        const currentYear = parseInt(slider.value);
        const newYear = currentYear + 1;

        if (newYear > maxYear) {
          stopAnimation();
          return;
        }

        slider.value = String(newYear);
        yearDisplay.textContent = String(newYear);
        filterByYear(newYear);
        updateSliderTrack();
        lastTime = timestamp;
      }

      animationId = requestAnimationFrame(step);
    }

    animationId = requestAnimationFrame(step);
  }

  playBtn.addEventListener('click', () => {
    if (isPlaying) {
      stopAnimation();
    } else {
      startAnimation();
    }
  });

  // Cleanup on navigation
  setCleanup(() => {
    stopAnimation();
    map.remove();
  });
}
