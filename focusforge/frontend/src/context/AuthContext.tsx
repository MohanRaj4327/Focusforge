import React, { createContext, useContext, useState, useEffect } from 'react';
import { useUser, useClerk, useSignIn, useSignUp } from '@clerk/clerk-react';
import { User } from '../types';
import { bridgeClerkToBackend, clearBackendCache } from '../lib/clerkBridge';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (usernameOrEmail: string, password: string) => Promise<void>;
  register: (data: {
    username: string;
    email: string;
    password: string;
    fullName?: string;
    targetCompany?: string;
  }) => Promise<void>;
  logout: () => void;
  signInWithGoogle: () => Promise<void>;
  signInWithGithub: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user: clerkUser, isLoaded: clerkLoaded, isSignedIn } = useUser();
  const { signOut } = useClerk();
  const { signIn, setActive: setSignInActive, isLoaded: signInLoaded } = useSignIn();
  const { signUp, setActive: setSignUpActive, isLoaded: signUpLoaded } = useSignUp();

  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [bridging, setBridging] = useState(false);

  // When Clerk user is available, bridge to backend
  useEffect(() => {
    if (!clerkLoaded) return;

    if (isSignedIn && clerkUser && !bridging) {
      setBridging(true);
      setIsLoading(true);
      bridgeClerkToBackend({
        id: clerkUser.id,
        emailAddresses: clerkUser.emailAddresses.map(e => ({ emailAddress: e.emailAddress })),
        fullName: clerkUser.fullName,
        firstName: clerkUser.firstName,
      })
        .then(({ token: t, user: u }) => {
          setToken(t);
          setUser(u);
        })
        .catch(err => {
          console.warn('Backend bridge failed, using Clerk user data:', err);
          // Fall back to Clerk user data if backend is unavailable
          setUser({
            id: 1,
            username: clerkUser.emailAddresses[0]?.emailAddress?.split('@')[0] || 'user',
            email: clerkUser.emailAddresses[0]?.emailAddress || '',
            fullName: clerkUser.fullName || clerkUser.firstName || 'User',
            targetCompany: 'Zoho',
            dailyFocusGoalMinutes: 240,
            targetDsaPerDay: 3,
          });
        })
        .finally(() => {
          setIsLoading(false);
          setBridging(false);
        });
    } else if (!isSignedIn && clerkLoaded) {
      setUser(null);
      setToken(null);
      setIsLoading(false);
    }
  }, [isSignedIn, clerkLoaded, clerkUser]);

  const login = async (usernameOrEmail: string, password: string) => {
    if (!signIn || !signInLoaded) throw new Error('Sign in not ready');
    setIsLoading(true);
    try {
      const result = await signIn.create({
        identifier: usernameOrEmail,
        password,
      });
      if (result.status === 'complete') {
        await setSignInActive({ session: result.createdSessionId });
        // AuthContext useEffect will handle the bridge
      } else {
        throw new Error('Sign in incomplete: ' + result.status);
      }
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  };

  const register = async (data: {
    username: string;
    email: string;
    password: string;
    fullName?: string;
    targetCompany?: string;
  }) => {
    if (!signUp || !signUpLoaded) throw new Error('Sign up not ready');
    setIsLoading(true);
    try {
      const result = await signUp.create({
        emailAddress: data.email,
        password: data.password,
        firstName: data.fullName?.split(' ')[0] || data.username,
        lastName: data.fullName?.split(' ').slice(1).join(' ') || '',
      });

      if (result.status === 'complete') {
        await setSignUpActive({ session: result.createdSessionId });
      } else if (result.status === 'missing_requirements') {
        // Email verification needed - prepare verification
        await result.prepareEmailAddressVerification({ strategy: 'email_code' });
        // Store target company for later use
        if (data.targetCompany) {
          localStorage.setItem('focusforge_target_company', data.targetCompany);
        }
        // Throw a special error so the UI can show the verification step
        throw { code: 'NEEDS_VERIFICATION', signUp: result };
      }
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  };

  const logout = async () => {
    clearBackendCache();
    setUser(null);
    setToken(null);
    await signOut();
  };

  const signInWithGoogle = async () => {
    if (!signIn || !signInLoaded) return;
    await signIn.authenticateWithRedirect({
      strategy: 'oauth_google',
      redirectUrl: `${window.location.origin}/sso-callback`,
      redirectUrlComplete: '/',
    });
  };

  const signInWithGithub = async () => {
    if (!signIn || !signInLoaded) return;
    await signIn.authenticateWithRedirect({
      strategy: 'oauth_github',
      redirectUrl: `${window.location.origin}/sso-callback`,
      redirectUrlComplete: '/',
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!isSignedIn && !!user,
        isLoading: isLoading || !clerkLoaded,
        login,
        register,
        logout,
        signInWithGoogle,
        signInWithGithub,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
