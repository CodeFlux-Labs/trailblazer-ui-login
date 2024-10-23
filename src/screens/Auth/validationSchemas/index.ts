import * as Yup from "yup";

export const passwordValidation = Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .matches(/[A-Z]/, "Password must have at least one uppercase letter")
    .matches(/[a-z]/, "Password must have at least one lowercase letter")
    .matches(/[0-9]/, "Password must have at least one number")
    .matches(/[!@#$%^&*(),.?":{}|<>]/, "Password must have at least one special character")
    .max(30, "Password cannot be longer than 30 characters");

export const emailValidation = Yup.string()
    .email("Insert a valid email")
    .required("Email is required")
    .max(40);
