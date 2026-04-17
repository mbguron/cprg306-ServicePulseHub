"use client";

import { useState } from "react";

const initialServices = [
  {
    id: 1,
    name: "Screen Repair",
    price: "$79.99",
    category: "Repair",
    description:
      "Professional screen replacement for cracked, flickering, or unresponsive displays on phones and tablets.",
  },
  {
    id: 2,
    name: "Battery Replacement",
    price: "$49.99",
    category: "Replacement",
    description:
      "Restore battery life and device performance with safe battery replacement for worn out or swollen batteries.",
  },
  {
    id: 3,
    name: "Water Damage Repair",
    price: "$129.99",
    category: "Repair",
    description:
      "Internal cleaning and component diagnostics for devices affected by liquid exposure or moisture damage.",
  },
  {
    id: 4,
    name: "Charging Port Repair",
    price: "$39.99",
    category: "Repair",
    description:
      "Fix loose, damaged, or non working charging ports so your device powers properly again.",
  },
  {
    id: 5,
    name: "Speaker/Microphone Repair",
    price: "$49.99",
    category: "Repair",
    description:
      "Repair audio issues affecting calls, recordings, and media playback caused by damaged speakers or microphones.",
  },
  {
    id: 6,
    name: "Camera Repair",
    price: "$89.99",
    category: "Repair",
    description:
      "Repair blurry, broken, or non responsive front and rear cameras for clearer photos and video calls.",
  },
];

export default function AdminServices() {
  const [services, setServices] = useState(initialServices);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "Repair",
    description: "",
  });

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

  function handleAddService() {
    if (!validateService()) return;

    const newService = {
      id: Date.now(),
      name: formData.name.trim(),
      price: formData.price.trim(),
      category: formData.category,
      description: formData.description.trim(),
    };

    setServices((prev) => [newService, ...prev]);
    closeModal();
  }

  function handleStartEdit(service) {
    setEditingId(service.id);
    setFormData({
      name: service.name,
      price: service.price,
      category: service.category,
      description: service.description,
    });
    setShowModal(true);
  }

  function handleSaveService() {
    if (!validateService()) return;

    setServices((prev) =>
      prev.map((service) =>
        service.id === editingId
          ? {
              ...service,
              name: formData.name.trim(),
              price: formData.price.trim(),
              category: formData.category,
              description: formData.description.trim(),
            }
          : service,
      ),
    );

    closeModal();
  }

  function handleSubmitService() {
    if (editingId) {
      handleSaveService();
    } else {
      handleAddService();
    }
  }

  function handleDelete(id) {
    if (confirm("Are you sure you want to delete this service?")) {
      setServices((prev) => prev.filter((service) => service.id !== id));
    }
  }

  return (
    <main className="min-h-screen bg-slate-100 text-slate-900 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-500">
                Administration
              </p>
              <h1 className="mt-2 text-3xl md:text-4xl font-bold text-slate-900">
                Services
              </h1>
              <p className="mt-2 text-slate-600 text-lg">
                Manage available repair and replacement services offered by the
                business.
              </p>
            </div>

            <button
              onClick={openAddModal}
              className="rounded-lg bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
            >
              + Add Service
            </button>
          </div>
        </section>

        {/* Services Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 hover:shadow-md transition"
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    {service.name}
                  </h3>
                  <p className="text-sm text-slate-600 mt-1">
                    {service.category}
                  </p>
                </div>

                <span className="text-2xl font-bold text-orange-500 whitespace-nowrap">
                  {service.price}
                </span>
              </div>

              <p className="text-sm text-slate-600 leading-6 mb-5">
                {service.description}
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => handleStartEdit(service)}
                  className="flex-1 rounded-lg bg-blue-500 text-white py-2.5 hover:bg-blue-600 transition text-sm font-medium"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(service.id)}
                  className="flex-1 rounded-lg bg-red-500 text-white py-2.5 hover:bg-red-600 transition text-sm font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </section>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4">
          <div className="w-full max-w-2xl rounded-2xl bg-white border border-slate-200 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  {editingId ? "Edit Service" : "Add New Service"}
                </h2>
                <p className="mt-1 text-sm text-slate-600">
                  {editingId
                    ? "Update the service details below."
                    : "Enter the service details below."}
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Service Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    placeholder="e.g. Screen Repair"
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Price
                  </label>
                  <input
                    type="text"
                    name="price"
                    value={formData.price}
                    onChange={handleFormChange}
                    placeholder="e.g. $79.99"
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleFormChange}
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option>Repair</option>
                    <option>Replacement</option>
                    <option>Maintenance</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleFormChange}
                    rows="5"
                    placeholder="Describe the service in a little more detail..."
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  onClick={handleSubmitService}
                  className="rounded-lg bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
                >
                  {editingId ? "Save Changes" : "Add Service"}
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
