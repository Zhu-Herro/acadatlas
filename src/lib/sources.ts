/**
 * ─────────────────────────────────────────────────────────────────────────────
 * SOURCE RESOLUTION
 * ─────────────────────────────────────────────────────────────────────────────
 * Content frontmatter may cite a source either by registry key (`body: hkeaa`)
 * or explicitly (`label` + `href`). This module normalises both into one shape
 * so components — and the structured-data graph — never care which was used.
 */

import { officialBodies } from '@/site.config';

export interface ResolvedSource {
  label: string;
  href: string;
  note?: string;
  accessed?: string;
  /** True when the citation came from the central registry. */
  fromRegistry: boolean;
}

/** Shape accepted by the resolver (matches the content schema union). */
export interface RawSource {
  body?: string;
  label?: string;
  href?: string;
  note?: string;
  accessed?: string;
}

export function resolveSource(raw: RawSource): ResolvedSource | null {
  if (raw.body) {
    const registered = officialBodies[raw.body];

    if (registered) {
      return {
        label: raw.label ?? registered.label,
        href: raw.href ?? registered.href,
        note: raw.note ?? registered.note,
        accessed: raw.accessed,
        fromRegistry: true,
      };
    }

    // Unknown key: surface it rather than silently dropping the citation.
    if (raw.label && raw.href) {
      return {
        label: raw.label,
        href: raw.href,
        note: raw.note ?? `Unknown source registry key: "${raw.body}"`,
        accessed: raw.accessed,
        fromRegistry: false,
      };
    }

    console.warn(`[sources] Unknown officialBodies key: "${raw.body}"`);
    return null;
  }

  if (raw.label && raw.href) {
    return {
      label: raw.label,
      href: raw.href,
      note: raw.note,
      accessed: raw.accessed,
      fromRegistry: false,
    };
  }

  return null;
}

export function resolveSources(raw: RawSource[] | undefined): ResolvedSource[] {
  if (!raw?.length) return [];
  return raw.map(resolveSource).filter((source): source is ResolvedSource => source !== null);
}

/** Registry entries, sorted by label — used by the /resources page. */
export function listOfficialBodies(): ResolvedSource[] {
  return Object.values(officialBodies)
    .map((entry) =>
      resolveSource({ label: entry.label, href: entry.href, note: entry.note }),
    )
    .filter((source): source is ResolvedSource => source !== null)
    .sort((a, b) => a.label.localeCompare(b.label));
}
