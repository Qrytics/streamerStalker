/**
 * Decodes common HTML entities in a string using a single-pass regex,
 * avoiding any risk of double-unescaping through chained replacements.
 */
const HTML_ENTITIES: Record<string, string> = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#39;': "'",
};

export function decodeHtmlEntities(text: string): string {
  return text.replace(/&(?:amp|lt|gt|quot|#39);/g, match => HTML_ENTITIES[match] ?? match);
}
