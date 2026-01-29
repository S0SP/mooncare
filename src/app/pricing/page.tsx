"use client";

import { motion } from "framer-motion";
import {
    Check,
    X,
    Sparkles,
    Watch,
    Package,
    Crown,
    ArrowRight,
    Calculator
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

const kitPlans = [
    {
        name: "Basic",
        price: 549,
        period: "month",
        description: "Essential period care",
        features: [
            { text: "Standard pads & liners", included: true },
            { text: "Disposal bags", included: true },
            { text: "Basic hygiene items", included: true },
            { text: "Heat patches", included: false },
            { text: "Wellness items", included: false },
            { text: "PCOS support items", included: false },
        ],
        cta: "Start Basic",
        popular: false,
    },
    {
        name: "Standard",
        price: 749,
        period: "month",
        description: "Pain relief focused",
        features: [
            { text: "Standard pads & liners", included: true },
            { text: "Disposal bags", included: true },
            { text: "Basic hygiene items", included: true },
            { text: "Heat patches (3)", included: true },
            { text: "Pain relief roll-on", included: true },
            { text: "PCOS support items", included: false },
        ],
        cta: "Start Standard",
        popular: true,
    },
    {
        name: "Premium",
        price: 899,
        period: "month",
        description: "Complete wellness care",
        features: [
            { text: "Premium pads & liners", included: true },
            { text: "Disposal bags", included: true },
            { text: "Hygiene & comfort items", included: true },
            { text: "Heat patches (5)", included: true },
            { text: "Full wellness kit", included: true },
            { text: "PCOS support items", included: false },
        ],
        cta: "Start Premium",
        popular: false,
    },
    {
        name: "PCOS Care",
        price: 1049,
        period: "month",
        description: "Specialized PCOS support",
        features: [
            { text: "Premium pads & liners", included: true },
            { text: "Disposal bags", included: true },
            { text: "Hygiene & comfort items", included: true },
            { text: "Heat patches (5)", included: true },
            { text: "Full wellness kit", included: true },
            { text: "PCOS support items", included: true },
        ],
        cta: "Start PCOS Care",
        popular: false,
    },
];

export default function PricingPage() {
    const [isAnnual, setIsAnnual] = useState(false);
    const [calculatorValues, setCalculatorValues] = useState({
        pads: 300,
        medication: 200,
        doctor: 500,
    });

    const calculateSavings = () => {
        const traditional = calculatorValues.pads + calculatorValues.medication + calculatorValues.doctor;
        const mooncare = 749; // Standard plan
        return {
            traditional,
            mooncare,
            savings: Math.max(0, traditional - mooncare),
        };
    };

    const savings = calculateSavings();

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
                                Simple, Transparent Pricing
                            </motion.h1>
                            <motion.p
                                variants={fadeInUp}
                                className="text-xl text-textSecondary max-w-2xl mx-auto mb-8"
                            >
                                Choose the care level that fits your needs. All plans include
                                free delivery and easy customization.
                            </motion.p>

                            {/* Billing Toggle */}
                            <motion.div variants={fadeInUp} className="inline-flex items-center gap-4 bg-white rounded-full p-2 shadow-soft">
                                <button
                                    onClick={() => setIsAnnual(false)}
                                    className={`px-6 py-2 rounded-full font-medium transition-all ${!isAnnual ? "bg-deepPurple text-white" : "text-textSecondary"
                                        }`}
                                >
                                    Monthly
                                </button>
                                <button
                                    onClick={() => setIsAnnual(true)}
                                    className={`px-6 py-2 rounded-full font-medium transition-all ${isAnnual ? "bg-deepPurple text-white" : "text-textSecondary"
                                        }`}
                                >
                                    Annual <span className="text-sage">Save 20%</span>
                                </button>
                            </motion.div>
                        </motion.div>
                    </div>
                </section>

                {/* Wearable Section */}
                <section className="py-16 bg-white border-b border-lavender-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={stagger}
                            className="bg-gradient-to-r from-lavender-100 to-peach-100 rounded-3xl p-8 md:p-12"
                        >
                            <div className="flex flex-col md:flex-row items-center gap-8">
                                <div className="w-24 h-24 bg-white rounded-2xl shadow-card flex items-center justify-center flex-shrink-0">
                                    <Watch className="w-12 h-12 text-deepPurple" />
                                </div>
                                <div className="flex-1 text-center md:text-left">
                                    <motion.h2 variants={fadeInUp} className="font-poppins text-2xl md:text-3xl font-bold text-textPrimary mb-2">
                                        MoonCare Smart Wearable
                                    </motion.h2>
                                    <motion.p variants={fadeInUp} className="text-textSecondary mb-4">
                                        Required for AI-powered predictions. One-time purchase.
                                    </motion.p>
                                    <motion.div variants={fadeInUp} className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                                        <span className="text-textLight line-through text-xl">₹2,499</span>
                                        <span className="text-4xl font-poppins font-bold text-deepPurple">₹1,200</span>
                                        <span className="bg-coral text-white text-sm font-semibold px-3 py-1 rounded-full">
                                            Launch Offer
                                        </span>
                                    </motion.div>
                                </div>
                                <div className="flex-shrink-0">
                                    <Link href="/kits" className="btn-primary inline-flex items-center gap-2">
                                        Get Wearable <ArrowRight className="w-5 h-5" />
                                    </Link>
                                </div>
                            </div>

                            <motion.div variants={fadeInUp} className="mt-8 pt-8 border-t border-lavender-200">
                                <p className="text-center text-textSecondary mb-4">Includes with your wearable:</p>
                                <div className="flex flex-wrap justify-center gap-6">
                                    {["Smart wearable device", "Charging cable", "1 free care kit", "App access", "30-day battery"].map((item, index) => (
                                        <div key={index} className="flex items-center gap-2 text-textPrimary">
                                            <Check className="w-5 h-5 text-sage" />
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </section>

                {/* Kit Plans */}
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
                                Monthly Care Kit Subscriptions
                            </motion.h2>
                            <motion.p variants={fadeInUp} className="section-subtitle">
                                Personalized kits delivered before every cycle
                            </motion.p>
                        </motion.div>

                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={stagger}
                            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
                        >
                            {kitPlans.map((plan, index) => {
                                const price = isAnnual ? Math.round(plan.price * 0.8) : plan.price;

                                return (
                                    <motion.div
                                        key={index}
                                        variants={fadeInUp}
                                        className={`relative bg-white rounded-3xl p-6 shadow-card hover:shadow-hover transition-all duration-300 ${plan.popular ? "ring-2 ring-deepPurple" : ""
                                            }`}
                                    >
                                        {plan.popular && (
                                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-deepPurple text-white text-xs font-semibold px-4 py-1 rounded-full flex items-center gap-1">
                                                <Crown className="w-3 h-3" /> Most Popular
                                            </div>
                                        )}

                                        <div className="text-center mb-6 pt-4">
                                            <h3 className="font-poppins text-xl font-semibold text-textPrimary mb-1">
                                                {plan.name}
                                            </h3>
                                            <p className="text-textSecondary text-sm mb-4">{plan.description}</p>
                                            <div className="text-4xl font-poppins font-bold text-deepPurple">
                                                ₹{price}
                                                <span className="text-sm text-textSecondary font-normal">/{plan.period}</span>
                                            </div>
                                            {isAnnual && (
                                                <p className="text-sage text-sm mt-1">Save ₹{(plan.price - price) * 12}/year</p>
                                            )}
                                        </div>

                                        <ul className="space-y-3 mb-6">
                                            {plan.features.map((feature, fIndex) => (
                                                <li key={fIndex} className="flex items-start gap-2">
                                                    {feature.included ? (
                                                        <Check className="w-5 h-5 text-sage flex-shrink-0" />
                                                    ) : (
                                                        <X className="w-5 h-5 text-textLight flex-shrink-0" />
                                                    )}
                                                    <span className={feature.included ? "text-textSecondary" : "text-textLight"}>
                                                        {feature.text}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>

                                        <button className={`w-full py-3 rounded-xl font-semibold transition-all ${plan.popular
                                                ? "bg-deepPurple text-white hover:bg-deepPurple/90"
                                                : "bg-lavender-100 text-deepPurple hover:bg-lavender-200"
                                            }`}>
                                            {plan.cta}
                                        </button>
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    </div>
                </section>

                {/* Value Calculator */}
                <section className="py-20 bg-gradient-to-b from-cream-100 to-white">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={stagger}
                            className="text-center mb-12"
                        >
                            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 bg-deepPurple/10 text-deepPurple px-4 py-2 rounded-full mb-4">
                                <Calculator className="w-5 h-5" />
                                Value Calculator
                            </motion.div>
                            <motion.h2 variants={fadeInUp} className="section-title">
                                How Much Could You Save?
                            </motion.h2>
                            <motion.p variants={fadeInUp} className="section-subtitle">
                                Compare your current spending with MoonCare
                            </motion.p>
                        </motion.div>

                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeInUp}
                            className="bg-white rounded-3xl p-8 shadow-card"
                        >
                            <div className="grid md:grid-cols-3 gap-6 mb-8">
                                <div>
                                    <label className="block text-textSecondary text-sm mb-2">
                                        Monthly pads/tampons spend
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-textSecondary">₹</span>
                                        <input
                                            type="number"
                                            value={calculatorValues.pads}
                                            onChange={(e) => setCalculatorValues({ ...calculatorValues, pads: Number(e.target.value) })}
                                            className="w-full pl-8 pr-4 py-3 rounded-xl border border-lavender-200 focus:outline-none focus:border-deepPurple"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-textSecondary text-sm mb-2">
                                        Pain medication costs
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-textSecondary">₹</span>
                                        <input
                                            type="number"
                                            value={calculatorValues.medication}
                                            onChange={(e) => setCalculatorValues({ ...calculatorValues, medication: Number(e.target.value) })}
                                            className="w-full pl-8 pr-4 py-3 rounded-xl border border-lavender-200 focus:outline-none focus:border-deepPurple"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-textSecondary text-sm mb-2">
                                        Monthly doctor visits
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-textSecondary">₹</span>
                                        <input
                                            type="number"
                                            value={calculatorValues.doctor}
                                            onChange={(e) => setCalculatorValues({ ...calculatorValues, doctor: Number(e.target.value) })}
                                            className="w-full pl-8 pr-4 py-3 rounded-xl border border-lavender-200 focus:outline-none focus:border-deepPurple"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-3 gap-6 pt-8 border-t border-lavender-100">
                                <div className="text-center p-4 bg-coral/10 rounded-xl">
                                    <p className="text-textSecondary text-sm mb-1">Traditional Care</p>
                                    <p className="text-2xl font-poppins font-bold text-coral">₹{savings.traditional}/mo</p>
                                </div>
                                <div className="text-center p-4 bg-sage/20 rounded-xl">
                                    <p className="text-textSecondary text-sm mb-1">MoonCare Standard</p>
                                    <p className="text-2xl font-poppins font-bold text-sage">₹{savings.mooncare}/mo</p>
                                </div>
                                <div className="text-center p-4 bg-deepPurple/10 rounded-xl">
                                    <p className="text-textSecondary text-sm mb-1">Your Savings</p>
                                    <p className="text-2xl font-poppins font-bold text-deepPurple">₹{savings.savings}/mo</p>
                                </div>
                            </div>

                            <p className="text-center text-textSecondary text-sm mt-6">
                                Plus: Peace of mind, prediction accuracy, and personalized care — priceless! ✨
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="py-20 bg-white">
                    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={stagger}
                            className="text-center mb-12"
                        >
                            <motion.h2 variants={fadeInUp} className="section-title">
                                Frequently Asked Questions
                            </motion.h2>
                        </motion.div>

                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={stagger}
                            className="space-y-4"
                        >
                            {[
                                {
                                    q: "Do I need the wearable for the kits?",
                                    a: "No! You can subscribe to kits without the wearable. However, the wearable enables AI-powered predictions for when to deliver your kit.",
                                },
                                {
                                    q: "Can I change my kit type each month?",
                                    a: "Yes, you can customize your kit before each delivery based on your symptoms that month.",
                                },
                                {
                                    q: "Is there a commitment period?",
                                    a: "No lock-in! Cancel or pause your subscription anytime with no penalties.",
                                },
                                {
                                    q: "How does delivery work?",
                                    a: "Your kit arrives 3-5 days before your predicted period. We use discreet packaging.",
                                },
                            ].map((faq, index) => (
                                <motion.div
                                    key={index}
                                    variants={fadeInUp}
                                    className="bg-cream-100 rounded-2xl p-6"
                                >
                                    <h4 className="font-semibold text-textPrimary mb-2">{faq.q}</h4>
                                    <p className="text-textSecondary">{faq.a}</p>
                                </motion.div>
                            ))}
                        </motion.div>
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
                                Start Your MoonCare Journey Today
                            </motion.h2>
                            <motion.p variants={fadeInUp} className="text-white/80 text-lg mb-10">
                                Join thousands of women experiencing smarter, personalized period care
                            </motion.p>
                            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    href="/kits"
                                    className="bg-white text-deepPurple font-semibold py-3 px-8 rounded-xl hover:bg-cream-100 transition-colors inline-flex items-center justify-center gap-2"
                                >
                                    <Sparkles className="w-5 h-5" />
                                    Find Your Perfect Kit
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
