"use client";

import { useRouter } from "next/navigation";
import PressButton from "@/components/ui/PressButton";

export default function ServicesPage() {
  const router = useRouter();

  const services = [
    {
      title: "Screen Repair",
      description:
        "Fix cracked or broken screens quickly with high-quality replacements.",
    },
    {
      title: "Battery Replacement",
      description:
        "Replace old or damaged batteries to restore your device’s performance.",
    },
    {
      title: "Water Damage Repair",
      description:
        "Professional cleaning and repair for water-damaged devices.",
    },
    {
      title: "Charging Port Fix",
      description: "Resolve charging issues and port damage efficiently.",
    },
    {
      title: "Software Issues",
      description:
        "Fix bugs, crashes, and system problems with expert support.",
    },
    {
      title: "General Diagnostics",
      description: "Full device checkup to identify and solve hidden issues.",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-100 px-6 py-10 md:px-10">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900">Our Services</h1>
          <p className="mt-3 text-gray-600">
            Explore the range of repair services we offer for your devices.
          </p>
        </div>

        {/* Services Grid */}
        <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                {service.title}
              </h2>

              <p className="text-sm text-gray-600 mb-4">
                {service.description}
              </p>

              <PressButton
                onClick={() => router.push("/booking")}
                variant="primary"
              >
                Book This Service
              </PressButton>
            </div>
          ))}
        </section>

        {/* Bottom CTA */}
        <div className="mt-12 flex justify-center">
          <PressButton
            onClick={() => router.push("/booking")}
            variant="primary"
          >
            Book a Repair Now
          </PressButton>
        </div>
      </div>
    </main>
  );
}
