/**
 * Hook لإدارة تفاصيل المستخدم
 * يوفر وظائف لجلب وتحديث معلومات المستخدم
 */
import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';
import { User, UserProfile } from '../types/user';

export const useUserDetails = (userId: string) => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*, users!inner(*)')
        .eq('user_id', userId)
        .single();

      if (error) throw error;
      setUserProfile(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching user profile');
    } finally {
      setLoading(false);
    }
  };

  const updateUserProfile = async (updates: Partial<UserProfile>) => {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .update(updates)
        .eq('user_id', userId)
        .select()
        .single();

      if (error) throw error;
      setUserProfile(data);
      return data;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Error updating profile');
    }
  };

  useEffect(() => {
    if (userId) {
      fetchUserProfile();
    }
  }, [userId]);

  return {
    userProfile,
    loading,
    error,
    updateUserProfile,
    refreshProfile: fetchUserProfile,
  };
};