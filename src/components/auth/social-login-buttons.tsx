"use client";

import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

interface SocialLoginButtonsProps {
  disabled?: boolean;
}

export function SocialLoginButtons({
  disabled = false,
}: SocialLoginButtonsProps) {
  function startOAuth(provider: "google" | "github") {
    if (disabled) return;

    const apiBaseUrl = (process.env.NEXT_PUBLIC_API_URL ?? "").replace(
      /\/+$/,
      "",
    );

    window.location.assign(`${apiBaseUrl}/api/auth/${provider}`);
  }

  const buttonClass =
    "inline-flex min-h-[58px] w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm font-semibold text-slate-900 transition-colors hover:border-slate-300 hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 disabled:cursor-not-allowed disabled:opacity-50";

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      <button
        type="button"
        disabled={disabled}
        onClick={() => startOAuth("google")}
        className={buttonClass}
      >
        <FcGoogle size={25} aria-hidden="true" />

        <span>Continue with Google</span>
      </button>

      <button
        type="button"
        disabled={disabled}
        onClick={() => startOAuth("github")}
        className={buttonClass}
      >
        <FaGithub size={25} className="text-slate-950" aria-hidden="true" />

        <span>Continue with GitHub</span>
      </button>
    </div>
  );
}
