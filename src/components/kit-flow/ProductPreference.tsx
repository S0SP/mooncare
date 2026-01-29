"use client";

import React from 'react';
import { ArrowLeft, Check, Layers, User, ShieldCheck, GlassWater } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProductPreferenceProps {
    formData: any;
    updateFormData: (data: any) => void;
    onNext: () => void;
    onBack: () => void;
}

export const ProductPreference = ({ formData, updateFormData, onNext, onBack }: ProductPreferenceProps) => {
    const preferences = [
        { id: 'pad', label: 'Sanitary Pads', icon: Layers, desc: 'Classic comfort and protection' },
        { id: 'tampon', label: 'Tampons', icon: User, desc: 'Freedom to move without feeling it' }, // User icon as placeholder/shape
        { id: 'cup', label: 'Menstrual Cup', icon: GlassWater, desc: 'Eco-friendly, long-lasting protection' },
        { id: 'panty', label: 'Period Panties', icon: ShieldCheck, desc: 'Reusable, leak-proof underwear' },
    ];

    const handleSelect = (id: string) => {
        updateFormData({ preference: id });
    };

    return (
        <div className="w-full max-w-2xl mx-auto bg-white p-8 rounded-3xl shadow-card relative">
            <h2 className="text-2xl font-bold text-center mb-2 text-deepPurple">What product do you prefer?</h2>
            <p className="text-center text-slate-500 mb-8">We will customize your kit based on this choice</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {preferences.map((item) => {
                    const active = formData.preference === item.id;
                    return (
                        <motion.button
                            key={item.id}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleSelect(item.id)}
                            className={`flex flex-col items-center p-6 rounded-2xl border-2 text-center transition-all relative ${active
                                    ? "border-deepPurple bg-pink-50 text-deepPurple shadow-md"
                                    : "border-slate-100 bg-white text-slate-600 hover:border-pink-100 hover:bg-slate-50"
                                }`}
                        >
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${active ? 'bg-deepPurple text-white' : 'bg-slate-100 text-slate-400'}`}>
                                <item.icon size={24} />
                            </div>
                            <span className="font-bold text-lg mb-1">{item.label}</span>
                            <span className="text-xs opacity-70">{item.desc}</span>

                            {active && (
                                <div className="absolute top-4 right-4 bg-deepPurple rounded-full p-1">
                                    <Check className="w-3 h-3 text-white" strokeWidth={4} />
                                </div>
                            )}
                        </motion.button>
                    );
                })}
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                <button
                    onClick={onBack}
                    className="text-slate-400 hover:text-slate-600 font-medium px-4 py-2"
                >
                    Back
                </button>
                <button
                    onClick={onNext}
                    disabled={!formData.preference}
                    className={`bg-deepPurple text-white px-8 py-3 rounded-xl font-bold shadow-md hover:shadow-lg flex items-center gap-2 transition-all hover:bg-deepPurple/90 ${!formData.preference ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                >
                    Next
                </button>
            </div>
        </div>
    );
};
