"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
    Calendar,
    Heart,
    Activity,
    TrendingUp,
    Info,
    CheckCircle,
    AlertCircle,
    Sparkles,
    Clock
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

export default function OvulationCalculatorPage() {
    const [lastPeriodDate, setLastPeriodDate] = useState("");
    const [cycleLength, setCycleLength] = useState(28);
    const [periodDuration, setPeriodDuration] = useState(5);
    const [showResults, setShowResults] = useState(false);

    const calculateOvulation = () => {
        if (!lastPeriodDate) {
            alert("Please enter your last period date");
            return;
        }
        setShowResults(true);
    };

    const getOvulationDate = () => {
        if (!lastPeriodDate) return null;
        const date = new Date(lastPeriodDate);
        date.setDate(date.getDate() + 14);
        return date;
    };

    const getFertileWindowStart = () => {
        if (!lastPeriodDate) return null;
        const date = new Date(lastPeriodDate);
        date.setDate(date.getDate() + 10);
        return date;
    };

    const getFertileWindowEnd = () => {
        if (!lastPeriodDate) return null;
        const date = new Date(lastPeriodDate);
        date.setDate(date.getDate() + 17);
        return date;
    };

    const getNextPeriodDate = () => {
        if (!lastPeriodDate) return null;
        const date = new Date(lastPeriodDate);
        date.setDate(date.getDate() + cycleLength);
        return date;
    };

    const formatDate = (date: Date | null) => {
        if (!date) return "N/A";
        return date.toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric"
        });
    };

    return (
        <>
            <Header />
            <main className="pt-16 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 min-h-screen">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    {/* Header */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={stagger}
                        className="text-center mb-12"
                    >
                        <motion.div variants={fadeInUp} className="mb-4">
                            <span className="inline-flex items-center gap-2 bg-white/80 backdrop-blur px-4 py-2 rounded-full text-sm font-medium text-deepPurple">
                                <Calendar className="w-4 h-4" />
                                Fertility Tracking
                            </span>
                        </motion.div>
                        <motion.h1
                            variants={fadeInUp}
                            className="font-poppins text-4xl sm:text-5xl font-bold text-textPrimary mb-4"
                        >
                            Ovulation <span className="gradient-text">Calculator</span>
                        </motion.h1>
                        <motion.p variants={fadeInUp} className="text-lg text-textSecondary max-w-2xl mx-auto">
                            Predict your ovulation and fertile days with precision
                        </motion.p>
                    </motion.div>

                    <div className="grid lg:grid-cols-2 gap-8">
                        {/* Input Form */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-white rounded-3xl p-8 shadow-card space-y-6"
                        >
                            <h3 className="font-poppins text-2xl font-semibold text-textPrimary mb-6">
                                Enter Your Details
                            </h3>

                            {/* Last Period Date */}
                            <div>
                                <label className="block text-sm font-medium text-textPrimary mb-2">
                                    First Day of Last Period
                                </label>
                                <input
                                    type="date"
                                    value={lastPeriodDate}
                                    onChange={(e) => setLastPeriodDate(e.target.value)}
                                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                                />
                            </div>

                            {/* Cycle Length */}
                            <div>
                                <label className="block text-sm font-medium text-textPrimary mb-2">
                                    Average Cycle Length: {cycleLength} days
                                </label>
                                <input
                                    type="range"
                                    min="21"
                                    max="35"
                                    value={cycleLength}
                                    onChange={(e) => setCycleLength(Number(e.target.value))}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-500"
                                />
                                <div className="flex justify-between text-xs text-textSecondary mt-1">
                                    <span>21 days</span>
                                    <span>35 days</span>
                                </div>
                            </div>

                            {/* Period Duration */}
                            <div>
                                <label className="block text-sm font-medium text-textPrimary mb-2">
                                    Period Duration: {periodDuration} days
                                </label>
                                <input
                                    type="range"
                                    min="3"
                                    max="7"
                                    value={periodDuration}
                                    onChange={(e) => setPeriodDuration(Number(e.target.value))}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-pink-500"
                                />
                                <div className="flex justify-between text-xs text-textSecondary mt-1">
                                    <span>3 days</span>
                                    <span>7 days</span>
                                </div>
                            </div>

                            <button
                                onClick={calculateOvulation}
                                className="w-full btn-primary flex items-center justify-center gap-2 py-4 mt-6"
                            >
                                <TrendingUp className="w-5 h-5" />
                                Calculate Ovulation
                            </button>

                            {/* Info Box */}
                            <div className="bg-blue-50 rounded-xl p-4 flex gap-3">
                                <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                                <div className="text-sm text-blue-900">
                                    <p className="font-medium mb-1">How it works</p>
                                    <p className="text-blue-700">
                                        Ovulation typically occurs 14 days before your next period.
                                        Your fertile window is 5 days before and 1 day after ovulation.
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Results */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="space-y-6"
                        >
                            {showResults && lastPeriodDate ? (
                                <>
                                    {/* Ovulation Date */}
                                    <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl p-8 shadow-card text-white">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
                                                <Heart className="w-6 h-6" />
                                            </div>
                                            <h3 className="font-poppins text-xl font-semibold">
                                                Estimated Ovulation
                                            </h3>
                                        </div>
                                        <p className="text-3xl font-bold mb-2">
                                            {formatDate(getOvulationDate())}
                                        </p>
                                        <p className="text-white/80">
                                            This is your most fertile day
                                        </p>
                                    </div>

                                    {/* Fertile Window */}
                                    <div className="bg-white rounded-3xl p-8 shadow-card">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                                                <Calendar className="w-6 h-6 text-green-600" />
                                            </div>
                                            <h3 className="font-poppins text-xl font-semibold text-textPrimary">
                                                Fertile Window
                                            </h3>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                                                <span className="text-sm font-medium text-textSecondary">Start:</span>
                                                <span className="font-semibold text-textPrimary">
                                                    {formatDate(getFertileWindowStart())}
                                                </span>
                                            </div>
                                            <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                                                <span className="text-sm font-medium text-textSecondary">End:</span>
                                                <span className="font-semibold text-textPrimary">
                                                    {formatDate(getFertileWindowEnd())}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="mt-4 p-4 bg-green-50 rounded-xl">
                                            <p className="text-sm text-green-800 flex items-start gap-2">
                                                <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                                                <span>
                                                    This 6-day window offers the highest chance of conception
                                                </span>
                                            </p>
                                        </div>
                                    </div>

                                    {/* Next Period */}
                                    <div className="bg-white rounded-3xl p-8 shadow-card">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center">
                                                <Clock className="w-6 h-6 text-pink-600" />
                                            </div>
                                            <h3 className="font-poppins text-xl font-semibold text-textPrimary">
                                                Next Period
                                            </h3>
                                        </div>
                                        <p className="text-2xl font-bold text-textPrimary mb-2">
                                            {formatDate(getNextPeriodDate())}
                                        </p>
                                        <p className="text-textSecondary">
                                            Expected start date
                                        </p>
                                    </div>

                                    {/* Cycle Phases */}
                                    <div className="bg-white rounded-3xl p-8 shadow-card">
                                        <h3 className="font-poppins text-xl font-semibold text-textPrimary mb-6">
                                            Cycle Phases
                                        </h3>
                                        <div className="space-y-4">
                                            <div className="flex items-start gap-3">
                                                <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                                    <div className="w-3 h-3 bg-red-500 rounded-full" />
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-textPrimary">Menstrual Phase</p>
                                                    <p className="text-sm text-textSecondary">Days 1-{periodDuration}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                                    <div className="w-3 h-3 bg-blue-500 rounded-full" />
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-textPrimary">Follicular Phase</p>
                                                    <p className="text-sm text-textSecondary">Days {periodDuration + 1}-14</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                                    <div className="w-3 h-3 bg-green-500 rounded-full" />
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-textPrimary">Ovulation</p>
                                                    <p className="text-sm text-textSecondary">Day 14</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                                    <div className="w-3 h-3 bg-purple-500 rounded-full" />
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-textPrimary">Luteal Phase</p>
                                                    <p className="text-sm text-textSecondary">Days 15-{cycleLength}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* AI Insights */}
                                    <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-6 shadow-card text-white">
                                        <h3 className="font-poppins text-lg font-semibold mb-4 flex items-center gap-2">
                                            <Sparkles className="w-5 h-5" />
                                            AI Insights
                                        </h3>
                                        <div className="space-y-3">
                                            <p className="text-sm text-white/90">
                                                💡 Your cycle is {cycleLength === 28 ? "regular" : cycleLength < 28 ? "shorter than average" : "longer than average"}
                                            </p>
                                            <p className="text-sm text-white/90">
                                                🌸 Track your cervical mucus during fertile window for better accuracy
                                            </p>
                                            <p className="text-sm text-white/90">
                                                📊 Consider tracking basal body temperature for confirmation
                                            </p>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className="bg-white rounded-3xl p-12 shadow-card text-center">
                                    <div className="w-20 h-20 mx-auto bg-purple-100 rounded-full flex items-center justify-center mb-6">
                                        <Calendar className="w-10 h-10 text-purple-600" />
                                    </div>
                                    <h3 className="font-poppins text-xl font-semibold text-textPrimary mb-2">
                                        Ready to Calculate?
                                    </h3>
                                    <p className="text-textSecondary">
                                        Enter your details on the left to see your personalized ovulation calendar
                                    </p>
                                </div>
                            )}
                        </motion.div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
