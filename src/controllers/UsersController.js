import config from '.././config';
import {apiMessage, Response} from '.././utilis/constants'
import UserVerificationRequirement from '../services/users_service'
import randomstring from "randomstring";
import Details from './../utilis/constants'
import Helper from '../utilis/helpers/helper'
import sendEmail from "../utilis/mailer/mailer";
const { generateToken } = Helper;


 export const registerUsers = async (req, res) => {
    
    try {
        const { email } = req.body;
        
        req.body.emailverificationtoken = randomstring.generate();
        req.body.email_verification_expire = Helper.setTokenExpire(1);
    
      const users = await UserVerificationRequirement.addUser(req.body)
      delete users.password

      if (config.NODE_ENV === "test")
      return Response.successResponse(res, {
        code: 206,
        data: users,
        message: "account registered, check email for verification link",
      });

    const emailVerificationLink = `${config.HOST}/${req.body.emailverificationtoken}`;
    await sendEmail(email, "Verify Your Email", emailVerificationLink);

      
       return  Response.successResponse(res, {
        data: users,
        message: "account registered, check email for verification link",
    });
} catch (error) {
    logger.error(error.message);
    return res.json({err: error.message});
  }
       
  
    }
 

    export const login = async (req, res) => {
        try {

          const data = req.user
          console.log(req.user)
            const token =  generateToken(data)
          return res.status(200).json({
            status: "Success",
            message: "login successful",
            data: {
              ...data,
              token
            } ,
            message: apiMessage.LOGIN_USER_SUCCESSFULLY,
        });
      } catch (error) {
        logger.error(error);
        return error;
      }
    };
          

    export const regenerateEmailVerificationToken = async (req, res) => {
        try {
          const { email } = req.body;
          const token = randomstring.generate();
          const tokenExpire = Helper.setTokenExpire(1);
      
         await  UserVerificationRequirement.updateEmailVerificationToken(token, tokenExpire, req.user.id);
      
        sendEmail(email, "verify your email", token);
      
          return Response.successResponse(res, {
            message: "check email for verification link",
          });
        } catch (error) {
          logger.error(error);
          return error;
        }
      };


      export const forgotPassword = async (req, res) => {
        try {
          const { email } = req.body;
          const token = randomstring.generate();
          const tokenExpire = Helper.setTokenExpire(1);
      
          await UserVerificationRequirement.updatePasswordResetString(token, tokenExpire, email);
          if (config.NODE_ENV === "test")
            return Response.successResponse(res, {
              message: apiMessage.RESET_PASSWORD_MAIL_SUCCESS,
              data: token,
            });
      
          const passwordResetLink = `https://Food.io/forgotpassword/${token}`;
          await sendEmail(email, "Forgot Password", passwordResetLink);
      
          return Response.successResponse(res, {
            message: apiMessage.RESET_PASSWORD_MAIL_SUCCESS,
          });
        } catch (error) {
          logger.error(error);
          return error;
        }
      };



         
      export const verifyEmail = async (req, res) => {
        try {
          await UserVerificationRequirement.verifyEmail(req.userId);
      
          return Response.successResponse(res, {
            message: "email verification successful",
          });
        } catch (error) {
          logger.error(error);
          return error;
        }
      }


        export const resetPassword = async (req, res) => {
  try {
    const { email } = req.user;

    await updatePassword(req.body.password, email);

    if (config.NODE_ENV === "test")
      return Response.successResponse(res, {
        message: apiMessage.RESET_PASSWORD_SUCCESS,
      });

    await sendEmail(email, apiMessage.RESET_PASSWORD_MAIL_SUCCESS);

    return Response.successResponse(res, {
      message: apiMessage.RESET_PASSWORD_SUCCESS,
    });
  } catch (error) {
    logger.error(error);
    return error;
  }
};
      

    