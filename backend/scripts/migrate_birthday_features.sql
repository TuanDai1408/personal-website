-- Migration script for Birthday Features
-- Add new columns to users table and create user_images table

-- Step 1: Add new columns to users table (if they don't exist)
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS full_name VARCHAR(100),
ADD COLUMN IF NOT EXISTS dob DATE;

-- Step 2: Create user_images table
CREATE TABLE IF NOT EXISTS user_images (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    image_url VARCHAR(500) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_user_images_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Step 3: Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_user_images_user_id ON user_images(user_id);

-- Step 4: Verify tables
SELECT table_name, column_name, data_type 
FROM information_schema.columns 
WHERE table_name IN ('users', 'user_images')
ORDER BY table_name, ordinal_position;
