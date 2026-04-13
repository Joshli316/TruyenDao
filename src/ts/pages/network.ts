import { t, getLang } from '../i18n';
import { setCleanup } from '../main';

declare const d3: any;

interface BilingualText {
  en: string;
  vi: string;
}

interface NetworkNode {
  id: string;
  name: BilingualText;
  type: 'missionary' | 'vietnamese' | 'organization' | 'place';
  era: string;
  dates?: string;
  note?: BilingualText;
  // d3 force simulation adds these
  x?: number;
  y?: number;
  fx?: number | null;
  fy?: number | null;
}

interface NetworkLink {
  source: string | NetworkNode;
  target: string | NetworkNode;
  type: string;
  label: BilingualText;
}

interface NetworkData {
  nodes: NetworkNode[];
  links: NetworkLink[];
}

const NODE_COLORS: Record<string, string> = {
  missionary: '#C9A84C',
  vietnamese: '#9B2335',
  organization: '#B8A898',
  place: '#6B8FA8',
};

const LINK_COLORS: Record<string, string> = {
  sent_by: '#B8A898',
  trained_by: '#C9A84C',
  founded: '#6B8FA8',
  partnered_with: '#7A9B6E',
  martyred_at: '#9B2335',
  ordained_by: '#C9A84C',
};

const ERA_LABELS: Record<string, BilingualText> = {
  jesuit: { en: 'Jesuit Era', vi: 'Th\u1eddi k\u1ef3 D\u00f2ng T\u00ean' },
  mep: { en: 'MEP Era', vi: 'Th\u1eddi k\u1ef3 MEP' },
  colonial: { en: 'Colonial Period', vi: 'Th\u1eddi k\u1ef3 thu\u1ed9c \u0111\u1ecba' },
  partition: { en: 'Partition & War', vi: 'Chia c\u1eaft & Chi\u1ebfn tranh' },
  communist: { en: 'Communist Era', vi: 'Th\u1eddi k\u1ef3 C\u1ed9ng s\u1ea3n' },
  modern: { en: 'Modern Era', vi: 'Th\u1eddi k\u1ef3 hi\u1ec7n \u0111\u1ea1i' },
};

const NODE_TYPE_LABELS: Record<string, BilingualText> = {
  missionary: { en: 'Missionaries', vi: 'Nh\u00e0 truy\u1ec1n gi\u00e1o' },
  vietnamese: { en: 'Vietnamese', vi: 'Ng\u01b0\u1eddi Vi\u1ec7t' },
  organization: { en: 'Organizations', vi: 'T\u1ed5 ch\u1ee9c' },
  place: { en: 'Places', vi: '\u0110\u1ecba \u0111i\u1ec3m' },
};

function loadD3(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof d3 !== 'undefined') {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/d3@7/dist/d3.min.js';
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load D3.js'));
    document.head.appendChild(script);
  });
}

