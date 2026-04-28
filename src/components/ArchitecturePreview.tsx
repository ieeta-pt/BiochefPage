// Production preview shows the shipped pipeline in compact form:
// recipes → hub → registry → BioChef web app (WASM).
// Same visual vocabulary as the larger Architecture-page diagram, scaled down.
// Richer SimpleArchitectureDiagram / ArchitectureShowcase variants remain on
// disk for future-state work; they're just no longer mounted.

const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');
const withBase = (path: string) => `${base}/${path.replace(/^\//, '')}`;

export default function ArchitecturePreview() {
  return (
    <div className="card overflow-hidden p-6 md:p-8" id="architecture-preview">
      <div className="flex items-start justify-between gap-4 flex-wrap mb-6">
        <div className="max-w-xl">
          <p className="badge cursor-default">System map</p>
          <h3 className="text-xl font-semibold text-text mt-2 tracking-tight">
            How a tool reaches your browser
          </h3>
          <p className="text-sm text-text-secondary mt-2 leading-relaxed">
            A YAML recipe is built and signed by <code>biochef-hub</code>, published as a
            content-addressable bundle in the BioChef Registry, then fetched by digest and
            executed as WebAssembly inside your browser tab.
          </p>
        </div>
        <a className="btn btn-secondary whitespace-nowrap" href={withBase('/architecture')}>
          See full anatomy →
        </a>
      </div>

      <svg
        viewBox="0 0 1080 280"
        className="w-full h-auto block"
        role="img"
        aria-label="Compact BioChef pipeline: a YAML recipe is built and signed by biochef-hub, published to the BioChef Registry as a content-addressable bundle, then fetched by digest and run as WebAssembly inside the BioChef web app."
      >
        <defs>
          <pattern id="prev-grid" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="1.5" cy="1.5" r="0.7" fill="#94A3B8" opacity="0.28" />
          </pattern>
          <linearGradient id="prev-fade" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="white" stopOpacity="0" />
            <stop offset="0.08" stopColor="white" stopOpacity="1" />
            <stop offset="0.92" stopColor="white" stopOpacity="1" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <mask id="prev-mask"><rect width="1080" height="280" fill="url(#prev-fade)" /></mask>

          <filter id="prev-shadow" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
            <feOffset dx="0" dy="2" />
            <feComponentTransfer><feFuncA type="linear" slope="0.06" /></feComponentTransfer>
            <feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>

          <marker id="prev-or" markerWidth="8" markerHeight="8" refX="6.5" refY="4" orient="auto" markerUnits="userSpaceOnUse">
            <path d="M0 0 L8 4 L0 8 L2 4 Z" fill="#FF5722" />
          </marker>
          <marker id="prev-te" markerWidth="8" markerHeight="8" refX="6.5" refY="4" orient="auto" markerUnits="userSpaceOnUse">
            <path d="M0 0 L8 4 L0 8 L2 4 Z" fill="#009688" />
          </marker>
          <marker id="prev-bl" markerWidth="8" markerHeight="8" refX="6.5" refY="4" orient="auto" markerUnits="userSpaceOnUse">
            <path d="M0 0 L8 4 L0 8 L2 4 Z" fill="#2563EB" />
          </marker>
        </defs>

        {/* Background grid */}
        <g mask="url(#prev-mask)" opacity="0.5">
          <rect width="1080" height="280" fill="url(#prev-grid)" />
        </g>

        {/* Eyebrow numbers */}
        <g fontFamily="Roboto, Helvetica, Arial, sans-serif" fontSize="9" fontWeight="700" letterSpacing="0.22em">
          <text x="150" y="58" textAnchor="middle" fill="#E64A19">01</text>
          <text x="390" y="58" textAnchor="middle" fill="#00796B">02</text>
          <text x="630" y="58" textAnchor="middle" fill="#004D40">03</text>
          <text x="870" y="58" textAnchor="middle" fill="#1D4ED8">04</text>
        </g>

        {/* ============ STATION 1 — RECIPES ============ */}
        <g>
          <rect x="60" y="72" width="180" height="120" rx="16" fill="#FFFFFF" stroke="#FFAB91" strokeWidth="1.4" filter="url(#prev-shadow)" />
          <rect x="60" y="72" width="180" height="3" fill="#FF5722" />
          {/* Folded corner */}
          <path d="M 220 72 L 240 72 L 240 92 Z" fill="#FFCCBC" />
          <path d="M 220 72 L 240 92 L 220 92 Z" fill="#FFAB91" />
          {/* YAML lines */}
          <g fontFamily="JetBrains Mono, monospace" fontSize="10">
            <text x="78" y="108"><tspan fontWeight="700" fill="#FF5722">name</tspan><tspan fill="#525252">:</tspan><tspan dx="5" fill="#1A1A1A">aligner</tspan></text>
            <text x="78" y="128"><tspan fontWeight="700" fill="#FF5722">runtime</tspan><tspan fill="#525252">:</tspan><tspan dx="5" fill="#1A1A1A">wasm</tspan></text>
            <text x="78" y="148"><tspan fontWeight="700" fill="#FF5722">inputs</tspan><tspan fill="#525252">:</tspan></text>
            <text x="78" y="166" fill="#525252"><tspan>  - </tspan><tspan fill="#1A1A1A">reads.fastq</tspan></text>
          </g>
        </g>
        <text x="150" y="218" textAnchor="middle" fontFamily="Roboto, Helvetica, Arial, sans-serif" fontSize="14" fontWeight="700" fill="#1A1A1A">biochef-recipes</text>
        <text x="150" y="236" textAnchor="middle" fontFamily="Roboto, Helvetica, Arial, sans-serif" fontSize="10.5" fontWeight="500" fill="#525252">YAML source of truth</text>

        {/* ============ EDGE A ============ */}
        <g>
          <text x="270" y="123" textAnchor="middle" fontFamily="Roboto, Helvetica, Arial, sans-serif" fontSize="9.5" fontWeight="600" fill="#E64A19" letterSpacing="0.06em">push</text>
          <circle cx="242" cy="132" r="3" fill="#FF5722" />
          <line x1="248" y1="132" x2="294" y2="132" stroke="#FF5722" strokeWidth="1.8" strokeLinecap="round" markerEnd="url(#prev-or)" />
        </g>

        {/* ============ STATION 2 — HUB ============ */}
        <g>
          <rect x="300" y="72" width="180" height="120" rx="16" fill="#FFFFFF" stroke="#80CBC4" strokeWidth="1.4" filter="url(#prev-shadow)" />
          <rect x="300" y="72" width="180" height="3" fill="#009688" />
          {/* Pipeline track */}
          <line x1="324" y1="100" x2="324" y2="178" stroke="#009688" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
          {/* Steps */}
          <g fontFamily="Roboto, Helvetica, Arial, sans-serif" fontSize="10.5" fontWeight="500" fill="#1A1A1A">
            <circle cx="324" cy="102" r="5" fill="#009688" />
            <path d="M 321 102 L 323.2 104.2 L 327 100.2" stroke="white" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <text x="338" y="106">validate</text>

            <circle cx="324" cy="121" r="5" fill="#009688" />
            <path d="M 321 121 L 323.2 123.2 L 327 119.2" stroke="white" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <text x="338" y="125">build <tspan fontFamily="JetBrains Mono, monospace" fontSize="10" fill="#009688" dx="2">.wasm</tspan></text>

            <circle cx="324" cy="140" r="5" fill="#009688" />
            <path d="M 321 140 L 323.2 142.2 L 327 138.2" stroke="white" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <text x="338" y="144">test</text>

            <circle cx="324" cy="159" r="5" fill="#009688" />
            <path d="M 321 159 L 323.2 161.2 L 327 157.2" stroke="white" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <text x="338" y="163">SBOM <tspan fill="#94A3B8" dx="1">·</tspan> SLSA</text>

            <circle cx="324" cy="178" r="5" fill="#009688" />
            <path d="M 321 178 L 323.2 180.2 L 327 176.2" stroke="white" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <text x="338" y="182">cosign <tspan fill="#94A3B8" dx="1">·</tspan> publish</text>
          </g>
        </g>
        <text x="390" y="218" textAnchor="middle" fontFamily="Roboto, Helvetica, Arial, sans-serif" fontSize="14" fontWeight="700" fill="#1A1A1A">biochef-hub</text>
        <text x="390" y="236" textAnchor="middle" fontFamily="Roboto, Helvetica, Arial, sans-serif" fontSize="10.5" fontWeight="500" fill="#525252">CI on GitHub Actions</text>

        {/* ============ EDGE B ============ */}
        <g>
          <text x="510" y="123" textAnchor="middle" fontFamily="Roboto, Helvetica, Arial, sans-serif" fontSize="9.5" fontWeight="600" fill="#00796B" letterSpacing="0.06em">publish</text>
          <circle cx="482" cy="132" r="3" fill="#009688" />
          <line x1="488" y1="132" x2="534" y2="132" stroke="#009688" strokeWidth="1.8" strokeLinecap="round" markerEnd="url(#prev-te)" />
        </g>

        {/* ============ STATION 3 — REGISTRY ============ */}
        <g>
          <rect x="540" y="72" width="180" height="120" rx="16" fill="#FFFFFF" stroke="#80CBC4" strokeWidth="1.4" filter="url(#prev-shadow)" />
          <rect x="540" y="72" width="180" height="3" fill="#004D40" />
          {/* Lock */}
          <g transform="translate(692 84)">
            <path d="M 3 6 V 4 a 3.5 3.5 0 0 1 7 0 V 6" fill="none" stroke="#004D40" strokeWidth="1.3" strokeLinecap="round" />
            <rect x="1.5" y="6" width="10" height="7.5" rx="1.4" fill="#004D40" />
            <circle cx="6.5" cy="9.5" r="1" fill="white" />
          </g>
          {/* OCI layer pills */}
          <g>
            <rect x="556" y="106" width="148" height="22" rx="6" fill="#E0F2F1" stroke="#80CBC4" strokeWidth="1" />
            <circle cx="568" cy="117" r="2.5" fill="#009688" />
            <text x="578" y="121" fontFamily="Roboto, Helvetica, Arial, sans-serif" fontSize="10" fontWeight="600" fill="#1A1A1A">bundle.json</text>

            <rect x="556" y="134" width="148" height="22" rx="6" fill="#E0F2F1" stroke="#80CBC4" strokeWidth="1" />
            <circle cx="568" cy="145" r="2.5" fill="#009688" />
            <text x="578" y="149" fontFamily="Roboto, Helvetica, Arial, sans-serif" fontSize="10" fontWeight="600" fill="#1A1A1A">aligner.wasm</text>
            <text x="697" y="149" textAnchor="end" fontFamily="JetBrains Mono, monospace" fontSize="8" fill="#94A3B8">e3b…</text>

            <rect x="556" y="162" width="148" height="22" rx="6" fill="#E0F2F1" stroke="#80CBC4" strokeWidth="1" />
            <circle cx="568" cy="173" r="2.5" fill="#009688" />
            <text x="578" y="177" fontFamily="Roboto, Helvetica, Arial, sans-serif" fontSize="10" fontWeight="600" fill="#1A1A1A">SBOM + sig</text>
          </g>
        </g>
        <text x="630" y="218" textAnchor="middle" fontFamily="Roboto, Helvetica, Arial, sans-serif" fontSize="14" fontWeight="700" fill="#1A1A1A">BioChef Registry</text>
        <text x="630" y="236" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="10" fontWeight="500" fill="#004D40">registry.biochef.app</text>

        {/* ============ EDGE C (dashed) ============ */}
        <g>
          <text x="750" y="123" textAnchor="middle" fontFamily="Roboto, Helvetica, Arial, sans-serif" fontSize="9.5" fontWeight="600" fontStyle="italic" fill="#1D4ED8" letterSpacing="0.06em">fetch</text>
          <circle cx="722" cy="132" r="3" fill="#2563EB" />
          <line x1="728" y1="132" x2="774" y2="132" stroke="#2563EB" strokeWidth="1.8" strokeLinecap="round" strokeDasharray="4 3" markerEnd="url(#prev-bl)" />
        </g>

        {/* ============ STATION 4 — BROWSER ============ */}
        <g>
          <rect x="780" y="72" width="180" height="120" rx="16" fill="#FFFFFF" stroke="#A6C8FB" strokeWidth="1.4" filter="url(#prev-shadow)" />
          <rect x="780" y="72" width="180" height="3" fill="#2563EB" />
          {/* Browser chrome */}
          <circle cx="794" cy="91" r="2.8" fill="#FF6B6B" />
          <circle cx="804" cy="91" r="2.8" fill="#FFD166" />
          <circle cx="814" cy="91" r="2.8" fill="#06D6A0" />
          <rect x="826" y="84" width="118" height="14" rx="7" fill="#F8FAFC" stroke="#DBEAFE" strokeWidth="1" />
          <text x="885" y="94" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="8" fill="#525252">ieeta-pt.github.io</text>
          <line x1="780" y1="106" x2="960" y2="106" stroke="#DBEAFE" strokeWidth="1" />
          {/* WASM module pill */}
          <rect x="800" y="118" width="140" height="24" rx="12" fill="#EFF6FF" stroke="#93C5FD" strokeWidth="1" />
          <circle cx="813" cy="130" r="2.6" fill="#2563EB">
            <animate attributeName="opacity" values="0.35;1;0.35" dur="2.2s" repeatCount="indefinite" />
          </circle>
          <text x="870" y="134" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="10" fontWeight="500" fill="#1D4ED8">aligner.wasm</text>
          {/* Output bars */}
          <g>
            <rect x="800" y="152" width="140" height="2.5" rx="1.25" fill="#DBEAFE" />
            <rect x="800" y="152" width="106" height="2.5" rx="1.25" fill="#60A5FA" />
            <rect x="800" y="160" width="140" height="2.5" rx="1.25" fill="#DBEAFE" />
            <rect x="800" y="160" width="82" height="2.5" rx="1.25" fill="#60A5FA" />
            <rect x="800" y="168" width="140" height="2.5" rx="1.25" fill="#DBEAFE" />
            <rect x="800" y="168" width="124" height="2.5" rx="1.25" fill="#60A5FA" />
          </g>
          <text x="870" y="184" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="8" fill="#16A34A">▸ executing in WebAssembly</text>
        </g>
        <text x="870" y="218" textAnchor="middle" fontFamily="Roboto, Helvetica, Arial, sans-serif" fontSize="14" fontWeight="700" fill="#1A1A1A">BioChef web app</text>
        <text x="870" y="236" textAnchor="middle" fontFamily="Roboto, Helvetica, Arial, sans-serif" fontSize="10.5" fontWeight="500" fill="#525252">runs entirely in your tab</text>

        {/* Bottom rail */}
        <line x1="80" y1="262" x2="1000" y2="262" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="2 5" />
        <circle cx="80" cy="262" r="2" fill="#CBD5E1" />
        <circle cx="1000" cy="262" r="2" fill="#CBD5E1" />
      </svg>
    </div>
  );
}
