"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  addAppointment,
  deleteAppointment,
  getAppointments,
  updateAppointment,
  updateAppointmentStatus,
} from "@/lib/services/appointmentService";

export default function AdminAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [filter, setFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    customer: "",
    email: "",
    phone: "",
    service: "",
    device: "",
    date: "",
    time: "",
    status: "Pending",
  });

  useEffect(() => {
    loadAppointments();
  }, []);

  async function loadAppointments() {
    try {
      setLoading(true);
      const data = await getAppointments();
      setAppointments(data);
    } catch (error) {
      console.error("Error loading appointments:", error);
      alert("Failed to load appointments.");
    } finally {
      setLoading(false);
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-700";
      case "Confirmed":
        return "bg-blue-100 text-blue-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  const filteredAppointments = useMemo(() => {
    return appointments.filter((apt) => {
      const matchesFilter = filter === "All" || apt.status === filter;

      const term = searchTerm.toLowerCase();

      const matchesSearch =
        (apt.customer || "").toLowerCase().includes(term) ||
        (apt.email || "").toLowerCase().includes(term) ||
        (apt.phone || "").includes(searchTerm) ||
        (apt.service || "").toLowerCase().includes(term) ||
        (apt.device || "").toLowerCase().includes(term);

      return matchesFilter && matchesSearch;
    });
  }, [appointments, filter, searchTerm]);

  function clearFormData() {
    setFormData({
      customer: "",
      email: "",
      phone: "",
      service: "",
      device: "",
      date: "",
      time: "",
      status: "Pending",
    });
  }

  function closeModal() {
    clearFormData();
    setEditingId(null);
    setShowModal(false);
  }

  function handleFormChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function validateAppointment() {
    if (
      !formData.customer.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.service.trim() ||
      !formData.device.trim() ||
      !formData.date.trim() ||
      !formData.time.trim() ||
      !formData.status.trim()
    ) {
      alert("Please fill in all appointment fields.");
      return false;
    }

    return true;
  }

  function openAddModal() {
    setEditingId(null);
    clearFormData();
    setShowModal(true);
  }

  async function handleAddAppointment() {
    if (!validateAppointment()) return;

    try {
      await addAppointment(formData);
      await loadAppointments();
      closeModal();
    } catch (error) {
      console.error("Error adding appointment:", error);
      alert("Failed to add appointment.");
    }
  }

  function handleStartEdit(appointment) {
    setEditingId(appointment.id);
    setFormData({
      customer: appointment.customer || "",
      email: appointment.email || "",
      phone: appointment.phone || "",
      service: appointment.service || "",
      device: appointment.device || "",
      date: appointment.date || "",
      time: appointment.time || "",
      status: appointment.status || "Pending",
    });
    setShowModal(true);
  }

  async function handleSaveAppointment() {
    if (!validateAppointment()) return;

    try {
      await updateAppointment(editingId, formData);
      await loadAppointments();
      closeModal();
    } catch (error) {
      console.error("Error updating appointment:", error);
      alert("Failed to update appointment.");
    }
  }

  function handleSubmitAppointment() {
    if (editingId) {
      handleSaveAppointment();
    } else {
      handleAddAppointment();
    }
  }

  async function handleStatusChange(id, newStatus) {
    try {
      await updateAppointmentStatus(id, newStatus);
      await loadAppointments();
    } catch (error) {
      console.error("Error updating appointment status:", error);
      alert("Failed to update appointment status.");
    }
  }

  async function handleDelete(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this appointment?",
    );

    if (!confirmed) return;

    try {
      await deleteAppointment(id);
      await loadAppointments();
    } catch (error) {
      console.error("Error deleting appointment:", error);
      alert("Failed to delete appointment.");
    }
  }

  const totalAppointments = appointments.length;
  const pendingAppointments = appointments.filter(
    (apt) => apt.status === "Pending",
  ).length;
  const confirmedAppointments = appointments.filter(
    (apt) => apt.status === "Confirmed",
  ).length;
  const completedAppointments = appointments.filter(
    (apt) => apt.status === "Completed",
  ).length;

  function formatDate(dateString) {
    if (!dateString) return "";

    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  function formatTime(timeString) {
    if (!timeString) return "";

    const [hours, minutes] = timeString.split(":");
    const date = new Date();
    date.setHours(Number(hours), Number(minutes));

    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
  }

  return (
    <main className="space-y-6">
      <div className="flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-orange-500">
            Appointments
          </p>
          <h1 className="text-3xl font-bold text-slate-900">Appointments</h1>
          <p className="mt-2 text-slate-600">
            Manage customer bookings, update statuses, and keep track of repair
            appointments.
          </p>
        </div>

        <div className="flex gap-3">
          <Link
            href="/admin"
            className="rounded-lg border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-100"
          >
            Back to Dashboard
          </Link>

          <button
            onClick={openAddModal}
            className="rounded-lg bg-orange-500 px-4 py-3 text-sm font-semibold text-white hover:bg-orange-600"
          >
            + New Appointment
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <p className="text-sm text-black">Total</p>
          <h2 className="mt-2 text-3xl font-bold text-red-600">
            {totalAppointments}
          </h2>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <p className="text-sm text-black">Pending</p>
          <h2 className="mt-2 text-3xl font-bold text-yellow-600">
            {pendingAppointments}
          </h2>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <p className="text-sm text-black">Confirmed</p>
          <h2 className="mt-2 text-3xl font-bold text-blue-600">
            {confirmedAppointments}
          </h2>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <p className="text-sm text-black">Completed</p>
          <h2 className="mt-2 text-3xl font-bold text-green-600">
            {completedAppointments}
          </h2>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <input
          type="text"
          placeholder="Search Customer or Service"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full text-black rounded-lg border border-slate-300 px-4 py-3 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-orange-500"
        />

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full text-black rounded-lg border border-slate-300 px-4 py-3 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      <section className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="mb-4">
          <h2 className="text-xl font-bold text-slate-900">Appointment List</h2>
          <p className="text-sm text-slate-500">
            Showing {filteredAppointments.length} appointment
            {filteredAppointments.length !== 1 ? "s" : ""}
          </p>
        </div>

        {loading ? (
          <p className="text-slate-500">Loading appointments...</p>
        ) : filteredAppointments.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-left">
                  <th className="px-4 py-3 text-sm font-semibold text-slate-700">
                    Customer
                  </th>
                  <th className="px-4 py-3 text-sm font-semibold text-slate-700">
                    Service
                  </th>
                  <th className="px-4 py-3 text-sm font-semibold text-slate-700">
                    Device
                  </th>
                  <th className="px-4 py-3 text-sm font-semibold text-slate-700">
                    Date & Time
                  </th>
                  <th className="px-4 py-3 text-sm font-semibold text-slate-700">
                    Status
                  </th>
                  <th className="px-4 py-3 text-sm font-semibold text-slate-700">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredAppointments.map((apt) => (
                  <tr key={apt.id} className="border-b border-slate-100">
                    <td className="px-4 py-4">
                      <p className="font-semibold text-slate-900">
                        {apt.customer}
                      </p>
                      <p className="text-sm text-slate-500">{apt.email}</p>
                      <p className="text-sm text-slate-500">{apt.phone}</p>
                    </td>

                    <td className="px-4 py-4 text-slate-700">{apt.service}</td>

                    <td className="px-4 py-4 text-slate-700">{apt.device}</td>

                    <td className="px-4 py-4 text-slate-700">
                      <p>{formatDate(apt.date)}</p>
                      <p className="text-sm text-slate-500">
                        {formatTime(apt.time)}
                      </p>
                    </td>

                    <td className="px-4 py-4">
                      <select
                        value={apt.status}
                        onChange={(e) =>
                          handleStatusChange(apt.id, e.target.value)
                        }
                        className={`rounded-full px-3 py-2 text-sm font-medium border-none focus:outline-none ${getStatusColor(
                          apt.status,
                        )}`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>

                    <td className="px-4 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleStartEdit(apt)}
                          className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-600"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => handleDelete(apt.id)}
                          className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-slate-500">No appointments found.</p>
        )}
      </section>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-5 flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  {editingId ? "Edit Appointment" : "Add New Appointment"}
                </h2>
                <p className="text-slate-500">
                  {editingId
                    ? "Update the appointment details below."
                    : "Enter the appointment details below."}
                </p>
              </div>

              <button
                onClick={closeModal}
                className="rounded-lg px-3 py-2 text-slate-500 hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-black">
                  Customer Name
                </label>
                <input
                  name="customer"
                  value={formData.customer}
                  onChange={handleFormChange}
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 text-black"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-black">
                  Email
                </label>
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 text-black"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-black">
                  Phone
                </label>
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleFormChange}
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 text-black"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-black">
                  Service
                </label>
                <input
                  name="service"
                  value={formData.service}
                  onChange={handleFormChange}
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 text-black"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-black">
                  Device
                </label>
                <input
                  name="device"
                  value={formData.device}
                  onChange={handleFormChange}
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 text-black"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-black">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleFormChange}
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 text-black"
                >
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-black">
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleFormChange}
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 text-black"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-black">
                  Time
                </label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleFormChange}
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 text-black"
                />
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={handleSubmitAppointment}
                className="rounded-lg bg-orange-500 px-5 py-3 text-sm font-semibold text-white hover:bg-orange-600"
              >
                {editingId ? "Save Changes" : "Add Appointment"}
              </button>

              <button
                onClick={closeModal}
                className="rounded-lg bg-slate-200 px-5 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
