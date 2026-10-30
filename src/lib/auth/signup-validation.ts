export interface SignupFormValues {
  name: string;
  email: string;
  password: string;
}

export type SignupFieldErrors = Partial<Record<keyof SignupFormValues, string>>;

export function validateSignup(values: SignupFormValues): SignupFieldErrors {
  const errors: SignupFieldErrors = {};

  const name = values.name.trim();
  const email = values.email.trim();

  if (!name) {
    errors.name = "Please enter your full name.";
  } else if (name.length < 2) {
    errors.name = "Your name must contain at least 2 characters.";
  } else if (name.length > 100) {
    errors.name = "Your name cannot exceed 100 characters.";
  }

  if (!email) {
    errors.email = "Please enter your email address.";
  } else if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!values.password) {
    errors.password = "Please create a password.";
  } else if (values.password.length < 8) {
    errors.password = "Your password must contain at least 8 characters.";
  } else if (values.password.length > 128) {
    errors.password = "Your password cannot exceed 128 characters.";
  } else if (
    !/[A-Za-z]/.test(values.password) ||
    !/[0-9]/.test(values.password) ||
    !/[^A-Za-z0-9]/.test(values.password)
  ) {
    errors.password = "Use a mix of letters, numbers, and symbols.";
  }

  return errors;
}
