/* Replace with your SQL commands */
ALTER TABLE Users ADD COLUMN IF NOT EXISTS password_reset_string TEXT DEFAULT NULL;
ALTER TABLE Users ADD COLUMN IF NOT EXISTS password_reset_expire TEXT DEFAULT NULL;
    