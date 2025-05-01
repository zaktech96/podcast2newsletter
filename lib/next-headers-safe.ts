/**
 * Safe headers utility to properly handle headers() in Next.js 15
 * This helps avoid the "Route used `...headers()` or similar iteration" error
 */

import { cookies, headers } from 'next/headers';

/**
 * Safely get headers in a way that avoids the Next.js headers() iteration error
 */
export async function safeHeaders() {
  const headersList = await headers();
  const entries = Array.from(headersList.entries());
  return Object.fromEntries(entries);
}

/**
 * Get a specific header value safely
 */
export async function safeHeader(name: string): Promise<string | null> {
  const headersList = await headers();
  return headersList.get(name);
}

/**
 * Get multiple header values safely
 */
export async function safeHeaders_multiple(names: string[]): Promise<Record<string, string | null>> {
  const headersList = await headers();
  return Object.fromEntries(
    names.map(name => [name, headersList.get(name)])
  );
}

/**
 * Safely get cookies without triggering the iteration error
 */
export async function safeCookies() {
  const cookieStore = await cookies();
  const cookiesObj: Record<string, string> = {};
  
  cookieStore.getAll().forEach((cookie) => {
    cookiesObj[cookie.name] = cookie.value;
  });
  
  return cookiesObj;
}

/**
 * Safely get a specific cookie value
 */
export async function safeCookie(name: string): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(name)?.value;
}

/**
 * Initialize headers for server components
 * Call this at the top of your server component to ensure headers are properly initialized
 */
export async function initializeHeaders() {
  await headers();
} 