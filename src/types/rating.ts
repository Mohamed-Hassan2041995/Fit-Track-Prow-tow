export interface Rating {
  id: string;
  fromUserId: string;
  toUserId: string;
  score: number;
  feedback: string;
  createdAt: Date;
}

export interface RatingStats {
  averageScore: number;
  totalRatings: number;
  breakdown: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
}