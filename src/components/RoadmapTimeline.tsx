import { motion } from 'framer-motion';
import clsx from 'clsx';

interface Item {
  id: string;
  label: string;
  description: string;
  status: 'planned' | 'in-progress' | 'done';
}

const statusConfig = {
  planned: {
    bg: 'bg-text-tertiary/20',
    text: 'text-text-tertiary',
    dot: 'bg-text-tertiary',
    label: 'Planned'
  },
  'in-progress': {
    bg: 'bg-amber-100',
    text: 'text-amber-700',
    dot: 'bg-amber-500',
    label: 'In Progress'
  },
  done: {
    bg: 'bg-brand-light',
    text: 'text-brand',
    dot: 'bg-brand',
    label: 'Complete'
  }
};

export default function RoadmapTimeline({ items }: { items: Item[] }) {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-[15px] top-8 bottom-8 w-px bg-border" />

      <div className="space-y-4">
        {items.map((item, index) => {
          const config = statusConfig[item.status];
          return (
            <motion.div
              key={item.id}
              className="flex gap-4"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              {/* Status indicator */}
              <div className="flex flex-col items-center pt-1.5">
                <div className={clsx('w-[10px] h-[10px] rounded-full ring-4 ring-surface z-10', config.dot)} />
              </div>

              {/* Content card */}
              <div className="flex-1 pb-4">
                <div className={clsx('inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium mb-2', config.bg, config.text)}>
                  <span className={clsx('w-1.5 h-1.5 rounded-full', config.dot)} />
                  {config.label}
                </div>
                <h4 className="font-semibold text-text mb-1">{item.label}</h4>
                <p className="text-sm text-text-secondary">{item.description}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
