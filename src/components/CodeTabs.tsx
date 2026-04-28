import { useState } from 'react';
import clsx from 'clsx';

interface Tab {
  id: string;
  label: string;
  language: string;
  code: string;
}

// Map a language label to a tiny mono glyph rendered inside the tab.
// Keeps the visual lightweight (no dependency on icon set, no images).
function languageMark(language: string): string {
  switch (language.toLowerCase()) {
    case 'yaml':
    case 'yml':
      return '·yml';
    case 'bash':
    case 'sh':
      return '$_';
    case 'json':
      return '{ }';
    case 'tsx':
    case 'ts':
      return 'TS';
    case 'js':
      return 'JS';
    default:
      return '· ·';
  }
}

export default function CodeTabs({ tabs }: { tabs: Tab[] }) {
  const [active, setActive] = useState(tabs[0]?.id);
  const [copied, setCopied] = useState(false);
  const activeTab = tabs.find((t) => t.id === active) ?? tabs[0];

  const copy = (code: string) => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    }
  };

  // The whole component is one editor surface: a dark slab with a
  // file-tab strip on top. Tabs visually merge into the slab, the way an
  // IDE shows open files.
  return (
    <div className="rounded-xl bg-[#0F172A] shadow-lg overflow-hidden ring-1 ring-black/5">
      {/* Tab strip + window chrome */}
      <div className="flex items-end pl-3 pt-3 bg-[#0B1424] border-b border-white/[0.06] gap-0.5 overflow-x-auto">
        {/* faux traffic lights, dialled down so they don't shout */}
        <div className="flex items-center gap-1.5 pr-3 pb-2.5 self-end opacity-70">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF6B6B]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#FFD166]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#06D6A0]" />
        </div>

        {tabs.map((tab) => {
          const isActive = active === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className={clsx(
                'group relative flex items-center gap-2 pl-3 pr-3.5 py-2 text-xs font-medium tracking-tight transition-colors rounded-t-md whitespace-nowrap',
                isActive
                  ? 'bg-[#0F172A] text-white'
                  : 'bg-transparent text-white/50 hover:text-white/80 hover:bg-white/[0.04]'
              )}
              aria-pressed={isActive}
            >
              <span
                className={clsx(
                  'font-mono text-[10px] font-semibold tracking-wider',
                  isActive ? 'text-brand-200' : 'text-white/35 group-hover:text-white/60'
                )}
              >
                {languageMark(tab.language)}
              </span>
              <span>{tab.label}</span>

              {/* active indicator: small bottom rule that bleeds into the slab */}
              {isActive && (
                <span className="absolute left-2 right-2 -bottom-px h-px bg-[#0F172A]" />
              )}
            </button>
          );
        })}

        {/* Copy button anchored to the right of the strip */}
        <div className="ml-auto pr-3 pb-2 self-end">
          <button
            onClick={() => activeTab && copy(activeTab.code)}
            className={clsx(
              'inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-md transition-all',
              copied
                ? 'bg-[#06D6A0]/15 text-[#06D6A0] ring-1 ring-[#06D6A0]/30'
                : 'bg-white/[0.06] text-white/65 hover:bg-white/[0.12] hover:text-white ring-1 ring-white/10'
            )}
            aria-label={`Copy ${activeTab?.label ?? ''} code to clipboard`}
          >
            {copied ? (
              <>
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Copied
              </>
            ) : (
              <>
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="9" y="9" width="11" height="11" rx="1.5" />
                  <path d="M5 15V5a2 2 0 0 1 2-2h10" />
                </svg>
                Copy
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code surface */}
      {activeTab && (
        <pre className="m-0 p-5 md:p-6 overflow-x-auto text-[13px] leading-[1.65] font-mono text-white/85">
          <code>{activeTab.code}</code>
        </pre>
      )}

      {/* Bottom status strip — tiny but signals intent and completes the editor frame */}
      <div className="flex items-center justify-between gap-3 px-4 py-2 bg-[#0B1424] border-t border-white/[0.06] text-[10px] font-mono uppercase tracking-[0.12em] text-white/35">
        <span>{activeTab?.language}</span>
        <span>{activeTab ? activeTab.code.split('\n').length : 0} lines</span>
      </div>
    </div>
  );
}
