"use client";

import { useEffect, useMemo, useState } from "react";

import {
  ArrowDownRight,
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock3,
  ClipboardList,
  Layers3,
  Plus,
  Target,
  Timer,
} from "lucide-react";

import type { TimeSlot, DailyReflectionType } from "@/types/summary";

import {
  calculateSummary,
  formatHours,
  getDurationMinutes,
  toDateKey,
} from "@/lib/summary/utils";

import StatCard from "@/components/summary/stat-card";
import TimeSlotRow from "@/components/summary/time-slot-row";
import DayOverview from "@/components/summary/day-overview";
import TimeSlotForm from "@/components/summary/time-slot-form";
import DailyReflection from "@/components/summary/daily-reflection";
import { toast } from "@/components/ui/toast";
import { initialSummary } from "@/lib/summary/data";

const emptySlot: Omit<TimeSlot, "id"> = {
  startTime: "16:00",
  endTime: "17:00",
  description: "",
  category: "DEVELOPMENT",
  activityType: "USEFUL",
};

export default function SummaryPage() {
  const [selectedDate, setSelectedDate] = useState(new Date(Date.now()));

  const [activities, setActivities] = useState<TimeSlot[]>([]);

  const [reflection, setReflection] = useState<DailyReflectionType>(
    initialSummary.reflection,
  );

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState(emptySlot);

  const [reflectionEditing, setReflectionEditing] = useState(false);

  const stats = useMemo(() => calculateSummary(activities), [activities]);

  const productivity = stats.productivityScore;
  const distractivity = stats.distractedScore;
  const neutrality = stats.neutralScore;

  useEffect(() => {
    async function fetchSlots() {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/summary/get/date/${toDateKey(selectedDate)}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Unable to fetch activity.");
      }
      const formattedSlots = result.slots.map((slot: any) => ({
        ...slot,
        startTime: slot.startTime.slice(11, 16),
        endTime: slot.endTime.slice(11, 16),
      }));
      setActivities(formattedSlots);
    }
    fetchSlots();
    console.log(activities);
  }, [selectedDate]);

  const changeDate = (amount: number) => {
    setSelectedDate((previous) => {
      const next = new Date(previous);
      next.setDate(next.getDate() + amount);
      return next;
    });
  };

  const openAddForm = () => {
    setEditingId(null);
    setFormData(emptySlot);
    setShowForm(true);
  };

  const openEditForm = (slot: TimeSlot) => {
    setEditingId(slot.id);

    setFormData({
      startTime: slot.startTime,
      endTime: slot.endTime,
      description: slot.description,
      category: slot.category,
      activityType: slot.activityType,
    });

    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData(emptySlot);
  };

  const handleSaveSlot = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    //1. Validate form data
    const duration = getDurationMinutes(formData.startTime, formData.endTime);

    if (!formData.description.trim() || duration <= 0 || duration > 24 * 60) {
      return;
    }

    //2. Prepare payload
    const payload = {
      description: formData.description.trim(),
      date: toDateKey(selectedDate),
      startTime: formData.startTime,
      endTime: formData.endTime,
      category: formData.category,
      activityType: formData.activityType,
    };

    console.log("Payload", payload);

    const token = localStorage.getItem("accessToken");

    try {
      // 3. Decide whether to create or update
      const isEditing = Boolean(editingId);

      const url = isEditing
        ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/summary/update/${editingId}`
        : `${process.env.NEXT_PUBLIC_BACKEND_URL}/summary/add`;

      //4. send api request
      const response = await fetch(url, {
        method: isEditing ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      //5. Handle error
      const result = await response.json();
      if (!response.ok) {
        toast.add({ type: "failed", description: result.message });
        throw new Error(result.message || "Unable to save activity.");
      }
      // 6. Update local state using the saved backend record
      // Assumes backend returns the saved record in result.data.
      console.log(result);
      const savedSlot = isEditing ? result.updatedSlot : result.slot;
      const updatedSlot: TimeSlot = {
        id: savedSlot.id,
        description: savedSlot.description,
        startTime: formData.startTime,
        endTime: formData.endTime,
        category: savedSlot.category,
        activityType: savedSlot.activityType,
      };
      if (isEditing) {
        setActivities((previous) =>
          previous.map((slot) => (slot.id === editingId ? updatedSlot : slot)),
        );
      } else {
        setActivities((previous) => [...previous, updatedSlot]);
      }

      // 7. Show success and close form
      toast.add({
        type: "success",
        description: isEditing
          ? "Activity updated successfully."
          : "Activity created successfully.",
      });

      closeForm();
    } catch (error) {
      console.error("Save activity error:", error);

      toast.add({
        type: "error",
        description:
          error instanceof Error ? error.message : "Something went wrong.",
      });
    }
  };

  const deleteSlot = async (id: string) => {
    const token = localStorage.getItem("accessToken");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/summary/delete/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || "Delete failed");
    }
    toast.add({ type: "success", description: result.message });
    setActivities((previous) => previous.filter((slot) => slot.id !== id));
  };

  const updateReflection = (
    section: keyof DailyReflectionType,
    value: string,
  ) => {
    setReflection((previous) => ({
      ...previous,
      [section]: value
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean),
    }));
  };

  const usefulHours = formatHours(stats.productiveMinutes);
  const distractedHours = formatHours(stats.distractedMinutes);
  const totalHours = formatHours(stats.totalMinutes);

  return (
    <div className="min-h-screen bg-slate-50/80 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-[1600px] space-y-6">
        {/* PAGE HEADER */}
        <section className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Daily Summary
            </h1>

            <p className="mt-1 text-sm text-slate-500 sm:text-base">
              Capture your day, track what you did, and reflect on your
              progress.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => changeDate(-1)}
              className="rounded-xl border border-slate-200 bg-white p-3 text-slate-600 transition hover:bg-slate-50"
              aria-label="Previous day"
            >
              <ChevronLeft size={20} />
            </button>

            <label className="flex min-w-0 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5">
              <CalendarDays size={19} className="shrink-0 text-slate-500" />

              <input
                type="date"
                value={toDateKey(selectedDate)}
                onChange={(event) => {
                  const [year, month, day] = event.target.value
                    .split("-")
                    .map(Number);

                  if (year && month && day) {
                    setSelectedDate(new Date(year, month - 1, day));
                  }
                }}
                className="w-full min-w-0 bg-transparent text-sm font-medium text-slate-700 outline-none"
                aria-label="Select summary date"
              />
            </label>

            <button
              onClick={() => changeDate(1)}
              className="rounded-xl border border-slate-200 bg-white p-3 text-slate-600 transition hover:bg-slate-50"
              aria-label="Next day"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </section>

        {/* STATISTICS */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Productive Hours"
            value={usefulHours}
            subtitle={`${productivity}% of your day`}
            icon={<CheckCircle2 size={27} />}
            iconClass="bg-emerald-50 text-emerald-600"
            trendIcon={<ArrowUpRight size={17} />}
            trendClass="text-emerald-600"
          />

          <StatCard
            title="Distracted Hours"
            value={distractedHours}
            subtitle={`${100 - productivity}% of your day`}
            icon={<Timer size={27} />}
            iconClass="bg-orange-50 text-orange-500"
            trendIcon={<ArrowDownRight size={17} />}
            trendClass="text-rose-500"
          />

          <StatCard
            title="Total Logged"
            value={totalHours}
            subtitle="Total tracked time"
            icon={<Layers3 size={27} />}
            iconClass="bg-violet-50 text-violet-600"
          />

          <StatCard
            title="Productivity Score"
            value={`${productivity}%`}
            subtitle={
              productivity >= 75
                ? "Highly productive"
                : productivity >= 50
                  ? "Moderately productive"
                  : "Needs improvement"
            }
            icon={<Target size={27} />}
            iconClass="bg-emerald-50 text-emerald-600"
            badge
          />
        </section>

        {/* MAIN CONTENT */}
        <section className="grid grid-cols-1 items-start gap-5 xl:grid-cols-[1.65fr_0.9fr]">
          {/* HOURLY LOG */}
          <div className="min-w-0 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm sm:p-5">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <div className="flex items-center gap-3">
                <Clock3 className="text-slate-600" size={25} />

                <h2 className="text-xl font-bold text-slate-900">Hourly Log</h2>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600">
                <span className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                  Useful
                </span>

                <span className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                  Useless
                </span>
                <span className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-slate-400" />
                  Neutral
                </span>
              </div>
            </div>

            <div className="mt-5 space-y-2">
              {activities.length === 0 ? (
                <div className="rounded-xl border border-dashed border-slate-300 py-12 text-center">
                  <ClipboardList className="mx-auto text-slate-400" size={32} />

                  <p className="mt-3 font-medium text-slate-700">
                    No activities logged yet
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    Start tracking how you spend your day.
                  </p>
                </div>
              ) : (
                [...activities]
                  .sort((a, b) => a.startTime.localeCompare(b.startTime))
                  .map((slot) => (
                    <TimeSlotRow
                      key={slot.id}
                      slot={slot}
                      onEdit={() => openEditForm(slot)}
                      onDelete={() => deleteSlot(slot.id)}
                    />
                  ))
              )}
            </div>

            <button
              onClick={openAddForm}
              className="mt-5 flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700"
            >
              <Plus size={18} />
              Add Time Slot
            </button>
          </div>

          {/* RIGHT SIDE */}
          <div className="space-y-5">
            <DayOverview
              productiveMinutes={stats.productiveMinutes}
              distractedMinutes={stats.distractedMinutes}
              neutralMinutes={stats.neutralMinutes}
              productivity={productivity}
              distractivity={distractivity}
              neutrality={neutrality}
            />

            <DailyReflection
              reflection={reflection}
              editing={reflectionEditing}
              onEdit={() => setReflectionEditing(true)}
              onCancel={() => setReflectionEditing(false)}
              onSave={() => setReflectionEditing(false)}
              onChange={updateReflection}
            />
          </div>
        </section>

        {/* ADD / EDIT TIME SLOT */}
        {showForm && (
          <TimeSlotForm
            initialData={formData}
            editing={Boolean(editingId)}
            onClose={closeForm}
            onSave={handleSaveSlot}
            onChange={setFormData}
          />
        )}
      </div>
    </div>
  );
}
