import db from "../config/db/config";
import queries from "../queries/users.queries";
import Helper from '../utilis/helpers/helper'
export default class UserVerificationRequirement {
    /**
     * register a user
     * @memberof UserVerificationRequirement
     */
    static async addUser(data) {
        let { firstName, lastName, email, password, phone, emailverificationtoken,
            email_verification_expire,} = data
        password = Helper.generatePasswordHash(password);
        return db.one(queries.registerUser, [firstName, lastName, email, phone, password , emailverificationtoken,
            email_verification_expire])
    }


    /**
   * get user by email
   * @memberof UserService
   */
  static async getUserByEmail(email) {
    return db.oneOrNone(queries.getUserByEmail, [email]);

  }


/**
   * find user by email
   * @memberof UserService
   */

  static async findUserByEmail (email)  {
    return  db.oneOrNone(queries.findByEmail, [email]);

}
   

  /**
   *  set user email verified status
   * @memberof UserService
   */
  static async updateIsEmailVerified(userId) {
    return db.none(queries.updateIsEmailVerified, [userId]);
  }
  

 /**
   * update client password
   * @memberof UserService
   */
 static async updatePassword(password, email) {
    password = Helper.generatePasswordHash(password);
    return db.oneOrNone(queries.updatePassword, [password, email]);
  }
  




    /**
   *  verify email
   * @memberof UserService
   */
    static async verifyEmail(userId) {
        return Promise.all([
          UserVerificationRequirement.updateEmailVerificationToken(null, null, userId),
          UserVerificationRequirement.updateIsEmailVerified(userId),
        ]);
      }



/**
   *  set password reset token
   * @memberof UserService
   */
static async updatePasswordResetString(token, tokenExpire, email) {
  return db.none(queries.updatePasswordResetString, [
    token,
    tokenExpire,
    email,
  ]);
}


       /**
   *  set email verification token
   * @memberof UserService
   */
  static async updateEmailVerificationToken(token, token_expire, userId) {
    return db.oneOrNone(queries.updateEmailVerificationToken, [
      token,
      token_expire,
      userId,
    ]);
  }




    /**
   *  fetch password reset token
   * @memberof UserService
   */
    static async fetchUserByPasswordToken(token) {
        return db.oneOrNone(queries.fetchUserByPasswordToken, [token]);
      }



 

       /**
   *  fetch email verification token
   * @memberof UserService
   */
  static async fetchUserByEmailVerificationToken(token) {
    return db.oneOrNone(queries.fetchUserByEmailVerificationToken, [token]);
  }
    }
    






