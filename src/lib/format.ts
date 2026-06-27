const utcDateFormatters = {
  short: new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  }),
  long: new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  }),
};

export function formatShortDate(date: Date) {
  return utcDateFormatters.short.format(date);
}

export function formatLongDate(date: Date) {
  return utcDateFormatters.long.format(date);
}

export function formatLaunchTime(time: string) {
  return `${time}`;
}

export function formatReadingTime(minutes: number) {
  return `${Math.max(1, minutes)} 分钟`;
}

export function toUtcDateInput(date: Date) {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
