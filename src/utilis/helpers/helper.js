import config from "../../config";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

export default class Helper {

  /**
   * validates an input based on a schema
   * @static
   * @param { Joi } schema - The validation schema.
   * @param { Object } object - The data to be validated
   * @memberof Helper
   * @returns { boolean }
   */
  static async validateInput(schema, object) {
    return schema.validateAsync(object);
  }


 /**
   * hash password
   * @static
   * @memberof Helper
   * @returns {string | number } - generate password hash.
   */
   static generatePasswordHash(password) {
    return bcrypt.hashSync(password, 10);
  }


/**
   * generate JWT token
   * @static
   * @memberof Helper
   * @returns {String}
   */

    static generateToken(payload) {
    const token = jwt.sign(payload, config.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });
    const refreshToken = jwt.sign(payload, config.REFRESH_SECRET);
    return { token, refreshToken };
  } 

   

  /**
   * verify JWT token
   * @static
   * @memberof Helper
   * @returns {String}
   */
  static verifyToken(token, JWT_SECRET) {
    return jwt.verify(token, JWT_SECRET);
  }



   /**
   * set expiry time for tokens.
   * @static
   * @private
   * @memberof Helpers
   * @returns {String} - It returns time string value.
   */
   static setTokenExpire(minutes) {
    const expiresIn = new Date().getTime() + minutes * 60 * 1000;
    return new Date(expiresIn);
  }


/**
   * Generates log for api errors.
   * @static
   * @private
   * @param {object} error - The API error object.
   * @param {Request} req - Request object.
   * @memberof Helpers
   * @returns {String} - It returns null.
   */
static apiHelperMessager(error, req) {
    logger.error(
      `${error.status} - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`
    );
  }


 /**
   * compare hash password
   * @static
   * @memberof Helper
   * @returns {Boolean}
   */
 static async comparePasswordHash(password, hash) {
  return bcrypt.compare(password, hash);
}

}

  
