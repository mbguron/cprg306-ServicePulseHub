"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import PressButton from "@/components/ui/PressButton";

export default function DashboardPage() {
  const router = useRouter();

  function handleLogout() {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userEmail");
    router.push("/");
  }

  return (
    <main className="min-h-screen bg-slate-100 px-6 py-10 md:px-10">
      <div className="mx-auto max-w-7xl">
        {/* Hero Section */}
        <section className="grid gap-8 lg:grid-cols-2 items-center">
          <div className="rounded-3xl bg-white p-8 shadow-sm md:p-10">
            <div className="mb-6">
              <h1 className="text-4xl font-semibold leading-tight text-gray-800 md:text-5xl">
                Broken Screen?
                <br />
                Water Damage?
                <br />
                Battery Issues?
                <br />
                <span className="mt-3 inline-block rounded-xl bg-orange-400 px-4 py-2 text-white">
                  We Fix It All!
                </span>
              </h1>

              <p className="my-6 max-w-xl text-lg text-gray-600">
                We provide professional cell phone repair services that are
                trusted, reliable, and affordable. To see a full list of our
                services, visit our services page.
              </p>

              <div className="flex flex-wrap gap-4">
                <PressButton
                  onClick={() => router.push("/services")}
                  variant="primary"
                >
                  View Our Services
                </PressButton>

                <PressButton
                  onClick={() => router.push("/booking")}
                  variant="primary"
                >
                  Book a Repair
                </PressButton>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-slate-900 px-8 py-16 text-white shadow-lg md:px-14">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-400">
              ServicePulse Hub
            </p>

            <h2 className="mt-4 text-4xl font-bold leading-tight md:text-5xl">
              Reliable Device Repair and Services
            </h2>

            <p className="mt-5 max-w-2xl text-base text-slate-300">
              Book services, explore repair options, and stay connected with a
              modern support experience built for speed, accuracy, and
              convenience.
            </p>
          </div>
        </section>

        {/* Feature Cards */}
        <section className="mt-10 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl bg-white p-6 shadow-sm transition hover:shadow-md">
            <h2 className="text-xl font-bold text-slate-900">
              Trusted Expertise
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Our technicians are highly trained and experienced in repairing a
              wide range of devices, ensuring your device is in safe hands.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm transition hover:shadow-md">
            <h2 className="text-xl font-bold text-slate-900">Quality Parts</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              We use only high-quality replacement parts to ensure the longevity
              and performance of your repaired device.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm transition hover:shadow-md">
            <h2 className="text-xl font-bold text-slate-900">
              Fast Turnaround
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              We understand the importance of your device, which is why we
              strive to provide quick and efficient repair services without
              compromising on quality.
            </p>
          </div>
        </section>

        {/* FAQ + CTA */}
        <section className="mt-10 grid gap-6 lg:grid-cols-[2fr_1fr]">
          <div className="flex flex-col justify-center rounded-3xl bg-orange-300/50 p-10 text-center shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">
              Customer FAQs
            </h2>
            <h3 className="mb-3 text-3xl font-extrabold text-gray-800">
              Have a question about our services?
            </h3>
            <p className="text-gray-700">
              Visit our FAQs page for answers to the most common customer
              questions.
            </p>
            <Link
              href="/faqs"
              className="mt-5 font-semibold text-gray-700 hover:underline"
            >
              Go to FAQs
            </Link>
          </div>

          <div className="flex items-center justify-center rounded-3xl bg-white p-8 shadow-sm">
            <PressButton
              onClick={() => router.push("/booking")}
              variant="primary"
            >
              Book Your Repair Now
            </PressButton>
          </div>
        </section>
      </div>
    </main>
  );
}
