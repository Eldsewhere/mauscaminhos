export type Operator = 'metro' | 'cp' | 'stcp' | 'unir' | 'bus';

/** Which operator serves a start or end point, worked out from its (English) wording. undefined: not a stop. */
export function operatorOf(place: string | undefined): Operator | undefined {
  if (!place) return undefined;
  if (/\bmetro(bus)? station\b/i.test(place)) return 'metro';
  if (/\btrain station\b/i.test(place)) return 'cp';
  if (/^STCP\b/.test(place)) return 'stcp';
  if (/^UNIR\b/.test(place)) return 'unir';
  if (/\bbus station\b/i.test(place)) return 'bus';
  return undefined;
}

/** A stop's bare name, with the transport words left out because the badge already says them:
 *  "Campanhã metro station" → "Campanhã", "UNIR bus (N1)" → "N1", "STCP 7" → "7". */
export function stopName(place: string): string {
  const bare = place
    .replace(/\s+(metro|metrobus|train|bus) station$/i, '')
    .replace(/^(STCP|UNIR)(\s+bus)?\s*/, '')
    .trim();
  const inBrackets = bare.match(/^\((.*)\)$/);
  return inBrackets ? inBrackets[1] : bare || place;
}
