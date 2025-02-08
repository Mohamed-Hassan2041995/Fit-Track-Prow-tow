export const RATING_SCORES = [1, 2, 3, 4, 5] as const;

export const RATING_LABELS = {
  1: 'Poor',
  2: 'Fair',
  3: 'Good',
  4: 'Very Good',
  5: 'Excellent',
} as const;

export const INITIAL_RATING_STATS = {
  averageScore: 0,
  totalRatings: 0,
  breakdown: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
};