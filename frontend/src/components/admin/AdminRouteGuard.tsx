import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { isAdminHost } from '../../utils/adminAccess';

/**
 * Route guard for admin routes.
 *
 * Two-layer protection:
 * 1. **Subdomain check** — In production, only requests from `admin.*` subdomains
 *    are allowed through. Localhost is always permitted for local development.
 * 2. **Auth check** — The user must be logged in with an `admin` role.
 *    This is handled by the existing AdminLayout component.
 *
 * If the subdomain check fails, the user is silently redirected to `/`.
 */
const AdminRouteGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isLoading } = useAuth();

  // Wait for auth state to resolve before making decisions
  if (isLoading) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-4 flex items-center justify-center bg-black text-white">
        <p className="text-sm font-bold text-neutral-400">Loading...</p>
      </div>
    );
  }

  // Block access if not on an allowed admin host
  if (!isAdminHost()) {
    return <Navigate to="/" replace />;
  }

  // Subdomain is valid — render children (AdminLayout handles role check)
  return <>{children}</>;
};

export default AdminRouteGuard;
