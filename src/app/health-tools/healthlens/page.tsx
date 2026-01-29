"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
    Brain,
    TrendingUp,
    Heart,
    Activity,
    Moon,
    Sparkles,
    Target,
    LineChart,
    Zap,
    AlertCircle,
    CheckCircle,
    Calendar,
    BarChart3
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

const healthMetrics = [
    { id: "cycle", label: "Cycle Regularity", score: 85, status: "good", color: "green" },
    { id: "symptoms", label: "Symptom Management", score: 72, status: "moderate", color: "yellow" },
    { id: "mood", label: "Emotional Wellbeing", score: 68, status: "moderate", color: "yellow" },
    { id: "energy", label: "Energy Levels", score: 75, status: "good", color: "green" },
    { id: "sleep", label: "Sleep Quality", score: 60, status: "needs-attention", color: "orange" },
    { id: "nutrition", label: "Nutrition Balance", score: 80, status: "good", color: "green" }
];

const insights = [
    {
        icon: TrendingUp,
        title: "Cycle Predictability Improving",
        description: "Your cycle has become 23% more regular over the past 3 months",
        impact: "positive",
        recommendation: "Continue current tracking habits"
    },
    {
        icon: AlertCircle,
        title: "PMS Symptoms Pattern Detected",
        description: "Mood changes typically occur 3-4 days before your period",
        impact: "attention",
        recommendation: "Plan lighter activities during this phase"
    },
    {
        icon: Heart,
        title: "Optimal Fertile Window",
        description: "Your fertile window is predicted to be in 5-7 days",
        impact: "info",
        recommendation: "Track cervical mucus for confirmation"
    },
    {
        icon: Moon,
        title: "Sleep Quality Fluctuation",
        description: "Sleep quality decreases during luteal phase",
        impact: "attention",
        recommendation: "Maintain consistent bedtime routine"
    }
];

const recommendations = [
    {
        category: "Nutrition",
        icon: Activity,
        tips: [
            "Increase iron-rich foods during menstrual phase",
            "Add omega-3 fatty acids to reduce inflammation",
            "Stay hydrated with 2-3L water daily"
        ]
    },
    {
        category: "Exercise",
        icon: Zap,
        tips: [
            "High-intensity workouts during follicular phase",
            "Yoga and stretching during luteal phase",
            "Light walks during menstruation"
        ]
    },
    {
        category: "Lifestyle",
        icon: Moon,
        tips: [
            "Maintain 7-9 hours of sleep",
            "Practice stress management techniques",
            "Avoid caffeine 6 hours before bed"
        ]
    }
];

