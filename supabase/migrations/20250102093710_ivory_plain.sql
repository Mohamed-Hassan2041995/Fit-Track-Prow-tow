/*
  # نظام قياسات المتدرب
  
  1. الجداول الجديدة:
    - trainee_measurements: القياسات الأساسية للمتدرب
    - inbody_records: سجلات قياسات InBody
    - fitness_assessments: تقييمات اللياقة البدنية
*/

-- جدول القياسات الأساسية
CREATE TABLE trainee_measurements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  trainee_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  trainer_id uuid REFERENCES auth.users(id),
  height numeric NOT NULL,
  weight numeric NOT NULL,
  body_fat_percentage numeric,
  muscle_mass numeric,
  measurement_date timestamptz DEFAULT now(),
  notes text,
  created_at timestamptz DEFAULT now()
);

-- سجلات InBody
CREATE TABLE inbody_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  trainee_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  measurement_id uuid REFERENCES trainee_measurements(id),
  skeletal_muscle_mass numeric,
  body_fat_mass numeric,
  total_body_water numeric,
  protein numeric,
  minerals numeric,
  visceral_fat_level numeric,
  basal_metabolic_rate numeric,
  inbody_score numeric,
  created_at timestamptz DEFAULT now()
);

-- تقييمات اللياقة البدنية
CREATE TABLE fitness_assessments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  trainee_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  trainer_id uuid REFERENCES auth.users(id),
  cardiovascular_endurance text,
  muscular_strength text,
  muscular_endurance text,
  flexibility text,
  balance text,
  assessment_date timestamptz DEFAULT now(),
  recommendations text,
  created_at timestamptz DEFAULT now()
);

-- تفعيل RLS
ALTER TABLE trainee_measurements ENABLE ROW LEVEL SECURITY;
ALTER TABLE inbody_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE fitness_assessments ENABLE ROW LEVEL SECURITY;

-- سياسات الأمان
CREATE POLICY "Trainers can view their trainees' measurements"
  ON trainee_measurements FOR SELECT
  TO authenticated
  USING (
    auth.uid() = trainer_id OR 
    auth.uid() = trainee_id
  );

CREATE POLICY "Trainers can insert measurements"
  ON trainee_measurements FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = trainer_id);

CREATE POLICY "Users can view their own inbody records"
  ON inbody_records FOR SELECT
  TO authenticated
  USING (auth.uid() = trainee_id);

CREATE POLICY "Trainers can manage fitness assessments"
  ON fitness_assessments FOR ALL
  TO authenticated
  USING (auth.uid() = trainer_id);