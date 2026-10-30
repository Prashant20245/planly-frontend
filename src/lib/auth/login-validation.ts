export interface LoginFormValues {
  email: string;
  password: string;
  rememberMe: boolean;
}

export type LoginFieldErrors = Partial<Record<"email" | "password", string>>;

export function validateLogin(values: LoginFormValues): LoginFieldErrors {
  const errors: LoginFieldErrors = {};

  const email = values.email.trim();

  if (!email) {
    errors.email = "Please enter your email address.";
  } else if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!values.password) {
    errors.password = "Please enter your password.";
  } else if (values.password.length > 128) {
    errors.password = "The password exceeds the permitted length.";
  }

  return errors;
}
