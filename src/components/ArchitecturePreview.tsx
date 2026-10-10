import { useReducedMotion } from 'framer-motion';

// Production preview shows the shipped pipeline in compact form:
// recipes → hub → registry → BioChef web app (WASM).
// Same visual vocabulary as the larger Architecture-page diagram, scaled down.
// Richer SimpleArchitectureDiagram / ArchitectureShowcase variants remain on
// disk for future-state work; they're just no longer mounted.

const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');
const withBase = (path: string) => `${base}/${path.replace(/^\//, '')}`;

export default function ArchitecturePreview() {
  const reduced = useReducedMotion();
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

      {/* Mobile compact alternative — the SVG below renders at viewBox 1080x280
          and shrinks ~2.9× on a 375px phone, making its 8–14px text unreadable.
          Below md:, render a 4-step pipeline as text chips. */}
      <ol className="md:hidden flex flex-col gap-2.5">
        {[
          { num: '01', label: 'Recipes', detail: 'YAML source', tone: 'border-l-accent text-accent-800' },
          { num: '02', label: 'Hub', detail: 'CI · sign · publish', tone: 'border-l-brand text-brand-dark' },
          { num: '03', label: 'Registry', detail: 'Signed OCI bundles', tone: 'border-l-brand-800 text-brand-800' },
          { num: '04', label: 'Browser', detail: 'WebAssembly runtime', tone: 'border-l-tertiary text-tertiary' }
        ].map((step) => {
          const [borderClass, textClass] = step.tone.split(' ');
          return (
            <li key={step.num} className={`bg-background rounded-md border-l-2 ${borderClass} pl-3 py-2 flex items-center gap-3`}>
              <span className={`text-[10px] font-semibold tracking-[0.12em] uppercase ${textClass} w-6`}>{step.num}</span>
              <span className="text-sm font-medium text-text">{step.label}</span>
              <span className="text-xs text-text-tertiary ml-auto">{step.detail}</span>
            </li>
          );
        })}
      </ol>

      {/* Desktop / tablet — animated pipeline (10 s silent loop). */}
      <video
        className="hidden md:block w-full h-auto"
        src={withBase('/video/architecture.mp4')}
        poster={withBase('/video/architecture-poster.jpg')}
        autoPlay={!reduced}
        muted
        loop
        playsInline
        preload="metadata"
        aria-label="Compact BioChef pipeline: a YAML recipe is built and signed by biochef-hub, published to the BioChef Registry as a content-addressable bundle, then fetched by digest and run as WebAssembly inside the BioChef web app."
      />
    </div>
  );
}
