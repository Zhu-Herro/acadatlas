/**
 * ─────────────────────────────────────────────────────────────────────────────
 * i18n UTILITIES
 * ─────────────────────────────────────────────────────────────────────────────
 * Routing rules (see astro.config.mjs):
 *   /            → default locale (zh), no prefix
 *   /systems/dse → default locale (zh)
 *   /en/         → English
 *   /en/systems/dse
 */

import { defaultLocale, htmlLang, locales, ui, type Locale, type UIKey } from './ui';

export { defaultLocale, htmlLang, locales, ui };
export type { Locale, UIKey };

export function isLocale(value: string | undefined | null): value is Locale {
  return typeof value === 'string' && (locales as string[]).includes(value);
}

/** Read the locale from a pathname (`/en/...` → `en`). */
export function getLocaleFromPath(pathname: string): Locale {
  const [first] = pathname.split('/').filter(Boolean);
  return isLocale(first) ? first : defaultLocale;
}

export function getLocaleFromUrl(url: URL): Locale {
  return getLocaleFromPath(url.pathname);
}

/**
 * Remove a locale prefix from a pathname so it can be re-localised.
 * `/en/systems/dse` → `/systems/dse` · `/systems/dse` → `/systems/dse`
 */
export function stripLocale(pathname: string): string {
  const segments = pathname.split('/').filter(Boolean);
  if (isLocale(segments[0])) segments.shift();
  return `/${segments.join('/')}`;
}

/**
 * Prefix a locale-agnostic path with the correct locale segment.
 * `localizePath('/systems/dse', 'en')` → `/en/systems/dse`
 * `localizePath('/systems/dse', 'zh')` → `/systems/dse`
 */
export function localizePath(path: string, locale: Locale): string {
  const clean = stripLocale(path.startsWith('/') ? path : `/${path}`);
  const base = clean === '/' ? '' : clean;

  if (locale === defaultLocale) return base === '' ? '/' : base;
  return base === '' ? `/${locale}` : `/${locale}${base}`;
}

/** Build the equivalent path in another language from the current pathname. */
export function switchLocalePath(pathname: string, locale: Locale): string {
  return localizePath(stripLocale(pathname), locale);
}

/**
 * Translator factory with `{placeholder}` interpolation and automatic
 * fallback to the default locale for any missing string.
 */
export function useTranslations(locale: Locale) {
  const dictionary = ui[locale] ?? ui[defaultLocale];
  const fallback = ui[defaultLocale];

  return function t(key: UIKey, variables?: Record<string, string | number>): string {
    let value: string = dictionary[key] ?? fallback[key] ?? key;

    if (variables) {
      for (const [name, replacement] of Object.entries(variables)) {
        value = value.split(`{${name}}`).join(String(replacement));
      }
    }

    return value;
  };
}

export type Translator = ReturnType<typeof useTranslations>;

/** Locale-aware date formatting for `updatedAt` / `publishedAt` fields. */
export function formatDate(date: Date | string, locale: Locale, withDay = false): string {
  const value = typeof date === 'string' ? new Date(date) : date;
  if (Number.isNaN(value.getTime())) return '';

  return new Intl.DateTimeFormat(locale === 'zh' ? 'zh-CN' : 'en-GB', {
    year: 'numeric',
    month: 'long',
    day: withDay ? 'numeric' : undefined,
  }).format(value);
}

/** `2026-09` — the compact mono form used in metadata rows. */
export function formatMonth(date: Date | string): string {
  const value = typeof date === 'string' ? new Date(date) : date;
  if (Number.isNaN(value.getTime())) return '';
  const month = `${value.getUTCMonth() + 1}`.padStart(2, '0');
  return `${value.getUTCFullYear()}-${month}`;
}
