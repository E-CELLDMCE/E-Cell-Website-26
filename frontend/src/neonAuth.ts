import { createAuthClient } from '@neondatabase/neon-js/auth';
import { BetterAuthReactAdapter } from '@neondatabase/neon-js/auth/react/adapters';

const neonAuthUrl = import.meta.env.VITE_NEON_AUTH_URL as string | undefined;

if (!neonAuthUrl) {
  // Surface a clear error early; the rest of the app still works without it.
  // eslint-disable-next-line no-console
  console.warn('VITE_NEON_AUTH_URL is not set — Google sign-in will not work.');
}

export const neonAuthClient = createAuthClient(neonAuthUrl ?? '', {
  adapter: BetterAuthReactAdapter(),
});