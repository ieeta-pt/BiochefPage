import { motion } from 'framer-motion';
import { BeakerIcon, DatabaseShieldIcon, LightningIcon } from './Icons';

type Tone = 'accent' | 'brand' | 'tertiary' | 'secondary';

interface UseCase {
  title: string;
  description: string;
  /** Small uppercase label (audience, use case category, etc.) */
  audience: string;
  /** Tone-codes the left accent border and icon color. Defaults to brand. */
  tone?: Tone;
  icon?: 'dna' | 'shield' | 'bolt';
}

const toneStyles: Record<Tone, { rule: string; iconColor: string; audienceColor: string }> = {
  accent:    { rule: 'border-l-accent', iconColor: 'text-accent', audienceColor: 'text-accent' },
  brand:     { rule: 'border-l-brand', iconColor: 'text-brand', audienceColor: 'text-brand' },
  tertiary:  { rule: 'border-l-tertiary', iconColor: 'text-tertiary', audienceColor: 'text-tertiary' },
  secondary: { rule: 'border-l-secondary', iconColor: 'text-secondary', audienceColor: 'text-secondary' }
};

export default function UseCaseCards({ cases }: { cases: UseCase[] }) {
  return (
    <div className="grid-3">
      {cases.map((item, index) => {
        const tone = toneStyles[item.tone ?? 'brand'];
        return (
          <motion.article
            key={item.title}
            className={`relative bg-surface rounded-xl border border-border border-l-4 ${tone.rule} p-6 md:p-7 shadow-card hover:shadow-card-hover transition-shadow duration-200`}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.06, duration: 0.45 }}
          >
            {item.icon && (
              <div className={`inline-flex items-center justify-center w-10 h-10 mb-3 ${tone.iconColor}`}>
                {item.icon === 'dna' && <BeakerIcon className="w-7 h-7" />}
                {item.icon === 'shield' && <DatabaseShieldIcon className="w-7 h-7" />}
                {item.icon === 'bolt' && <LightningIcon className="w-7 h-7" />}
              </div>
            )}

            <p className={`text-[10px] font-semibold uppercase tracking-[0.12em] ${tone.audienceColor} mb-2`}>
              {item.audience}
            </p>
            <h3 className="text-lg font-medium text-text mb-2 tracking-tight">{item.title}</h3>
            <p className="text-sm text-text-secondary leading-relaxed">{item.description}</p>
          </motion.article>
        );
      })}
    </div>
  );
}
