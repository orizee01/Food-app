import config from "../config";
import Helper from "../utilis/helpers/helper";
import { Response, apiMessage } from "../utilis/constants/";

export default class AuthMiddleware {


     /**
   * validates post request body
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @param {Next} next - The function that calls the next handler.
   * @returns { JSON } - Returns the details
   */
  static validate(schema) {
    return async (req, res, next) => {
      try {
        await Helper.validateInput(schema, req.body);

        next();
      } catch (error) {
        return res.status(400).json({ message: error.details[0].message });
      }
    };
  }

  /**
   * Checks for token in the authorization and x-access-token header properties.
   * @static
   * @private
   * @param {object} authorization - The headers object
   * @memberof AuthMiddleware
   * @returns {string | null} - Returns the Token or Null
   */

  static verifyAuth = (req, res, next) => {
    try {
      const token = req.header("Authorization");

      if (!token) {
        return Response.errorResponse(req, res, {
          status: 422,
          message: apiMessage.TOKEN_ERROR,
        });
      }

      const verify = AuthMiddleware.verifyToken(token);
      if (verify.message) {
        return res
          .status(403)
          .json({ message: verify.message, status: "fail" });
      }

      logger.info(verify);
      req.decoded = verify;
      next();
    } catch (err) {
      res.status(400).json({
        status: "fail",
        messages: err.message,
      });
    }
  };

  /**
   * Verifies the validity of a user's access token or and the presence of it.
   * @static
   * @param { Object } req - The request from the endpoint.
   * @param { Object } res - The response returned by the method.
   * @param { function } next - Calls the next handle.
   * @returns { JSON | Null } - Returns error response if validation fails or Null if otherwise.
   * @memberof AuthMiddleware
   *
   */
  static verifyToken = (token) => {
    try {
      const decoded = req.body.refreshToken
        ? Helper.verifyToken(token, config.REFRESH_SECRET)
        : Helper.verifyToken(token, config.JWT_SECRET_KEY);

      return decoded;
    } catch (err) {
      return err;
    }
  };
}
