import React from 'react';
import { AuthenticateWithRedirectCallback } from '@clerk/clerk-react';

/**
 * This page handles the OAuth redirect from Google/GitHub via Clerk.
 * Clerk automatically processes the OAuth callback here.
 * After processing, it redirects to '/' (the app dashboard).
 */
export const SSOCallback: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
        <p className="text-slate-400 text-sm">Completing sign in...</p>
      </div>
      <AuthenticateWithRedirectCallback />
    </div>
  );
};
