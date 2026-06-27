import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

const THEME_KEY = 'geogenesis-theme';

type ThemeMode = 'dark' | 'light';

function applyTheme(theme: ThemeMode) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.classList.toggle('dark', theme === 'dark');
}

function getInitialTheme(): ThemeMode {
  if (typeof document === 'undefined') {
    return 'dark';
  }

  const stored = window.localStorage.getItem(THEME_KEY);
  if (stored === 'dark' || stored === 'light') {
    return stored;
  }

  const current = document.documentElement.dataset.theme;
  return current === 'light' ? 'light' : 'dark';
}

interface ThemeToggleProps {
  className?: string;
}

export default function ThemeToggle({ className = '' }: ThemeToggleProps) {
  const [theme, setTheme] = useState<ThemeMode>('dark');

  useEffect(() => {
    const initialTheme = getInitialTheme();
    applyTheme(initialTheme);
    setTheme(initialTheme);
  }, []);

  function toggleTheme() {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
    window.localStorage.setItem(THEME_KEY, nextTheme);
    setTheme(nextTheme);
  }

  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      aria-label={`切换为${isDark ? '浅色' : '深色'}模式`}
      aria-pressed={isDark}
      onClick={toggleTheme}
      className={`theme-toggle inline-flex items-center justify-center rounded-lg backdrop-blur-sm ${className}`.trim()}
    >
      {isDark ? <Moon size={15} strokeWidth={1.8} /> : <Sun size={15} strokeWidth={1.8} />}
    </button>
  );
}
