"use client";

import { useState } from "react";

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    companyName: "ServicePulse Hub",
    email: "admin@servicepulsehub.com",
    phone: "(555) 123-4567",
    address: "123 Tech Street, Silicon Valley, CA 94025",
    businessHoursStart: "09:00",
    businessHoursEnd: "18:00",
    appointmentDuration: 30,
    notificationsEmail: true,
    notificationsSMS: true,
    maintenanceMode: false,
  });

  const [saved, setSaved] = useState(false);

  const handleChange = (field, value) => {
    setSettings((prev) => ({
      ...prev,
      [field]: value,
    }));
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <main className="min-h-screen bg-slate-100 text-slate-900 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-500">
              Administration
            </p>
            <h1 className="mt-2 text-3xl md:text-4xl font-bold text-slate-900">
              Settings
            </h1>
            <p className="mt-2 text-slate-600 text-lg">
              Manage company details, business hours, notifications, and system
              preferences.
            </p>
          </div>
        </section>

        {/* Success Message */}
        {saved && (
          <div className="rounded-2xl border border-green-200 bg-green-50 px-5 py-4 text-green-700 shadow-sm">
            ✓ Settings saved successfully!
          </div>
        )}

        {/* Company Information */}
        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            Company Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Company Name
              </label>
              <input
                type="text"
                value={settings.companyName}
                onChange={(e) => handleChange("companyName", e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Admin Email
              </label>
              <input
                type="email"
                value={settings.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                value={settings.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Address
              </label>
              <input
                type="text"
                value={settings.address}
                onChange={(e) => handleChange("address", e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          </div>
        </section>

        {/* Business Hours */}
        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            Business Hours
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Opening Time
              </label>
              <input
                type="time"
                value={settings.businessHoursStart}
                onChange={(e) =>
                  handleChange("businessHoursStart", e.target.value)
                }
                className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Closing Time
              </label>
              <input
                type="time"
                value={settings.businessHoursEnd}
                onChange={(e) =>
                  handleChange("businessHoursEnd", e.target.value)
                }
                className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Appointment Duration
              </label>
              <select
                value={settings.appointmentDuration}
                onChange={(e) =>
                  handleChange("appointmentDuration", parseInt(e.target.value))
                }
                className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="15">15 minutes</option>
                <option value="30">30 minutes</option>
                <option value="45">45 minutes</option>
                <option value="60">1 hour</option>
              </select>
            </div>
          </div>
        </section>

        {/* Notifications */}
        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            Notifications
          </h2>

          <div className="space-y-4">
            <label className="flex items-center rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.notificationsEmail}
                onChange={(e) =>
                  handleChange("notificationsEmail", e.target.checked)
                }
                className="h-4 w-4 rounded text-orange-500 focus:ring-orange-500"
              />
              <span className="ml-3 text-slate-700">
                Send email notifications for new appointments
              </span>
            </label>

            <label className="flex items-center rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.notificationsSMS}
                onChange={(e) =>
                  handleChange("notificationsSMS", e.target.checked)
                }
                className="h-4 w-4 rounded text-orange-500 focus:ring-orange-500"
              />
              <span className="ml-3 text-slate-700">
                Send SMS notifications to customers
              </span>
            </label>
          </div>
        </section>

        {/* System */}
        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">System</h2>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="font-semibold text-slate-900">Maintenance Mode</p>
                <p className="text-sm text-slate-600 mt-1">
                  Disable access for all users except administrators.
                </p>
              </div>

              <input
                type="checkbox"
                checked={settings.maintenanceMode}
                onChange={(e) =>
                  handleChange("maintenanceMode", e.target.checked)
                }
                className="h-5 w-5 rounded text-orange-500 focus:ring-orange-500"
              />
            </div>
          </div>
        </section>

        {/* Save Actions */}
        <div className="flex flex-wrap gap-4">
          <button
            onClick={handleSave}
            className="rounded-lg bg-orange-500 px-8 py-3 font-semibold text-white transition hover:bg-orange-600"
          >
            Save Settings
          </button>

          <button
            className="rounded-lg bg-slate-200 px-8 py-3 font-semibold text-slate-900 transition hover:bg-slate-300"
            onClick={() => window.location.reload()}
          >
            Cancel
          </button>
        </div>
      </div>
    </main>
  );
}
