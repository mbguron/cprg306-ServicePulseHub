import Link from "next/link";

export default function LoggedNavBar() {
  return (
    <nav className="flex justify-between items-center py-6 px-8 bg-orange-400 text-white mx-auto w-full rounded-lg">
      {/* Logo */}
      <Link href="/dashboard" className="font-bold text-2xl">
        ServicePulse Hub
      </Link>

      {/* Links */}
      <div className="flex gap-6">
        <Link
          href="/dashboard/booking"
          className="hover:underline font-semibold"
        >
          Booking An Appointment
        </Link>

        <Link
          href="/dashboard/services"
          className="hover:underline font-semibold"
        >
          Services
        </Link>

        <Link href="/dashboard/faqs" className="hover:underline font-semibold">
          FAQs
        </Link>

        <Link
          href="/dashboard/profile"
          className="hover:underline font-semibold"
        >
          Profile
        </Link>
      </div>
    </nav>
  );
}
