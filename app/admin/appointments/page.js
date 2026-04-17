"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

const initialAppointments = [
  {
    id: 1,
    customer: "John Doe",
    email: "john@example.com",
    phone: "(123) 456-7890",
    service: "Screen Repair",
    device: "iPhone 14",
    date: "2026-04-10",
    time: "09:00",
    status: "Confirmed",
  },
  {
    id: 2,
    customer: "Jane Smith",
    email: "jane@example.com",
    phone: "(234) 567-8901",
    service: "Battery Replacement",
    device: "Samsung Galaxy S23",
    date: "2026-04-10",
    time: "10:30",
    status: "Completed",
  },
  {
    id: 3,
    customer: "Mike Johnson",
    email: "mike@example.com",
    phone: "(345) 678-9012",
    service: "Water Damage Repair",
    device: "iPad Pro",
    date: "2026-04-11",
    time: "14:00",
    status: "Pending",
  },
  {
    id: 4,
    customer: "Sarah Williams",
    email: "sarah@example.com",
    phone: "(456) 789-0123",
    service: "Camera Repair",
    device: "Google Pixel 7",
    date: "2026-04-11",
    time: "15:30",
    status: "Confirmed",
  },
];

export default function AdminAppointments() {
  const [appointments, setAppointments] = useState(initialAppointments);
  const [filter, setFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

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
      const matchesSearch =
        apt.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        apt.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        apt.phone.includes(searchTerm) ||
        apt.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
        apt.device.toLowerCase().includes(searchTerm.toLowerCase());

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

  function handleAddAppointment() {
    if (!validateAppointment()) return;

    const newAppointment = {
      id: Date.now(),
      customer: formData.customer.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      service: formData.service.trim(),
      device: formData.device.trim(),
      date: formData.date,
      time: formData.time,
      status: formData.status,
    };

    setAppointments((prev) => [newAppointment, ...prev]);
    closeModal();
  }

  function handleStartEdit(appointment) {
    setEditingId(appointment.id);
    setFormData({
      customer: appointment.customer,
      email: appointment.email,
      phone: appointment.phone,
      service: appointment.service,
      device: appointment.device,
      date: appointment.date,
      time: appointment.time,
      status: appointment.status,
    });
    setShowModal(true);
  }

  function handleSaveAppointment() {
    if (!validateAppointment()) return;

    setAppointments((prev) =>
      prev.map((apt) =>
        apt.id === editingId
          ? {
              ...apt,
              customer: formData.customer.trim(),
              email: formData.email.trim(),
              phone: formData.phone.trim(),
              service: formData.service.trim(),
              device: formData.device.trim(),
              date: formData.date,
              time: formData.time,
              status: formData.status,
            }
          : apt,
      ),
    );

    closeModal();
  }

  function handleSubmitAppointment() {
    if (editingId) {
      handleSaveAppointment();
    } else {
      handleAddAppointment();
    }
  }

  function handleStatusChange(id, newStatus) {
    setAppointments((prev) =>
      prev.map((apt) => (apt.id === id ? { ...apt, status: newStatus } : apt)),
    );
  }

  function handleDelete(id) {
    if (confirm("Are you sure you want to delete this appointment?")) {
      setAppointments((prev) => prev.filter((apt) => apt.id !== id));
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
    <main className="min-h-screen bg-slate-100 text-slate-900 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                Appointments
              </h1>
              <p className="text-slate-600 text-lg">
                Manage customer bookings, update statuses, and keep track of
                repair appointments.
              </p>
            </div>

            <button
              onClick={openAddModal}
              className="inline-flex items-center justify-center rounded-lg bg-orange-500 px-5 py-3 text-white font-semibold hover:bg-orange-600 transition"
            >
              + New Appointment
            </button>
          </div>
        </section>

        {/* Stats */}
        <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <p className="text-sm font-medium text-slate-500 mb-2">Total</p>
            <h2 className="text-3xl font-bold">{totalAppointments}</h2>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <p className="text-sm font-medium text-slate-500 mb-2">Pending</p>
            <h2 className="text-3xl font-bold text-yellow-600">
              {pendingAppointments}
            </h2>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <p className="text-sm font-medium text-slate-500 mb-2">Confirmed</p>
            <h2 className="text-3xl font-bold text-blue-600">
              {confirmedAppointments}
            </h2>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <p className="text-sm font-medium text-slate-500 mb-2">Completed</p>
            <h2 className="text-3xl font-bold text-green-600">
              {completedAppointments}
            </h2>
          </div>
        </section>

        {/* Filters */}
        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Search Customer or Service
              </label>
              <input
                type="text"
                placeholder="Search by name, email, phone, service, or device..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Filter by Status
              </label>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option>All</option>
                <option>Pending</option>
                <option>Confirmed</option>
                <option>Completed</option>
                <option>Cancelled</option>
              </select>
            </div>
          </div>
        </section>

        {/* Table */}
        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-200">
            <h2 className="text-xl font-bold">Appointment List</h2>
            <p className="text-slate-600 mt-1">
              Showing {filteredAppointments.length} appointment
              {filteredAppointments.length !== 1 ? "s" : ""}
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left py-4 px-6 font-semibold text-slate-700">
                    Customer
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-slate-700">
                    Service
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-slate-700">
                    Device
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-slate-700">
                    Date & Time
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-slate-700">
                    Status
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-slate-700">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredAppointments.length > 0 ? (
                  filteredAppointments.map((apt) => (
                    <tr
                      key={apt.id}
                      className="border-b border-slate-200 hover:bg-slate-50 transition"
                    >
                      <td className="py-5 px-6 align-top">
                        <div>
                          <p className="font-semibold text-slate-900">
                            {apt.customer}
                          </p>
                          <p className="text-sm text-slate-600">{apt.email}</p>
                          <p className="text-sm text-slate-600">{apt.phone}</p>
                        </div>
                      </td>

                      <td className="py-5 px-6 text-slate-900 align-top">
                        {apt.service}
                      </td>

                      <td className="py-5 px-6 text-slate-600 align-top">
                        {apt.device}
                      </td>

                      <td className="py-5 px-6 text-slate-600 align-top">
                        <div>{formatDate(apt.date)}</div>
                        <div className="text-sm">{formatTime(apt.time)}</div>
                      </td>

                      <td className="py-5 px-6 align-top">
                        <select
                          value={apt.status}
                          onChange={(e) =>
                            handleStatusChange(apt.id, e.target.value)
                          }
                          className={`px-3 py-2 rounded-full text-sm font-medium border-none focus:outline-none ${getStatusColor(
                            apt.status,
                          )}`}
                        >
                          <option>Pending</option>
                          <option>Confirmed</option>
                          <option>Completed</option>
                          <option>Cancelled</option>
                        </select>
                      </td>

                      <td className="py-5 px-6 align-top">
                        <div className="flex flex-wrap gap-2">
                          <button
                            onClick={() => handleStartEdit(apt)}
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition text-sm font-medium"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() => handleDelete(apt.id)}
                            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition text-sm font-medium"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="py-12 px-6 text-center text-slate-600"
                    >
                      No appointments found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4">
          <div className="w-full max-w-3xl rounded-2xl bg-white shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  {editingId ? "Edit Appointment" : "Add New Appointment"}
                </h2>
                <p className="mt-1 text-slate-600 text-sm">
                  {editingId
                    ? "Update the appointment details below."
                    : "Enter the appointment details below."}
                </p>
              </div>

              <button
                onClick={closeModal}
                className="rounded-lg px-3 py-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition"
              >
                ✕
              </button>
            </div>

            <div className="p-6">
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Customer Name
                  </label>
                  <input
                    name="customer"
                    value={formData.customer}
                    onChange={handleFormChange}
                    placeholder="Customer Name"
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Email
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    placeholder="Email"
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Phone
                  </label>
                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleFormChange}
                    placeholder="Phone"
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Service
                  </label>
                  <input
                    name="service"
                    value={formData.service}
                    onChange={handleFormChange}
                    placeholder="Service"
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Device
                  </label>
                  <input
                    name="device"
                    value={formData.device}
                    onChange={handleFormChange}
                    placeholder="Device"
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleFormChange}
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option>Pending</option>
                    <option>Confirmed</option>
                    <option>Completed</option>
                    <option>Cancelled</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Date
                  </label>
                  <input
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleFormChange}
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Time
                  </label>
                  <input
                    name="time"
                    type="time"
                    value={formData.time}
                    onChange={handleFormChange}
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  onClick={handleSubmitAppointment}
                  className="rounded-lg bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
                >
                  {editingId ? "Save Changes" : "Add Appointment"}
                </button>

                <button
                  onClick={closeModal}
                  className="rounded-lg bg-slate-200 px-5 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
