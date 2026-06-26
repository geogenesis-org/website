import { MotionConfig, motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useRef } from 'react';

import type { LaunchRowProps, NextDepartureContent } from '../data/site';
import LaunchCountdown from './LaunchCountdown';
import { aeonEase, fadeUpTransition, inViewViewport } from './motion';

interface DepartureSectionProps {
  content: NextDepartureContent;
  launches: LaunchRowProps[];
}

function LaunchRow({ date, detail, href, index, time, title }: LaunchRowProps & { index: number }) {
  const ref = useRef<HTMLAnchorElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <motion.a
      ref={ref}
      href={href}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.78, delay: index * 0.14, ease: aeonEase }}
      className="group -mx-4 grid gap-4 border-b border-white/10 px-4 py-6 transition-colors duration-300 hover:border-accent-blue/45 hover:bg-white/[0.04] md:grid-cols-[180px_minmax(0,1fr)] md:gap-6"
    >
      <div>
        <div className="font-display text-[1rem] uppercase tracking-[0.18em] text-warm-gold transition-colors duration-300 group-hover:text-accent-blue sm:text-[1.05rem]">{date}</div>
        <div className="departure-meta mt-2 text-sm uppercase tracking-[0.22em] transition-colors duration-300 group-hover:text-white/72">{time}</div>
      </div>
      <div>
        <h3 className="departure-title break-words font-display text-[1.8rem] leading-none transition-colors duration-300 group-hover:text-accent-blue sm:text-[2.2rem]">
          {title}
        </h3>
        <p className="departure-copy mt-3 text-[1.02rem] transition-colors duration-300 group-hover:text-white/82 sm:text-[1.05rem]">{detail}</p>
      </div>
    </motion.a>
  );
}

export default function DepartureSection({ content, launches }: DepartureSectionProps) {
  return (
    <MotionConfig reducedMotion="user">
      <section id="technology" className="departure-surface py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 sm:px-8 lg:grid-cols-[minmax(320px,1.05fr)_minmax(0,1fr)] lg:items-center lg:gap-12 lg:px-12">
          <motion.div
            initial={{ opacity: 0, x: -48 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={inViewViewport}
            transition={fadeUpTransition}
            className="group relative overflow-hidden"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <img
                src={content.image}
                alt="Featured launch window"
                className="h-full w-full object-cover grayscale transition duration-700 group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_15%,rgba(255,255,255,0.08),transparent_45%)]" />
              <div className="departure-countdown-panel absolute bottom-4 left-4 border border-white/15 px-4 py-4 backdrop-blur-md sm:bottom-6 sm:left-6 sm:px-6 sm:py-5">
                <div className="departure-meta font-display text-[10px] uppercase tracking-[0.24em]">{content.label}</div>
                <LaunchCountdown
                  launchDate={content.launchDate}
                  launchTime={content.launchTime}
                  className="departure-title mt-3 block font-display text-[1.9rem] leading-none sm:text-[3rem]"
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 48 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={inViewViewport}
            transition={fadeUpTransition}
          >
            <div>
              <a
                href={content.allHref}
                className="departure-meta group mb-5 hidden items-center gap-2 font-display text-[12px] uppercase tracking-[0.24em] transition-colors duration-300 hover:text-white md:inline-flex"
              >
                View Schedule
                <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" size={16} />
              </a>
              <h2 className="departure-title break-words font-display text-4xl leading-none font-bold sm:text-6xl">{content.title}</h2>
            </div>
            <div className="mt-8">
              {launches.map((launch, index) => (
                <LaunchRow key={`${launch.date}-${launch.title}`} index={index} {...launch} />
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
}
