"use client";

import { motion } from "framer-motion";
import {
    Activity,
    Brain,
    TrendingUp,
    Package,
    Heart,
    Thermometer,
    HeartPulse,
    Moon,
    Footprints,
    Zap,
    ChevronDown,
    Check,
    ArrowRight
} from "lucide-react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";

const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
    visible: { transition: { staggerChildren: 0.15 } },
};

const steps = [
    {
        id: 1,
        icon: Activity,
        title: "COLLECT",
        subtitle: "Wearable sensors track your body signals",
        details: ["Temperature changes", "Heart Rate Variability", "Sleep patterns", "Activity levels"],
        color: "bg-lavender-200",
        textColor: "text-deepPurple",
    },
    {
        id: 2,
        icon: Brain,
        title: "ANALYZE",
        subtitle: "AI processes patterns & hormonal signals",
        details: ["Multi-parameter fusion", "Pattern recognition", "Anomaly detection", "Personalized baselines"],
        color: "bg-peach-200",
        textColor: "text-coral",
    },
    {
        id: 3,
        icon: TrendingUp,
        title: "PREDICT",
        subtitle: "3-5 day advance period prediction",
        details: ["Next period date", "Pain probability", "Mood forecast", "Flow intensity"],
        color: "bg-softpink-200",
        textColor: "text-deepPurple",
    },
    {
        id: 4,
        icon: Package,
        title: "PREPARE",
        subtitle: "Customized kit arrives at your door",
        details: ["Symptom-based items", "Flow-appropriate products", "Comfort essentials", "Wellness additions"],
        color: "bg-sage/30",
        textColor: "text-sage",
    },
    {
        id: 5,
        icon: Heart,
        title: "CARE",
        subtitle: "Day-wise relief & wellness support",
        details: ["Daily guidance", "Pain management", "Mood support", "Progress tracking"],
        color: "bg-lavender-200",
        textColor: "text-deepPurple",
    },
];

const techDetails = [
    {
        title: "How Wearable Sensors Work",
        content: [
            { icon: Thermometer, label: "DS18B20 Temperature Sensor", desc: "Tracks basal body temperature with ±0.1°C accuracy to detect ovulation and predict menstruation" },
            { icon: HeartPulse, label: "MAX30102 PPG Sensor", desc: "Measures heart rate and HRV (Heart Rate Variability) to detect hormonal changes and stress levels" },
            { icon: Moon, label: "MPU6050 Motion Sensor", desc: "Monitors sleep quality and activity patterns that correlate with cycle phases" },
        ]
    },
    {
        title: "AI Prediction Engine",
        content: [
            { icon: Zap, label: "Multi-Parameter Fusion", desc: "Combines temperature, HRV, sleep, and activity data for accurate predictions" },
            { icon: Brain, label: "Machine Learning Models", desc: "Continuously learns from your unique patterns to improve accuracy over time" },
            { icon: TrendingUp, label: "PCOS/PCOD Detection", desc: "Identifies irregular patterns that may indicate hormonal conditions" },
        ]
    },
    {
        title: "Kit Customization Logic",
        content: [
            { icon: Activity, label: "Symptom Analysis", desc: "Your pain levels, mood symptoms, and flow type determine kit contents" },
            { icon: Package, label: "Flow Assessment", desc: "Light, medium, or heavy flow gets appropriate absorbency products" },
            { icon: Heart, label: "PCOD/PCOS Support", desc: "Special items for managing inflammation and hormonal balance" },
        ]
    },
];

