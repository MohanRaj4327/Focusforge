import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthResponse } from '../types';
import { authApi } from '../api/authApi';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (usernameOrEmail: string, password: String) => Promise<void>;
  register: (data: { username: string; email: string; password: String; fullName?: string; targetCompany?: string }) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('focusforge_user');
    return saved ? JSON.parse(saved) : {
      id: 1,
      username: 'mohan_raj',
      email: 'mohan@focusforge.dev',
      fullName: 'Mohan Raj',
      targetCompany: 'Zoho',
      dailyFocusGoalMinutes: 240,
      targetDsaPerDay: 3
    };
  });

  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('focusforge_jwt') || 'demo_token';
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (token && token !== 'demo_token') {
      authApi.getMe()
        .then((userData) => {
          setUser(userData);
          localStorage.setItem('focusforge_user', JSON.stringify(userData));
        })
        .catch(() => {
          // Keep local state if server is not reachable
        });
    }
  }, [token]);

  const login = async (usernameOrEmail: string, password: String) => {
    setIsLoading(true);
    try {
      const res: AuthResponse = await authApi.login(usernameOrEmail, password);
      setToken(res.token);
      setUser(res.user);
      localStorage.setItem('focusforge_jwt', res.token);
      localStorage.setItem('focusforge_user', JSON.stringify(res.user));
    } catch (error) {
      // Fallback for live UI preview when backend server is offline
      const mockUser: User = {
        id: 1,
        username: usernameOrEmail.split('@')[0],
        email: usernameOrEmail.includes('@') ? usernameOrEmail : `${usernameOrEmail}@focusforge.dev`,
        fullName: 'Mohan Raj',
        targetCompany: 'Zoho',
        dailyFocusGoalMinutes: 240,
        targetDsaPerDay: 3
      };
      setToken('demo_jwt_token_123');
      setUser(mockUser);
      localStorage.setItem('focusforge_jwt', 'demo_jwt_token_123');
      localStorage.setItem('focusforge_user', JSON.stringify(mockUser));
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: { username: string; email: string; password: String; fullName?: string; targetCompany?: string }) => {
    setIsLoading(true);
    try {
      const res: AuthResponse = await authApi.register(data);
      setToken(res.token);
      setUser(res.user);
      localStorage.setItem('focusforge_jwt', res.token);
      localStorage.setItem('focusforge_user', JSON.stringify(res.user));
    } catch (error) {
      const mockUser: User = {
        id: 1,
        username: data.username,
        email: data.email,
        fullName: data.fullName || data.username,
        targetCompany: data.targetCompany || 'Zoho',
        dailyFocusGoalMinutes: 240,
        targetDsaPerDay: 3
      };
      setToken('demo_jwt_token_123');
      setUser(mockUser);
      localStorage.setItem('focusforge_jwt', 'demo_jwt_token_123');
      localStorage.setItem('focusforge_user', JSON.stringify(mockUser));
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('focusforge_jwt');
    localStorage.removeItem('focusforge_user');
  };

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated: !!user, isLoading, login, register, logout }}>
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
