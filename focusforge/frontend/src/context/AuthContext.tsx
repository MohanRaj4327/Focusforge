import React, { createContext, useContext, useState, useEffect } from 'react';
import { useUser, useClerk, useSignIn, useSignUp } from '@clerk/clerk-react';
import { User } from '../types';
import { supabase } from '../lib/supabase';

interface AuthContextType {
  user: User | null;
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
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [bridging, setBridging] = useState(false);

  // Sync Clerk user with Supabase
  useEffect(() => {
    if (!clerkLoaded) return;

    if (isSignedIn && clerkUser && !bridging) {
      setBridging(true);
      setIsLoading(true);
      localStorage.setItem('focusforge_user_id', clerkUser.id);

      const syncUserToSupabase = async () => {
        try {
          const targetCompany = localStorage.getItem('focusforge_target_company') || 'Zoho';
          
          // Check if user exists in Supabase
          const { data: existingUser } = await supabase
            .from('users')
            .select('*')
            .eq('id', clerkUser.id)
            .single();

          let userData: User;

          if (!existingUser) {
            // Create user in Supabase
            const newUser = {
              id: clerkUser.id,
              email: clerkUser.emailAddresses[0]?.emailAddress || '',
              full_name: clerkUser.fullName || clerkUser.firstName || 'User',
              target_company: targetCompany,
              daily_focus_goal_minutes: 240,
              target_dsa_per_day: 3,
            };

            const { data: createdUser, error } = await supabase
              .from('users')
              .insert(newUser)
              .select()
              .single();

            if (error) throw error;
            
            // Map Supabase snake_case to frontend camelCase
            userData = {
              id: createdUser.id,
              username: createdUser.email.split('@')[0],
              email: createdUser.email,
              fullName: createdUser.full_name,
              targetCompany: createdUser.target_company,
              dailyFocusGoalMinutes: createdUser.daily_focus_goal_minutes,
              targetDsaPerDay: createdUser.target_dsa_per_day,
            };
          } else {
            // Map existing Supabase user to frontend model
            userData = {
              id: existingUser.id,
              username: existingUser.email.split('@')[0],
              email: existingUser.email,
              fullName: existingUser.full_name,
              targetCompany: existingUser.target_company,
              dailyFocusGoalMinutes: existingUser.daily_focus_goal_minutes,
              targetDsaPerDay: existingUser.target_dsa_per_day,
            };
          }

          setUser(userData);
          localStorage.removeItem('focusforge_target_company'); // Clear temporary storage
        } catch (err) {
          console.error('Error syncing user with Supabase:', err);
          // Fallback user if DB fails temporarily
          setUser({
            id: clerkUser.id as any,
            username: clerkUser.emailAddresses[0]?.emailAddress?.split('@')[0] || 'user',
            email: clerkUser.emailAddresses[0]?.emailAddress || '',
            fullName: clerkUser.fullName || clerkUser.firstName || 'User',
            targetCompany: 'Zoho',
            dailyFocusGoalMinutes: 240,
            targetDsaPerDay: 3,
          });
        } finally {
          setIsLoading(false);
          setBridging(false);
        }
      };

      syncUserToSupabase();
    } else if (!isSignedIn && clerkLoaded) {
      localStorage.removeItem('focusforge_user_id');
      setUser(null);
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
        await result.prepareEmailAddressVerification({ strategy: 'email_code' });
        if (data.targetCompany) {
          localStorage.setItem('focusforge_target_company', data.targetCompany);
        }
        throw { code: 'NEEDS_VERIFICATION', signUp: result };
      }
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  };

  const logout = async () => {
    localStorage.removeItem('focusforge_user_id');
    setUser(null);
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
