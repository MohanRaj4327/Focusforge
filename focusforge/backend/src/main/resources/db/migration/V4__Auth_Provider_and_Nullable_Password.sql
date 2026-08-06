-- Add auth_provider column to support LOCAL, GOOGLE, GITHUB
ALTER TABLE users ADD COLUMN auth_provider VARCHAR(20) DEFAULT 'LOCAL';

-- Make password nullable since OAuth2 users will not have a password
ALTER TABLE users ALTER COLUMN password DROP NOT NULL;
