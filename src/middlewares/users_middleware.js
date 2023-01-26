
import UserService from '.././services/users_service'

import { Response, apiMessage } from "../utilis/constants";

const { getUserByEmail } = UserService;
import Helper from ".././utilis/helpers/helper"


export default class UserMiddleware {
  /**
   * Checks if user exists
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @param {Next} next - The function that calls the next handler.
   * @returns { JSON } - Returns message
   */

  static async emailExists(req, res, next) {
    try {
      const { email } = req.body;
      const user = await getUserByEmail(email.trim().toLowerCase());

      if (user) {
        return Response.errorResponse(req, res, {
          status: 409,
          message: apiMessage.RESOURCE_ALREADY_EXISTS("user"),
        });
      }

      return next();
    } catch (error) {
      logger.error(error);
      return error;
    }
  }


 /**
   * Checks if user does not exists
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @param {Next} next - The function that calls the next handler.
   * @returns { JSON } - Returns message
   */

 static async emailDoesNotExist(req, res, next) {
      
    try {
      const { email } = req.body;
      const user = await getUserByEmail(email.trim().toLowerCase());
      if (!user) {
        return Response.errorResponse(req, res, {
          status: 409,
          message: "invalid credentials",
        });
      }

      req.user = user;
      return next();
    } catch (error) {
      logger.error(error);
      return error;
    }
  }


   /**
   * compare user passwords
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @param {Next} next - The function that calls the next handler.
   * @returns { JSON } - Returns message
   */
   static async validateUserPassword(req, res, next) {
    try {
      const { user, body } = req;
      const passwordMatch = await Helper.comparePasswordHash(
        body.password,
        user.password
      );

      if (!passwordMatch) {
        return Response.errorResponse(req, res, {
          status: 400,
          message: apiMessage.PASSWORD_INCORRECT,
        });
      }

      return next();
    } catch (error) {
      logger.error(error);
      return error;
    }
  }

    /**
   * check if user email is verified
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @param {Next} next - The function that calls the next handler.
   * @returns { JSON } - Returns message
   */
    static async validateUserAccount(req, res, next) {
        try {
          const { user } = req;
    
          if (!user.isemailverified) {
            return Response.errorResponse(req, res, {
              status: 206,
              message: "Please check your email inbox to verify your account",
            });
          }
    
          req.user = user;
    
          return next();
        } catch (error) {
          logger.error(error);
          return error;
        }
      }



      static async validateEmailVerificationToken(req, res, next) {
        try {
          const user = await UserService.fetchUserByEmailVerificationToken(
            req.params.emailToken
          );
    
          if (!user) {
            return Response.errorResponse(req, res, {
              status: 400,
              message: "Expired or invalid token",
            });
          }
    
          req.userId = user.id;
          
          return next();
        } catch (error) {
          logger.error(error);
          return error;
        }
      }



       /**
   * checks reset password token
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @param {Next} next - The function that calls the next handler.
   * @returns { JSON } - Returns message
   */

  static async validateResetPasswordToken(req, res, next) {
    try {
      const user = await UserService.fetchUserByPasswordToken(
        req.params.resetPasswordToken
      );

      if (!user) {
        return Response.errorResponse(req, res, {
          status: 400,
          message: apiMessage.RESOURCE_NOT_FOUND("Expired or invalid token"),
        });
      }

      req.user = user;
      return next();
    } catch (error) {
      logger.error(error);
      return error;
    }
  }
   
    }
    
