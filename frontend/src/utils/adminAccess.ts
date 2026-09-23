/**
 * Admin access host check.
 *
 * Allows admin access from:
 * - Local development
 * - The main production domain
 * - The www production domain
 * - The admin subdomain (if configured later)
 *
 * Actual admin authorization is handled separately by
 * AdminLayout and the backend's admin-role verification.
 */
export function isAdminHost(): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  const host = window.location.hostname;

  // Local development
  if (host === "localhost" || host === "127.0.0.1") {
    return true;
  }

  // Production domains
  if (
    host === "www.ecelldmce.in" ||
    host === "ecelldmce.in" ||
    host === "admin.ecelldmce.in"
  ) {
    return true;
  }

  // Any other host is not allowed
  return false;
}
