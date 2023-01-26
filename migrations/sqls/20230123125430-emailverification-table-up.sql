/* Replace with your SQL commands */
ALTER TABLE Users ADD COLUMN email_verification_expire TEXT DEFAULT NULL;
ALTER TABLE Users ADD COLUMN emailverificationtoken TEXT DEFAULT NULL;
    