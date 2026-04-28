import * as yup from "yup";

export const signupSchema = yup.object().shape({
  username: yup
    .string()
    .min(3, "Username atleast at least 3 characters")
    .required("Username is required"),

  email: yup.string().email("Invalid email").required("Email is required"),

  password: yup
    .string()
    .min(6, "At least 6 characters")
    .matches(/[A-Z]/, "One uppercase required")
    .matches(/[0-9]/, "One number required")
    .matches(/[@$!%*?&#]/, "One special character required")
    .required("Password is required"),
});
