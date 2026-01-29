"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
    Watch,
    Smartphone,
    Package,
    Activity,
    Brain,
    Heart,
    TrendingUp,
    AlertCircle,
    Frown,
    Clock,
    Sparkles,
    ArrowRight,
    Play
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Animation variants
const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
    visible: { transition: { staggerChildren: 0.15 } },
};

export default function HomePage() {
    return (
        <>
            <Header />
            <main className="pt-16">
                {/* Hero Section */}
                <section className="relative overflow-hidden bg-gradient-hero min-h-[90vh] flex items-center">
                    {/* Background decorations */}
                    <div className="absolute top-20 left-10 w-64 h-64 bg-lavender-300/30 rounded-full blur-3xl" />
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-peach-300/30 rounded-full blur-3xl" />

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={stagger}
                            className="text-center max-w-4xl mx-auto"
                        >
                            <motion.div variants={fadeInUp} className="mb-4">
                                <span className="inline-flex items-center gap-2 bg-white/80 backdrop-blur px-4 py-2 rounded-full text-sm font-medium text-deepPurple">
                                    <Sparkles className="w-4 h-4" />
                                    Trusted by 10,000+ Women
                                </span>
                            </motion.div>

                            <motion.h1
                                variants={fadeInUp}
                                className="font-poppins text-4xl sm:text-5xl lg:text-6xl font-bold text-textPrimary mb-6 leading-tight"
                            >
                                From Calendar Tracking to{" "}
                                <span className="gradient-text">Body Intelligence</span>
                            </motion.h1>

                            <motion.p
                                variants={fadeInUp}
                                className="text-lg sm:text-xl text-textSecondary mb-10 max-w-2xl mx-auto"
                            >
                                Predictive, personalized menstrual care for women with irregular
                                cycles, PCOD & PCOS. Know your body. Prepare in advance.
                            </motion.p>

                            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link href="/kits" className="btn-primary inline-flex items-center justify-center gap-2">
                                    Get Started <ArrowRight className="w-5 h-5" />
                                </Link>
                                <button className="btn-secondary inline-flex items-center justify-center gap-2">
                                    <Play className="w-5 h-5" /> Watch Demo
                                </button>
                            </motion.div>

                            {/* Hero Visual */}
                            <motion.div
                                variants={fadeInUp}
                                className="mt-16 relative"
                            >
                                <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-card max-w-3xl mx-auto">
                                    <div className="grid grid-cols-3 gap-8">
                                        {/* Wearable */}
                                        <div className="text-center">
                                            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-lavender-200 to-lavender-300 rounded-2xl flex items-center justify-center mb-4 animate-float">
                                                <Watch className="w-10 h-10 text-deepPurple" />
                                            </div>
                                            <p className="font-medium text-textPrimary text-sm">Smart Wearable</p>
                                        </div>
                                        {/* App */}
                                        <div className="text-center">
                                            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-peach-200 to-peach-300 rounded-2xl flex items-center justify-center mb-4 animate-float" style={{ animationDelay: '0.5s' }}>
                                                <Smartphone className="w-10 h-10 text-coral" />
                                            </div>
                                            <p className="font-medium text-textPrimary text-sm">AI-Powered App</p>
                                        </div>
                                        {/* Kit */}
                                        <div className="text-center">
                                            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-softpink-200 to-softpink-300 rounded-2xl flex items-center justify-center mb-4 animate-float" style={{ animationDelay: '1s' }}>
                                                <Package className="w-10 h-10 text-deepPurple" />
                                            </div>
                                            <p className="font-medium text-textPrimary text-sm">Care Kits</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </section>

                {/* Problem Statement Section */}
                <section className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={stagger}
                            className="text-center mb-16"
                        >
                            <motion.h2 variants={fadeInUp} className="section-title">
                                The Problem We&apos;re Solving
                            </motion.h2>
                            <motion.p variants={fadeInUp} className="section-subtitle">
                                Millions of women struggle with unpredictable cycles and lack proper care
                            </motion.p>
                        </motion.div>

                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            {/* Statistics */}
                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={stagger}
                                className="space-y-6"
                            >
                                {[
                                    { stat: "70%", label: "of women experience period pain", source: "WHO" },
                                    { stat: "1 in 5", label: "women have PCOS", source: "Medical Research" },
                                    { stat: "10-13%", label: "of reproductive women have PCOD", source: "ICMR" },
                                ].map((item, index) => (
                                    <motion.div
                                        key={index}
                                        variants={fadeInUp}
                                        className="bg-gradient-to-r from-lavender-100 to-peach-100 rounded-2xl p-6 flex items-center gap-6"
                                    >
                                        <div className="text-4xl font-poppins font-bold text-deepPurple">
                                            {item.stat}
                                        </div>
                                        <div>
                                            <p className="text-textPrimary font-medium">{item.label}</p>
                                            <p className="text-textSecondary text-sm">{item.source}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>

                            {/* Pain Points */}
                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={stagger}
                                className="grid grid-cols-2 gap-4"
                            >
                                {[
                                    { icon: Clock, label: "Irregular Cycles", desc: "Never know when it's coming" },
                                    { icon: AlertCircle, label: "Severe Pain", desc: "Disrupts daily life" },
                                    { icon: Frown, label: "Mood Swings", desc: "Emotional symptoms" },
                                    { icon: TrendingUp, label: "No Personalization", desc: "Generic products don't work" },
                                ].map((item, index) => (
                                    <motion.div
                                        key={index}
                                        variants={fadeInUp}
                                        className="card text-center"
                                    >
                                        <div className="w-12 h-12 mx-auto bg-coral/10 rounded-xl flex items-center justify-center mb-4">
                                            <item.icon className="w-6 h-6 text-coral" />
                                        </div>
                                        <h4 className="font-semibold text-textPrimary mb-1">{item.label}</h4>
                                        <p className="text-textSecondary text-sm">{item.desc}</p>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Solution Overview Section */}
                <section className="py-20 bg-gradient-to-b from-cream-100 to-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={stagger}
                            className="text-center mb-16"
                        >
                            <motion.h2 variants={fadeInUp} className="section-title">
                                The MoonCare Solution
                            </motion.h2>
                            <motion.p variants={fadeInUp} className="section-subtitle">
                                Three pillars of predictive, personalized care
                            </motion.p>
                        </motion.div>

                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={stagger}
                            className="grid md:grid-cols-3 gap-8"
                        >
                            {[
                                {
                                    icon: Watch,
                                    title: "Smart Wearable",
                                    subtitle: "Real-time body intelligence",
                                    features: ["Temperature tracking", "Heart rate & HRV", "Sleep analysis", "Activity monitoring"],
                                    color: "lavender",
                                },
                                {
                                    icon: Brain,
                                    title: "AI-Powered App",
                                    subtitle: "Predictive cycle analysis",
                                    features: ["3-5 day advance prediction", "Symptom forecasting", "Pain & mood alerts", "Personalized insights"],
                                    color: "peach",
                                },
                                {
                                    icon: Package,
                                    title: "Personalized Kits",
                                    subtitle: "Day-wise care delivered",
                                    features: ["Customized items", "Based on your symptoms", "Arrives before period", "PCOD/PCOS support"],
                                    color: "softpink",
                                },
                            ].map((item, index) => (
                                <motion.div
                                    key={index}
                                    variants={fadeInUp}
                                    className="bg-white rounded-3xl p-8 shadow-card hover:shadow-hover transition-all duration-300 group"
                                >
                                    <div className={`w-16 h-16 bg-${item.color}-200 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                        <item.icon className="w-8 h-8 text-deepPurple" />
                                    </div>
                                    <h3 className="font-poppins text-xl font-semibold text-textPrimary mb-2">
                                        {item.title}
                                    </h3>
                                    <p className="text-deepPurple font-medium mb-4">{item.subtitle}</p>
                                    <ul className="space-y-2">
                                        {item.features.map((feature, fIndex) => (
                                            <li key={fIndex} className="flex items-center gap-2 text-textSecondary">
                                                <div className="w-1.5 h-1.5 bg-deepPurple rounded-full" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* Impact Stats Section */}
                <section className="py-16 bg-gradient-cta">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={stagger}
                            className="grid md:grid-cols-3 gap-8 text-center text-white"
                        >
                            {[
                                { value: "355M+", label: "Menstruating women in India" },
                                { value: "70M+", label: "Affected by PCOS/PCOD" },
                                { value: "₹30,000Cr+", label: "Market opportunity" },
                            ].map((stat, index) => (
                                <motion.div key={index} variants={fadeInUp}>
                                    <div className="text-4xl md:text-5xl font-poppins font-bold mb-2">
                                        {stat.value}
                                    </div>
                                    <p className="text-white/80">{stat.label}</p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* How It Works Preview */}
                <section className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={stagger}
                            className="text-center mb-16"
                        >
                            <motion.h2 variants={fadeInUp} className="section-title">
                                How It Works
                            </motion.h2>
                            <motion.p variants={fadeInUp} className="section-subtitle">
                                From data to care in 5 simple steps
                            </motion.p>
                        </motion.div>

                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={stagger}
                            className="flex flex-wrap justify-center gap-4 md:gap-0"
                        >
                            {[
                                { step: 1, icon: Activity, label: "Collect", desc: "Wearable sensors track your vitals" },
                                { step: 2, icon: Brain, label: "Analyze", desc: "AI processes patterns" },
                                { step: 3, icon: TrendingUp, label: "Predict", desc: "3-5 day advance alerts" },
                                { step: 4, icon: Package, label: "Prepare", desc: "Kit arrives at your door" },
                                { step: 5, icon: Heart, label: "Care", desc: "Day-wise relief support" },
                            ].map((item, index) => (
                                <motion.div
                                    key={index}
                                    variants={fadeInUp}
                                    className="flex items-center"
                                >
                                    <div className="text-center px-4 py-6">
                                        <div className="w-16 h-16 mx-auto bg-gradient-to-br from-lavender-200 to-peach-200 rounded-2xl flex items-center justify-center mb-4 relative">
                                            <item.icon className="w-8 h-8 text-deepPurple" />
                                            <div className="absolute -top-2 -right-2 w-6 h-6 bg-deepPurple text-white text-xs font-bold rounded-full flex items-center justify-center">
                                                {item.step}
                                            </div>
                                        </div>
                                        <h4 className="font-semibold text-textPrimary mb-1">{item.label}</h4>
                                        <p className="text-textSecondary text-sm max-w-[120px]">{item.desc}</p>
                                    </div>
                                    {index < 4 && (
                                        <div className="hidden md:block w-12 h-0.5 bg-gradient-to-r from-lavender-300 to-peach-300" />
                                    )}
                                </motion.div>
                            ))}
                        </motion.div>

                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeInUp}
                            className="text-center mt-12"
                        >
                            <Link href="/how-it-works" className="btn-primary inline-flex items-center gap-2">
                                Learn More <ArrowRight className="w-5 h-5" />
                            </Link>
                        </motion.div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20 bg-gradient-to-br from-lavender-100 via-peach-100 to-softpink-100">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={stagger}
                        >
                            <motion.h2 variants={fadeInUp} className="section-title mb-6">
                                Ready to Transform Your Cycle Care?
                            </motion.h2>
                            <motion.p variants={fadeInUp} className="section-subtitle mb-10">
                                Join thousands of women who&apos;ve moved from surprise to prepared.
                                Get your personalized care kit today.
                            </motion.p>
                            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link href="/kits" className="btn-primary inline-flex items-center justify-center gap-2">
                                    Find Your Kit <ArrowRight className="w-5 h-5" />
                                </Link>
                                <Link href="/pricing" className="btn-secondary">
                                    View Pricing
                                </Link>
                            </motion.div>
                        </motion.div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
