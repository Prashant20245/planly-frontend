import { DailyReflection } from "@/types/summary";
import { Check, ClipboardList, Edit2, Target, Zap } from "lucide-react";

export default function DailyReflection({
  reflection,
  editing,
  onEdit,
  onCancel,
  onSave,
  onChange,
}: {
  reflection: DailyReflection;
  editing: boolean;
  onEdit: () => void;
  onCancel: () => void;
  onSave: () => void;
  onChange: (section: keyof DailyReflection, value: string) => void;
}) {
  const sections: {
    key: keyof DailyReflection;
    title: string;
    icon: React.ReactNode;
    className: string;
    placeholder: string;
  }[] = [
    {
      key: "wentWell",
      title: "What went well?",
      icon: <Check size={19} />,
      className: "bg-emerald-50 text-emerald-700",
      placeholder: "What did you accomplish?",
    },
    {
      key: "improvements",
      title: "What could be better?",
      icon: <Zap size={19} />,
      className: "bg-amber-50 text-amber-700",
      placeholder: "What should you improve?",
    },
    {
      key: "nextDayFocus",
      title: "Next day's focus",
      icon: <Target size={19} />,
      className: "bg-violet-50 text-violet-700",
      placeholder: "What will you focus on tomorrow?",
    },
  ];

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <ClipboardList size={23} className="text-slate-600" />

          <h2 className="text-lg font-bold text-slate-900">Reflection</h2>
        </div>

        {!editing ? (
          <button
            onClick={onEdit}
            className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:bg-slate-50"
          >
            <Edit2 size={13} />
            Edit
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={onCancel}
              className="rounded-lg px-2 py-1.5 text-xs text-slate-500 hover:bg-slate-100"
            >
              Cancel
            </button>

            <button
              onClick={onSave}
              className="rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-700"
            >
              Save
            </button>
          </div>
        )}
      </div>

      <div className="mt-5 space-y-3">
        {sections.map((section) => (
          <div
            key={section.key}
            className={`rounded-xl p-4 ${section.className}`}
          >
            <div className="flex items-center gap-2">
              {section.icon}

              <h3 className="text-sm font-bold">{section.title}</h3>
            </div>

            {editing ? (
              <textarea
                value={reflection[section.key].join("\n")}
                onChange={(event) => onChange(section.key, event.target.value)}
                placeholder={section.placeholder}
                rows={3}
                className="mt-3 w-full resize-y rounded-lg border border-black/10 bg-white/70 p-3 text-sm text-slate-700 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
              />
            ) : (
              <ul className="mt-2 list-disc space-y-1 pl-6 text-sm text-slate-700">
                {reflection[section.key].length > 0 ? (
                  reflection[section.key].map((item, index) => (
                    <li key={`${section.key}-${index}`}>{item}</li>
                  ))
                ) : (
                  <li className="list-none pl-0 text-slate-500">
                    Nothing added yet.
                  </li>
                )}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
