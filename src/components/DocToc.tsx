import { useEffect, useState } from 'react';

interface TocHeading {
  depth: number;
  slug: string;
  text: string;
}

interface DocTocProps {
  headings: TocHeading[];
}

export default function DocToc({ headings }: DocTocProps) {
  const [activeSlug, setActiveSlug] = useState('');

  useEffect(() => {
    if (!headings.length) return;

    const elements = headings
      .map((heading) => document.getElementById(heading.slug))
      .filter((element): element is HTMLElement => element !== null);

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((left, right) => right.intersectionRatio - left.intersectionRatio);

        if (visible[0]?.target.id) {
          setActiveSlug(visible[0].target.id);
        }
      },
      { rootMargin: '-20% 0px -55% 0px', threshold: [0, 0.25, 0.5, 1] },
    );

    for (const element of elements) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, [headings]);

  if (!headings.length) {
    return <p className="text-sm leading-relaxed text-[var(--body-soft)]">本文暂无目录</p>;
  }

  return (
    <nav aria-label="页面目录">
      <ul className="space-y-0.5">
        {headings.map((heading) => (
          <li key={heading.slug}>
            <a
              href={`#${heading.slug}`}
              data-depth={heading.depth}
              data-active={activeSlug === heading.slug}
              className="doc-toc-link"
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
