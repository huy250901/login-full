import type { RegisterOptions, UseFormGetValues } from "react-hook-form";
type Rules = {
  [keyof in
    | "email"
    | "notRequired"
    | "password"
    | "repeatPassword"
    | "isRequired"]: RegisterOptions;
};

export const rules = (getValues?: UseFormGetValues<any>): Rules => ({
  notRequired: {
    required: false,
  },
  isRequired: {
    required: { value: true, message: "isRequired" },
  },
  password: {
    required: { value: true, message: "requiredPassword" },
    minLength: { value: 4, message: "maxLengthPassword" },
  },
  repeatPassword: {
    required: { value: true, message: "requiredPassword" },
    minLength: { value: 4, message: "maxLengthPassword" },
    validate:
      typeof getValues === "function"
        ? (value) => value === getValues("password") || "passwordDoNotMatch"
        : undefined,
  },
  email: {
    required: {
      value: true,
      message: "requiredEmail",
    },
    pattern: {
      value:
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: "invalidEmail",
    },
    // maxLength: {
    //   value: 150,
    //   message: "Length from 5-10 characters",
    // },
    // minLength: {
    //   value: 5,
    //   message: "Length from 5-10 characters",
    // },
  },
  // phone_number: {
  //   required: {
  //     value: false,
  //     message: "Email is required",
  //   },
  //   pattern: {
  //     value:
  //       /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/,
  //     message: "Phone number invalidate",
  //   },
  // },
});