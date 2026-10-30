import Link from "next/link";
import { Leaf } from "lucide-react";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { navigation, siteConfig } from "@/lib/site-date";

export function Footer() {
  return (
    <footer className="border-t border-slate-100 bg-white">
      <div className="container-main py-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          {/* Brand */}
          <Link
            href="/"
            className="flex items-center gap-2"
            aria-label="Planly home"
          >
            <Leaf
              size={25}
              className="fill-emerald-500 text-emerald-600"
              aria-hidden="true"
            />

            <div>
              <span className="block text-xl font-extrabold tracking-tight text-slate-950">
                {siteConfig.name}
              </span>

              <span className="block text-[10px] text-slate-500">
                {siteConfig.tagline}
              </span>
            </div>
          </Link>

          {/* Footer navigation */}
          <nav
            aria-label="Footer navigation"
            className="flex flex-wrap gap-x-5 gap-y-3"
          >
            {navigation
              .filter((item) => item.label !== "Home")
              .map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-xs font-medium text-slate-500 transition-colors hover:text-emerald-700"
                >
                  {item.label}
                </Link>
              ))}

            <Link
              href="/contact"
              className="text-xs font-medium text-slate-500 transition-colors hover:text-emerald-700"
            >
              Contact
            </Link>
          </nav>

          {/* Social media links */}
          <div className="flex items-center gap-3">
            <a
              href="https://x.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X"
              className="social-link"
            >
              <FaXTwitter size={16} aria-hidden="true" />
            </a>

            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="social-link"
            >
              <FaLinkedin size={16} aria-hidden="true" />
            </a>

            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="social-link"
            >
              <FaGithub size={16} aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* Copyright and legal links */}
        <div className="mt-7 flex flex-col gap-3 border-t border-slate-100 pt-5 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Planly. All rights reserved.</p>

          <nav aria-label="Legal navigation" className="flex flex-wrap gap-4">
            <Link
              href="/privacy"
              className="transition-colors hover:text-emerald-700"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms"
              className="transition-colors hover:text-emerald-700"
            >
              Terms of Service
            </Link>

            <Link
              href="/cookies"
              className="transition-colors hover:text-emerald-700"
            >
              Cookies
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
