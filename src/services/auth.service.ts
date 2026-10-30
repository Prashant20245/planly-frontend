import type { SignupFormValues } from "@/lib/auth/signup-validation";
import type { LoginCredentials, LoginResponse } from "@/types/auth";

const API_BASE_URL = (process.env.NEXT_PUBLIC_API_URL ?? "").replace(
  /\/+$/,
  "",
);

export interface RegisterResponse {
  message: string;
}

export async function registerUser(
  values: SignupFormValues,
): Promise<RegisterResponse> {
  const response = await fetch("/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    credentials: "same-origin",
    body: JSON.stringify({
      name: values.name.trim(),
      email: values.email.trim(),
      password: values.password,
    }),
  });

  const data: unknown = await response.json().catch(() => null);

  if (
    typeof data !== "object" ||
    data === null ||
    !("message" in data) ||
    typeof data.message !== "string"
  ) {
    if (!response.ok) {
      throw new Error("Unable to create your account. Please try again.");
    }

    throw new Error("The server returned an invalid response.");
  }

  if (!response.ok) {
    throw new Error(data.message);
  }

  return {
    message: data.message,
  };
}

export async function loginUser(
  credentials: LoginCredentials,
): Promise<LoginResponse> {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    credentials: "include",
    cache: "no-store",
    body: JSON.stringify({
      email: credentials.email.trim(),
      password: credentials.password,
      rememberMe: credentials.rememberMe,
    }),
  });

  const data: unknown = await response.json().catch(() => null);

  if (!response.ok) {
    const message =
      typeof data === "object" &&
      data !== null &&
      "message" in data &&
      typeof data.message === "string"
        ? data.message
        : "Unable to sign in. Please try again.";

    throw new Error(message);
  }

  if (
    typeof data !== "object" ||
    data === null ||
    !("message" in data) ||
    typeof data.message !== "string"
  ) {
    throw new Error("The server returned an invalid response.");
  }

  const redirectTo =
    "redirectTo" in data && typeof data.redirectTo === "string"
      ? data.redirectTo
      : undefined;

  return {
    message: data.message,
    redirectTo,
  };
}
