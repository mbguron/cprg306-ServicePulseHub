import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="flex justify-between items-center py-6 px-8 bg-orange-400 text-white mx-auto w-full rounded-lg">
      <Link href="/" className="font-bold text-2xl">
        ServicePulse Hub
      </Link>

      <div className="flex gap-6">
        <Link href="/booking" className="hover:underline font-semibold">
          Booking An Appointment
        </Link>

        <Link href="/services" className="hover:underline font-semibold">
          Services
        </Link>

        <Link href="/faqs" className="hover:underline font-semibold">
          FAQs
        </Link>

        <Link href="/login" className="hover:underline font-semibold">
          Login
        </Link>
      </div>
    </nav>
  );
}
