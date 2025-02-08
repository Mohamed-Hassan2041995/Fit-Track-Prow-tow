/*
  # Create ratings system tables

  1. New Tables
    - `ratings`
      - `id` (uuid, primary key)
      - `from_user_id` (uuid, references auth.users)
      - `to_user_id` (uuid, references auth.users)
      - `score` (integer, 1-5)
      - `feedback` (text)
      - `created_at` (timestamptz)
    
  2. Security
    - Enable RLS on ratings table
    - Add policies for authenticated users
*/

CREATE TABLE IF NOT EXISTS ratings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  from_user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  to_user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  score integer NOT NULL CHECK (score >= 1 AND score <= 5),
  feedback text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE ratings ENABLE ROW LEVEL SECURITY;

-- Users can read ratings for themselves or ratings they've given
CREATE POLICY "Users can read relevant ratings"
  ON ratings FOR SELECT
  TO authenticated
  USING (
    auth.uid() = from_user_id OR 
    auth.uid() = to_user_id
  );

-- Users can create ratings
CREATE POLICY "Users can create ratings"
  ON ratings FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = from_user_id);

-- Users can update their own ratings
CREATE POLICY "Users can update own ratings"
  ON ratings FOR UPDATE
  TO authenticated
  USING (auth.uid() = from_user_id)
  WITH CHECK (auth.uid() = from_user_id);