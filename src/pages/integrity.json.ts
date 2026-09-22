/**
 * ─────────────────────────────────────────────────────────────────────────────
 * BUILD-TIME INTEGRITY REPORT  →  /integrity.json
 * ─────────────────────────────────────────────────────────────────────────────
 * This endpoint exists so that the provenance rules are enforced by the build
 * rather than by discipline.
 *
 * `assertIntegrity()` throws on any hard violation — a requirement claiming to
 * be verified without a resolvable official source, a grade scale with no
 * citation, a missing academic year, a relative source URL. Because Astro
 * renders this endpoint during `astro build`, a violation fails the deploy
 * instead of shipping a number nobody can check.
 *
 * The JSON output doubles as a public, machine-readable statement of what the
 * platform has verified and what it has not.
 */

import type { APIRoute } from 'astro';
import { assertIntegrity } from '@/lib/integrity';

export const GET: APIRoute = async () => {
  const report = await assertIntegrity();

  return new Response(JSON.stringify(report, null, 2), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
