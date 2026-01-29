"use client";

import React, { useState } from 'react';
import { ArrowLeft, CheckCircle } from 'lucide-react';

interface CycleDetailsProps {
    formData: any;
    updateFormData: (data: any) => void;
    onNext: () => void;
    onBack: () => void;
}

export const CycleDetails = ({ formData, updateFormData, onNext, onBack }: CycleDetailsProps) => {
    const [errors, setErrors] = useState<any>({});

    const validate = () => {
        const newErrors: any = {};
        if (!formData.periodDuration || formData.periodDuration < 1 || formData.periodDuration > 15) {
            newErrors.periodDuration = "Please calculate your typical period length (1-15 days)";
        }
        if (!formData.cycleLength || formData.cycleLength < 15 || formData.cycleLength > 100) {
            newErrors.cycleLength = "Please enter a valid cycle length (15-100 days)";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (validate()) {
            onNext();
        }
    };

    return (
        <div className="w-full max-w-md mx-auto bg-white p-8 rounded-3xl shadow-card relative">
            <h2 className="text-2xl font-bold text-center mb-8 text-deepPurple">Cycle Details</h2>

            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2 ml-1">
                        How many days does your period usually last?
                    </label>
                    <input
                        type="number"
                        value={formData.periodDuration || ''}
                        onChange={(e) => updateFormData({ periodDuration: e.target.value })}
                        placeholder="e.g. 5"
                        className="w-full px-4 py-3 rounded-xl border border-pink-100 bg-[#FDFBF7] focus:border-deepPurple focus:ring-2 focus:ring-pink-100 outline-none transition-all text-lg font-medium"
                    />
                    {errors.periodDuration && <p className="text-red-400 text-xs mt-1 ml-1">{errors.periodDuration}</p>}
                </div>

                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2 ml-1">
                        How long is your menstrual cycle (in days)?
                    </label>
                    <input
                        type="number"
                        value={formData.cycleLength || ''}
                        onChange={(e) => updateFormData({ cycleLength: e.target.value })}
                        placeholder="e.g. 28"
                        className="w-full px-4 py-3 rounded-xl border border-pink-100 bg-[#FDFBF7] focus:border-deepPurple focus:ring-2 focus:ring-pink-100 outline-none transition-all text-lg font-medium"
                    />
                    <p className="text-xs text-slate-400 mt-1 ml-1">Usually between 21 and 35 days</p>
                    {errors.cycleLength && <p className="text-red-400 text-xs mt-1 ml-1">{errors.cycleLength}</p>}
                </div>

                <div className="pt-6 flex justify-between items-center">
                    <button
                        onClick={onBack}
                        className="text-slate-400 hover:text-slate-600 font-medium px-4 py-2"
                    >
                        Back
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="bg-deepPurple text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:shadow-lg flex items-center gap-2 transition-all hover:bg-deepPurple/90"
                    >
                        Next <CheckCircle size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};
