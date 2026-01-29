"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Moon } from "lucide-react";

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/health-tools", label: "Health Tools" },
    { href: "/how-it-works", label: "How It Works" },
    { href: "/kits", label: "Care Kits" },
    { href: "/pricing", label: "Pricing" },
    { href: "/about", label: "About" },
];

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-lavender-100">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3">
                        <div className="relative">
                            {/* Purple crescent moon */}
                            <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M21 6C15.5 6 11 10.5 11 16C11 21.5 15.5 26 21 26C21.5 26 22 25.95 22.5 25.9C19.5 23.8 17.5 20.2 17.5 16C17.5 11.8 19.5 8.2 22.5 6.1C22 6.05 21.5 6 21 6Z"
                                    fill="#6B5B95"
                                    stroke="#6B5B95"
                                    strokeWidth="0.5" />
                                <circle cx="26" cy="11" r="1.5" fill="#6B5B95" opacity="0.4" />
                                <circle cx="23" cy="8" r="0.8" fill="#6B5B95" opacity="0.3" />
                                <circle cx="28" cy="14" r="1" fill="#6B5B95" opacity="0.3" />
                            </svg>
                            {/* Decorative sparkles */}
                            <span className="absolute -top-1 -right-1 text-coral-400 text-xs animate-pulse-soft">✨</span>
                        </div>
                        <div>
                            <span className="font-poppins font-bold text-xl leading-tight">
                                <span className="text-moonPurple-500">Moon</span>
                                <span className="text-coral-500">Care</span>
                            </span>
                            <div className="h-0.5 w-full bg-gradient-to-r from-moonPurple-500 via-moonPurple-400 to-coral-400 rounded-full mt-0.5"></div>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-textSecondary hover:text-deepPurple transition-colors font-medium"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* CTA Button */}
                    <div className="hidden md:block">
                        <Link href="/kits" className="btn-primary">
                            Get Started
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle menu"
                    >
                        {isOpen ? (
                            <X className="w-6 h-6 text-textPrimary" />
                        ) : (
                            <Menu className="w-6 h-6 text-textPrimary" />
                        )}
                    </button>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden overflow-hidden"
                        >
                            <div className="py-4 space-y-4">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className="block text-textSecondary hover:text-deepPurple transition-colors font-medium py-2"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                                <Link
                                    href="/kits"
                                    className="btn-primary block text-center mt-4"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Get Started
                                </Link>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
        </header>
    );
}
