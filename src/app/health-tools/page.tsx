"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
    Calendar,
    Heart,
    Brain,
    Stethoscope,
    Scan,
    UtensilsCrossed,
    TrendingUp,
    Activity,
    Sparkles,
    ArrowRight,
    Clock,
    Target,
    LineChart,
    Pill,
    Moon,
    Sun,
    Droplet,
    HeartPulse,
    Star
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
    visible: { transition: { staggerChildren: 0.1 } },
};

const healthTools = [
    {
        id: "track-health",
        icon: Activity,
        title: "Track Your Health",
        description: "Monitor your daily health stats and patterns",
        features: [
            "Period cycle tracking",
            "Symptom logging",
            "Mood tracking",
            "Energy level monitoring",
            "Pain intensity tracker"
        ],
        color: "from-pink-400 to-rose-500",
        bgColor: "bg-pink-50",
        link: "/health-tools/track"
    },
    {
        id: "ovulation-calculator",
        icon: Calendar,
        title: "Ovulation Calculator",
        description: "Predict your ovulation and fertile days",
        features: [
            "Accurate cycle prediction",
            "Fertile window calculation",
            "Conception probability",
            "Safe days tracker",
            "Personalized insights"
        ],
        color: "from-purple-400 to-pink-500",
        bgColor: "bg-purple-50",
        link: "/health-tools/ovulation"
    },
    {
        id: "pcos-diagnosis",
        icon: Scan,
        title: "PCOS Diagnosis",
        description: "Get AI-assisted PCOS screening insights",
        features: [
            "Symptom analysis",
            "Risk assessment",
            "AI-powered screening",
            "Lifestyle recommendations",
            "Medical guidance"
        ],
        color: "from-violet-400 to-purple-500",
        bgColor: "bg-violet-50",
        link: "/health-tools/pcos-screening"
    },
    {
        id: "expert-consultation",
        icon: Stethoscope,
        title: "Expert Consultation",
        description: "Book sessions with certified health experts",
        features: [
            "Gynecologists",
            "Nutritionists",
            "Mental health counselors",
            "Fitness coaches",
            "Ayurvedic practitioners"
        ],
        color: "from-blue-400 to-indigo-500",
        bgColor: "bg-blue-50",
        link: "/health-tools/consultation"
    },
    {
        id: "healthlens",
        icon: Brain,
        title: "HealthLens",
        description: "Get detailed AI-powered health assessments",
        features: [
            "Pattern recognition",
            "Predictive analytics",
            "Personalized insights",
            "Health score tracking",
            "Smart recommendations"
        ],
        color: "from-cyan-400 to-blue-500",
        bgColor: "bg-cyan-50",
        link: "/health-tools/healthlens"
    },
    {
        id: "voice-assistant",
        icon: Brain,
        title: "Voice Assistant - Luna",
        description: "Talk with AI assistant about your health",
        features: [
            "Natural conversation",
            "Personalized based on your data",
            "Real-time voice interaction",
            "Doubt clearing",
            "Evidence-based advice"
        ],
        color: "from-indigo-400 to-purple-500",
        bgColor: "bg-indigo-50",
        link: "/health-tools/voice-assistant"
    },
    {
        id: "diet-plan",
        icon: UtensilsCrossed,
        title: "Diet Plan",
        description: "Personalized meal and nutrition plans",
        features: [
            "Cycle-based nutrition",
            "PCOS-friendly meals",
            "Macro tracking",
            "Meal scheduling",
            "Shopping lists"
        ],
        color: "from-green-400 to-emerald-500",
        bgColor: "bg-green-50",
        link: "/health-tools/diet-plan"
    }
];

const aiFeatures = [
    {
        icon: Brain,
        title: "Predictive AI",
        description: "Forecast your cycle 3-5 days in advance"
    },
    {
        icon: Target,
        title: "Personalization",
        description: "Tailored insights based on your unique patterns"
    },
    {
        icon: LineChart,
        title: "Smart Analytics",
        description: "Advanced tracking and trend analysis"
    },
    {
        icon: Sparkles,
        title: "Intelligent Insights",
        description: "AI-driven health recommendations"
    }
];

