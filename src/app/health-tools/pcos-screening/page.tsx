"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
    Scan,
    Brain,
    Activity,
    AlertTriangle,
    CheckCircle,
    Info,
    TrendingUp,
    Heart,
    Weight,
    Moon,
    Droplet,
    Sparkles
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

const questions = [
    {
        id: "irregular_periods",
        question: "Do you have irregular or infrequent periods?",
        category: "menstrual"
    },
    {
        id: "heavy_bleeding",
        question: "Do you experience heavy menstrual bleeding?",
        category: "menstrual"
    },
    {
        id: "excess_hair",
        question: "Do you have excess facial or body hair?",
        category: "physical"
    },
    {
        id: "acne",
        question: "Do you experience persistent acne?",
        category: "physical"
    },
    {
        id: "weight_gain",
        question: "Have you experienced unexplained weight gain?",
        category: "physical"
    },
    {
        id: "hair_thinning",
        question: "Are you experiencing hair thinning or loss on your scalp?",
        category: "physical"
    },
    {
        id: "dark_patches",
        question: "Do you have dark patches of skin (especially neck, armpits, groin)?",
        category: "physical"
    },
    {
        id: "difficulty_conceiving",
        question: "Have you had difficulty getting pregnant?",
        category: "reproductive"
    },
    {
        id: "mood_changes",
        question: "Do you experience significant mood swings or depression?",
        category: "mental"
    },
    {
        id: "fatigue",
        question: "Do you feel constantly tired or fatigued?",
        category: "general"
    }
];

