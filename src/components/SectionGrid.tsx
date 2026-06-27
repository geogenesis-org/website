import { MotionConfig, motion } from 'framer-motion';

import type { NavLink } from '../data/site';
import { fadeUpTransition, siteEase } from './motion';

interface SectionGridProps {
  sections: Array<NavLink & { description: string }>;
}

const sectionIcons: Record<string, string> = {
  文档: '◈',
  动态: '◉',
  活动: '◎',
  关于: '◇',
};

export default function SectionGrid({ sections }: SectionGridProps) {
  return (
    <MotionConfig reducedMotion="user">
      <div className="grid gap-4 sm:grid-cols-2">
        {sections.map((section, index) => (
          <motion.a
            key={section.href}
            href={section.href}
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...fadeUpTransition, delay: 0.12 + index * 0.07, ease: siteEase }}
            className="surface-card card-strata group block rounded-xl p-6 sm:p-7"
          >
            <div className="flex items-start gap-4">
              <span
                aria-hidden="true"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[var(--line-subtle)] bg-[var(--color-accent-soft)] font-mono text-sm text-[var(--color-accent-muted)]"
              >
                {sectionIcons[section.label] ?? '◆'}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <h2 className="font-display text-[1.35rem] font-semibold leading-tight tracking-[-0.01em] text-[var(--body-strong)]">
                    {section.label}
                  </h2>
                  <span
                    aria-hidden="true"
                    className="mt-0.5 shrink-0 text-base text-[var(--body-soft)] transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[var(--nav-active)]"
                  >
                    →
                  </span>
                </div>
                <p className="mt-2.5 text-[0.94rem] leading-7 text-[var(--body-muted)]">{section.description}</p>
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </MotionConfig>
  );
}
