import { getCookie, hasCookie, setCookie } from 'cookies-next';
import { AUTH_TOKEN_KEY, LIGHT_THEME, THEME_LOCALHOST_KEY } from '@/utils/constant';
import * as process from 'process';

/**
 * Retrieves the authentication token from cookies.
 * @returns The authentication token or null if not found.
 */
export function getAuthToken(): string | null {
  return getCookie(AUTH_TOKEN_KEY);
}

/**
 * Sets the authentication token in cookies.
 * @param token - The authentication token to be set.
 */
export function setAuthToken(token: string): void {
  setCookie(AUTH_TOKEN_KEY, token);
}

/**
 * Retrieves the current theme from cookies.
 * If the theme is not set, it sets and returns the default theme.
 * @returns The current theme.
 */
export function getCurrentTheme(): string {
  if (!hasCookie(THEME_LOCALHOST_KEY)) {
    // Set the default theme if not already set
    setCurrentTheme(LIGHT_THEME);
  }
  // Return the current theme or the default theme if not set
  return getCookie(THEME_LOCALHOST_KEY) || LIGHT_THEME;
}

/**
 * Sets the current theme in cookies.
 * @param themeName - The name of the theme to be set.
 */
export function setCurrentTheme(themeName: string): void {
  setCookie(THEME_LOCALHOST_KEY, themeName);
}

export function setValueToCookie(key: string,value:any): void {
  setCookie(key,value);
}

export function getValueFromCookie(key: string): any {
  return getCookie(key);
}

export function redirectTo(path:string):string{
  return window.location.href=`${window.location.origin}${path}`;
}

/**
 * Retrieves the value of an environment variable.
 * @param key - The key of the environment variable.
 * @returns The value of the environment variable or null if not found.
 */
export function env(key: string): string | null {
  const envVariable = process.env;
  return envVariable[key] || null;
}
