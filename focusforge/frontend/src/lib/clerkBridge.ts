import apiClient from '../api/apiClient';
import { User, AuthResponse } from '../types';

/**
 * Bridges Clerk authentication to the Spring Boot backend.
 * Creates or logs into a backend account using the Clerk user's email.
 * The JWT is cached for 23 hours to avoid cold start delays on every visit.
 */
export const bridgeClerkToBackend = async (clerkUser: {
  id: string;
  emailAddresses: { emailAddress: string }[];
  fullName: string | null;
  firstName: string | null;
}): Promise<{ token: string; user: User }> => {
  // Check if we have a valid cached JWT
  const cached = localStorage.getItem('focusforge_jwt');
  const cachedExpiry = localStorage.getItem('focusforge_jwt_expiry');
  const cachedUser = localStorage.getItem('focusforge_user');

  if (cached && cachedExpiry && cachedUser && Date.now() < parseInt(cachedExpiry)) {
    return { token: cached, user: JSON.parse(cachedUser) };
  }

  const email = clerkUser.emailAddresses[0].emailAddress;
  const rawUsername = email.split('@')[0].replace(/[^a-zA-Z0-9_]/g, '_').substring(0, 20);
  const bridgePassword = `clk_${clerkUser.id}`;
  const fullName = clerkUser.fullName || clerkUser.firstName || rawUsername;

  const cacheResult = (data: AuthResponse) => {
    const expiry = Date.now() + 23 * 60 * 60 * 1000; // 23 hours
    localStorage.setItem('focusforge_jwt', data.token);
    localStorage.setItem('focusforge_jwt_expiry', expiry.toString());
    localStorage.setItem('focusforge_user', JSON.stringify(data.user));
    return { token: data.token, user: data.user };
  };

  // Try login first (user already exists)
  try {
    const res = await apiClient.post<AuthResponse>('/auth/login', {
      usernameOrEmail: email,
      password: bridgePassword,
    });
    return cacheResult(res.data);
  } catch (loginErr: any) {
    // User doesn't exist, register them
    if (loginErr.response?.status === 400 || loginErr.response?.status === 401 || loginErr.response?.status === 403) {
      try {
        const res = await apiClient.post<AuthResponse>('/auth/register', {
          username: rawUsername,
          email,
          password: bridgePassword,
          fullName,
        });
        return cacheResult(res.data);
      } catch (regErr: any) {
        // Username taken — try with random suffix
        if (regErr.response?.status === 400) {
          const suffix = Math.random().toString(36).substring(2, 6);
          const res = await apiClient.post<AuthResponse>('/auth/register', {
            username: rawUsername.substring(0, 16) + suffix,
            email,
            password: bridgePassword,
            fullName,
          });
          return cacheResult(res.data);
        }
        throw regErr;
      }
    }
    throw loginErr;
  }
};

export const clearBackendCache = () => {
  localStorage.removeItem('focusforge_jwt');
  localStorage.removeItem('focusforge_jwt_expiry');
  localStorage.removeItem('focusforge_user');
};
