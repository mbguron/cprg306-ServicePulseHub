"use client";

import { useEffect, useState } from "react";
import {
  addService,
  deleteService,
  getServices,
  updateService,
} from "@/lib/services/serviceService";

export default function AdminServices() {
  const [services, setServices] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "Repair",
    description: "",
  });

  useEffect(() => {
    loadServices();
  }, []);

  async function loadServices() {
    try {
      setLoading(true);
      const data = await getServices();
      setServices(data);
    } catch (error) {
      console.error("Error loading services:", error);
      alert("Failed to load services.");
    } finally {
      setLoading(false);
    }
  }

  function clearFormData() {
    setFormData({
      name: "",
      price: "",
      category: "Repair",
      description: "",
    });
  }

  function closeModal() {
    clearFormData();
    setEditingId(null);
    setShowModal(false);
  }

  function openAddModal() {
    setEditingId(null);
    clearFormData();
    setShowModal(true);
  }

  function handleFormChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function validateService() {
    if (
      !formData.name.trim() ||
      !formData.price.trim() ||
      !formData.category.trim() ||
      !formData.description.trim()
    ) {
      alert("Please fill in all service fields.");
      return false;
    }

    return true;
  }

  async function handleAddService() {
    if (!validateService()) return;

    try {
      await addService(formData);
      await loadServices();
      closeModal();
    } catch (error) {
      console.error("Error adding service:", error);
      alert("Failed to add service.");
    }
  }

  function handleStartEdit(service) {
    setEditingId(service.id);
    setFormData({
      name: service.name || "",
      price: service.price || "",
      category: service.category || "Repair",
      description: service.description || "",
    });
    setShowModal(true);
  }

  async function handleSaveService() {
    if (!validateService()) return;

    try {
      await updateService(editingId, formData);
      await loadServices();
      closeModal();
    } catch (error) {
      console.error("Error updating service:", error);
      alert("Failed to update service.");
    }
  }

  function handleSubmitService() {
    if (editingId) {
      handleSaveService();
    } else {
      handleAddService();
    }
  }

  async function handleDelete(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this service?",
    );
    if (!confirmed) return;

    try {
      await deleteService(id);
      await loadServices();
    } catch (error) {
      console.error("Error deleting service:", error);
      alert("Failed to delete service.");
    }
  }

  return (
    <main className="space-y-6">
      <div className="flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-orange-500">
            Administration
          </p>
          <h1 className="text-3xl font-bold text-slate-900">Services</h1>
          <p className="mt-2 text-slate-600">
            Manage available repair and replacement services offered by the
            business.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="rounded-lg bg-orange-500 px-4 py-3 text-sm font-semibold text-white hover:bg-orange-600"
        >
          Add Service
        </button>
      </div>

      {loading ? (
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <p className="text-slate-500">Loading services...</p>
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.id}
              className="rounded-2xl bg-white p-6 shadow-sm"
            >
              <div className="mb-3 flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    {service.name}
                  </h3>
                  <p className="mt-1 inline-block rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700">
                    {service.category}
                  </p>
                </div>
                <p className="text-lg font-bold text-slate-900">
                  {service.price}
                </p>
              </div>

              <p className="mb-5 text-sm leading-6 text-slate-600">
                {service.description}
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => handleStartEdit(service)}
                  className="flex-1 rounded-lg bg-blue-500 py-2.5 text-sm font-medium text-white hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(service.id)}
                  className="flex-1 rounded-lg bg-red-500 py-2.5 text-sm font-medium text-white hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-5 flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  {editingId ? "Edit Service" : "Add New Service"}
                </h2>
                <p className="text-slate-500">
                  {editingId
                    ? "Update the service details below."
                    : "Enter the service details below."}
                </p>
              </div>

              <button
                onClick={closeModal}
                className="rounded-lg px-3 py-2 text-slate-500 hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            <div className="grid gap-4">
              <div>
                <label className="mb-1 block text-sm font-medium  text-black">
                  Service Name
                </label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 text-black"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-black">
                    Price
                  </label>
                  <input
                    name="price"
                    value={formData.price}
                    onChange={handleFormChange}
                    placeholder="$79.99"
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 text-black"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-black">
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleFormChange}
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 text-black"
                  >
                    <option value="Repair">Repair</option>
                    <option value="Replacement">Replacement</option>
                    <option value="Maintenance">Maintenance</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-black">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleFormChange}
                  rows={5}
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 text-black"
                />
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={handleSubmitService}
                className="rounded-lg bg-orange-500 px-5 py-3 text-sm font-semibold text-white hover:bg-orange-600"
              >
                {editingId ? "Save Changes" : "Add Service"}
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
