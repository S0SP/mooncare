# MoonCare Database Schema
# Run this SQL in your Supabase SQL Editor to set up the database

## Instructions:
1. Go to https://supabase.com and create a new project
2. Go to SQL Editor in your Supabase dashboard
3. Copy and paste the SQL below
4. Click "Run" to execute

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  age INTEGER,
  has_pcos BOOLEAN DEFAULT FALSE,
  has_pcod BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Cycle history
CREATE TABLE IF NOT EXISTS cycles (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  start_date DATE NOT NULL,
  end_date DATE,
  cycle_length INTEGER,
  flow_type VARCHAR(50) CHECK (flow_type IN ('light', 'medium', 'heavy')),
  pain_level INTEGER CHECK (pain_level >= 1 AND pain_level <= 10),
  mood_symptoms TEXT[],
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Kit orders
CREATE TABLE IF NOT EXISTS kit_orders (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  kit_type VARCHAR(100) NOT NULL,
  kit_contents JSONB DEFAULT '{}',
  price DECIMAL(10,2) NOT NULL,
  order_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  delivery_date DATE,
  delivery_status VARCHAR(50) DEFAULT 'pending' CHECK (delivery_status IN ('pending', 'processing', 'shipped', 'delivered')),
  tracking_number VARCHAR(100)
);

-- Newsletter signups
CREATE TABLE IF NOT EXISTS newsletter (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Predictions (for future AI features)
CREATE TABLE IF NOT EXISTS predictions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  prediction_date DATE NOT NULL,
  predicted_period_start DATE,
  confidence_score DECIMAL(3,2),
  pain_risk INTEGER CHECK (pain_risk >= 1 AND pain_risk <= 10),
  mood_risk INTEGER CHECK (mood_risk >= 1 AND mood_risk <= 10),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_cycles_user_id ON cycles(user_id);
CREATE INDEX IF NOT EXISTS idx_kit_orders_user_id ON kit_orders(user_id);
CREATE INDEX IF NOT EXISTS idx_predictions_user_id ON predictions(user_id);
CREATE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter(email);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE cycles ENABLE ROW LEVEL SECURITY;
ALTER TABLE kit_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE predictions ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts to newsletter (for signup form)
CREATE POLICY "Allow anonymous newsletter signup" ON newsletter
  FOR INSERT TO anon
  WITH CHECK (true);

-- For now, allow all authenticated users to access their own data
-- You can customize these policies based on your auth setup

COMMENT ON TABLE users IS 'MoonCare user profiles';
COMMENT ON TABLE cycles IS 'Menstrual cycle tracking history';
COMMENT ON TABLE kit_orders IS 'Care kit orders and delivery tracking';
COMMENT ON TABLE newsletter IS 'Newsletter subscriptions';
COMMENT ON TABLE predictions IS 'AI-generated period predictions';
```

## After Running SQL:

1. Go to **Settings > API** in your Supabase dashboard
2. Copy the **Project URL** and **anon public** key
3. Create a `.env.local` file in your project root:

```
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

4. Restart your dev server: `npm run dev`
