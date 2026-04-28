import { motion } from 'framer-motion';
import { CompassIcon, RuntimeIcon, ShieldCheckIcon, WorkflowIcon } from './Icons';

interface Pillar {
  title: string;
  description: string;
  icon: 'compass' | 'rocket' | 'lock' | 'workflow';
  /** Visual identity for the card. Drives accent rule and icon color. */
  tone?: 'accent' | 'brand' | 'tertiary' | 'secondary';
  /** Optional small uppercase label (kept for backwards compat; rendered minimally). */
  kicker?: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.10 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.4, 0, 0.2, 1] }
  }
};

const toneStyles = {
  accent:    { rule: 'border-l-accent', iconColor: 'text-accent' },
  brand:     { rule: 'border-l-brand', iconColor: 'text-brand' },
  tertiary:  { rule: 'border-l-tertiary', iconColor: 'text-tertiary' },
  secondary: { rule: 'border-l-secondary', iconColor: 'text-secondary' }
} as const;

function PillarIcon({ icon, className }: { icon: Pillar['icon']; className?: string }) {
  const cls = className ?? 'w-6 h-6';
  if (icon === 'compass') return <CompassIcon className={cls} />;
  if (icon === 'rocket') return <RuntimeIcon className={cls} />;
  if (icon === 'workflow') return <WorkflowIcon className={cls} />;
  return <ShieldCheckIcon className={cls} />;
}

/**
 * MUI-style pillar cards: white card with a left accent border in the
 * tone color, a plain icon (no colored tile bg), title, body. One use
 * of the brand color per card instead of the previous four.
 */
export default function PillarCards({ pillars }: { pillars: Pillar[] }) {
  return (
    <motion.div
      className="grid-3"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
    >
      {pillars.map((pillar) => {
        const tone = toneStyles[pillar.tone ?? 'brand'];
        return (
          <motion.article
            key={pillar.title}
            className={`relative bg-surface rounded-xl border border-border border-l-4 ${tone.rule} p-6 md:p-7 shadow-card hover:shadow-card-hover transition-shadow duration-200`}
            variants={cardVariants}
          >
            <div className={`inline-flex items-center justify-center w-10 h-10 mb-4 ${tone.iconColor}`}>
              <PillarIcon icon={pillar.icon} className="w-7 h-7" />
            </div>

            <h3 className="text-lg font-medium text-text mb-2 tracking-tight">
              {pillar.title}
            </h3>
            <p className="text-sm text-text-secondary leading-relaxed">
              {pillar.description}
            </p>
          </motion.article>
        );
      })}
    </motion.div>
  );
}
