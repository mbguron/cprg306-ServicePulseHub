"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCustomers } from "@/lib/services/customerService";
import { getServices } from "@/lib/services/serviceService";

export default function AdminDashboard() {
  const router = useRouter();

  const [stats, setStats] = useState([
    { title: "Total Customers", value: 0, color: "bg-blue-500" },
    { title: "Active Accounts", value: 0, color: "bg-green-500" },
    { title: "Suspended Accounts", value: 0, color: "bg-red-500" },
    { title: "Available Services", value: 0, color: "bg-purple-500" },
  ]);

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

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const userRole = localStorage.getItem("userRole");

    if (!isLoggedIn || userRole !== "admin") {
      router.push("/login");
      return;
    }

    loadDashboardStats();
  }, [router]);

  async function loadDashboardStats() {
    try {
      const customers = await getCustomers();
      const services = await getServices();

      const activeCount = customers.filter(
        (customer) => customer.status === "Active",
      ).length;

      const suspendedCount = customers.filter(
        (customer) => customer.status === "Suspended",
      ).length;

      setStats([
        {
          title: "Total Customers",
          value: customers.length,
          color: "bg-blue-500",
        },
        {
          title: "Active Accounts",
          value: activeCount,
          color: "bg-green-500",
        },
        {
          title: "Suspended Accounts",
          value: suspendedCount,
          color: "bg-red-500",
        },
        {
          title: "Available Services",
          value: services.length,
          color: "bg-purple-500",
        },
      ]);
    } catch (error) {
      console.error("Error loading dashboard stats:", error);
    }
  }

  return (
    <main className="space-y-6">
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-wide text-orange-500">
          Overview
        </p>
        <h1 className="mt-1 text-3xl font-bold text-slate-900">Dashboard</h1>
        <p className="mt-2 text-slate-600">
          Monitor customer records, services, appointments, and operational
          activity.
        </p>

        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href="/admin/customers"
            className="rounded-lg bg-orange-500 px-4 py-3 text-sm font-semibold text-white hover:bg-orange-600"
          >
            Manage Customers
          </Link>
          <Link
            href="/admin/services"
            className="rounded-lg bg-slate-800 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-900"
          >
            Manage Services
          </Link>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.title} className="rounded-2xl bg-white p-5 shadow-sm">
            <div className={`mb-3 h-2 rounded-full ${stat.color}`} />
            <p className="text-sm text-slate-500">{stat.title}</p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900">
              {stat.value}
            </h2>
          </div>
        ))}
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-900">Quick Access</h2>
        <p className="mt-1 text-slate-500">
          Jump directly into the main admin tools.
        </p>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {quickLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-xl border border-slate-200 p-5 transition hover:border-orange-300 hover:bg-orange-50"
            >
              <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{item.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
