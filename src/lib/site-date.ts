import type { LucideIcon } from "lucide-react";
import {
  CalendarDays,
  ChartNoAxesColumnIncreasing,
  ChartPie,
  CheckSquare,
  ClipboardCheck,
  Clock3,
  Focus,
  Goal,
  LayoutDashboard,
  ListTodo,
  MonitorSmartphone,
  Target,
} from "lucide-react";

export const siteConfig = {
  name: "Planly",
  tagline: "Plan Today, Build Tomorrow.",
  description:
    "Planly helps you plan, organize, and track your tasks with clarity. Stay focused, build better habits, and achieve your goals — one step at a time.",
};

export const navigation = [
  { label: "Home", href: "#home" },
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "Testimonials", href: "#testimonials" },
];

export const benefits: {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
}[] = [
  {
    title: "Organize Everything",
    description: "Plan your day, week, month or year with ease.",
    icon: CalendarDays,
    color: "green",
  },
  {
    title: "Stay Focused",
    description: "Track progress and build consistent habits.",
    icon: Focus,
    color: "purple",
  },
  {
    title: "Boost Productivity",
    description: "Get more done with a clear plan and structure.",
    icon: ChartNoAxesColumnIncreasing,
    color: "blue",
  },
  {
    title: "Access Anywhere",
    description: "Available on web, mobile and tablet.",
    icon: MonitorSmartphone,
    color: "orange",
  },
];

export const features: {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
}[] = [
  {
    title: "Daily Planning",
    description: "Plan your day with a clear view of your tasks and goals.",
    icon: CalendarDays,
    color: "green",
  },
  {
    title: "Weekly & Monthly View",
    description: "Get a bigger picture of your progress and upcoming tasks.",
    icon: CalendarDays,
    color: "purple",
  },
  {
    title: "Yearly Goals",
    description: "Set long-term goals and break them into actionable steps.",
    icon: ChartNoAxesColumnIncreasing,
    color: "blue",
  },
  {
    title: "Progress Tracking",
    description:
      "Visualize your progress with insightful charts and statistics.",
    icon: ChartPie,
    color: "blue",
  },
];

export const workflowSteps = [
  {
    title: "Create Your Account",
    description: "Sign up in seconds and set up your profile.",
  },
  {
    title: "Plan Your Tasks",
    description:
      "Add tasks, set priorities, and organize your day, week, month, or year.",
  },
  {
    title: "Track Your Progress",
    description: "Stay consistent and visualize your progress with charts.",
  },
  {
    title: "Achieve Your Goals",
    description: "Build better habits and turn your plans into real results.",
  },
];

export const testimonials = [
  {
    name: "Rohit Sharma",
    role: "Software Engineer",
    initials: "RS",
    quote:
      "Planly has completely changed the way I manage my tasks. The clean interface and powerful features make it so easy to stay productive.",
  },
  {
    name: "Sneha Verma",
    role: "Product Manager",
    initials: "SV",
    quote:
      "I love how simple yet powerful Planly is. The weekly and monthly views help me keep track of my goals effortlessly.",
  },
  {
    name: "Amit Kumar",
    role: "Freelancer",
    initials: "AK",
    quote:
      "The progress tracking and statistics are amazing. It keeps me motivated and helps me stay consistent every day.",
  },
];

export const pricingPlans = [
  {
    name: "Free",
    description: "Perfect for getting started.",
    price: "₹0",
    period: "/ month",
    icon: CalendarDays,
    popular: false,
    features: [
      "Daily, weekly, monthly plans",
      "Task management",
      "Basic progress tracking",
      "Access on all devices",
    ],
    cta: "Get Started",
    href: "/signup",
    highlighted: false,
  },
  {
    name: "Pro",
    description: "For individuals who want more.",
    price: "₹199",
    period: "/ month",
    icon: ClipboardCheck,
    popular: true,
    features: [
      "Everything in Free",
      "Advanced statistics & charts",
      "Yearly goals & planning",
      "Custom categories",
      "Priority support",
    ],
    cta: "Start Pro Plan",
    href: "/signup?plan=pro",
    highlighted: true,
  },
  {
    name: "Team",
    description: "For teams and collaborators.",
    price: "₹499",
    period: "/ month",
    icon: ChartNoAxesColumnIncreasing,
    popular: false,
    features: [
      "Everything in Pro",
      "Team collaboration",
      "Shared plans & tasks",
      "Team progress tracking",
      "Admin controls",
    ],
    cta: "Contact Sales",
    href: "mailto:sales@planly.example",
    highlighted: false,
  },
];

export const dashboardNavigation = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Daily Plan", icon: CalendarDays },
  { label: "Weekly Plan", icon: ListTodo },
  { label: "Monthly Plan", icon: CalendarDays },
  { label: "Yearly Plan", icon: Goal },
  { label: "Settings", icon: CheckSquare },
];

export const dashboardStats = [
  {
    label: "Daily Hours",
    value: "4.5h",
    change: "12% vs yesterday",
    icon: Clock3,
    color: "blue",
  },
  {
    label: "Weekly Hours",
    value: "28h",
    change: "8% vs last week",
    icon: CalendarDays,
    color: "green",
  },
  {
    label: "Monthly Hours",
    value: "96h",
    change: "15% vs last month",
    icon: Target,
    color: "purple",
  },
  {
    label: "Tasks Completed",
    value: "32",
    change: "20% vs last month",
    icon: CheckSquare,
    color: "green",
  },
  {
    label: "Tasks To Be Completed",
    value: "18",
    change: "Upcoming tasks",
    icon: ClipboardCheck,
    color: "orange",
  },
  {
    label: "Pending Tasks",
    value: "5",
    change: "Past due tasks",
    icon: Clock3,
    color: "red",
  },
];