export default function HowItWorksPage() {
    const [openAccordion, setOpenAccordion] = useState<number | null>(0);

    return (
        <>
            <Header />
            <main className="pt-16">
                {/* Hero Section */}
                <section className="bg-gradient-hero py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={stagger}
                        >
                            <motion.h1
                                variants={fadeInUp}
                                className="font-poppins text-4xl md:text-5xl font-bold text-textPrimary mb-6"
                            >
                                How MoonCare Works
                            </motion.h1>
                            <motion.p
                                variants={fadeInUp}
                                className="text-xl text-textSecondary max-w-2xl mx-auto"
                            >
                                From body signals to personalized care — our intelligent system
                                transforms how you experience your menstrual cycle
                            </motion.p>
                        </motion.div>
                    </div>
                </section>

                {/* Data Flow Visualization */}
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
                                The 5-Step Journey
                            </motion.h2>
                            <motion.p variants={fadeInUp} className="section-subtitle">
                                From data collection to personalized care delivery
                            </motion.p>
                        </motion.div>

                        {/* Steps Timeline */}
                        <div className="relative">
                            {/* Connection Line */}
                            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-lavender-200 via-peach-200 to-lavender-200 -translate-y-1/2" />

                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={stagger}
                                className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8"
                            >
                                {steps.map((step, index) => (
                                    <motion.div
                                        key={step.id}
                                        variants={fadeInUp}
                                        className="relative"
                                    >
                                        <div className="bg-white rounded-3xl p-6 shadow-card hover:shadow-hover transition-all duration-300 text-center relative z-10">
                                            {/* Step Number */}
                                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-deepPurple text-white rounded-full flex items-center justify-center font-bold text-sm">
                                                {step.id}
                                            </div>

                                            {/* Icon */}
                                            <div className={`w-16 h-16 mx-auto ${step.color} rounded-2xl flex items-center justify-center mb-4 mt-4`}>
                                                <step.icon className={`w-8 h-8 ${step.textColor}`} />
                                            </div>

                                            {/* Title */}
                                            <h3 className="font-poppins font-bold text-xl text-textPrimary mb-2">
                                                {step.title}
                                            </h3>
                                            <p className="text-textSecondary text-sm mb-4">
                                                {step.subtitle}
                                            </p>

                                            {/* Details */}
                                            <ul className="text-left space-y-2">
                                                {step.details.map((detail, dIndex) => (
                                                    <li key={dIndex} className="flex items-center gap-2 text-sm text-textSecondary">
                                                        <Check className="w-4 h-4 text-sage flex-shrink-0" />
                                                        {detail}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        {/* Arrow for mobile */}
                                        {index < steps.length - 1 && (
                                            <div className="lg:hidden flex justify-center my-4">
                                                <div className="w-0.5 h-8 bg-gradient-to-b from-lavender-300 to-peach-300" />
                                            </div>
                                        )}
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Technology Deep Dive */}
                <section className="py-20 bg-gradient-to-b from-cream-100 to-white">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={stagger}
                            className="text-center mb-16"
                        >
                            <motion.h2 variants={fadeInUp} className="section-title">
                                Technology Deep Dive
                            </motion.h2>
                            <motion.p variants={fadeInUp} className="section-subtitle">
                                The science and technology powering MoonCare
                            </motion.p>
                        </motion.div>

                        {/* Accordion */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={stagger}
                            className="space-y-4"
                        >
                            {techDetails.map((section, index) => (
                                <motion.div
                                    key={index}
                                    variants={fadeInUp}
                                    className="bg-white rounded-2xl shadow-soft overflow-hidden"
                                >
                                    <button
                                        onClick={() => setOpenAccordion(openAccordion === index ? null : index)}
                                        className="w-full px-6 py-5 flex items-center justify-between text-left"
                                    >
                                        <h3 className="font-poppins font-semibold text-lg text-textPrimary">
                                            {section.title}
                                        </h3>
                                        <ChevronDown
                                            className={`w-5 h-5 text-deepPurple transition-transform ${openAccordion === index ? "rotate-180" : ""
                                                }`}
                                        />
                                    </button>

                                    {openAccordion === index && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="px-6 pb-6"
                                        >
                                            <div className="space-y-4 pt-2 border-t border-lavender-100">
                                                {section.content.map((item, iIndex) => (
                                                    <div key={iIndex} className="flex gap-4 pt-4">
                                                        <div className="w-12 h-12 bg-lavender-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                                            <item.icon className="w-6 h-6 text-deepPurple" />
                                                        </div>
                                                        <div>
                                                            <h4 className="font-semibold text-textPrimary mb-1">
                                                                {item.label}
                                                            </h4>
                                                            <p className="text-textSecondary text-sm">
                                                                {item.desc}
                                                            </p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* Wearable Specs */}
                <section className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={stagger}
                            >
                                <motion.h2 variants={fadeInUp} className="section-title">
                                    MoonCare Wearable
                                </motion.h2>
                                <motion.p variants={fadeInUp} className="text-textSecondary mb-8">
                                    Our lightweight, comfortable wearable tracks the vital signs
                                    that traditional apps can&apos;t detect. Wear it day and night for
                                    the most accurate predictions.
                                </motion.p>

                                <motion.div variants={fadeInUp} className="grid grid-cols-2 gap-4 mb-8">
                                    {[
                                        { label: "Battery Life", value: "5-7 days" },
                                        { label: "Weight", value: "< 50g" },
                                        { label: "Water Resistance", value: "IP67" },
                                        { label: "Connectivity", value: "BLE 5.0" },
                                    ].map((spec, index) => (
                                        <div key={index} className="bg-lavender-100 rounded-xl p-4">
                                            <p className="text-textSecondary text-sm">{spec.label}</p>
                                            <p className="font-poppins font-bold text-deepPurple text-lg">{spec.value}</p>
                                        </div>
                                    ))}
                                </motion.div>

                                <motion.div variants={fadeInUp}>
                                    <Link href="/pricing" className="btn-primary inline-flex items-center gap-2">
                                        Get Your Wearable <ArrowRight className="w-5 h-5" />
                                    </Link>
                                </motion.div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                className="relative"
                            >
                                <div className="bg-gradient-to-br from-lavender-100 to-peach-100 rounded-3xl p-12 flex items-center justify-center">
                                    <div className="w-64 h-64 bg-white rounded-full shadow-card flex items-center justify-center animate-float">
                                        <div className="w-48 h-48 bg-gradient-cta rounded-full flex items-center justify-center">
                                            <Footprints className="w-24 h-24 text-white" />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20 bg-gradient-cta">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={stagger}
                        >
                            <motion.h2 variants={fadeInUp} className="font-poppins text-3xl md:text-4xl font-bold mb-6">
                                Ready to Experience Predictive Care?
                            </motion.h2>
                            <motion.p variants={fadeInUp} className="text-white/80 text-lg mb-10">
                                Get your personalized care kit and smart wearable today
                            </motion.p>
                            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    href="/kits"
                                    className="bg-white text-deepPurple font-semibold py-3 px-8 rounded-xl hover:bg-cream-100 transition-colors inline-flex items-center justify-center gap-2"
                                >
                                    Find Your Kit <ArrowRight className="w-5 h-5" />
                                </Link>
                                <Link
                                    href="/pricing"
                                    className="border-2 border-white text-white font-semibold py-3 px-8 rounded-xl hover:bg-white/10 transition-colors"
                                >
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
