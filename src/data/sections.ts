import type { ListingSection } from '../utils/contentListing';

export interface CollectionSectionConfig {
  title: string;
  description: string;
  eyebrow: string;
  heading: string;
  intro: string;
  marker: string;
  indexClass: string;
  carouselLabel: string;
  listHeadingLabel: string;
  listHeadingNote: string;
  listClass: string;
}

export const collectionSections: Record<ListingSection, CollectionSectionConfig> = {
  docs: {
    title: '文档',
    description: 'GeoGenesis 地球科学文档、课程笔记与研究导读。',
    eyebrow: 'GeoGenesis 文档',
    heading: '一份写给地球学习者的开放式野外指南。',
    intro: '从基础概念、课程笔记到研究导读。每一组文档都提供一条可进入、可追踪、也可以继续贡献的学习路径。',
    marker: 'DOCUMENTS',
    indexClass: 'docs-index',
    carouselLabel: '精选文档',
    listHeadingLabel: 'GEOGENESIS 全部文档',
    listHeadingNote: 'DOCUMENTS /',
    listClass: 'series-list',
  },
  interviews: {
    title: '访谈',
    description: '记录观察、研究和讲述地球的人。',
    eyebrow: 'GeoGenesis 访谈',
    heading: '那些正在阅读这颗行星的人。',
    intro: '以简短的人物笔记，记录研究者的观察、关键转折与开放问题，以及他们如何拓展我们对地球的理解。',
    marker: 'INTERVIEWS',
    indexClass: 'interviews',
    carouselLabel: '精选访谈',
    listHeadingLabel: 'GEOGENESIS 全部访谈',
    listHeadingNote: 'INTERVIEWS /',
    listClass: 'interview-list',
  },
  news: {
    title: '动态',
    description: 'GeoGenesis 的项目进展、编辑手记与社区消息。',
    eyebrow: 'GeoGenesis 动态',
    heading: '记录正在发生的事，也留下我们如何抵达这里。',
    intro: '项目进展、编辑手记与社区消息。这里记录 GeoGenesis 的每一步，也公开内容如何被讨论、修订和共同完成。',
    marker: 'NEWS',
    indexClass: 'news-index',
    carouselLabel: '精选动态',
    listHeadingLabel: 'GEOGENESIS 全部活动',
    listHeadingNote: 'NEWS /',
    listClass: 'news-list',
  },
};
