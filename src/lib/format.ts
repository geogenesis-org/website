const utcDateFormatters = {
  long: new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  }),
};

export function formatLongDate(date: Date) {
  return utcDateFormatters.long.format(date);
}

export function formatLaunchTime(time: string) {
  return time;
}

export function formatReadingTime(minutes: number) {
  return `${Math.max(1, minutes)} 分钟`;
}
