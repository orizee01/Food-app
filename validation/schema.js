import Joi from "joi";
import ValidationHelper from "./validation";

const {
  emailCheck,
  passwordCheck,
  stringCheck,
  numberCheck,
} = ValidationHelper;

export default {
  registerSchema: Joi.object({
    firstName: stringCheck("firstName"),
    lastName: stringCheck("lastName"),
    email: emailCheck(),
    password: passwordCheck(),
    phone: numberCheck(),
  }),

  checkEmailSchema: Joi.object({
    email: emailCheck(),
  }),

  checkEmailToken: Joi.object({
    emailToken: stringCheck('Token')
  }),

  passwordReset: Joi.object({
    password: passwordCheck()
  }),

  loginSchema: Joi.object({
    email: emailCheck(),
    password: passwordCheck(),
  }),



 
};
