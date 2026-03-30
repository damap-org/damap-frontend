export const IMAGE_KEYS = {
  LANDING_PAGE_BACKGROUND: 'landing-page-background',
  LANDING_PAGE_GRAPHIC: 'landing-page-graphic',
  LANDING_PAGE_LOGO: 'landing-page-logo',
  LOGO: 'logo',
  ORCID_ID: 'orcid-id',
  FAVICON: 'favicon',
} as const;

export type ImageKey = (typeof IMAGE_KEYS)[keyof typeof IMAGE_KEYS];

export interface AllowedImageType {
  mimeType: string;
  extension: string;
  displayName: string;
}

export const ALLOWED_IMAGE_TYPES: AllowedImageType[] = [
  { mimeType: 'image/svg+xml', extension: '.svg', displayName: 'SVG' },
  { mimeType: 'image/png', extension: '.png', displayName: 'PNG' },
  { mimeType: 'image/jpeg', extension: '.jpg', displayName: 'JPEG' },
  { mimeType: 'image/jpg', extension: '.jpg', displayName: 'JPG' },
  { mimeType: 'image/gif', extension: '.gif', displayName: 'GIF' },
  { mimeType: 'image/webp', extension: '.webp', displayName: 'WebP' },
];

export function getAcceptAttribute(): string {
  return ALLOWED_IMAGE_TYPES.map(t => t.extension).join(',');
}

export function getAllowedMimeTypes(): string[] {
  return ALLOWED_IMAGE_TYPES.map(t => t.mimeType);
}

export function formatAllowedTypesForDisplay(): string {
  const names = ALLOWED_IMAGE_TYPES.map(t => t.displayName);
  if (names.length <= 1) return names[0] || '';
  const last = names.pop();
  return names.join(', ') + ', and ' + last;
}

export interface ThemeImageDefinition {
  key: ImageKey;
  label: string;
  defaultUrl: string;
  recommendation: string;
  isCustom?: boolean;
  multitenancyLocked?: boolean;
}

export const THEME_IMAGE_DEFINITIONS: ThemeImageDefinition[] = [
  {
    key: IMAGE_KEYS.LANDING_PAGE_BACKGROUND,
    label: 'Landing Page Background',
    defaultUrl: 'assets/landing-page-background.png',
    recommendation: 'Recommended size: 1200px x 700px',
    multitenancyLocked: true,
  },
  {
    key: IMAGE_KEYS.LANDING_PAGE_GRAPHIC,
    label: 'Landing Page Graphic',
    defaultUrl: 'assets/landing-page-graphic.png',
    recommendation: 'Recommended size: 2530px x 2159px',
    multitenancyLocked: true,
  },
  {
    key: IMAGE_KEYS.LANDING_PAGE_LOGO,
    label: 'Landing Page Logo',
    defaultUrl: 'assets/landing-page-logo.svg',
    recommendation: 'Scales proportionally up to aspect ratio: 2.67:1',
    multitenancyLocked: true,
  },
  {
    key: IMAGE_KEYS.LOGO,
    label: 'Logo',
    defaultUrl: 'assets/logo.svg',
    recommendation:
      'Recommended aspect ratio: Around 1.41:1 (A4 paper landscape)',
    multitenancyLocked: false,
  },
  {
    key: IMAGE_KEYS.ORCID_ID,
    label: 'ORCID ID',
    defaultUrl: 'assets/ORCIDiD_iconvector.svg',
    recommendation: 'Recommended aspect ratio: 1:1',
    multitenancyLocked: false,
  },
  {
    key: IMAGE_KEYS.FAVICON,
    label: 'Favicon',
    defaultUrl: 'favicon.ico',
    recommendation: 'Recommended aspect ratio: 1:1',
    multitenancyLocked: false,
  },
];
