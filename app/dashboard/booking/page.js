"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

export default function AppointmentBooking() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    service: "",
    device: "",
    date: "",
    time: "",
    description: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const services = [
    "Screen Repair",
    "Battery Replacement",
    "Water Damage Repair",
    "Charging Port Repair",
    "Speaker/Microphone Repair",
    "Camera Repair",
    "Software Issues",
    "Other",
  ];

  const devices = [
    "iPhone",
    "Samsung Galaxy",
    "Google Pixel",
    "OnePlus",
    "Motorola",
    "iPad",
    "Android Tablet",
    "Other",
  ];

  const BUSINESS_HOURS = {
    start: 9,
    end: 18,
    interval: 30,
  };

  const bookedSlots = {
    "2026-04-13": ["09:00", "09:30", "14:00", "14:30"],
    "2026-04-14": ["10:00", "11:00", "15:00"],
    "2026-04-15": ["09:00", "13:00", "16:00", "16:30"],
  };

  const today = new Date().toISOString().split("T")[0];

  const isTimeSlotAvailable = (date, time) => {
    const bookedForDate = bookedSlots[date] || [];
    return !bookedForDate.includes(time);
  };

  const availableTimeSlots = useMemo(() => {
    if (!formData.date) return [];

    const slots = [];
    const { start, end, interval } = BUSINESS_HOURS;
    const bookedForDate = bookedSlots[formData.date] || [];

    for (let hour = start; hour < end; hour++) {
      for (let minute = 0; minute < 60; minute += interval) {
        const timeStr = `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;

        if (!bookedForDate.includes(timeStr)) {
          let endHour = hour;
          let endMinute = minute + interval;

          if (endMinute >= 60) {
            endHour += 1;
            endMinute = 0;
          }

          const endTimeStr = `${String(endHour).padStart(2, "0")}:${String(endMinute).padStart(2, "0")}`;
          const timeRange = `${timeStr} - ${endTimeStr}`;

          slots.push({
            value: timeStr,
            label: timeRange,
            available: isTimeSlotAvailable(formData.date, timeStr),
          });
        }
      }
    }

    return slots;
  }, [formData.date]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "date" && { time: "" }),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Appointment Data:", formData);

    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        service: "",
        device: "",
        date: "",
        time: "",
        description: "",
      });
    }, 3000);
  };

  return (
    <main className="min-h-screen bg-slate-100 text-slate-900 px-4 py-10 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="mb-8 rounded-2xl bg-white border border-slate-200 shadow-sm p-8 text-center">
          <h1 className="text-4xl font-bold mb-3">Book an Appointment</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Schedule a repair appointment for your device and choose a time that
            works best for you.
          </p>
        </div>

        {submitted ? (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-10 text-center">
            <div className="mb-5 flex justify-center">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
                <svg
                  className="w-10 h-10 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>

            <h2 className="text-2xl font-bold mb-2">Appointment Booked</h2>
            <p className="text-slate-600 mb-6 max-w-xl mx-auto">
              Thank you for booking with ServicePulse Hub. Your request has been
              submitted and we will contact you soon to confirm the appointment.
            </p>

            <Link
              href="/"
              className="inline-block bg-orange-500 text-white font-semibold px-6 py-3 rounded-lg hover:bg-orange-600 transition"
            >
              Back to Home
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
              <form onSubmit={handleSubmit} className="space-y-10">
                {/* Personal Information */}
                <section>
                  <h2 className="text-2xl font-bold mb-2">Your Information</h2>
                  <p className="text-slate-600 mb-6">
                    Enter your contact details so we can confirm your booking.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="firstName"
                        className="block text-sm font-semibold text-slate-700 mb-2"
                      >
                        First Name *
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        placeholder="John"
                        className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="lastName"
                        className="block text-sm font-semibold text-slate-700 mb-2"
                      >
                        Last Name *
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        placeholder="Doe"
                        className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-semibold text-slate-700 mb-2"
                      >
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="john@example.com"
                        className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-semibold text-slate-700 mb-2"
                      >
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="(123) 456-7890"
                        className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </section>

                {/* Device and Service */}
                <section>
                  <h2 className="text-2xl font-bold mb-2">
                    Device and Service
                  </h2>
                  <p className="text-slate-600 mb-6">
                    Tell us what device you have and what type of repair you
                    need.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="device"
                        className="block text-sm font-semibold text-slate-700 mb-2"
                      >
                        Device Type *
                      </label>
                      <select
                        id="device"
                        name="device"
                        value={formData.device}
                        onChange={handleChange}
                        required
                        className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      >
                        <option value="">Select a device</option>
                        {devices.map((device) => (
                          <option key={device} value={device}>
                            {device}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="service"
                        className="block text-sm font-semibold text-slate-700 mb-2"
                      >
                        Service Needed *
                      </label>
                      <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        required
                        className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      >
                        <option value="">Select a service</option>
                        {services.map((service) => (
                          <option key={service} value={service}>
                            {service}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </section>

                {/* Appointment Details */}
                <section>
                  <h2 className="text-2xl font-bold mb-2">
                    Appointment Details
                  </h2>
                  <p className="text-slate-600 mb-6">
                    Pick a preferred date and available time slot.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="date"
                        className="block text-sm font-semibold text-slate-700 mb-2"
                      >
                        Preferred Date *
                      </label>
                      <input
                        type="date"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                        min={today}
                        className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="time"
                        className="block text-sm font-semibold text-slate-700 mb-2"
                      >
                        Preferred Time *
                      </label>

                      {!formData.date ? (
                        <div className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-slate-500">
                          Select a date first
                        </div>
                      ) : availableTimeSlots.length > 0 ? (
                        <select
                          id="time"
                          name="time"
                          value={formData.time}
                          onChange={(e) => {
                            const selectedSlot = availableTimeSlots.find(
                              (slot) => slot.value === e.target.value,
                            );

                            if (selectedSlot && selectedSlot.available) {
                              handleChange(e);
                            }
                          }}
                          required
                          className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        >
                          <option value="">Select a time</option>
                          {availableTimeSlots.map((slot) => (
                            <option
                              key={slot.value}
                              value={slot.value}
                              disabled={!slot.available}
                            >
                              {slot.label}{" "}
                              {!slot.available ? "(Booked)" : "(Available)"}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <div className="w-full rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-red-600 font-medium">
                          No available slots for this date
                        </div>
                      )}
                    </div>
                  </div>

                  {formData.date && availableTimeSlots.length > 0 && (
                    <div className="mt-4 rounded-xl border border-blue-200 bg-blue-50 p-4">
                      <p className="text-sm text-blue-800">
                        <span className="font-semibold">
                          {availableTimeSlots.length} slots available
                        </span>{" "}
                        on{" "}
                        {new Date(formData.date).toLocaleDateString("en-US", {
                          weekday: "long",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                      <p className="text-xs text-blue-600 mt-1">
                        Business hours: 9:00 AM to 6:00 PM with 30 minute
                        intervals
                      </p>
                    </div>
                  )}
                </section>

                {/* Additional Info */}
                <section>
                  <h2 className="text-2xl font-bold mb-2">
                    Additional Information
                  </h2>
                  <p className="text-slate-600 mb-6">
                    Add any extra details about the issue with your device.
                  </p>

                  <div>
                    <label
                      htmlFor="description"
                      className="block text-sm font-semibold text-slate-700 mb-2"
                    >
                      Describe the Issue
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows="5"
                      placeholder="Tell us more about the issue with your device..."
                      className="w-full rounded-lg border border-slate-300 px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                </section>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={!formData.time}
                    className="w-full rounded-lg bg-orange-500 text-white font-semibold py-3 px-6 hover:bg-orange-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Book Appointment
                  </button>
                </div>

                <p className="text-center text-sm text-slate-500">
                  * Required fields. We will contact you shortly to confirm your
                  appointment.
                </p>
              </form>
            </div>

            {/* Side Info */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                <h3 className="text-xl font-bold mb-3">Why Choose Us</h3>
                <p className="text-slate-600 mb-4">
                  Reliable repair service with clear booking, fast turnaround,
                  and regular updates.
                </p>
                <div className="space-y-3 text-sm text-slate-700">
                  <div className="rounded-lg bg-slate-50 border border-slate-200 px-4 py-3">
                    Most repairs completed within 24 hours
                  </div>
                  <div className="rounded-lg bg-slate-50 border border-slate-200 px-4 py-3">
                    Warranty available on completed repairs
                  </div>
                  <div className="rounded-lg bg-slate-50 border border-slate-200 px-4 py-3">
                    Affordable and transparent pricing
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                <h3 className="text-xl font-bold mb-3">Need Help?</h3>
                <p className="text-slate-600 mb-4">
                  If you are not sure which service to choose, our team can help
                  guide you.
                </p>
                <Link
                  href="/dashboard/contact"
                  className="inline-block rounded-lg bg-slate-900 text-white px-5 py-3 font-medium hover:bg-slate-800 transition"
                >
                  Contact Support
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
