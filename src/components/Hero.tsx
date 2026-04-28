import { motion, useReducedMotion } from 'framer-motion';

interface HeroProps {
  title: string;
  /** Optional accent line shown beneath the main title in brand teal. */
  titleHighlight?: string;
  subtitle: string;
  ctaPrimary: { label: string; href: string };
  ctaSecondary: { label: string; href: string };
}

/**
 * Clean MUI-style home page hero. Roboto display H1, plain subtitle,
 * filled primary + outlined secondary buttons. Sits on a subtle
 * grey-on-grey gradient that gives the hero presence without becoming
 * a heavy banner. Mirrors the visual mood of the live BioChef SPA.
 */
export default function Hero({ title, titleHighlight, subtitle, ctaPrimary, ctaSecondary }: HeroProps) {
  const reduced = useReducedMotion();
  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }
  });

  return (
    <section className="relative overflow-hidden bg-background">
      {/* Atmospheric layering, not a slab. The hero shares the body's grey
          canvas; two radials on top imply light and brand presence, then
          fade to transparent so the hero flows into the rest of the page
          with no visible seam.

          Layer 1: soft luminous wash centered above the viewport — the hero
          reads as "lit from above" instead of "painted white".
          Layer 2: brand teal in the top-right corner for quiet identity. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 95% 70% at 50% -10%, rgba(255,255,255,0.55), transparent 65%), radial-gradient(ellipse 55% 50% at 88% 0%, rgba(0,150,136,0.10), transparent 65%)'
        }}
      />

      <div className="container-main relative z-10 pt-28 md:pt-36 lg:pt-40 pb-20 md:pb-24 lg:pb-28">
        <div className="max-w-3xl">
          {/* Peer-reviewed inline link — no pill, no decoration, MUI-y restraint */}
          <motion.a
            {...fadeUp(0)}
            href="https://doi.org/10.1186/s12859-026-06431-1"
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 mb-7 text-xs font-medium text-text-secondary hover:text-text transition-colors"
          >
            <span className="relative flex h-1.5 w-1.5 flex-shrink-0">
              {!reduced && (
                <span className="absolute inline-flex h-full w-full rounded-full bg-brand opacity-50 animate-ping" />
              )}
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-brand" />
            </span>
            <span className="uppercase tracking-[0.12em]">Peer-reviewed</span>
            <span className="text-text-tertiary">·</span>
            <span>BMC Bioinformatics, 2026</span>
            <svg className="w-3 h-3 text-text-tertiary group-hover:text-text transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M7 17 17 7" />
              <path d="M7 7h10v10" />
            </svg>
          </motion.a>

          {/* Title */}
          <motion.h1
            {...fadeUp(0.05)}
            className="text-5xl sm:text-6xl md:text-7xl font-medium text-text tracking-tight leading-[1.05] mb-5 md:mb-6"
            style={{ textWrap: 'balance' } as React.CSSProperties}
          >
            <span className="block">{title}</span>
            {titleHighlight && (
              <span className="block text-brand">{titleHighlight}</span>
            )}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            {...fadeUp(0.12)}
            className="text-lg md:text-xl text-text-secondary max-w-2xl leading-relaxed mb-8 md:mb-10"
          >
            {subtitle}
          </motion.p>

          {/* CTAs — MUI filled + outlined */}
          <motion.div
            {...fadeUp(0.18)}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
          >
            <a
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-brand text-white text-sm font-medium uppercase tracking-[0.06em] rounded-md transition-all hover:bg-brand-dark hover:shadow-button focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
              href={ctaPrimary.href}
              target="_blank"
              rel="noreferrer"
            >
              {ctaPrimary.label}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
            <a
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 text-brand text-sm font-medium uppercase tracking-[0.06em] rounded-md border border-brand/40 hover:border-brand hover:bg-brand/[0.04] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
              href={ctaSecondary.href}
              target="_blank"
              rel="noreferrer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.426 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.868-.014-1.703-2.782.605-3.37-1.343-3.37-1.343-.454-1.154-1.11-1.461-1.11-1.461-.908-.62.069-.608.069-.608 1.003.07 1.531 1.031 1.531 1.031.892 1.53 2.341 1.088 2.91.833.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.748-1.027 2.748-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.847-2.338 4.695-4.566 4.943.359.31.678.92.678 1.855 0 1.338-.012 2.419-.012 2.748 0 .268.18.58.688.482A10.025 10.025 0 0 0 22 12.017C22 6.484 17.523 2 12 2Z" clipRule="evenodd" />
              </svg>
              {ctaSecondary.label}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
