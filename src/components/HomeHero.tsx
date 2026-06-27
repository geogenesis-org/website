import { MotionConfig, motion } from 'framer-motion';

import type { SiteMeta } from '../data/site';
import { siteEase } from './motion';

interface HomeHeroProps {
  site: SiteMeta;
}

export default function HomeHero({ site }: HomeHeroProps) {
  return (
    <MotionConfig reducedMotion="user">
      <section className="hero-strata page-hero relative overflow-hidden px-7 py-12 sm:px-10 sm:py-16 lg:px-14 lg:py-20">
        <div className="hero-strata-layers" aria-hidden="true" />

        <div className="relative z-10 max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: siteEase }}
            className="eyebrow-label"
          >
            {site.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08, ease: siteEase }}
            className="hero-accent-line mt-5"
          />

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.14, ease: siteEase }}
            className="mt-6 font-display text-[clamp(2.35rem,5vw,3.65rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-[var(--body-strong)]"
          >
            {site.name}
            <span className="mt-2 block text-[clamp(1.05rem,2vw,1.35rem)] font-body font-normal tracking-normal text-[var(--color-mineral)]">
              {site.subtitle}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.22, ease: siteEase }}
            className="mt-6 max-w-2xl text-[1.05rem] leading-[1.85] text-[var(--body-muted)] sm:text-lg"
          >
            {site.description}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.28, ease: siteEase }}
            className="mt-4 max-w-2xl text-[0.9rem] leading-7 text-[var(--body-soft)]"
          >
            {site.audience}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.34, ease: siteEase }}
            className="mt-9 flex flex-wrap gap-3"
          >
            <a href="/docs/" className="btn-primary">
              浏览文档
            </a>
            <a href="/about/" className="btn-secondary">
              了解我们
            </a>
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
}
