-- Run this script in the Supabase SQL Editor:
-- https://supabase.com/dashboard/project/enyniyygyakbkhuinwwd/sql/new

CREATE TABLE IF NOT EXISTS enquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  reference_id TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  service_id TEXT NOT NULL,
  budget TEXT,
  timeline TEXT,
  description TEXT NOT NULL,
  status TEXT DEFAULT 'New',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;

-- Allow public clients anywhere to insert quote requests
CREATE POLICY "Allow public insert on enquiries" 
ON enquiries 
FOR INSERT 
TO public 
WITH CHECK (true);

-- Allow public/authenticated to read enquiries for the admin portal
CREATE POLICY "Allow public read on enquiries" 
ON enquiries 
FOR SELECT 
TO public 
USING (true);

