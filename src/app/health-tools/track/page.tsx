"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Activity,
    ChevronLeft,
    ChevronRight,
    Calendar,
    CheckCircle,
    Droplets
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function TrackHealthPage() {
    // State simulating the 'activeCycle'
    const [periodStartDate, setPeriodStartDate] = useState<string | null>(null);
    const [dailyLogs, setDailyLogs] = useState<Record<string, any>>({});

    // View state
    const [currentViewDate, setCurrentViewDate] = useState(new Date().toISOString().split('T')[0]);
    const [hasSetStartDate, setHasSetStartDate] = useState(false);

    // Initialize from local storage or defaults on mount
    useEffect(() => {
        // In a real app, load this from DB or Context
        // For now, we start fresh or keep simple state
    }, []);

    const dayNumber = useMemo(() => {
        if (!periodStartDate) return 1;
        const start = new Date(periodStartDate);
        const current = new Date(currentViewDate);
        start.setHours(0, 0, 0, 0);
        current.setHours(0, 0, 0, 0);
        const diffTime = current.getTime() - start.getTime();
        const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
        return diffDays + 1;
    }, [periodStartDate, currentViewDate]);

    const canGoNext = useMemo(() => {
        const current = new Date(currentViewDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        current.setHours(0, 0, 0, 0);
        return current.getTime() < today.getTime();
    }, [currentViewDate]);

    const canGoPrevious = useMemo(() => {
        if (!periodStartDate) return false;
        const current = new Date(currentViewDate);
        const start = new Date(periodStartDate);
        current.setHours(0, 0, 0, 0);
        start.setHours(0, 0, 0, 0);
        return current.getTime() > start.getTime();
    }, [currentViewDate, periodStartDate]);

    const handlePreviousDay = () => {
        if (canGoPrevious) {
            const date = new Date(currentViewDate);
            date.setDate(date.getDate() - 1);
            setCurrentViewDate(date.toISOString().split('T')[0]);
        }
    };

    const handleNextDay = () => {
        if (canGoNext) {
            const date = new Date(currentViewDate);
            date.setDate(date.getDate() + 1);
            setCurrentViewDate(date.toISOString().split('T')[0]);
        }
    };

    const handleSetStartDate = () => {
        // currentViewDate acts as the selected start date initially
        setPeriodStartDate(currentViewDate);
        setHasSetStartDate(true);
    };

    const updateDailyData = (field: string, value: any) => {
        setDailyLogs(prev => ({
            ...prev,
            [currentViewDate]: {
                ...prev[currentViewDate],
                [field]: value
            }
        }));
    };

    const currentDayData = dailyLogs[currentViewDate] || {};

    const handleSave = () => {
        alert("Data saved for " + currentViewDate);
        console.log("Logs:", dailyLogs);
    };

    const handleEndPeriod = () => {
        if (window.confirm('Are you sure you want to end period tracking?')) {
            setPeriodStartDate(null);
            setHasSetStartDate(false);
            setDailyLogs({});
            alert("Period ended.");
        }
    };

    return (
        <>
            <Header />
            <main className="pt-24 pb-12 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 min-h-screen">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-[2rem] shadow-card overflow-hidden"
                    >
                        {/* Header within Card */}
                        <div className="bg-deepPurple p-6 text-white flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                                    <Activity size={20} />
                                </div>
                                <h1 className="text-xl font-bold font-poppins">Track Your Period</h1>
                            </div>
                            {hasSetStartDate && (
                                <div className="text-sm bg-white/20 px-3 py-1 rounded-full font-medium">
                                    Active Cycle
                                </div>
                            )}
                        </div>

                        <div className="p-8">
                            {!hasSetStartDate ? (
                                <div className="space-y-6 text-center py-8">
                                    <div className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center mx-auto text-pink-500 mb-4">
                                        <Calendar size={40} />
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-800">When did your period start?</h2>
                                    <p className="text-gray-500">Select the date to begin tracking your cycle.</p>

                                    <div className="flex flex-col sm:flex-row gap-4 items-center justify-center max-w-md mx-auto mt-6">
                                        <input
                                            type="date"
                                            value={currentViewDate}
                                            onChange={(e) => setCurrentViewDate(e.target.value)}
                                            max={new Date().toISOString().split('T')[0]}
                                            className="w-full px-4 py-3 rounded-xl border border-pink-200 focus:ring-2 focus:ring-deepPurple/20 outline-none text-lg"
                                        />
                                        <button
                                            onClick={handleSetStartDate}
                                            className="w-full sm:w-auto px-8 py-3 bg-deepPurple text-white font-bold rounded-xl hover:bg-deepPurple/90 transition-colors shadow-lg"
                                        >
                                            Start Tracking
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-8">
                                    {/* Info Banner */}
                                    <div className="bg-pink-50 p-4 rounded-2xl border border-pink-200 flex items-center justify-between">
                                        <p className="text-gray-700 font-medium">
                                            Period started on:{' '}
                                            <span className="font-bold text-deepPurple">
                                                {new Date(periodStartDate!).toLocaleDateString('en-US', {
                                                    weekday: 'long',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}
                                            </span>
                                        </p>
                                    </div>

                                    {/* Day Navigation */}
                                    <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-pink-100 shadow-sm">
                                        <button
                                            onClick={handlePreviousDay}
                                            disabled={!canGoPrevious}
                                            className="p-2 rounded-full hover:bg-pink-50 disabled:opacity-30 disabled:cursor-not-allowed transition"
                                        >
                                            <ChevronLeft size={28} className="text-deepPurple" />
                                        </button>
                                        <div className="text-center">
                                            <h3 className="text-3xl font-bold text-deepPurple mb-1">Day {dayNumber}</h3>
                                            <p className="text-sm text-gray-500 font-medium uppercase tracking-wide">
                                                {new Date(currentViewDate).toLocaleDateString('en-US', {
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}
                                            </p>
                                        </div>
                                        <button
                                            onClick={handleNextDay}
                                            disabled={!canGoNext}
                                            className="p-2 rounded-full hover:bg-pink-50 disabled:opacity-30 disabled:cursor-not-allowed transition"
                                        >
                                            <ChevronRight size={28} className="text-deepPurple" />
                                        </button>
                                    </div>

                                    {/* Daily Questions Grid */}
                                    <div className="grid md:grid-cols-2 gap-6">
                                        {/* Flow Intensity */}
                                        <div className="bg-white p-6 rounded-2xl border border-pink-100 shadow-sm hover:shadow-md transition-shadow">
                                            <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                                                <Droplets className="w-5 h-5 text-pink-500" />
                                                Flow Intensity
                                            </h4>
                                            <div className="flex gap-2 flex-wrap">
                                                {['Light', 'Medium', 'Heavy'].map(option => (
                                                    <button
                                                        key={option}
                                                        onClick={() => updateDailyData('flow', option)}
                                                        className={`px-4 py-2 rounded-full font-semibold text-sm transition-all border ${currentDayData.flow === option
                                                                ? 'bg-deepPurple text-white border-deepPurple shadow-md'
                                                                : 'bg-white text-gray-600 border-gray-200 hover:border-deepPurple/50'
                                                            }`}
                                                    >
                                                        {option}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Cramp Severity */}
                                        <div className="bg-white p-6 rounded-2xl border border-pink-100 shadow-sm hover:shadow-md transition-shadow">
                                            <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                                                <Activity className="w-5 h-5 text-orange-500" />
                                                Cramps
                                            </h4>
                                            <div className="flex gap-2 flex-wrap">
                                                {['No cramps', 'Mild', 'Medium', 'Very painful'].map(option => (
                                                    <button
                                                        key={option}
                                                        onClick={() => updateDailyData('cramps', option)}
                                                        className={`px-4 py-2 rounded-full font-semibold text-sm transition-all border ${currentDayData.cramps === option
                                                                ? 'bg-deepPurple text-white border-deepPurple shadow-md'
                                                                : 'bg-white text-gray-600 border-gray-200 hover:border-deepPurple/50'
                                                            }`}
                                                    >
                                                        {option}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Mood */}
                                        <div className="bg-white p-6 rounded-2xl border border-pink-100 shadow-sm hover:shadow-md transition-shadow">
                                            <h4 className="font-bold text-gray-800 mb-4">Mood</h4>
                                            <div className="flex gap-2 flex-wrap">
                                                {['Calm', 'Irritable', 'Low', 'Anxious'].map(option => (
                                                    <button
                                                        key={option}
                                                        onClick={() => updateDailyData('mood', option)}
                                                        className={`px-4 py-2 rounded-full font-semibold text-sm transition-all border ${currentDayData.mood === option
                                                                ? 'bg-deepPurple text-white border-deepPurple shadow-md'
                                                                : 'bg-white text-gray-600 border-gray-200 hover:border-deepPurple/50'
                                                            }`}
                                                    >
                                                        {option}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Other Symptoms */}
                                        <div className="bg-white p-6 rounded-2xl border border-pink-100 shadow-sm hover:shadow-md transition-shadow space-y-4">
                                            <div>
                                                <h4 className="font-bold text-gray-800 mb-2 text-sm">Fatigue?</h4>
                                                <div className="flex gap-2">
                                                    {['Yes', 'No'].map(option => (
                                                        <button
                                                            key={option}
                                                            onClick={() => updateDailyData('fatigue', option)}
                                                            className={`flex-1 px-3 py-2 rounded-lg font-medium text-sm transition-all border ${currentDayData.fatigue === option
                                                                    ? 'bg-deepPurple text-white border-deepPurple'
                                                                    : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                                                                }`}
                                                        >
                                                            {option}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-gray-800 mb-2 text-sm">Pain Relief?</h4>
                                                <div className="flex gap-2">
                                                    {['Yes', 'No'].map(option => (
                                                        <button
                                                            key={option}
                                                            onClick={() => updateDailyData('painRelief', option)}
                                                            className={`flex-1 px-3 py-2 rounded-lg font-medium text-sm transition-all border ${currentDayData.painRelief === option
                                                                    ? 'bg-deepPurple text-white border-deepPurple'
                                                                    : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                                                                }`}
                                                        >
                                                            {option}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="pt-4 space-y-3">
                                        <button
                                            onClick={handleSave}
                                            className="w-full py-4 bg-deepPurple text-white font-bold rounded-xl hover:bg-deepPurple/90 transition-colors shadow-lg flex items-center justify-center gap-2"
                                        >
                                            <CheckCircle size={20} />
                                            Save Data for Day {dayNumber}
                                        </button>

                                        <button
                                            onClick={handleEndPeriod}
                                            className="w-full py-3 bg-white border-2 border-red-100 text-red-400 font-bold rounded-xl hover:bg-red-50 hover:text-red-500 transition-colors text-sm"
                                        >
                                            End Period Tracking
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            </main>
            <Footer />
        </>
    );
}
