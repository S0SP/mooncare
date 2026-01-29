"use client";

import Link from "next/link";
import { Moon, Instagram, Twitter, Facebook, Mail, Heart } from "lucide-react";

const footerLinks = {
    product: [
        { href: "/kits", label: "Care Kits" },
        { href: "/how-it-works", label: "How It Works" },
        { href: "/pricing", label: "Pricing" },
    ],
    company: [
        { href: "/about", label: "About Us" },
        { href: "/about#team", label: "Our Team" },
        { href: "/about#impact", label: "Impact" },
    ],
    support: [
        { href: "#", label: "FAQs" },
        { href: "#", label: "Contact" },
        { href: "#", label: "Privacy Policy" },
    ],
};

export default function Footer() {
    return (
        <footer className="bg-gradient-to-b from-cream-200 to-lavender-100 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
                    {/* Brand Column */}
                    <div className="lg:col-span-2">
                        <Link href="/" className="flex items-center gap-2 mb-4">
                            <div className="w-10 h-10 bg-gradient-cta rounded-full flex items-center justify-center">
                                <Moon className="w-6 h-6 text-white" />
                            </div>
                            <span className="font-poppins font-bold text-xl text-textPrimary">
                                Moon<span className="text-deepPurple">Care</span>
                            </span>
                        </Link>
                        <p className="text-textSecondary mb-6 max-w-sm">
                            From calendar tracking to body intelligence. Predictive, personalized
                            menstrual care for every woman.
                        </p>
                        {/* Social Links */}
                        <div className="flex gap-4">
                            <a
                                href="#"
                                className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-soft hover:shadow-card transition-shadow"
                            >
                                <Instagram className="w-5 h-5 text-deepPurple" />
                            </a>
                            <a
                                href="#"
                                className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-soft hover:shadow-card transition-shadow"
                            >
                                <Twitter className="w-5 h-5 text-deepPurple" />
                            </a>
                            <a
                                href="#"
                                className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-soft hover:shadow-card transition-shadow"
                            >
                                <Facebook className="w-5 h-5 text-deepPurple" />
                            </a>
                            <a
                                href="mailto:hello@mooncare.in"
                                className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-soft hover:shadow-card transition-shadow"
                            >
                                <Mail className="w-5 h-5 text-deepPurple" />
                            </a>
                        </div>
                    </div>

                    {/* Product Links */}
                    <div>
                        <h4 className="font-poppins font-semibold text-textPrimary mb-4">Product</h4>
                        <ul className="space-y-3">
                            {footerLinks.product.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-textSecondary hover:text-deepPurple transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h4 className="font-poppins font-semibold text-textPrimary mb-4">Company</h4>
                        <ul className="space-y-3">
                            {footerLinks.company.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-textSecondary hover:text-deepPurple transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support Links */}
                    <div>
                        <h4 className="font-poppins font-semibold text-textPrimary mb-4">Support</h4>
                        <ul className="space-y-3">
                            {footerLinks.support.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-textSecondary hover:text-deepPurple transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Newsletter */}
                <div className="bg-white rounded-2xl p-6 md:p-8 shadow-soft mb-12">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div>
                            <h4 className="font-poppins font-semibold text-lg text-textPrimary">
                                Stay updated with MoonCare
                            </h4>
                            <p className="text-textSecondary">
                                Get wellness tips and early access to new features
                            </p>
                        </div>
                        <form className="flex gap-2 w-full md:w-auto">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 md:w-64 px-4 py-3 rounded-xl border border-lavender-200 focus:outline-none focus:border-deepPurple"
                            />
                            <button type="submit" className="btn-primary whitespace-nowrap">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-lavender-200 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-textSecondary text-sm">
                        © 2026 MoonCare. All rights reserved.
                    </p>
                    <p className="text-textSecondary text-sm flex items-center gap-1">
                        Made with <Heart className="w-4 h-4 text-coral fill-coral" /> for women everywhere
                    </p>
                </div>
            </div>
        </footer>
    );
}
