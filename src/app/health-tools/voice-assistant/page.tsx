"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
    Mic,
    MicOff,
    Volume2,
    VolumeX,
    Phone,
    PhoneOff,
    MessageCircle,
    Activity,
    Heart,
    Sparkles,
    Brain,
    Moon,
    Calendar,
    TrendingUp
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useVapi, UserHealthContext, VapiMessage } from "@/lib/useVapi";

const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
    visible: { transition: { staggerChildren: 0.1 } },
};

// Mock user health data - in production, this would come from Supabase
const mockHealthContext: UserHealthContext = {
    currentCycleDay: 14,
    currentPhase: "ovulation",
    recentSymptoms: ["Mild cramping", "Bloating"],
    recentMood: ["Happy", "Energetic"],
    energyLevel: 7,
    painLevel: 2,
    lastPeriodDate: "January 15, 2026",
    cycleLength: 28,
    notes: "Feeling good overall, slight bloating in the evening"
};

export default function VoiceAgentPage() {
    const [showTranscript, setShowTranscript] = useState(true);
    const [audioEnabled, setAudioEnabled] = useState(true);
    const [healthContext] = useState<UserHealthContext>(mockHealthContext);

    const {
        isSessionActive,
        isSpeaking,
        isListening,
        messages,
        error,
        startCall,
        endCall,
    } = useVapi(healthContext);

    const handleStartCall = () => {
        if (audioEnabled) {
            startCall();
        }
    };

    return (
        <>
            <Header />
            <main className="pt-16 bg-gradient-to-br from-softPink-100 via-purple-50 to-blue-50 min-h-screen">
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
                                AI Voice Assistant
                            </span>
                        </motion.div>
                        <motion.h1
                            variants={fadeInUp}
                            className="font-poppins text-4xl sm:text-5xl font-bold text-textPrimary mb-4"
                        >
                            Meet <span className="gradient-text">Luna</span>
                        </motion.h1>
                        <motion.p variants={fadeInUp} className="text-lg text-textSecondary max-w-2xl mx-auto">
                            Your AI health companion. Talk naturally about your menstrual health, symptoms, and get personalized advice.
                        </motion.p>
                    </motion.div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Main Voice Interface */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Voice Control Card */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white rounded-3xl p-8 shadow-card"
                            >
                                <div className="text-center">
                                    {/* Voice Animation */}
                                    <div className="relative w-64 h-64 mx-auto mb-8">
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            {/* Pulsing circles when speaking */}
                                            <AnimatePresence>
                                                {(isSpeaking || isListening) && (
                                                    <>
                                                        <motion.div
                                                            initial={{ scale: 1, opacity: 0.5 }}
                                                            animate={{ scale: 1.5, opacity: 0 }}
                                                            exit={{ scale: 1, opacity: 0 }}
                                                            transition={{ duration: 1.5, repeat: Infinity }}
                                                            className={`absolute w-44 h-44 rounded-full ${isSpeaking ? 'bg-coral-500' : 'bg-moonPurple-500'
                                                                }`}
                                                        />
                                                        <motion.div
                                                            initial={{ scale: 1, opacity: 0.3 }}
                                                            animate={{ scale: 1.2, opacity: 0 }}
                                                            exit={{ scale: 1, opacity: 0 }}
                                                            transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
                                                            className={`absolute w-44 h-44 rounded-full ${isSpeaking ? 'bg-coral-400' : 'bg-moonPurple-400'
                                                                }`}
                                                        />
                                                    </>
                                                )}
                                            </AnimatePresence>

                                            {/* Center Image */}
                                            <motion.div
                                                animate={{
                                                    scale: isSpeaking || isListening ? [1, 1.05, 1] : 1,
                                                }}
                                                transition={{ duration: 1, repeat: isSpeaking ? Infinity : 0 }}
                                                className="relative w-48 h-48 rounded-full overflow-hidden shadow-lg z-10 bg-white"
                                            >
                                                <Image
                                                    src="/images/voice-agent-logo.png"
                                                    alt="Luna Voice Assistant"
                                                    fill
                                                    className="object-cover"
                                                />
                                            </motion.div>
                                        </div>
                                    </div>

                                    {/* Status Text */}
                                    <div className="mb-6">
                                        <h3 className="text-2xl font-semibold text-textPrimary mb-2">
                                            {isSessionActive
                                                ? isSpeaking
                                                    ? "Luna is speaking..."
                                                    : isListening
                                                        ? "Listening..."
                                                        : "Ready to help"
                                                : "Ready to start"}
                                        </h3>
                                        <p className="text-textSecondary">
                                            {isSessionActive
                                                ? "Speak naturally, I'm here to help"
                                                : "Click the button below to start talking with Luna"}
                                        </p>
                                    </div>

                                    {/* Control Buttons */}
                                    <div className="flex items-center justify-center gap-4">
                                        {!isSessionActive ? (
                                            <button
                                                onClick={handleStartCall}
                                                disabled={!audioEnabled}
                                                className="btn-primary flex items-center gap-2 text-lg px-10 py-4"
                                            >
                                                <Phone className="w-6 h-6" />
                                                Start Conversation
                                            </button>
                                        ) : (
                                            <button
                                                onClick={endCall}
                                                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-4 px-10 rounded-xl flex items-center gap-2 transition-all duration-300"
                                            >
                                                <PhoneOff className="w-6 h-6" />
                                                End Call
                                            </button>
                                        )}

                                        <button
                                            onClick={() => setAudioEnabled(!audioEnabled)}
                                            className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300 ${audioEnabled
                                                ? 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                                : 'bg-red-100 text-red-600 hover:bg-red-200'
                                                }`}
                                        >
                                            {audioEnabled ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
                                        </button>
                                    </div>

                                    {/* Error Display */}
                                    {error && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="mt-4 p-4 bg-red-50 rounded-xl text-red-600 text-sm"
                                        >
                                            {error}
                                        </motion.div>
                                    )}
                                </div>
                            </motion.div>

                            {/* Conversation Transcript */}
                            {showTranscript && messages.length > 0 && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-white rounded-3xl p-8 shadow-card"
                                >
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="font-poppins text-2xl font-semibold text-textPrimary flex items-center gap-2">
                                            <MessageCircle className="w-6 h-6 text-moonPurple-500" />
                                            Conversation
                                        </h3>
                                        <button
                                            onClick={() => setShowTranscript(false)}
                                            className="text-sm text-textSecondary hover:text-textPrimary"
                                        >
                                            Hide
                                        </button>
                                    </div>

                                    <div className="space-y-4 max-h-96 overflow-y-auto">
                                        {messages.map((message, index) => (
                                            <div
                                                key={index}
                                                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'
                                                    }`}
                                            >
                                                <div
                                                    className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${message.role === 'user'
                                                        ? 'bg-coral-500 text-white'
                                                        : 'bg-moonPurple-100 text-textPrimary'
                                                        }`}
                                                >
                                                    <p className="text-sm">{message.content}</p>
                                                    <span className="text-xs opacity-70 mt-1 block">
                                                        {message.timestamp.toLocaleTimeString()}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </div>

                        {/* Sidebar - Health Context */}
                        <div className="space-y-6">
                            {/* Current Health Status */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="bg-white rounded-3xl p-6 shadow-card"
                            >
                                <h3 className="font-poppins text-lg font-semibold text-textPrimary mb-4 flex items-center gap-2">
                                    <Activity className="w-5 h-5 text-coral-500" />
                                    Luna Knows About You
                                </h3>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 p-3 bg-softPink-100 rounded-xl">
                                        <Calendar className="w-5 h-5 text-moonPurple-500" />
                                        <div>
                                            <p className="text-xs text-textSecondary">Current Phase</p>
                                            <p className="font-semibold text-textPrimary capitalize">
                                                {healthContext.currentPhase}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 p-3 bg-softPink-100 rounded-xl">
                                        <Heart className="w-5 h-5 text-coral-500" />
                                        <div>
                                            <p className="text-xs text-textSecondary">Recent Symptoms</p>
                                            <p className="font-semibold text-textPrimary text-sm">
                                                {healthContext.recentSymptoms?.join(", ")}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 p-3 bg-softPink-100 rounded-xl">
                                        <TrendingUp className="w-5 h-5 text-green-500" />
                                        <div>
                                            <p className="text-xs text-textSecondary">Energy Level</p>
                                            <p className="font-semibold text-textPrimary">
                                                {healthContext.energyLevel}/10
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* AI Features */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 }}
                                className="bg-gradient-to-br from-coral-500 to-moonPurple-500 rounded-3xl p-6 shadow-card text-white"
                            >
                                <h3 className="font-poppins text-lg font-semibold mb-4 flex items-center gap-2">
                                    <Sparkles className="w-5 h-5" />
                                    AI-Powered
                                </h3>
                                <ul className="space-y-2">
                                    <li className="text-sm flex items-start gap-2">
                                        <span className="text-white/90">•</span>
                                        <span>Personalized based on your health data</span>
                                    </li>
                                    <li className="text-sm flex items-start gap-2">
                                        <span className="text-white/90">•</span>
                                        <span>Natural conversation about your cycle</span>
                                    </li>
                                    <li className="text-sm flex items-start gap-2">
                                        <span className="text-white/90">•</span>
                                        <span>Evidence-based health advice</span>
                                    </li>
                                    <li className="text-sm flex items-start gap-2">
                                        <span className="text-white/90">•</span>
                                        <span>Knows when to recommend a doctor</span>
                                    </li>
                                </ul>
                            </motion.div>

                            {/* Privacy Note */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                                className="bg-white rounded-3xl p-6 shadow-card"
                            >
                                <h3 className="font-poppins text-sm font-semibold text-textPrimary mb-2">
                                    🔒 Privacy First
                                </h3>
                                <p className="text-xs text-textSecondary">
                                    Your conversations are encrypted and private. Luna uses your health data only to provide personalized support.
                                </p>
                            </motion.div>

                            {/* Sample Questions */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 }}
                                className="bg-white rounded-3xl p-6 shadow-card"
                            >
                                <h3 className="font-poppins text-sm font-semibold text-textPrimary mb-3">
                                    Try Asking Luna:
                                </h3>
                                <ul className="space-y-2">
                                    <li className="text-xs text-textSecondary flex items-start gap-2">
                                        <span className="text-coral-500">•</span>
                                        <span>"Why am I experiencing cramping?"</span>
                                    </li>
                                    <li className="text-xs text-textSecondary flex items-start gap-2">
                                        <span className="text-coral-500">•</span>
                                        <span>"When is my fertile window?"</span>
                                    </li>
                                    <li className="text-xs text-textSecondary flex items-start gap-2">
                                        <span className="text-coral-500">•</span>
                                        <span>"What foods help with PMS?"</span>
                                    </li>
                                    <li className="text-xs text-textSecondary flex items-start gap-2">
                                        <span className="text-coral-500">•</span>
                                        <span>"Is my cycle regular?"</span>
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
