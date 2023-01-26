export default {
  registerUser: `
            INSERT INTO Users (firstname,lastname,email,phone_number,password,emailverificationtoken, email_verification_expire)
            VALUES ($1, $2, $3, $4, $5, $6, $7) 
            RETURNING *
    `,

  getUserByEmail: `
            SELECT * FROM Users WHERE email = $1
    `,
  findByEmail: `SELECT email FROM  Users WHERE email = $1`,

  updatePassword: `
          UPDATE Users
          SET password = $1,
          password_reset_string = NULL,
          password_reset_expire = NULL,
          updated_at = NOW()
          WHERE email = $2
      `,
  updateEmailVerificationToken: `
         UPDATE users
        SET emailverificationtoken = $1,
        email_verification_expire = $2,
        updated_at = NOW()
        WHERE id = $3
      `,

  fetchUserByPasswordToken: `
      SELECT password_reset_string, email
       FROM users
      WHERE password_reset_string = $1
      AND password_reset_expire::timestamp > NOW()
`,
    updateIsEmailVerified: `
     UPDATE users
     SET isemailverified = true,
     updated_at = NOW()
     WHERE id = $1
   `,

   fetchUserByEmailVerificationToken: `
      SELECT id,emailverificationtoken, email
      FROM users
      WHERE emailverificationtoken = $1
      AND email_verification_expire::timestamp > NOW()
  `,

  updatePasswordResetString: `
      UPDATE users
      SET password_reset_string = $1,
      password_reset_expire = $2,
      updated_at = NOW()
      WHERE email = $3
      
`,
};
