export interface NavLink {
  href: string;
  label: string;
}

export interface FooterSocialLink {
  label: string;
  icon: string;
  href: string;
}

export interface SiteMeta {
  name: string;
  tagline: string;
  description: string;
  lang: string;
  themeKey: string;
  subtitle: string;
  audience: string;
}

export interface MissionItem {
  label: string;
  title: string;
  description: string;
}

export interface CoreProject {
  title: string;
  target: string;
  status: string;
  leader: string;
  output: string;
  description: string;
}

export const siteMeta: SiteMeta = {
  name: 'GeoGenesis',
  tagline: '与地学的缘起 · 行星演化 · 矿物信息学 · 生命起源',
  subtitle: '地球的起源 / 创生',
  description:
    'GeoGenesis 是一个大学生公益科普小组，旨在填补高中到大学地球科学教育的知识空白，帮助地学新生建立系统的学科框架，完成从兴趣到专业的过渡。',
  audience: '核心受众：地学相关专业大一新生；兼顾对地球科学有兴趣的高中生与社会爱好者。',
  lang: 'zh-CN',
  themeKey: 'geogenesis-theme',
};

export function pageTitle(title: string) {
  return `${title} | ${siteMeta.name}`;
}

export const siteNav: NavLink[] = [
  { label: '文档', href: '/docs/' },
  { label: '动态', href: '/news/' },
  { label: '活动', href: '/events/' },
  { label: '关于', href: '/about/' },
];

export const missionItems: MissionItem[] = [
  {
    label: 'Mission',
    title: '使命',
    description:
      '构建面向地球科学学生的知识共享与经验流动平台，填补高中到大学的地学教育空白，打破信息不对称。',
  },
  {
    label: 'Vision',
    title: '愿景',
    description:
      '成为可持续运转的学生公益科普组织，让每一届地学新生都能更低成本地建立学科框架，从兴趣走向专业。',
  },
  {
    label: 'Work',
    title: '工作',
    description: '通过访谈、课程整理、项目实践与社区建设，实现知识结构化沉淀与持续流转。',
  },
];

export const coreProjects: CoreProject[] = [
  {
    title: '课程测评与信息库',
    target: '打破信息壁垒',
    status: '进行中',
    leader: '统筹组',
    output: '课程数据库 / 选课指南',
    description:
      '搜集、整理并传播优质的课程资料与真实测评，为地学及理工科新生提供实用的选课与学习参考。',
  },
  {
    title: '请老师喝一杯',
    target: '传播讲台背后的故事',
    status: '持续更新',
    leader: '内容组',
    output: '访谈记录 / 经验沉淀',
    description:
      '访谈学院内各研究所有代表性的老师，挖掘讲台背后的科研经历、研究路径与学科洞察。',
  },
  {
    title: '社区与学科科普',
    target: '搭建地学人交流社区',
    status: '筹备中',
    leader: '技术组',
    output: '公众号矩阵 / 学科前沿网站',
    description:
      '定期举办讲座活动，维护公众号与本站，持续更新地球科学各分支的硬核科普内容。',
  },
];

export const footerCopyright = '© 2026 GeoGenesis';

export const footerSocialLinks: FooterSocialLink[] = [
  {
    label: 'GitHub',
    icon: 'simple-icons:github',
    href: 'https://github.com/example/geogenesis',
  },
  {
    label: 'Email',
    icon: 'mdi:email-outline',
    href: 'mailto:contact@example.com',
  },
  {
    label: 'WeChat Official Account',
    icon: 'simple-icons:wechat',
    href: 'https://example.com/wechat-placeholder',
  },
  {
    label: 'Bilibili',
    icon: 'simple-icons:bilibili',
    href: 'https://space.bilibili.com/000000',
  },
];

export const homeSections: Array<NavLink & { description: string }> = [
  {
    label: '文档',
    href: '/docs/',
    description: '课程笔记、访谈整理与学科导读，系统化沉淀地学知识。',
  },
  {
    label: '动态',
    href: '/news/',
    description: '小组公告、项目进展与社区更新。',
  },
  {
    label: '活动',
    href: '/events/',
    description: '讲座、讨论会、工作坊与开放日活动。',
  },
  {
    label: '关于',
    href: '/about/',
    description: '了解 GeoGenesis 的定位、项目与参与方式。',
  },
];