export default function HealthToolsPage() {
    return (
        <>
            <Header />
            <main className="pt-16">
                {/* Hero Section */}
                <section className="relative overflow-hidden bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 py-20">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300/20 rounded-full blur-3xl" />
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-300/20 rounded-full blur-3xl" />

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={stagger}
                            className="text-center max-w-4xl mx-auto"
                        >
                            <motion.div variants={fadeInUp} className="mb-4">
                                <span className="inline-flex items-center gap-2 bg-white/80 backdrop-blur px-4 py-2 rounded-full text-sm font-medium text-deepPurple">
                                    <Sparkles className="w-4 h-4" />
                                    AI-Powered Health Tools
                                </span>
                            </motion.div>

                            <motion.h1
                                variants={fadeInUp}
                                className="font-poppins text-4xl sm:text-5xl lg:text-6xl font-bold text-textPrimary mb-6 leading-tight"
                            >
                                Your Complete{" "}
                                <span className="gradient-text">Health Companion</span>
                            </motion.h1>

                            <motion.p
                                variants={fadeInUp}
                                className="text-lg sm:text-xl text-textSecondary mb-10 max-w-3xl mx-auto"
                            >
                                Track, predict, and optimize your wellness with our comprehensive
                                suite of AI-powered health tools designed specifically for women.
                            </motion.p>
                        </motion.div>
                    </div>
                </section>

                {/* Health Tools Grid */}
                <section className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={stagger}
                            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            {healthTools.map((tool, index) => (
                                <motion.div
                                    key={tool.id}
                                    variants={fadeInUp}
                                    className="group"
                                >
                                    <Link href={tool.link}>
                                        <div className="h-full bg-white rounded-3xl p-8 shadow-card hover:shadow-hover transition-all duration-300 border border-gray-100 hover:border-purple-200">
                                            <div className={`w-16 h-16 bg-gradient-to-br ${tool.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                                                <tool.icon className="w-8 h-8 text-white" />
                                            </div>

                                            <h3 className="font-poppins text-2xl font-semibold text-textPrimary mb-3">
                                                {tool.title}
                                            </h3>

                                            <p className="text-textSecondary mb-6">
                                                {tool.description}
                                            </p>

                                            <ul className="space-y-2 mb-6">
                                                {tool.features.map((feature, fIndex) => (
                                                    <li key={fIndex} className="flex items-center gap-2 text-sm text-textSecondary">
                                                        <div className="w-1.5 h-1.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
                                                        {feature}
                                                    </li>
                                                ))}
                                            </ul>

                                            <div className="flex items-center gap-2 text-purple-600 font-medium group-hover:gap-3 transition-all">
                                                Explore Tool <ArrowRight className="w-4 h-4" />
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* AI Features Section */}
                <section className="py-20 bg-gradient-to-br from-purple-900 via-purple-800 to-pink-900 text-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={stagger}
                            className="text-center mb-16"
                        >
                            <motion.h2 variants={fadeInUp} className="font-poppins text-3xl sm:text-4xl font-bold mb-6">
                                Powered by Advanced AI
                            </motion.h2>
                            <motion.p variants={fadeInUp} className="text-xl text-purple-100 max-w-2xl mx-auto">
                                Our intelligent algorithms learn from your data to provide
                                personalized insights and predictions
                            </motion.p>
                        </motion.div>

                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={stagger}
                            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
                        >
                            {aiFeatures.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    variants={fadeInUp}
                                    className="text-center"
                                >
                                    <div className="w-16 h-16 mx-auto bg-white/10 backdrop-blur rounded-2xl flex items-center justify-center mb-4">
                                        <feature.icon className="w-8 h-8 text-purple-200" />
                                    </div>
                                    <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                                    <p className="text-purple-200 text-sm">{feature.description}</p>
                                </motion.div>
                            ))}
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
                                Start Your Health Journey Today
                            </motion.h2>
                            <motion.p variants={fadeInUp} className="section-subtitle mb-10">
                                Join thousands of women who are taking control of their health
                                with our AI-powered tools
                            </motion.p>
                            <motion.div variants={fadeInUp}>
                                <Link href="/health-tools/track" className="btn-primary inline-flex items-center gap-2">
                                    Get Started <ArrowRight className="w-5 h-5" />
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
