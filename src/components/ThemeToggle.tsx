import { Moon, Sun } from 'lucide-react';
import { useCallback, useEffect, useRef, useState, type MouseEvent } from 'react';

import { siteMeta } from '../data/site';

const THEME_KEY = siteMeta.themeKey;

type ThemeMode = 'dark' | 'light';

function readThemeFromDocument(): ThemeMode {
  if (typeof document === 'undefined') {
    return 'dark';
  }

  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
}

function applyTheme(theme: ThemeMode) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.classList.toggle('dark', theme === 'dark');
}

function setRevealOrigin(x: number, y: number) {
  const endRadius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y)) + 24;

  document.documentElement.style.setProperty('--theme-reveal-x', `${x}px`);
  document.documentElement.style.setProperty('--theme-reveal-y', `${y}px`);
  document.documentElement.style.setProperty('--theme-reveal-radius', `${endRadius}px`);
}

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function commitTheme(nextTheme: ThemeMode) {
  applyTheme(nextTheme);
  window.localStorage.setItem(THEME_KEY, nextTheme);
}

interface ThemeToggleProps {
  className?: string;
}

export default function ThemeToggle({ className = '' }: ThemeToggleProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [theme, setTheme] = useState<ThemeMode>('dark');
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setTheme(readThemeFromDocument());
  }, []);

  const toggleTheme = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      const nextTheme: ThemeMode = theme === 'dark' ? 'light' : 'dark';
      const button = buttonRef.current;
      const rect = button?.getBoundingClientRect();
      const originX = rect ? rect.left + rect.width / 2 : event.clientX;
      const originY = rect ? rect.top + rect.height / 2 : event.clientY;

      const applyChange = () => {
        commitTheme(nextTheme);
        setTheme(nextTheme);
      };

      if (prefersReducedMotion() || typeof document.startViewTransition !== 'function') {
        applyChange();
        return;
      }

      setRevealOrigin(originX, originY);
      setIsAnimating(true);

      const transition = document.startViewTransition(applyChange);

      void transition.finished.finally(() => {
        setIsAnimating(false);
      });
    },
    [theme],
  );

  const isDark = theme === 'dark';

  return (
    <button
      ref={buttonRef}
      type="button"
      aria-label={`切换为${isDark ? '浅色' : '深色'}模式`}
      aria-pressed={isDark}
      aria-busy={isAnimating}
      onClick={toggleTheme}
      className={`theme-toggle ${isAnimating ? 'theme-toggle-active' : ''} inline-flex items-center justify-center rounded-lg backdrop-blur-sm ${className}`.trim()}
    >
      <span className="theme-toggle-icon theme-toggle-icon-sun" aria-hidden="true">
        <Sun size={15} strokeWidth={1.8} />
      </span>
      <span className="theme-toggle-icon theme-toggle-icon-moon" aria-hidden="true">
        <Moon size={15} strokeWidth={1.8} />
      </span>
      <span className="theme-toggle-ring" aria-hidden="true" />
    </button>
  );
}