export default function PCOSScreeningPage() {
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [showResults, setShowResults] = useState(false);
    const [step, setStep] = useState(0);

    const handleAnswer = (questionId: string, answer: string) => {
        setAnswers(prev => ({ ...prev, [questionId]: answer }));
    };

    const calculateRiskScore = () => {
        const yesCount = Object.values(answers).filter(a => a === "yes").length;
        const percentage = (yesCount / questions.length) * 100;
        return { yesCount, percentage };
    };

    const getRiskLevel = () => {
        const { percentage } = calculateRiskScore();
        if (percentage < 30) return { level: "Low", color: "green", message: "Your symptoms suggest a low risk for PCOS" };
        if (percentage < 60) return { level: "Moderate", color: "yellow", message: "You may have some symptoms associated with PCOS" };
        return { level: "High", color: "red", message: "Your symptoms suggest a higher risk for PCOS" };
    };

    const handleSubmit = () => {
        const allAnswered = questions.every(q => answers[q.id]);
        if (!allAnswered) {
            alert("Please answer all questions");
            return;
        }
        setShowResults(true);
    };

    const currentQuestion = questions[step];

    return (
        <>
            <Header />
            <main className="pt-16 bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50 min-h-screen">
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
                                <Scan className="w-4 h-4" />
                                AI-Powered Screening
                            </span>
                        </motion.div>
                        <motion.h1
                            variants={fadeInUp}
                            className="font-poppins text-4xl sm:text-5xl font-bold text-textPrimary mb-4"
                        >
                            PCOS <span className="gradient-text">Screening</span>
                        </motion.h1>
                        <motion.p variants={fadeInUp} className="text-lg text-textSecondary max-w-2xl mx-auto">
                            AI-assisted screening to assess your risk for Polycystic Ovary Syndrome
                        </motion.p>
                    </motion.div>

                    {!showResults ? (
                        <div className="max-w-3xl mx-auto">
                            {/* Progress Bar */}
                            <div className="mb-8">
                                <div className="flex justify-between text-sm font-medium text-textPrimary mb-2">
                                    <span>Question {step + 1} of {questions.length}</span>
                                    <span>{Math.round(((step + 1) / questions.length) * 100)}%</span>
                                </div>
                                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                    <motion.div
                                        className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${((step + 1) / questions.length) * 100}%` }}
                                        transition={{ duration: 0.5 }}
                                    />
                                </div>
                            </div>

                            {/* Question Card */}
                            <motion.div
                                key={step}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="bg-white rounded-3xl p-8 shadow-card"
                            >
                                <h3 className="font-poppins text-2xl font-semibold text-textPrimary mb-8">
                                    {currentQuestion.question}
                                </h3>

                                <div className="grid grid-cols-3 gap-4 mb-8">
                                    {["yes", "no", "unsure"].map((option) => (
                                        <button
                                            key={option}
                                            onClick={() => handleAnswer(currentQuestion.id, option)}
                                            className={`p-6 rounded-xl border-2 transition-all ${answers[currentQuestion.id] === option
                                                    ? "border-purple-500 bg-purple-50"
                                                    : "border-gray-200 hover:border-purple-300"
                                                }`}
                                        >
                                            <div className="text-center">
                                                {option === "yes" && (
                                                    <CheckCircle className={`w-8 h-8 mx-auto mb-2 ${answers[currentQuestion.id] === option ? "text-purple-500" : "text-gray-400"
                                                        }`} />
                                                )}
                                                {option === "no" && (
                                                    <Activity className={`w-8 h-8 mx-auto mb-2 ${answers[currentQuestion.id] === option ? "text-purple-500" : "text-gray-400"
                                                        }`} />
                                                )}
                                                {option === "unsure" && (
                                                    <Info className={`w-8 h-8 mx-auto mb-2 ${answers[currentQuestion.id] === option ? "text-purple-500" : "text-gray-400"
                                                        }`} />
                                                )}
                                                <p className="font-medium capitalize">{option}</p>
                                            </div>
                                        </button>
                                    ))}
                                </div>

                                <div className="flex justify-between">
                                    <button
                                        onClick={() => setStep(Math.max(0, step - 1))}
                                        disabled={step === 0}
                                        className="px-6 py-3 rounded-xl border-2 border-gray-200 font-medium text-textPrimary disabled:opacity-50 disabled:cursor-not-allowed hover:border-purple-300 transition-colors"
                                    >
                                        Previous
                                    </button>
                                    {step < questions.length - 1 ? (
                                        <button
                                            onClick={() => setStep(step + 1)}
                                            disabled={!answers[currentQuestion.id]}
                                            className="px-6 py-3 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            Next
                                        </button>
                                    ) : (
                                        <button
                                            onClick={handleSubmit}
                                            className="px-6 py-3 btn-primary flex items-center gap-2"
                                        >
                                            <Brain className="w-5 h-5" />
                                            Get Results
                                        </button>
                                    )}
                                </div>
                            </motion.div>

                            {/* Info Box */}
                            <div className="mt-6 bg-blue-50 rounded-xl p-4 flex gap-3">
                                <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                                <div className="text-sm text-blue-900">
                                    <p className="font-medium mb-1">Medical Disclaimer</p>
                                    <p className="text-blue-700">
                                        This screening is not a diagnosis. Please consult with a healthcare
                                        professional for proper medical advice and diagnosis.
                                    </p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="max-w-4xl mx-auto space-y-6">
                            {/* Risk Score */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`bg-gradient-to-br from-${getRiskLevel().color}-500 to-${getRiskLevel().color}-600 rounded-3xl p-8 shadow-card text-white`}
                            >
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center">
                                        <Scan className="w-8 h-8" />
                                    </div>
                                    <div>
                                        <h2 className="font-poppins text-3xl font-bold">
                                            {getRiskLevel().level} Risk
                                        </h2>
                                        <p className="text-white/90">
                                            Based on AI analysis of your symptoms
                                        </p>
                                    </div>
                                </div>
                                <p className="text-lg mb-4">{getRiskLevel().message}</p>
                                <div className="bg-white/20 backdrop-blur rounded-xl p-4">
                                    <div className="flex justify-between items-center mb-2">
                                        <span>Symptom Match</span>
                                        <span className="font-bold">{calculateRiskScore().percentage.toFixed(0)}%</span>
                                    </div>
                                    <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-white"
                                            style={{ width: `${calculateRiskScore().percentage}%` }}
                                        />
                                    </div>
                                </div>
                            </motion.div>

                            {/* Recommendations */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="bg-white rounded-3xl p-8 shadow-card"
                            >
                                <h3 className="font-poppins text-2xl font-semibold text-textPrimary mb-6 flex items-center gap-2">
                                    <Sparkles className="w-6 h-6 text-purple-500" />
                                    AI Recommendations
                                </h3>
                                <div className="space-y-4">
                                    <div className="flex gap-4 p-4 bg-purple-50 rounded-xl">
                                        <Activity className="w-6 h-6 text-purple-600 flex-shrink-0" />
                                        <div>
                                            <h4 className="font-semibold text-textPrimary mb-1">Consult a Specialist</h4>
                                            <p className="text-sm text-textSecondary">
                                                Schedule an appointment with a gynecologist for proper diagnosis and blood tests
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4 p-4 bg-green-50 rounded-xl">
                                        <Heart className="w-6 h-6 text-green-600 flex-shrink-0" />
                                        <div>
                                            <h4 className="font-semibold text-textPrimary mb-1">Lifestyle Modifications</h4>
                                            <p className="text-sm text-textSecondary">
                                                Focus on balanced nutrition, regular exercise, and stress management
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4 p-4 bg-blue-50 rounded-xl">
                                        <TrendingUp className="w-6 h-6 text-blue-600 flex-shrink-0" />
                                        <div>
                                            <h4 className="font-semibold text-textPrimary mb-1">Track Your Symptoms</h4>
                                            <p className="text-sm text-textSecondary">
                                                Use our health tracking tools to monitor your symptoms and progress
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Symptom Breakdown */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="bg-white rounded-3xl p-8 shadow-card"
                            >
                                <h3 className="font-poppins text-2xl font-semibold text-textPrimary mb-6">
                                    Symptom Breakdown
                                </h3>
                                <div className="grid md:grid-cols-2 gap-4">
                                    {questions.map((q) => (
                                        <div key={q.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                            {answers[q.id] === "yes" ? (
                                                <CheckCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                                            ) : (
                                                <Activity className="w-5 h-5 text-green-500 flex-shrink-0" />
                                            )}
                                            <p className="text-sm text-textSecondary">{q.question}</p>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Next Steps */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="bg-gradient-to-br from-purple-900 via-purple-800 to-pink-900 rounded-3xl p-8 shadow-card text-white text-center"
                            >
                                <h3 className="font-poppins text-2xl font-semibold mb-4">
                                    Ready to Take Control?
                                </h3>
                                <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
                                    Book a consultation with our expert gynecologists or explore our
                                    PCOS-friendly care kits designed to support your health journey
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <button className="btn-primary bg-white text-purple-600 hover:bg-white/90">
                                        Book Consultation
                                    </button>
                                    <button className="btn-secondary border-white text-white hover:bg-white/10">
                                        Explore Care Kits
                                    </button>
                                </div>
                            </motion.div>

                            <button
                                onClick={() => {
                                    setShowResults(false);
                                    setStep(0);
                                    setAnswers({});
                                }}
                                className="w-full text-center text-purple-600 font-medium hover:text-purple-700 transition-colors"
                            >
                                Retake Screening
                            </button>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </>
    );
}
