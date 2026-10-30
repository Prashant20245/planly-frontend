import { Quote } from "lucide-react";

type DailyQuoteProps = {
  quote?: string;
  attribution?: string;
};

export function DailyQuote({
  quote = "Discipline today creates the life you want tomorrow.",
  attribution,
}: DailyQuoteProps) {
  return (
    <aside className="relative isolate overflow-hidden rounded-xl border border-slate-200/80 bg-gradient-to-br from-white via-white to-emerald-50/70 p-5 shadow-sm sm:p-6">
      <Quote
        aria-hidden="true"
        className="size-7 fill-emerald-700/50 text-emerald-700/50"
      />

      <blockquote className="mt-2 pl-3">
        <p className="font-serif text-lg leading-7 text-slate-800">“{quote}”</p>

        {attribution && (
          <footer className="mt-2 text-xs text-slate-500">
            — {attribution}
          </footer>
        )}

        {!attribution && (
          <span aria-hidden="true" className="mt-2 block text-slate-500">
            —
          </span>
        )}
      </blockquote>
    </aside>
  );
}
