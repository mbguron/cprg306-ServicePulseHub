"use client";

import { useState } from "react";

export default function FAQsPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How do I book an appointment?",
      answer:
        "Go to the Booking page from the dashboard, select your service, choose a date and time, and confirm your booking.",
    },
    {
      question: "Can I cancel or reschedule my appointment?",
      answer:
        "Yes, you can manage your bookings from the dashboard. Simply select your appointment and choose cancel or reschedule.",
    },
    {
      question: "How do I track my repair status?",
      answer:
        "You can view the status of your repair in the dashboard under your bookings or tickets section.",
    },
    {
      question: "Do I need an account to book a service?",
      answer:
        "Yes, you must be logged in to book and manage appointments so we can track your service history.",
    },
    {
      question: "What services do you offer?",
      answer:
        "We offer repair services for phones, laptops, tablets, and other electronic devices along with accessory sales.",
    },
    {
      question: "How will I receive updates?",
      answer:
        "You will receive updates directly in your dashboard and optionally via email notifications.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <main className="min-h-screen bg-slate-100 text-slate-900 p-8">
      {/* Page Header */}
      <div className="max-w-5xl mx-auto mb-8">
        <h1 className="text-4xl font-bold mb-2">Frequently Asked Questions</h1>
        <p className="text-lg text-gray-600">
          Find answers to common questions about bookings, services, and your
          account.
        </p>
      </div>

      {/* FAQ List */}
      <div className="max-w-5xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md border border-gray-200"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full text-left px-6 py-4 flex justify-between items-center"
            >
              <span className="font-semibold text-lg">{faq.question}</span>
              <span className="text-xl font-bold">
                {openIndex === index ? "-" : "+"}
              </span>
            </button>

            {openIndex === index && (
              <div className="px-6 pb-4 text-gray-700">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
