/**
 * admin-site-mode.ts
 *
 * Utilitário para obter o siteMode no painel admin com troca instantânea via cookie.
 * Prioridade: cookie (cnx-site-mode) > settings do content layer (build).
 *
 * Permite que o admin veja a troca Blog/Local imediatamente após o toggle,
 * sem aguardar o deploy. O site público continua usando o valor do build.
 */

export type SiteMode = 'blog' | 'local';

interface CookiesLike {
    get(name: string): { value: string } | undefined;
}

/**
 * Retorna o siteMode ativo no admin, priorizando o cookie (troca instantânea).
 */
export function getAdminSiteMode(
    cookies: CookiesLike,
    settingsFromBuild: { data?: { siteMode?: string } } | null
): SiteMode {
    const cookieVal = cookies.get('cnx-site-mode')?.value;
    if (cookieVal === 'local' || cookieVal === 'blog') return cookieVal;
    return settingsFromBuild?.data?.siteMode === 'local' ? 'local' : 'blog';
}

export const SITE_MODE_COOKIE = 'cnx-site-mode';
export const SITE_MODE_COOKIE_MAX_AGE = 31536000; // 1 ano
export const SITE_MODE_COOKIE_PATH = '/admin';
