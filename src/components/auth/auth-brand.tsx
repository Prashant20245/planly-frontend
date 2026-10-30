import Link from "next/link";
import { Leaf } from "lucide-react";

interface AuthBrandProps {
  href?: string;
}

export function AuthBrand({ href = "/" }: AuthBrandProps) {
  return (
    <Link
      href={href}
      aria-label="Planly home"
      className="group inline-flex w-fit items-center gap-3 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-600"
    >
      <Leaf
        size={40}
        strokeWidth={1.8}
        className="fill-emerald-500 text-emerald-600 transition-transform duration-200 group-hover:-rotate-6"
        aria-hidden="true"
      />

      <span className="flex flex-col">
        <span className="text-2xl font-extrabold tracking-tight text-slate-950">
          Planly
        </span>

        <span className="mt-0.5 text-xs text-slate-500">
          Plan Today, Build Tomorrow.
        </span>
      </span>
    </Link>
  );
}