export default function HealthLensPage() {
    const [showDetailedAnalysis, setShowDetailedAnalysis] = useState(false);

    const overallScore = Math.round(
        healthMetrics.reduce((sum, metric) => sum + metric.score, 0) / healthMetrics.length
    );

    const getScoreColor = (score: number) => {
        if (score >= 80) return "from-green-500 to-emerald-500";
        if (score >= 60) return "from-yellow-500 to-orange-500";
        return "from-orange-500 to-red-500";
    };

    return (
        <>
            <Header />
            <main className="pt-16 bg-gradient-to-br from-cyan-50 via-blue-50 to-purple-50 min-h-screen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    {/* Header */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={stagger}
                        className="text-center mb-12"
                    >
                        <motion.div variants={fadeInUp} className="mb-4">
                            <span className="inline-flex items-center gap-2 bg-white/80 backdrop-blur px-4 py-2 rounded-full text-sm font-medium text-deepPurple">
                                <Brain className="w-4 h-4" />
                                AI-Powered Analysis
                            </span>
                        </motion.div>
                        <motion.h1
                            variants={fadeInUp}
                            className="font-poppins text-4xl sm:text-5xl font-bold text-textPrimary mb-4"
                        >
                            Health<span className="gradient-text">Lens</span>
                        </motion.h1>
                        <motion.p variants={fadeInUp} className="text-lg text-textSecondary max-w-2xl mx-auto">
                            Your personalized AI health assessment with actionable insights
                        </motion.p>
                    </motion.div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Main Analysis */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Overall Health Score */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`bg-gradient-to-br ${getScoreColor(overallScore)} rounded-3xl p-8 shadow-card text-white`}
                            >
                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <h2 className="font-poppins text-3xl font-bold mb-2">
                                            Health Score
                                        </h2>
                                        <p className="text-white/90">
                                            Based on your last 30 days of data
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-6xl font-bold">{overallScore}</div>
                                        <div className="text-white/90">/ 100</div>
                                    </div>
                                </div>
                                <div className="bg-white/20 backdrop-blur rounded-xl p-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Sparkles className="w-5 h-5" />
                                        <span className="font-medium">AI Analysis</span>
                                    </div>
                                    <p className="text-white/90">
                                        Your overall health is {overallScore >= 80 ? "excellent" : overallScore >= 60 ? "good" : "fair"}.
                                        Keep tracking to improve your score and gain deeper insights.
                                    </p>
                                </div>
                            </motion.div>

                            {/* Health Metrics */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="bg-white rounded-3xl p-8 shadow-card"
                            >
                                <h3 className="font-poppins text-2xl font-semibold text-textPrimary mb-6 flex items-center gap-2">
                                    <BarChart3 className="w-6 h-6 text-purple-500" />
                                    Health Metrics Breakdown
                                </h3>
                                <div className="space-y-4">
                                    {healthMetrics.map((metric) => (
                                        <div key={metric.id}>
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="font-medium text-textPrimary">{metric.label}</span>
                                                <div className="flex items-center gap-2">
                                                    <span className="font-bold text-textPrimary">{metric.score}%</span>
                                                    {metric.status === "good" && (
                                                        <CheckCircle className="w-5 h-5 text-green-500" />
                                                    )}
                                                    {metric.status === "moderate" && (
                                                        <AlertCircle className="w-5 h-5 text-yellow-500" />
                                                    )}
                                                    {metric.status === "needs-attention" && (
                                                        <AlertCircle className="w-5 h-5 text-orange-500" />
                                                    )}
                                                </div>
                                            </div>
                                            <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full bg-${metric.color}-500 transition-all duration-500`}
                                                    style={{ width: `${metric.score}%` }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* AI Insights */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="bg-white rounded-3xl p-8 shadow-card"
                            >
                                <h3 className="font-poppins text-2xl font-semibold text-textPrimary mb-6 flex items-center gap-2">
                                    <Brain className="w-6 h-6 text-purple-500" />
                                    AI-Generated Insights
                                </h3>
                                <div className="space-y-4">
                                    {insights.map((insight, index) => (
                                        <div
                                            key={index}
                                            className={`p-4 rounded-xl border-l-4 ${insight.impact === "positive"
                                                    ? "bg-green-50 border-green-500"
                                                    : insight.impact === "attention"
                                                        ? "bg-yellow-50 border-yellow-500"
                                                        : "bg-blue-50 border-blue-500"
                                                }`}
                                        >
                                            <div className="flex items-start gap-3">
                                                <div
                                                    className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${insight.impact === "positive"
                                                            ? "bg-green-100"
                                                            : insight.impact === "attention"
                                                                ? "bg-yellow-100"
                                                                : "bg-blue-100"
                                                        }`}
                                                >
                                                    <insight.icon
                                                        className={`w-5 h-5 ${insight.impact === "positive"
                                                                ? "text-green-600"
                                                                : insight.impact === "attention"
                                                                    ? "text-yellow-600"
                                                                    : "text-blue-600"
                                                            }`}
                                                    />
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="font-semibold text-textPrimary mb-1">
                                                        {insight.title}
                                                    </h4>
                                                    <p className="text-sm text-textSecondary mb-2">
                                                        {insight.description}
                                                    </p>
                                                    <div className="flex items-center gap-2 text-xs text-purple-600 font-medium">
                                                        <Target className="w-3 h-3" />
                                                        {insight.recommendation}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Personalized Recommendations */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="bg-white rounded-3xl p-8 shadow-card"
                            >
                                <h3 className="font-poppins text-2xl font-semibold text-textPrimary mb-6 flex items-center gap-2">
                                    <Sparkles className="w-6 h-6 text-purple-500" />
                                    Personalized Recommendations
                                </h3>
                                <div className="grid md:grid-cols-3 gap-6">
                                    {recommendations.map((rec, index) => (
                                        <div key={index} className="space-y-3">
                                            <div className="flex items-center gap-2 mb-3">
                                                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                                    <rec.icon className="w-5 h-5 text-purple-600" />
                                                </div>
                                                <h4 className="font-semibold text-textPrimary">{rec.category}</h4>
                                            </div>
                                            <ul className="space-y-2">
                                                {rec.tips.map((tip, tipIndex) => (
                                                    <li key={tipIndex} className="flex items-start gap-2 text-sm text-textSecondary">
                                                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                                                        <span>{tip}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Next Prediction */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="bg-white rounded-3xl p-6 shadow-card"
                            >
                                <h3 className="font-poppins text-lg font-semibold text-textPrimary mb-4 flex items-center gap-2">
                                    <Calendar className="w-5 h-5 text-purple-500" />
                                    Upcoming Predictions
                                </h3>
                                <div className="space-y-3">
                                    <div className="p-3 bg-pink-50 rounded-xl">
                                        <p className="text-xs text-textSecondary mb-1">Next Period</p>
                                        <p className="font-semibold text-textPrimary">in 8 days</p>
                                        <div className="mt-2 flex items-center gap-1 text-xs text-pink-600">
                                            <Target className="w-3 h-3" />
                                            <span>95% confidence</span>
                                        </div>
                                    </div>
                                    <div className="p-3 bg-purple-50 rounded-xl">
                                        <p className="text-xs text-textSecondary mb-1">Ovulation</p>
                                        <p className="font-semibold text-textPrimary">in 5-7 days</p>
                                        <div className="mt-2 flex items-center gap-1 text-xs text-purple-600">
                                            <Target className="w-3 h-3" />
                                            <span>88% confidence</span>
                                        </div>
                                    </div>
                                    <div className="p-3 bg-blue-50 rounded-xl">
                                        <p className="text-xs text-textSecondary mb-1">PMS Symptoms</p>
                                        <p className="font-semibold text-textPrimary">in 5 days</p>
                                        <div className="mt-2 flex items-center gap-1 text-xs text-blue-600">
                                            <Target className="w-3 h-3" />
                                            <span>82% confidence</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Tracking Streak */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 }}
                                className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl p-6 shadow-card text-white"
                            >
                                <h3 className="font-poppins text-lg font-semibold mb-4 flex items-center gap-2">
                                    <Zap className="w-5 h-5" />
                                    Tracking Streak
                                </h3>
                                <div className="text-center">
                                    <div className="text-5xl font-bold mb-2">28</div>
                                    <p className="text-white/90 mb-4">Days in a row!</p>
                                    <div className="bg-white/20 backdrop-blur rounded-xl p-3">
                                        <p className="text-sm">Keep it up! Consistent tracking improves AI accuracy</p>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Data Quality */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                                className="bg-white rounded-3xl p-6 shadow-card"
                            >
                                <h3 className="font-poppins text-lg font-semibold text-textPrimary mb-4">
                                    Data Quality
                                </h3>
                                <div className="space-y-3">
                                    <div>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="text-textSecondary">Completeness</span>
                                            <span className="font-semibold">92%</span>
                                        </div>
                                        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                            <div className="h-full bg-green-500" style={{ width: "92%" }} />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="text-textSecondary">Consistency</span>
                                            <span className="font-semibold">85%</span>
                                        </div>
                                        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                            <div className="h-full bg-blue-500" style={{ width: "85%" }} />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Improvement Tips */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 }}
                                className="bg-white rounded-3xl p-6 shadow-card"
                            >
                                <h3 className="font-poppins text-lg font-semibold text-textPrimary mb-4">
                                    Quick Tips
                                </h3>
                                <ul className="space-y-2">
                                    <li className="text-sm text-textSecondary flex items-start gap-2">
                                        <span className="text-purple-500">•</span>
                                        Log symptoms daily for better predictions
                                    </li>
                                    <li className="text-sm text-textSecondary flex items-start gap-2">
                                        <span className="text-purple-500">•</span>
                                        Track mood to identify patterns
                                    </li>
                                    <li className="text-sm text-textSecondary flex items-start gap-2">
                                        <span className="text-purple-500">•</span>
                                        Update sleep data for holistic insights
                                    </li>
                                </ul>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
