-- Add phone column to existing contacts table
-- Run this in Supabase SQL Editor

ALTER TABLE contacts ADD COLUMN IF NOT EXISTS phone VARCHAR(20);
