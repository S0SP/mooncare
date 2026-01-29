"use client";

import React from 'react';
import { ArrowLeft, Check, AlertCircle, MessageSquare } from 'lucide-react';

interface HealthDetailsProps {
    formData: any;
    updateFormData: (data: any) => void;
    onNext: () => void;
    onBack: () => void;
}

export const HealthDetails = ({ formData, updateFormData, onNext, onBack }: HealthDetailsProps) => {
    return (
        <div className="w-full max-w-lg mx-auto bg-white p-8 rounded-3xl shadow-card relative">
            <h2 className="text-2xl font-bold text-center mb-6 text-deepPurple">Final Details</h2>
            <p className="text-center text-slate-500 mb-8">Almost there! Just a few more details to perfect your kit.</p>

            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                        <MessageSquare size={16} className="text-blue-500" />
                        Any special requests for your products?
                    </label>
                    <textarea
                        value={formData.specialRequest || ''}
                        onChange={(e) => updateFormData({ specialRequest: e.target.value })}
                        placeholder="e.g. Include extra night pads..." // Placeholder context from image notes about night protection
                        className="w-full px-4 py-3 rounded-xl border border-pink-100 bg-[#FDFBF7] focus:border-deepPurple focus:ring-2 focus:ring-pink-100 outline-none transition-all h-24 resize-none"
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                        <AlertCircle size={16} className="text-red-400" />
                        Are you allergic to anything?
                    </label>
                    <textarea
                        value={formData.allergies || ''}
                        onChange={(e) => updateFormData({ allergies: e.target.value })}
                        placeholder="e.g. Latex, specific scents..."
                        className="w-full px-4 py-3 rounded-xl border border-pink-100 bg-[#FDFBF7] focus:border-deepPurple focus:ring-2 focus:ring-pink-100 outline-none transition-all h-24 resize-none"
                    />
                    <p className="text-xs text-slate-400 mt-2">We will try to avoid items containing these allergens.</p>
                </div>
            </div>

            <div className="flex justify-between items-center pt-8 mt-4 border-t border-slate-100">
                <button
                    onClick={onBack}
                    className="text-slate-400 hover:text-slate-600 font-medium px-4 py-2"
                >
                    Back
                </button>
                <button
                    onClick={onNext}
                    className="bg-deepPurple text-white px-8 py-3 rounded-xl font-bold shadow-md hover:shadow-lg transition-all hover:bg-deepPurple/90 flex items-center gap-2"
                >
                    View Recommendation <Check size={18} />
                </button>
            </div>
        </div>
    );
};
