/**
 * Subdomain-based admin access check.
 *
 * In production, the admin panel is only accessible on the `admin.` subdomain
 * (e.g. admin.yourdomain.com). In local development, access is always allowed
 * so developers don't need to configure subdomains.
 */
export function isAdminHost(): boolean {
  if (typeof window === "undefined") return false;
  const host = window.location.hostname;

  // Local development — always allow
  if (host === "localhost" || host === "127.0.0.1") return true;

  // Production — only allow if host starts with "admin."
  return host.startsWith("admin.");
}
