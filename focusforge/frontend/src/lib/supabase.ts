import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const getCurrentUserId = (): string => {
  const userId = localStorage.getItem('focusforge_user_id');
  if (!userId) {
    console.error('No user ID found in localStorage');
  }
  return userId || '';
};

