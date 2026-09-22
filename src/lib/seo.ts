/**
 * ─────────────────────────────────────────────────────────────────────────────
 * SEO
 * ─────────────────────────────────────────────────────────────────────────────
 * One function builds every metadata field a page needs:
 * title, description, canonical, Open Graph, Twitter/X card, hreflang
 * alternates and a JSON-LD graph.
 *
 * Brief section 23: structured data for the site itself, Article schema for
 * content pages, BreadcrumbList everywhere, FAQPage where a FAQ exists.
 * No keyword stuffing — descriptions are written for humans.
 */

import { site } from '@/site.config';
import { htmlLang, localizePath, locales, type Locale } from '@/i18n/utils';

export interface SeoInput {
  /** Page title WITHOUT the brand suffix. */
  title: string;
  description: string;
  locale: Locale;
  /** Locale-agnostic path, e.g. `/systems/dse`. */
  path: string;
  image?: string;
  type?: 'website' | 'article';
  publishedTime?: Date;
  modifiedTime?: Date;
  noindex?: boolean;
  /** Extra JSON-LD nodes appended to the graph. */
  jsonLd?: Record<string, unknown>[];
}

export interface SeoAlternate {
  hreflang: string;
  href: string;
}

export interface SeoOutput {
  title: string;
  description: string;
  canonical: string;
  image: string;
  ogLocale: string;
  alternates: SeoAlternate[];
  type: 'website' | 'article';
  noindex: boolean;
  publishedTime?: Date;
  modifiedTime?: Date;
  jsonLd: Record<string, unknown>[];
}

function absolute(path: string): string {
  try {
    return new URL(path, site.url).toString();
  } catch {
    return path;
  }
}

/** OG locale identifiers (`zh_CN`, `en_GB`). */
const ogLocale: Record<Locale, string> = {
  zh: 'zh_CN',
  en: 'en_GB',
};

/**
 * Organisation node — published on every page so search engines can resolve
 * the publisher without a separate lookup.
 */
export function organizationSchema(): Record<string, unknown> {
  return {
    '@type': 'Organization',
    '@id': `${site.url}/#organization`,
    name: site.name,
    alternateName: site.legalName.en,
    url: site.url,
    logo: absolute(site.ogImage),
    email: site.contact.email,
    foundingDate: String(site.since),
  };
}

/** WebSite node with a SearchAction pointing at the client-side search. */
export function websiteSchema(locale: Locale): Record<string, unknown> {
  return {
    '@type': 'WebSite',
    '@id': `${site.url}/#website`,
    name: site.name,
    url: localizePath('/', locale) === '/' ? site.url : absolute(localizePath('/', locale)),
    description: site.description[locale],
    inLanguage: htmlLang[locale],
    publisher: { '@id': `${site.url}/#organization` },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${site.url}${localizePath('/guides', locale)}?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

export function articleSchema(options: {
  title: string;
  description: string;
  path: string;
  locale: Locale;
  publishedTime?: Date;
  modifiedTime?: Date;
  image?: string;
  section?: string;
  keywords?: string[];
}): Record<string, unknown> {
  return {
    '@type': 'Article',
    '@id': `${absolute(options.path)}#article`,
    headline: options.title,
    description: options.description,
    inLanguage: htmlLang[options.locale],
    mainEntityOfPage: { '@type': 'WebPage', '@id': absolute(options.path) },
    datePublished: options.publishedTime?.toISOString(),
    dateModified: (options.modifiedTime ?? options.publishedTime)?.toISOString(),
    image: absolute(options.image ?? site.ogImage),
    articleSection: options.section,
    keywords: options.keywords?.join(', '),
    author: { '@id': `${site.url}/#organization` },
    publisher: { '@id': `${site.url}/#organization` },
  };
}

export function breadcrumbSchema(
  items: { name: string; path: string }[],
  locale: Locale,
): Record<string, unknown> {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absolute(localizePath(item.path, locale)),
    })),
  };
}

export function faqSchema(items: { q: string; a: string }[]): Record<string, unknown> {
  return {
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };
}

export function buildSeo(input: SeoInput): SeoOutput {
  const {
    title,
    description,
    locale,
    path,
    image = site.ogImage,
    type = 'website',
    publishedTime,
    modifiedTime,
    noindex = false,
    jsonLd = [],
  } = input;

  // The home page title is the brand itself; everything else is suffixed.
  const fullTitle = title === site.name ? `${title} — ${site.tagline[locale]}` : `${title} — ${site.name}`;

  const alternates: SeoAlternate[] = locales.map((alternateLocale) => ({
    hreflang: htmlLang[alternateLocale],
    href: absolute(localizePath(path, alternateLocale)),
  }));

  // x-default points at the default locale version.
  alternates.push({
    hreflang: 'x-default',
    href: absolute(localizePath(path, locales[0] ?? 'zh')),
  });

  return {
    title: fullTitle,
    description,
    canonical: absolute(localizePath(path, locale)),
    image: absolute(image),
    ogLocale: ogLocale[locale],
    alternates,
    type,
    noindex,
    publishedTime,
    modifiedTime,
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@graph': [organizationSchema(), websiteSchema(locale), ...jsonLd],
      },
    ],
  };
}
