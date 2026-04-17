"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  addCustomer,
  deleteCustomer,
  getCustomers,
  toggleCustomerStatus,
  updateCustomer,
} from "@/lib/services/customerService";

export default function AdminCustomers() {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
  });

  useEffect(() => {
    loadCustomers();
  }, []);

  async function loadCustomers() {
    try {
      setLoading(true);
      const data = await getCustomers();
      setCustomers(data);

      if (data.length > 0 && !selectedCustomerId) {
        setSelectedCustomerId(data[0].id);
      }
    } catch (error) {
      console.error("Error loading customers:", error);
      alert("Failed to load customers.");
    } finally {
      setLoading(false);
    }
  }

  const filteredCustomers = useMemo(() => {
    return customers.filter((customer) => {
      const fullName =
        `${customer.firstName || ""} ${customer.lastName || ""}`.toLowerCase();
      const term = searchTerm.toLowerCase();

      return (
        fullName.includes(term) ||
        (customer.email || "").toLowerCase().includes(term) ||
        (customer.phone || "").includes(searchTerm) ||
        String(customer.id).includes(searchTerm)
      );
    });
  }, [customers, searchTerm]);

  const selectedCustomer =
    customers.find((customer) => customer.id === selectedCustomerId) || null;

  function clearFormData() {
    setFormData({
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
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

  function validateCustomer() {
    if (
      !formData.firstName.trim() ||
      !formData.lastName.trim() ||
      !formData.phone.trim() ||
      !formData.email.trim()
    ) {
      alert("Please fill in all customer fields.");
      return false;
    }

    const emailExists = customers.some(
      (customer) =>
        customer.email?.toLowerCase() === formData.email.trim().toLowerCase() &&
        customer.id !== editingId,
    );

    if (emailExists) {
      alert("A customer with this email already exists.");
      return false;
    }

    return true;
  }

  function openAddModal() {
    setEditingId(null);
    clearFormData();
    setShowModal(true);
  }

  async function handleAddCustomer() {
    if (!validateCustomer()) return;

    try {
      const newId = await addCustomer({
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        email: formData.email,
        status: "Active",
      });

      await loadCustomers();
      setSelectedCustomerId(newId);
      closeModal();
    } catch (error) {
      console.error("Error adding customer:", error);
      alert("Failed to add customer.");
    }
  }

  function handleStartEdit(customer) {
    setEditingId(customer.id);
    setSelectedCustomerId(customer.id);
    setFormData({
      firstName: customer.firstName || "",
      lastName: customer.lastName || "",
      phone: customer.phone || "",
      email: customer.email || "",
    });
    setShowModal(true);
  }

  async function handleSaveEdit() {
    if (!validateCustomer()) return;

    try {
      await updateCustomer(editingId, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        email: formData.email,
        status: selectedCustomer?.status || "Active",
      });

      await loadCustomers();
      closeModal();
    } catch (error) {
      console.error("Error updating customer:", error);
      alert("Failed to update customer.");
    }
  }

  function handleSubmitCustomer() {
    if (editingId) {
      handleSaveEdit();
    } else {
      handleAddCustomer();
    }
  }

  async function handleDeleteCustomer(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this customer?",
    );
    if (!confirmed) return;

    try {
      await deleteCustomer(id);
      await loadCustomers();

      const remaining = customers.filter((customer) => customer.id !== id);
      if (remaining.length > 0) {
        setSelectedCustomerId(remaining[0].id);
      } else {
        setSelectedCustomerId(null);
      }
    } catch (error) {
      console.error("Error deleting customer:", error);
      alert("Failed to delete customer.");
    }
  }

  async function handleToggleStatus(id, currentStatus) {
    try {
      await toggleCustomerStatus(id, currentStatus);
      await loadCustomers();
    } catch (error) {
      console.error("Error toggling customer status:", error);
      alert("Failed to update customer status.");
    }
  }

  const totalCustomers = customers.length;
  const activeCustomers = customers.filter(
    (customer) => customer.status === "Active",
  ).length;
  const suspendedCustomers = customers.filter(
    (customer) => customer.status === "Suspended",
  ).length;

  return (
    <main className="space-y-6">
      <div className="flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-orange-500">
            Administration
          </p>
          <h1 className="text-3xl font-bold text-slate-900">Customers</h1>
          <p className="mt-2 text-slate-600">
            Search, add, edit, remove, and manage customer accounts.
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
            Add Customer
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Total Customers</p>
          <h2 className="mt-2 text-3xl font-bold text-red-700">
            {totalCustomers}
          </h2>
        </div>
        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Active</p>
          <h2 className="mt-2 text-3xl font-bold text-green-600">
            {activeCustomers}
          </h2>
        </div>
        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Suspended</p>
          <h2 className="mt-2 text-3xl font-bold text-red-600">
            {suspendedCustomers}
          </h2>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
        <section className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="mb-4">
            <h2 className="text-xl font-bold text-slate-900">Customer List</h2>
            <p className="text-sm text-slate-500">
              Showing {filteredCustomers.length} customer
              {filteredCustomers.length !== 1 ? "s" : ""}
            </p>
          </div>

          <input
            type="text"
            placeholder="Search by name, email, phone, or ID"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-4 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-orange-500 text-black"
          />

          <div className="max-h-[520px] space-y-3 overflow-y-auto">
            {loading ? (
              <p className="text-slate-500">Loading customers...</p>
            ) : filteredCustomers.length > 0 ? (
              filteredCustomers.map((customer) => (
                <button
                  key={customer.id}
                  onClick={() => setSelectedCustomerId(customer.id)}
                  className={`w-full rounded-xl border p-4 text-left transition ${
                    selectedCustomerId === customer.id
                      ? "border-orange-500 bg-orange-50"
                      : "border-slate-200 bg-white hover:bg-slate-50"
                  }`}
                >
                  <p className="font-semibold text-slate-900">
                    {customer.firstName} {customer.lastName}
                  </p>
                  <p className="text-sm text-slate-500">{customer.email}</p>
                  <p className="mt-1 text-xs text-slate-400">
                    ID: {customer.id}
                  </p>
                  <span
                    className={`mt-2 inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                      customer.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {customer.status}
                  </span>
                </button>
              ))
            ) : (
              <p className="text-slate-500">No customers found.</p>
            )}
          </div>
        </section>

        <section className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-bold text-slate-900">
            Customer Details
          </h2>

          {selectedCustomer ? (
            <div className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-sm text-slate-500">Customer ID</p>
                  <p className="font-semibold text-slate-900">
                    {selectedCustomer.id}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Account Status</p>
                  <p className="font-semibold text-slate-900">
                    {selectedCustomer.status}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">First Name</p>
                  <p className="font-semibold text-slate-900">
                    {selectedCustomer.firstName}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Last Name</p>
                  <p className="font-semibold text-slate-900">
                    {selectedCustomer.lastName}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Phone</p>
                  <p className="font-semibold text-slate-900">
                    {selectedCustomer.phone}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Email</p>
                  <p className="font-semibold text-slate-900">
                    {selectedCustomer.email}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => handleStartEdit(selectedCustomer)}
                  className="rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700"
                >
                  Edit Customer
                </button>

                <button
                  onClick={() =>
                    handleToggleStatus(
                      selectedCustomer.id,
                      selectedCustomer.status,
                    )
                  }
                  className={`rounded-lg px-4 py-3 text-sm font-semibold text-white ${
                    selectedCustomer.status === "Active"
                      ? "bg-red-500 hover:bg-red-600"
                      : "bg-green-600 hover:bg-green-700"
                  }`}
                >
                  {selectedCustomer.status === "Active"
                    ? "Suspend Customer"
                    : "Activate Customer"}
                </button>

                <button
                  onClick={() => handleDeleteCustomer(selectedCustomer.id)}
                  className="rounded-lg bg-slate-800 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-900"
                >
                  Delete Customer
                </button>
              </div>
            </div>
          ) : (
            <p className="text-slate-500">Select a customer to view details.</p>
          )}
        </section>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-5 flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  {editingId ? "Edit Customer" : "Add New Customer"}
                </h2>
                <p className="text-slate-500">
                  {editingId
                    ? "Update the selected customer details."
                    : "Enter customer details below."}
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
                  First Name
                </label>
                <input
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleFormChange}
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 text-black"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-black">
                  Last Name
                </label>
                <input
                  name="lastName"
                  value={formData.lastName}
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
                  Email
                </label>
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 text-black"
                />
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={handleSubmitCustomer}
                className="rounded-lg bg-orange-500 px-5 py-3 text-sm font-semibold text-white hover:bg-orange-600"
              >
                {editingId ? "Save Changes" : "Add Customer"}
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
