"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const userRole = localStorage.getItem("userRole");

    if (!isLoggedIn || userRole !== "admin") {
      router.push("/login");
    }
  }, [router]);

  const stats = [
    { title: "Total Customers", value: 15, color: "bg-blue-500" },
    { title: "Active Accounts", value: 12, color: "bg-green-500" },
    { title: "Suspended Accounts", value: 3, color: "bg-red-500" },
    { title: "Available Services", value: 10, color: "bg-purple-500" },
  ];

  const recentActivity = [
    {
      id: 1,
      text: "John Doe account information was updated",
      time: "Today, 9:20 AM",
    },
    {
      id: 2,
      text: "Battery Replacement service was added",
      time: "Today, 10:45 AM",
    },
    {
      id: 3,
      text: "Sarah Parker account was suspended",
      time: "Yesterday, 4:15 PM",
    },
    {
      id: 4,
      text: "Screen Repair pricing was updated",
      time: "Yesterday, 2:30 PM",
    },
  ];

  const quickLinks = [
    {
      title: "Customer Management",
      description: "View, edit, and manage customer accounts and status.",
      href: "/admin/customers",
    },
    {
      title: "Service Management",
      description: "Update service listings, pricing, and descriptions.",
      href: "/admin/services",
    },
    {
      title: "Appointment Management",
      description: "Review bookings, update statuses, and manage schedules.",
      href: "/admin/appointments",
    },
    {
      title: "Reports Center",
      description:
        "Track performance using daily, weekly, monthly, and yearly reports.",
      href: "/admin/reports",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-100 text-slate-900 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-500">
                Overview
              </p>
              <h1 className="mt-2 text-3xl md:text-4xl font-bold text-slate-900">
                Dashboard
              </h1>
              <p className="mt-2 text-slate-600 text-lg">
                Monitor customer records, services, appointments, and
                operational activity.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/admin/customers"
                className="rounded-lg bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Manage Customers
              </Link>

              <Link
                href="/admin/services"
                className="rounded-lg bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
              >
                Manage Services
              </Link>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.title}
              className="rounded-2xl bg-white border border-slate-200 shadow-sm p-6"
            >
              <div className={`mb-4 h-3 w-16 rounded-full ${stat.color}`} />
              <p className="text-sm font-medium text-slate-500">{stat.title}</p>
              <p className="mt-2 text-3xl font-bold text-slate-900">
                {stat.value}
              </p>
            </div>
          ))}
        </section>

        {/* Main Content */}
        <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          {/* Recent Activity */}
          <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Recent Activity
                </h2>
                <p className="mt-1 text-sm text-slate-600">
                  Latest updates across customer and service operations.
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              {recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="rounded-xl border border-slate-200 bg-slate-50 p-4"
                >
                  <p className="font-medium text-slate-800">{activity.text}</p>
                  <p className="mt-1 text-sm text-slate-500">{activity.time}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Access */}
          <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-6">
            <h2 className="text-xl font-bold text-slate-900">Quick Access</h2>
            <p className="mt-1 text-sm text-slate-600">
              Jump directly into the main admin tools.
            </p>

            <div className="mt-6 grid gap-4">
              {quickLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-xl border border-slate-200 bg-slate-50 p-4 transition hover:bg-slate-100"
                >
                  <p className="text-sm font-semibold text-slate-900">
                    {item.title}
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    {item.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
