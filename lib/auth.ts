import { cookies } from "next/headers";

const SESSION_COOKIE = "admin_session";
const SESSION_VALUE = "authenticated";

export function isAuthenticated(): boolean {
  const cookieStore = cookies();
  const session = cookieStore.get(SESSION_COOKIE);
  return session?.value === SESSION_VALUE;
}

export function getSessionCookieName(): string {
  return SESSION_COOKIE;
}

export function getSessionCookieValue(): string {
  return SESSION_VALUE;
}
