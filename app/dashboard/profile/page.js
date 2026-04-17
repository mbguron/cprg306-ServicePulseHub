"use client";


import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();

  const [profile, setProfile] = useState({
    name: "Jenna Marshall",
    phone: "(403) 555-0189",
    email: "jenna.marshall@email.com",
  });

  const [formData, setFormData] = useState(profile);
  const [isEditing, setIsEditing] = useState(false);
  const [savedMessage, setSavedMessage] = useState(false);

  const bookingHistory = [
    {
      id: "SPH-1001",
      service: "Screen Repair",
      device: "iPhone 13",
      date: "2026-04-02",
      status: "Completed",
      price: "$149.99",
    },
    {
      id: "SPH-1002",
      service: "Battery Replacement",
      device: "Samsung Galaxy S22",
      date: "2026-03-18",
      status: "Completed",
      price: "$89.99",
    },
    {
      id: "SPH-1003",
      service: "Charging Port Repair",
      device: "iPad Air",
      date: "2026-03-05",
      status: "In Progress",
      price: "$109.99",
    },
  ];

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleEdit() {
    setIsEditing(true);
    setSavedMessage(false);
  }

  function handleCancel() {
    setFormData(profile);
    setIsEditing(false);
    setSavedMessage(false);
  }

  function handleSave(e) {
    e.preventDefault();
    setProfile(formData);
    setIsEditing(false);
    setSavedMessage(true);

    setTimeout(() => {
      setSavedMessage(false);
    }, 2500);
  }

  function handleLogout() {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userEmail");
    router.push("/");
  }

  function getStatusStyle(status) {
    if (status === "Completed") {
      return "bg-green-100 text-green-700 border border-green-200";
    }

    if (status === "In Progress") {
      return "bg-amber-100 text-amber-700 border border-amber-200";
    }

    return "bg-slate-100 text-slate-700 border border-slate-200";
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900">My Profile</h1>
          <p className="mt-2 text-slate-600">
            View your account information and past repair bookings.
          </p>
        </div>

        {savedMessage && (
          <div className="mb-6 rounded-2xl border border-green-200 bg-green-50 px-5 py-4 text-green-700 shadow-sm">
            Profile updated successfully.
          </div>
        )}

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-6 flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 text-2xl font-bold text-orange-500">
                  {profile.name.charAt(0)}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    {profile.name}
                  </h2>
                  <p className="text-sm text-slate-500">Customer Account</p>
                </div>
              </div>

              <form onSubmit={handleSave} className="space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                      isEditing
                        ? "border-slate-300 bg-white text-slate-900"
                        : "border-slate-200 bg-slate-100 text-slate-700"
                    }`}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                      isEditing
                        ? "border-slate-300 bg-white text-slate-900"
                        : "border-slate-200 bg-slate-100 text-slate-700"
                    }`}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                      isEditing
                        ? "border-slate-300 bg-white text-slate-900"
                        : "border-slate-200 bg-slate-100 text-slate-700"
                    }`}
                  />
                </div>

                {!isEditing ? (
                  <button
                    type="button"
                    onClick={handleEdit}
                    className="w-full rounded-lg bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
                  >
                    Edit Profile
                  </button>
                ) : (
                  <div className="flex gap-3">
                    <button
                      type="submit"
                      className="flex-1 rounded-lg bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
                    >
                      Save Changes
                    </button>
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="flex-1 rounded-lg border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-100"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-900">
                  Booking History
                </h2>
                <p className="mt-2 text-slate-600">
                  Review your recent bookings and current repair status.
                </p>
              </div>

              <div className="space-y-4">
                {bookingHistory.map((booking) => (
                  <div
                    key={booking.id}
                    className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
                  >
                    <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900">
                          {booking.service}
                        </h3>
                        <p className="text-sm text-slate-500">
                          Booking ID: {booking.id}
                        </p>
                      </div>

                      <span
                        className={`inline-flex w-fit rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(
                          booking.status,
                        )}`}
                      >
                        {booking.status}
                      </span>
                    </div>

                    <div className="grid gap-4 text-sm text-slate-700 sm:grid-cols-3">
                      <div className="rounded-lg border border-slate-200 bg-white px-4 py-3">
                        <p className="mb-1 font-semibold text-slate-900">
                          Device
                        </p>
                        <p>{booking.device}</p>
                      </div>

                      <div className="rounded-lg border border-slate-200 bg-white px-4 py-3">
                        <p className="mb-1 font-semibold text-slate-900">
                          Date
                        </p>
                        <p>
                          {new Date(booking.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </p>
                      </div>

                      <div className="rounded-lg border border-slate-200 bg-white px-4 py-3">
                        <p className="mb-1 font-semibold text-slate-900">
                          Price
                        </p>
                        <p>{booking.price}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 border-t border-slate-200 pt-6">
                <button
                  onClick={handleLogout}
                  className="w-full rounded-lg bg-slate-900 px-6 py-3 font-semibold text-white transition hover:bg-slate-800"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
