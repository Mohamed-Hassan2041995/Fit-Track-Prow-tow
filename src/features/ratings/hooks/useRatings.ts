import { useState, useEffect } from 'react';
import { supabase } from '../../../utils/supabaseClient';
import { Rating, RatingStats } from '../../../types/rating';

export const useRatings = (targetId: string) => {
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [stats, setStats] = useState<RatingStats>({
    averageScore: 0,
    totalRatings: 0,
    breakdown: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRatings = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('ratings')
        .select(`
          *,
          from_user:from_user_id(id, first_name, last_name)
        `)
        .eq('to_user_id', targetId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRatings(data);
      calculateStats(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching ratings');
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (ratings: Rating[]) => {
    const breakdown = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    let total = 0;

    ratings.forEach(rating => {
      breakdown[rating.score as keyof typeof breakdown]++;
      total += rating.score;
    });

    setStats({
      averageScore: ratings.length ? total / ratings.length : 0,
      totalRatings: ratings.length,
      breakdown
    });
  };

  const addRating = async (score: number, feedback: string) => {
    try {
      const { data, error } = await supabase
        .from('ratings')
        .insert([
          {
            to_user_id: targetId,
            score,
            feedback
          }
        ])
        .select()
        .single();

      if (error) throw error;

      setRatings(prev => [data, ...prev]);
      calculateStats([...ratings, data]);
      return data;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Error adding rating');
    }
  };

  useEffect(() => {
    if (targetId) {
      fetchRatings();
    }
  }, [targetId]);

  return {
    ratings,
    stats,
    loading,
    error,
    addRating,
    refreshRatings: fetchRatings
  };
};

export default useRatings;