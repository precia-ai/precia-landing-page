export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://precia.site';

// No fallback here on purpose. This is where the "Login" link in the navbar
// and footer sends every visitor, on every build of this site, dev or prod.
// A build that is missing NEXT_PUBLIC_APP_URL must fail loudly here instead
// of shipping a login link that silently points at whichever environment
// happens to be hardcoded as the fallback.
function requireAppUrl(): string {
  const value = process.env.NEXT_PUBLIC_APP_URL;
  if (!value) {
    throw new Error(
      'NEXT_PUBLIC_APP_URL must be set to the PRECIA app login URL for this environment.'
    );
  }
  let parsed: URL;
  try {
    parsed = new URL(value);
  } catch {
    throw new Error(`NEXT_PUBLIC_APP_URL is not a valid URL: "${value}"`);
  }
  if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
    throw new Error(`NEXT_PUBLIC_APP_URL must be an http or https URL: "${value}"`);
  }
  return value;
}

export const appUrl = requireAppUrl();
