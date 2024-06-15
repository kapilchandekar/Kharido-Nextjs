import {
  EMAIL_VALLATION_ERR,
  FIRST_NAME_MAX_VALIDATION_ERR,
  FIRST_NAME_MIN_VALIDATION_ERR,
  MOBILE_NO_ERR,
  OTP_MAX_VALIDATION_ERR,
  PASSWORD_REGEXP,
  PASSWORD_VALIDATION_ERR,
  REQUIRED_ERR,
} from "@/constant/validationErrorConstant";
import * as Yup from "yup";

export const signUpValidation = Yup.object({
  username: Yup.string()
    .min(2, FIRST_NAME_MIN_VALIDATION_ERR)
    .max(20, FIRST_NAME_MAX_VALIDATION_ERR),

  email: Yup.string().email(EMAIL_VALLATION_ERR),
  mobileno: Yup.string().matches(MOBILE_NO_ERR, "Phone number is not valid"),
  password: Yup.string().matches(PASSWORD_REGEXP, PASSWORD_VALIDATION_ERR),
});

export const signInValidation = Yup.object({
  email: Yup.string().email(EMAIL_VALLATION_ERR),
  password: Yup.string().matches(PASSWORD_REGEXP, PASSWORD_VALIDATION_ERR),
});

export const emailValidation = Yup.object({
  email: Yup.string().email(EMAIL_VALLATION_ERR),
});
export const otpValidation = Yup.object({
  otp : Yup.string().min(4, OTP_MAX_VALIDATION_ERR).max(4, OTP_MAX_VALIDATION_ERR),
});
