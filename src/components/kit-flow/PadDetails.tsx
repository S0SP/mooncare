"use client";

import React from 'react';
import { ArrowLeft, Check, Ruler, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface PadDetailsProps {
    formData: any;
    updateFormData: (data: any) => void;
    onNext: () => void;
    onBack: () => void;
}

export const PadDetails = ({ formData, updateFormData, onNext, onBack }: PadDetailsProps) => {
    // Determine default selections if not set
    const selectedSize = formData.padSize;

    // Logic for Material choice
    // We store 'materialChoice' temporarily to map to isSensitive/materialPreference
    const getMaterialChoice = () => {
        if (formData.isSensitive && formData.materialPreference === 'organic') return 'yes_organic';
        if (!formData.isSensitive && formData.materialPreference === 'organic') return 'no_organic';
        if (!formData.isSensitive && formData.materialPreference === 'standard') return 'no_standard';
        return null;
    };
    const materialChoice = getMaterialChoice();

    const handleMaterialSelect = (choice: string) => {
        if (choice === 'yes_organic') {
            updateFormData({ isSensitive: true, materialPreference: 'organic' });
        } else if (choice === 'no_organic') {
            updateFormData({ isSensitive: false, materialPreference: 'organic' });
        } else if (choice === 'no_standard') {
            updateFormData({ isSensitive: false, materialPreference: 'standard' });
        }
    };

    return (
        <div className="w-full max-w-lg mx-auto bg-white p-8 rounded-3xl shadow-card relative">
            <h2 className="text-2xl font-bold text-center mb-6 text-deepPurple">Pad Preferences</h2>

            <div className="space-y-8">
                {/* Size Selection */}
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                        <Ruler size={16} className="text-pink-500" />
                        What pad size do you prefer?
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                        {['L', 'XL', 'XXL'].map((size) => (
                            <button
                                key={size}
                                onClick={() => updateFormData({ padSize: size })}
                                className={`py-3 rounded-xl border-2 font-bold transition-all ${selectedSize === size
                                        ? "border-deepPurple bg-deepPurple text-white"
                                        : "border-gray-200 text-gray-600 hover:border-pink-200"
                                    }`}
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Sensitivity & Material */}
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                        <Sparkles size={16} className="text-pink-500" />
                        Do you have sensitive skin?
                    </label>
                    <p className="text-xs text-gray-400 mb-3 -mt-2">Choose the option that fits you best</p>

                    <div className="space-y-3">
                        <button
                            onClick={() => handleMaterialSelect('yes_organic')}
                            className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center gap-3 ${materialChoice === 'yes_organic'
                                    ? "border-green-500 bg-green-50 text-green-800"
                                    : "border-gray-100 hover:border-gray-200"
                                }`}
                        >
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${materialChoice === 'yes_organic' ? 'border-green-500' : 'border-gray-300'}`}>
                                {materialChoice === 'yes_organic' && <div className="w-2.5 h-2.5 bg-green-500 rounded-full" />}
                            </div>
                            <span className="font-medium">Yes, I want organic cotton pads</span>
                        </button>

                        <button
                            onClick={() => handleMaterialSelect('no_organic')}
                            className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center gap-3 ${materialChoice === 'no_organic'
                                    ? "border-blue-500 bg-blue-50 text-blue-800"
                                    : "border-gray-100 hover:border-gray-200"
                                }`}
                        >
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${materialChoice === 'no_organic' ? 'border-blue-500' : 'border-gray-300'}`}>
                                {materialChoice === 'no_organic' && <div className="w-2.5 h-2.5 bg-blue-500 rounded-full" />}
                            </div>
                            <span className="font-medium">No, but I prefer organic cotton pads</span>
                        </button>

                        <button
                            onClick={() => handleMaterialSelect('no_standard')}
                            className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center gap-3 ${materialChoice === 'no_standard'
                                    ? "border-pink-500 bg-pink-50 text-pink-800"
                                    : "border-gray-100 hover:border-gray-200"
                                }`}
                        >
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${materialChoice === 'no_standard' ? 'border-pink-500' : 'border-gray-300'}`}>
                                {materialChoice === 'no_standard' && <div className="w-2.5 h-2.5 bg-pink-500 rounded-full" />}
                            </div>
                            <span className="font-medium">No, I prefer standard (silicone-feel) pads</span>
                        </button>
                    </div>
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
                    disabled={!selectedSize || !materialChoice}
                    className={`bg-deepPurple text-white px-8 py-3 rounded-xl font-bold shadow-md hover:shadow-lg transition-all hover:bg-deepPurple/90 ${(!selectedSize || !materialChoice) ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                >
                    Next
                </button>
            </div>
        </div>
    );
};
