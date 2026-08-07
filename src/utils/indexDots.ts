/** Max index markers shown before collapsing with ellipsis. */
export const INDEX_DOT_LIMIT = 7;

/**
 * Returns sorted 1-based indices to render as dots.
 * When `total` exceeds `INDEX_DOT_LIMIT`, keeps the first and last indices
 * and fills the remaining slots with a window around `current`.
 * Non-consecutive values imply an ellipsis gap in the UI.
 */
export function visibleIndexWindow(
  total: number,
  current: number,
  limit = INDEX_DOT_LIMIT,
): number[] {
  if (total <= 0) return [];

  const safeCurrent = Math.min(Math.max(Math.trunc(current), 1), total);
  if (total <= limit) {
    return Array.from({ length: total }, (_, index) => index + 1);
  }

  const innerLimit = Math.max(1, limit - 2);
  let start = Math.max(2, safeCurrent - Math.floor((innerLimit - 1) / 2));
  let end = start + innerLimit - 1;

  if (end > total - 1) {
    end = total - 1;
    start = Math.max(2, end - innerLimit + 1);
  }

  const indices = [1];
  for (let index = start; index <= end; index += 1) indices.push(index);
  indices.push(total);
  return indices;
}
