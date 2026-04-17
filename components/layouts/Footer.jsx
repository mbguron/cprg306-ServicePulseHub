import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-orange-200/20 text-orange-800 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    {/* Company Info */}
                    <div>
                        <h3 className="text-gray-800 text-lg font-bold mb-4">ServicePulse Hub</h3>
                        <p className="text-gray-400 text-sm">
                            Professional digital device repair services you can trust.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-gray-800 font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/" className="text-gray-400 hover:text-orange-400 transition">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/services" className="text-gray-400 hover:text-orange-400 transition">
                                    Services
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-gray-400 hover:text-orange-400 transition">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-gray-400 hover:text-orange-400 transition">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="text-gray-800 font-semibold mb-4">Services</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="#" className="text-gray-400 hover:text-orange-400 transition">
                                    Screen Repair
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-gray-400 hover:text-orange-400 transition">
                                    Battery Replacement
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-gray-400 hover:text-orange-400 transition">
                                    Water Damage
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-gray-400 hover:text-orange-400 transition">
                                    Other Repairs
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-gray-800 font-semibold mb-4">Contact</h4>
                        <ul className="space-y-2 text-sm">
                            <li className="text-gray-400">
                                📍 123 Repair Street
                                <br />
                                Tech City, TC 12345
                            </li>
                            <li>
                                <a href="tel:+1234567890" className="text-gray-400 hover:text-orange-400 transition">
                                    📞 (123) 456-7890
                                </a>
                            </li>
                            <li>
                                <a href="mailto:info@servicepulsehub.com" className="text-gray-400 hover:text-orange-400 transition">
                                    ✉️ info@servicepulsehub.com
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-800 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-gray-400 text-sm">
                            &copy; 2024 ServicePulse Hub. All rights reserved.
                        </p>
                        <div className="flex space-x-6 mt-4 md:mt-0">
                            <Link href="#" className="text-gray-400 hover:text-orange-400 transition text-sm">
                                Privacy Policy
                            </Link>
                            <Link href="#" className="text-gray-400 hover:text-orange-400 transition text-sm">
                                Terms of Service
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}