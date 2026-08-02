const chineseDate = new Intl.DateTimeFormat('zh-CN', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});

export function formatContentDate(date: Date) {
  return chineseDate.format(date);
}
