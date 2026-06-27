import { MotionConfig, motion, useInView } from 'framer-motion';
import { useRef } from 'react';

import type { FooterMeta, NavLink } from '../data/site';
import BrandLogo from './BrandLogo';
import { siteEase } from './motion';

interface FooterSectionProps {
  directory: NavLink[];
  meta: FooterMeta;
  policies: string[];
}

export default function FooterSection({ directory, meta, policies }: FooterSectionProps) {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <MotionConfig reducedMotion="user">
      <motion.footer
        id="site-footer"
        ref={ref}
        initial={{ opacity: 0, y: 28 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
        transition={{ duration: 0.7, ease: siteEase }}
        className="border-t border-[var(--line-subtle)] bg-footer-bg py-14 sm:py-18"
      >
        <div className="mx-auto max-w-[90rem] px-6 sm:px-8 lg:px-10">
          <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-[minmax(0,1.5fr)_minmax(0,0.9fr)_minmax(0,0.7fr)]">
            <div className="max-w-xl">
              <BrandLogo />
              <p className="mt-5 text-[0.98rem] leading-7 text-[var(--body-muted)]">{meta.description}</p>
            </div>

            <div>
              <h3 className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-[var(--body-soft)]">导航</h3>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {directory.map((item) => (
                  <li key={item.label}>
                    <a
                      className="text-[0.95rem] text-[var(--body-muted)] transition-colors duration-300 hover:text-[var(--nav-active)]"
                      href={item.href}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-[var(--body-soft)]">联系</h3>
              <div className="mt-4 space-y-1 text-[0.95rem] text-[var(--body-muted)]">
                <p>GeoGenesis 大学生公益科普小组</p>
                <p className="text-[var(--nav-active)]">geogenesis-hub</p>
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-col gap-4 border-t border-[var(--line-subtle)] pt-6 text-[0.8rem] text-[var(--body-soft)] md:flex-row md:items-center md:justify-between">
            <p>© 2026 GeoGenesis</p>
            {policies.length ? (
              <div className="flex flex-wrap gap-4">
                {policies.map((policy) => (
                  <span key={policy}>{policy}</span>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </motion.footer>
    </MotionConfig>
  );
}