export async function renderNetwork(): Promise<void> {
  const app = document.getElementById('app');
  if (!app) return;

  const lang = getLang();
  const loc = (obj: BilingualText) => obj[lang] || obj.en;

  // Show loading
  app.innerHTML = `
    <div class="network-container" style="padding-top: calc(64px + var(--space-2xl)); padding-left: var(--space-lg); padding-right: var(--space-lg);">
      <div class="section-eyebrow">${lang === 'vi' ? 'M\u1ea1ng l\u01b0\u1edbi' : 'Network'}</div>
      <h1 style="font-family: var(--font-display); color: var(--text-primary); font-size: 2.5rem; margin-bottom: var(--space-sm);">
        ${lang === 'vi' ? 'M\u1ea1ng L\u01b0\u1edbi Truy\u1ec1n Gi\u00e1o' : 'Missionary Network'}
        <span style="font-size: 1rem; color: var(--text-tertiary); margin-left: var(--space-sm);">
          ${lang === 'vi' ? 'Missionary Network' : 'M\u1ea1ng L\u01b0\u1edbi Truy\u1ec1n Gi\u00e1o'}
        </span>
      </h1>
      <div class="skeleton" style="height: 400px;"></div>
    </div>
  `;

  // Load D3 and data in parallel
  const [, dataMod] = await Promise.all([
    loadD3(),
    import('../../data/network.json'),
  ]);

  const data: NetworkData = dataMod.default;

  // Count links per node for radius calculation
  const linkCounts: Record<string, number> = {};
  data.nodes.forEach(n => { linkCounts[n.id] = 0; });
  data.links.forEach(l => {
    const sid = typeof l.source === 'string' ? l.source : l.source.id;
    const tid = typeof l.target === 'string' ? l.target : l.target.id;
    linkCounts[sid] = (linkCounts[sid] || 0) + 1;
    linkCounts[tid] = (linkCounts[tid] || 0) + 1;
  });

  function nodeRadius(id: string): number {
    const count = linkCounts[id] || 0;
    return Math.min(20, Math.max(8, 6 + count * 1.5));
  }

  // Era and type filter state
  const eras = Object.keys(ERA_LABELS);
  const nodeTypes = Object.keys(NODE_TYPE_LABELS);
  const activeEras = new Set(eras);
  const activeTypes = new Set(nodeTypes);

  // Render full page
  app.innerHTML = `
    <div class="network-container" style="padding-top: calc(64px + var(--space-2xl)); padding-left: var(--space-lg); padding-right: var(--space-lg);">
      <div class="section-eyebrow">${lang === 'vi' ? 'M\u1ea1ng l\u01b0\u1edbi' : 'Network'}</div>
      <h1 style="font-family: var(--font-display); color: var(--text-primary); font-size: 2.5rem; margin-bottom: var(--space-sm);">
        ${lang === 'vi' ? 'M\u1ea1ng L\u01b0\u1edbi Truy\u1ec1n Gi\u00e1o' : 'Missionary Network'}
        <span style="font-size: 1rem; color: var(--text-tertiary); margin-left: var(--space-sm);">
          ${lang === 'vi' ? 'Missionary Network' : 'M\u1ea1ng L\u01b0\u1edbi Truy\u1ec1n Gi\u00e1o'}
        </span>
      </h1>

      <div id="network-filters" style="display: flex; flex-wrap: wrap; gap: var(--space-md); margin-bottom: var(--space-lg); align-items: flex-start;">
        <div style="display: flex; flex-wrap: wrap; gap: var(--space-sm); align-items: center;">
          <span style="font-family: var(--font-body); font-size: 12px; color: var(--text-tertiary); text-transform: uppercase; letter-spacing: 0.05em; margin-right: var(--space-xs);">
            ${lang === 'vi' ? 'Th\u1eddi k\u1ef3' : 'Era'}
          </span>
          ${eras.map(era => `
            <label class="network-filter-chip" style="display: inline-flex; align-items: center; gap: 4px; cursor: pointer; padding: 4px 10px; border-radius: var(--radius-full); border: 1px solid var(--border-default); font-family: var(--font-body); font-size: 12px; color: var(--text-secondary); transition: all 0.2s;">
              <input type="checkbox" data-filter="era" data-value="${era}" checked style="accent-color: var(--accent-gold); width: 12px; height: 12px;">
              ${loc(ERA_LABELS[era])}
            </label>
          `).join('')}
        </div>
        <div style="display: flex; flex-wrap: wrap; gap: var(--space-sm); align-items: center;">
          <span style="font-family: var(--font-body); font-size: 12px; color: var(--text-tertiary); text-transform: uppercase; letter-spacing: 0.05em; margin-right: var(--space-xs);">
            ${lang === 'vi' ? 'Lo\u1ea1i' : 'Type'}
          </span>
          ${nodeTypes.map(type => `
            <label class="network-filter-chip" style="display: inline-flex; align-items: center; gap: 4px; cursor: pointer; padding: 4px 10px; border-radius: var(--radius-full); border: 1px solid var(--border-default); font-family: var(--font-body); font-size: 12px; color: var(--text-secondary); transition: all 0.2s;">
              <input type="checkbox" data-filter="type" data-value="${type}" checked style="accent-color: ${NODE_COLORS[type]}; width: 12px; height: 12px;">
              <span style="display: inline-block; width: 8px; height: 8px; border-radius: 50%; background: ${NODE_COLORS[type]};"></span>
              ${loc(NODE_TYPE_LABELS[type])}
            </label>
          `).join('')}
        </div>
      </div>

      <div id="network-graph-wrapper" style="position: relative; width: 100%; height: calc(100vh - 200px); min-height: 400px;">
        <div id="network-svg-container" style="width: 100%; height: 100%;"></div>
        <div id="network-detail" style="display: none; position: absolute; top: var(--space-md); right: var(--space-md); width: 300px; max-height: calc(100% - 32px); overflow-y: auto; background: var(--bg-surface); border: 1px solid var(--border-default); border-radius: var(--radius-md); padding: var(--space-lg); font-family: var(--font-body); z-index: 10;">
        </div>
      </div>
    </div>

    <footer class="footer">
      <div class="footer-inner">
        <div class="footer-mission" data-i18n="footer.mission">${t('footer.mission')}</div>
        <div class="footer-links">
          <a href="#/about" data-i18n="footer.fc">${t('footer.fc')}</a>
        </div>
      </div>
      <div class="footer-tagline" data-i18n="footer.tagline">${t('footer.tagline')}</div>
    </footer>
  `;

  // Build the SVG
  const container = document.getElementById('network-svg-container')!;
  const width = container.clientWidth;
  const height = container.clientHeight;

  const svg = d3.select('#network-svg-container')
    .append('svg')
    .attr('width', '100%')
    .attr('height', '100%')
    .attr('viewBox', `0 0 ${width} ${height}`)
    .style('background', 'transparent');

  // Zoom group
  const g = svg.append('g');

  const zoomBehavior = d3.zoom()
    .scaleExtent([0.2, 5])
    .on('zoom', (event: any) => {
      g.attr('transform', event.transform);
    });

  svg.call(zoomBehavior);

  // Prepare mutable copies
  const nodes: NetworkNode[] = data.nodes.map(n => ({ ...n }));
  const links: NetworkLink[] = data.links.map(l => ({ ...l }));

  // Force simulation
  const simulation = d3.forceSimulation(nodes)
    .force('link', d3.forceLink(links).id((d: NetworkNode) => d.id).distance(80))
    .force('charge', d3.forceManyBody().strength(-200))
    .force('center', d3.forceCenter(width / 2, height / 2))
    .force('collide', d3.forceCollide().radius(30));

  // Draw links
  const linkGroup = g.append('g').attr('class', 'links');
  let linkElements = linkGroup.selectAll('line')
    .data(links)
    .join('line')
    .attr('stroke', (d: NetworkLink) => LINK_COLORS[d.type] || '#5C484E')
    .attr('stroke-opacity', 0.4)
    .attr('stroke-width', 1.5);

  // Draw nodes
  const nodeGroup = g.append('g').attr('class', 'nodes');
  let nodeElements = nodeGroup.selectAll('g')
    .data(nodes)
    .join('g')
    .style('cursor', 'pointer');

  // Node circles
  nodeElements.append('circle')
    .attr('r', (d: NetworkNode) => nodeRadius(d.id))
    .attr('fill', (d: NetworkNode) => NODE_COLORS[d.type] || '#5C484E')
    .attr('stroke', 'var(--bg-base)')
    .attr('stroke-width', 1.5)
    .style('transition', 'opacity 0.2s');

  // Node labels
  nodeElements.append('text')
    .text((d: NetworkNode) => loc(d.name))
    .attr('dx', (d: NetworkNode) => nodeRadius(d.id) + 4)
    .attr('dy', 4)
    .attr('font-family', 'var(--font-body)')
    .attr('font-size', '11px')
    .attr('fill', 'var(--text-secondary)')
    .attr('pointer-events', 'none');

  // Drag behavior
  function dragstarted(event: any, d: NetworkNode): void {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }

  function dragged(event: any, d: NetworkNode): void {
    d.fx = event.x;
    d.fy = event.y;
  }

  function dragended(event: any, d: NetworkNode): void {
    if (!event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }

  nodeElements.call(
    d3.drag()
      .on('start', dragstarted)
      .on('drag', dragged)
      .on('end', dragended)
  );

  // Tick handler
  simulation.on('tick', () => {
    linkElements
      .attr('x1', (d: any) => d.source.x)
      .attr('y1', (d: any) => d.source.y)
      .attr('x2', (d: any) => d.target.x)
      .attr('y2', (d: any) => d.target.y);

    nodeElements.attr('transform', (d: NetworkNode) => `translate(${d.x},${d.y})`);
  });

  // Hover: highlight connected nodes and links, dim others
  function getConnected(nodeId: string): { nodeIds: Set<string>; linkIndices: Set<number> } {
    const nodeIds = new Set<string>([nodeId]);
    const linkIndices = new Set<number>();
    links.forEach((l, i) => {
      const sid = typeof l.source === 'object' ? (l.source as NetworkNode).id : l.source;
      const tid = typeof l.target === 'object' ? (l.target as NetworkNode).id : l.target;
      if (sid === nodeId || tid === nodeId) {
        nodeIds.add(sid);
        nodeIds.add(tid);
        linkIndices.add(i);
      }
    });
    return { nodeIds, linkIndices };
  }

  nodeElements.on('mouseenter', (_event: any, d: NetworkNode) => {
    const { nodeIds, linkIndices } = getConnected(d.id);

    nodeElements.select('circle')
      .attr('opacity', (n: NetworkNode) => nodeIds.has(n.id) ? 1 : 0.15);
    nodeElements.select('text')
      .attr('opacity', (n: NetworkNode) => nodeIds.has(n.id) ? 1 : 0.15);

    linkElements
      .attr('stroke-opacity', (_l: NetworkLink, i: number) => linkIndices.has(i) ? 0.8 : 0.05);
  });

  nodeElements.on('mouseleave', () => {
    nodeElements.select('circle').attr('opacity', 1);
    nodeElements.select('text').attr('opacity', 1);
    linkElements.attr('stroke-opacity', 0.4);
  });

  // Click: show detail panel
  const detailPanel = document.getElementById('network-detail')!;

  nodeElements.on('click', (_event: any, d: NetworkNode) => {
    _event.stopPropagation();

    // Find all connections
    const connections: { node: NetworkNode; label: string; direction: string }[] = [];
    links.forEach(l => {
      const source = l.source as NetworkNode;
      const target = l.target as NetworkNode;
      if (source.id === d.id) {
        connections.push({
          node: target,
          label: loc(l.label),
          direction: '\u2192',
        });
      } else if (target.id === d.id) {
        connections.push({
          node: source,
          label: loc(l.label),
          direction: '\u2190',
        });
      }
    });

    const typeLabel = loc(NODE_TYPE_LABELS[d.type] || { en: d.type, vi: d.type });
    const eraLabel = ERA_LABELS[d.era] ? loc(ERA_LABELS[d.era]) : d.era;
    const noteHtml = d.note ? `<p style="font-size: 13px; color: var(--text-secondary); margin-top: var(--space-sm); font-style: italic;">${loc(d.note)}</p>` : '';

    detailPanel.style.display = 'block';
    detailPanel.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: var(--space-md);">
        <div>
          <div style="display: inline-block; width: 10px; height: 10px; border-radius: 50%; background: ${NODE_COLORS[d.type]}; margin-right: 6px;"></div>
          <span style="font-size: 11px; color: var(--text-tertiary); text-transform: uppercase; letter-spacing: 0.05em;">${typeLabel}</span>
        </div>
        <button id="network-detail-close" style="background: none; border: none; color: var(--text-tertiary); cursor: pointer; font-size: 18px; line-height: 1; padding: 0;">&times;</button>
      </div>
      <h3 style="font-family: var(--font-display); font-size: 20px; color: var(--text-primary); margin: 0 0 var(--space-xs) 0;">${loc(d.name)}</h3>
      ${d.dates ? `<div style="font-family: var(--font-mono); font-size: 13px; color: var(--accent-gold); margin-bottom: var(--space-xs);">${d.dates}</div>` : ''}
      <div style="font-size: 12px; color: var(--text-tertiary); margin-bottom: var(--space-sm);">${eraLabel}</div>
      ${noteHtml}
      ${connections.length > 0 ? `
        <div style="margin-top: var(--space-md); padding-top: var(--space-md); border-top: 1px solid var(--border-subtle);">
          <div style="font-size: 11px; color: var(--accent-gold); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: var(--space-sm);">
            ${lang === 'vi' ? 'K\u1ebft n\u1ed1i' : 'Connections'} (${connections.length})
          </div>
          <div style="display: flex; flex-direction: column; gap: var(--space-xs);">
            ${connections.map(c => `
              <div style="font-size: 13px; color: var(--text-secondary); display: flex; align-items: baseline; gap: 6px;">
                <span style="color: var(--text-tertiary); flex-shrink: 0;">${c.direction}</span>
                <span>
                  <span style="color: var(--text-primary);">${loc(c.node.name)}</span>
                  <span style="color: var(--text-tertiary); font-size: 11px;"> ${c.label}</span>
                </span>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}
    `;

    document.getElementById('network-detail-close')?.addEventListener('click', () => {
      detailPanel.style.display = 'none';
    });
  });

  // Click on background to close detail
  svg.on('click', () => {
    detailPanel.style.display = 'none';
  });

  // Filter logic
  const filtersEl = document.getElementById('network-filters');
  if (filtersEl) {
    filtersEl.addEventListener('change', (e: Event) => {
      const input = e.target as HTMLInputElement;
      if (!input.dataset.filter) return;

      const filterType = input.dataset.filter;
      const value = input.dataset.value!;
      const checked = input.checked;

      if (filterType === 'era') {
        if (checked) activeEras.add(value);
        else activeEras.delete(value);
      } else if (filterType === 'type') {
        if (checked) activeTypes.add(value);
        else activeTypes.delete(value);
      }

      // Update visibility
      nodeElements
        .attr('display', (d: NetworkNode) =>
          activeEras.has(d.era) && activeTypes.has(d.type) ? null : 'none'
        );

      linkElements
        .attr('display', (l: NetworkLink) => {
          const source = l.source as NetworkNode;
          const target = l.target as NetworkNode;
          const sourceVisible = activeEras.has(source.era) && activeTypes.has(source.type);
          const targetVisible = activeEras.has(target.era) && activeTypes.has(target.type);
          return sourceVisible && targetVisible ? null : 'none';
        });
    });
  }

  // Cleanup when navigating away
  setCleanup(() => {
    simulation.stop();
  });
}
