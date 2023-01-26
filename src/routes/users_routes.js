import { Router } from "express";
import * as UserController from '../controllers/UsersController.js';
import UserMiddleware from "../middlewares/users_middleware.js";
import AuthMiddleware from "../middlewares/auth.middleware.js";
import schema from "../../validation/schema.js";
// import UsersController from "../controllers/UsersController";

const router = Router();

const { validate } = AuthMiddleware;

router.post(
    "/register", 
    validate(schema.registerSchema),
    UserMiddleware.emailExists,
    UserController.registerUsers,
    

  );

  router.post(
    "/login",
    validate(schema.loginSchema),
  [
    UserMiddleware.emailDoesNotExist,
    UserMiddleware.validateUserAccount,
    UserMiddleware.validateUserPassword,
  ],
  UserController.login
  );


  router.put(
    "/verify-email/:emailToken",
    UserMiddleware.validateEmailVerificationToken,
    UserController.verifyEmail
  );


  router.post(
    "/regenerate-email-token",
    validate(schema.checkEmailSchema),
    UserMiddleware.emailDoesNotExist,
    UserController.regenerateEmailVerificationToken
  )


  router.post(
    "/forgotpassword",
    validate(schema.checkEmailSchema),
    UserMiddleware.emailDoesNotExist,
    UserController.forgotPassword
  )
  
  
  router.put(
    "/resetpassword/:resetPasswordToken",
    validate(schema.passwordReset),
    UserMiddleware.validateResetPasswordToken,
    UserController.resetPassword
  );
  
  export default router;