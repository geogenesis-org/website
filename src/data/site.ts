import { sitePath } from '../utils/paths';

export const siteMeta = {
  name: 'GeoGenesis',
  tagline: '理解地球，也理解我们所处的位置',
  description:
    'GeoGenesis 是一个由学生共同建设的地球科学知识平台，连接严谨的学科内容、真实的科研经验与持续发生的地球故事。',
  lang: 'zh-CN',
  themeKey: 'geogenesis-theme',
};

export function pageTitle(title: string) {
  return `${title} | ${siteMeta.name}`;
}

export const siteNav = [
  { label: '文档', href: sitePath('/docs/') },
  { label: '访谈', href: sitePath('/interviews/') },
  { label: '动态', href: sitePath('/news/') },
  { label: '关于', href: sitePath('/about/') },
];

export const pillars = [
  {
    index: '01',
    title: '清晰，而不失真',
    description: '让复杂概念更容易进入，同时保留证据、不确定性和科学思考的习惯。',
  },
  {
    index: '02',
    title: '让人回到科学之中',
    description: '知识有人的历史。我们记录发现背后的路径、现场、选择与协作。',
  },
  {
    index: '03',
    title: '好奇，也负责任',
    description: '理解一颗变化中的行星，也意味着看见我们身处其中的责任。',
  },
];

export const featuredCarouselConfig = {
  docs: { autoplay: true, interval: 7000 },
  interviews: { autoplay: true, interval: 7000 },
  news: { autoplay: true, interval: 7000 },
} as const;

export const footerConfig = {
  slogan: '从岩石、时间与人的故事里，重新认识这颗行星。',
  rights: '© 2026 GeoGenesis. All rights reserved.',
  socialLinks: [
    { label: 'GitHub', icon: '/icons/social/github.svg', href: 'https://github.com/geogenesis-org' },
    { label: '微信公众号', icon: '/icons/social/wechat.svg', href: 'https://mp.weixin.qq.com/' },
    // { label: '小红书', icon: '/icons/social/xiaohongshu.svg', href: 'https://www.xiaohongshu.com/' },
    // { label: '哔哩哔哩', icon: '/icons/social/bilibili.svg', href: 'https://www.bilibili.com/' },
    // { label: '知乎', icon: '/icons/social/zhihu.svg', href: 'https://www.zhihu.com/' },
  ] as const,
  filing: {
    // Replace this label after the site receives its ICP filing number.
    label: '备案号待补充',
    href: 'https://beian.miit.gov.cn/',
  },
};
