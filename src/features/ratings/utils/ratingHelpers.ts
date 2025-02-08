import { Rating } from '../../../types/rating';

export const calculateAverageRating = (ratings: Rating[]): number => {
  if (!ratings.length) return 0;
  const sum = ratings.reduce((acc, rating) => acc + rating.score, 0);
  return sum / ratings.length;
};

export const getRatingLabel = (score: number): string => {
  if (score >= 4.5) return 'Excellent';
  if (score >= 4) return 'Very Good';
  if (score >= 3) return 'Good';
  if (score >= 2) return 'Fair';
  return 'Poor';
};