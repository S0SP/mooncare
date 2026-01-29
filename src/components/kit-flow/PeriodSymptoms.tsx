"use client";

import React from 'react';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { motion } from 'framer-motion';

interface PeriodSymptomsProps {
    formData: any;
    updateFormData: (data: any) => void;
    onNext: () => void;
    onBack: () => void;
}

export const PeriodSymptoms = ({ formData, updateFormData, onNext, onBack }: PeriodSymptomsProps) => {
    const symptomsList = [
        { id: 'cramps', label: 'Severe pain or cramps', emoji: '😣' },
        { id: 'mood', label: 'Mood swings & irritation', emoji: '😠' },
        { id: 'acne', label: 'Acne or skin problems', emoji: '🧖‍♀️' },
        { id: 'heavy', label: 'Heavy flow', emoji: '🩸' },
        { id: 'low', label: 'Low flow', emoji: '💧' },
        { id: 'sleep', label: 'Sleep disturbance', emoji: '😴' },
        { id: 'fatigue', label: 'Fatigue or weakness', emoji: '😫' },
        { id: 'itching', label: 'Itching/Irritation/Rashes', emoji: '😣' },
        { id: 'none', label: 'No major issue', emoji: '✨' },
    ];

    const handleToggle = (id: string) => {
        const current = formData.symptoms || [];
        if (current.includes(id)) {
            updateFormData({ symptoms: current.filter((s: string) => s !== id) });
        } else {
            if (id === 'none') {
                updateFormData({ symptoms: ['none'] });
            } else {
                const newSymptoms = current.filter((s: string) => s !== 'none');
                updateFormData({ symptoms: [...newSymptoms, id] });
            }
        }
    };

    const isSelected = (id: string) => (formData.symptoms || []).includes(id);

    return (
        <div className="w-full max-w-2xl mx-auto bg-white p-8 rounded-3xl shadow-card relative flex flex-col h-full max-h-[80vh]">
            <h2 className="text-2xl font-bold text-center mb-6 text-deepPurple">What symptoms do you usually experience?</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 overflow-y-auto p-1 flex-1">
                {symptomsList.map((symptom) => {
                    const active = isSelected(symptom.id);
                    return (
                        <motion.button
                            key={symptom.id}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleToggle(symptom.id)}
                            className={`flex items-center p-4 rounded-2xl border-2 text-left transition-all relative ${active
                                    ? "border-deepPurple bg-pink-50 text-deepPurple shadow-sm"
                                    : "border-transparent bg-slate-50 text-slate-600 hover:bg-slate-100"
                                }`}
                        >
                            <span className="text-2xl mr-3">{symptom.emoji}</span>
                            <span className="font-semibold text-lg flex-1">{symptom.label}</span>
                            {active && (
                                <div className="bg-deepPurple rounded-full p-1 ml-2">
                                    <Check className="w-3 h-3 text-white" strokeWidth={4} />
                                </div>
                            )}
                        </motion.button>
                    );
                })}
            </div>

            <div className="flex justify-between items-center bg-white pt-4 mt-auto border-t border-slate-100 sticky bottom-0">
                <button
                    onClick={onBack}
                    className="text-slate-400 hover:text-slate-600 font-medium px-4 py-2"
                >
                    Back
                </button>
                <button
                    onClick={onNext}
                    disabled={!formData.symptoms || formData.symptoms.length === 0}
                    className={`bg-deepPurple text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:shadow-lg flex items-center gap-2 transition-all hover:bg-deepPurple/90 ${(!formData.symptoms || formData.symptoms.length === 0) ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                >
                    Next <ArrowRight size={18} />
                </button>
            </div>
        </div>
    );
};
