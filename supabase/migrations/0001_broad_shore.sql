/*
  # إنشاء جداول التقييمات والدردشة

  1. جداول جديدة
    - `ratings`: تخزين تقييمات المستخدمين
      - `id` (uuid, المفتاح الرئيسي)
      - `from_user_id` (uuid, معرف المقيم)
      - `to_user_id` (uuid, معرف المقيَّم)
      - `score` (integer, درجة التقييم)
      - `feedback` (text, التعليق)
      - `created_at` (timestamp)
    
    - `chat_rooms`: غرف الدردشة
      - `id` (uuid, المفتاح الرئيسي)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `chat_participants`: المشاركون في الدردشة
      - `chat_room_id` (uuid)
      - `user_id` (uuid)
      - `joined_at` (timestamp)

    - `messages`: الرسائل
      - `id` (uuid, المفتاح الرئيسي)
      - `chat_room_id` (uuid)
      - `sender_id` (uuid)
      - `content` (text)
      - `created_at` (timestamp)
      - `read` (boolean)

  2. الأمان
    - تفعيل RLS لجميع الجداول
    - إضافة سياسات الأمان المناسبة
*/

-- إنشاء جدول التقييمات
CREATE TABLE IF NOT EXISTS ratings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  from_user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  to_user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  score integer NOT NULL CHECK (score >= 1 AND score <= 5),
  feedback text,
  created_at timestamptz DEFAULT now(),
  UNIQUE(from_user_id, to_user_id)
);

-- إنشاء جدول غرف الدردشة
CREATE TABLE IF NOT EXISTS chat_rooms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- إنشاء جدول المشاركين في الدردشة
CREATE TABLE IF NOT EXISTS chat_participants (
  chat_room_id uuid REFERENCES chat_rooms(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  joined_at timestamptz DEFAULT now(),
  PRIMARY KEY (chat_room_id, user_id)
);

-- إنشاء جدول الرسائل
CREATE TABLE IF NOT EXISTS messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  chat_room_id uuid REFERENCES chat_rooms(id) ON DELETE CASCADE,
  sender_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  content text NOT NULL,
  created_at timestamptz DEFAULT now(),
  read boolean DEFAULT false,
  CONSTRAINT content_not_empty CHECK (char_length(trim(content)) > 0)
);

-- تفعيل RLS
ALTER TABLE ratings ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- سياسات الأمان للتقييمات
CREATE POLICY "Users can read all ratings"
  ON ratings FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create ratings"
  ON ratings FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = from_user_id);

-- سياسات الأمان للدردشة
CREATE POLICY "Participants can read chat rooms"
  ON chat_rooms FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM chat_participants
      WHERE chat_room_id = id
      AND user_id = auth.uid()
    )
  );

CREATE POLICY "Participants can read messages"
  ON messages FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM chat_participants
      WHERE chat_room_id = messages.chat_room_id
      AND user_id = auth.uid()
    )
  );

CREATE POLICY "Participants can send messages"
  ON messages FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM chat_participants
      WHERE chat_room_id = messages.chat_room_id
      AND user_id = auth.uid()
    )
    AND auth.uid() = sender_id
  );

CREATE POLICY "Participants can see other participants"
  ON chat_participants FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM chat_participants AS cp
      WHERE cp.chat_room_id = chat_participants.chat_room_id
      AND cp.user_id = auth.uid()
    )
  );