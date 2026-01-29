"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Package, Flame, Heart } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BasicDetails } from "@/components/kit-flow/BasicDetails";
import { CycleDetails } from "@/components/kit-flow/CycleDetails";
import { PeriodSymptoms } from "@/components/kit-flow/PeriodSymptoms";
import { KitRecommendation } from "@/components/kit-flow/KitRecommendation";
import { ProductPreference } from "@/components/kit-flow/ProductPreference";
import { PadDetails } from "@/components/kit-flow/PadDetails";
import { HealthDetails } from "@/components/kit-flow/HealthDetails";

export default function KitsPage() {
    // Steps: idle, basic, cycle, preference, pad_details, symptoms, health, calculating, recommended
    const [step, setStep] = useState('idle');
    const [formData, setFormData] = useState<any>({
        age: '',
        heightUnit: 'cm',
        heightValue: '',
        weightUnit: 'kg',
        weightValue: '',
        periodDuration: '',
        cycleLength: '',
        symptoms: [],
        preference: 'pad', // Default
        padSize: '',
        isSensitive: false,
        materialPreference: '',
        allergies: '',
        specialRequest: ''
    });

    const [recommendedItems, setRecommendedItems] = useState<any[]>([]);

    const updateFormData = (newData: any) => {
        setFormData((prev: any) => ({ ...prev, ...newData }));
    };

    const handleStartQuiz = () => setStep('basic');

    const handleGenerateKit = async () => {
        setStep('calculating');

        try {
            // Using dynamic import to avoid server-action issues in client component if strict separation needed
            // But standard Next.js actions work fine.
            const { generateKit } = await import('@/app/actions/generateKit');
            const result = await generateKit(formData);

            if (result.error) {
                console.warn("AI generation failed or key missing, falling back to local logic.", result.error);
                setRecommendedItems([]); // Empty triggers local fallback in KitRecommendation
            } else {
                setRecommendedItems(result.items);
            }
        } catch (e) {
            console.error("Error calling AI agent:", e);
            setRecommendedItems([]);
        }

        setStep('recommended');
    };

    // Render logic for flow
    const renderCurrentStep = () => {
        switch (step) {
            case 'basic':
                return (
                    <BasicDetails
                        formData={formData}
                        updateFormData={updateFormData}
                        onNext={() => setStep('cycle')}
                    />
                );
            case 'cycle':
                return (
                    <CycleDetails
                        formData={formData}
                        updateFormData={updateFormData}
                        onNext={() => setStep('preference')}
                        onBack={() => setStep('basic')}
                    />
                );
            case 'preference':
                return (
                    <ProductPreference
                        formData={formData}
                        updateFormData={updateFormData}
                        onNext={() => {
                            if (formData.preference === 'pad') {
                                setStep('pad_details');
                            } else {
                                setStep('symptoms');
                            }
                        }}
                        onBack={() => setStep('cycle')}
                    />
                );
            case 'pad_details':
                return (
                    <PadDetails
                        formData={formData}
                        updateFormData={updateFormData}
                        onNext={() => setStep('symptoms')}
                        onBack={() => setStep('preference')}
                    />
                );
            case 'symptoms':
                return (
                    <PeriodSymptoms
                        formData={formData}
                        updateFormData={updateFormData}
                        onNext={() => setStep('health')}
                        onBack={() => {
                            if (formData.preference === 'pad') {
                                setStep('pad_details');
                            } else {
                                setStep('preference');
                            }
                        }}
                    />
                );
            case 'health':
                return (
                    <HealthDetails
                        formData={formData}
                        updateFormData={updateFormData}
                        onNext={handleGenerateKit}
                        onBack={() => setStep('symptoms')}
                    />
                );
            case 'calculating':
                return (
                    <div className="flex flex-col items-center justify-center p-12 text-center animate-in fade-in zoom-in duration-700">
                        <div className="relative mb-6">
                            <div className="w-20 h-20 border-4 border-pink-100 border-t-deepPurple rounded-full animate-spin"></div>
                            <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-deepPurple animate-pulse" size={32} />
                        </div>
                        <h2 className="text-2xl font-poppins font-bold text-gray-800 mb-2">Analyzing your needs...</h2>
                        <p className="text-slate-600 animate-pulse font-medium">
                            Selecting the best {formData.materialPreference === 'organic' ? 'organic ' : ''}products for your comfort.
                        </p>
                    </div>
                );
            case 'recommended':
                return (
                    <KitRecommendation
                        userData={formData}
                        aiRecommendations={recommendedItems}
                        onBack={() => setStep('idle')}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <>
            <Header />
            <main className={`min-h-screen pt-16 bg-cream-50 ${step !== 'idle' ? 'flex flex-col' : ''}`}>
                {step === 'idle' ? (
                    <>
                        {/* Hero Section */}
                        <section className="bg-gradient-hero py-20">
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8 }}
                                >
                                    <h1 className="font-poppins text-4xl md:text-5xl font-bold text-textPrimary mb-6">
                                        Your Period, Fully Personalized
                                    </h1>
                                    <p className="text-xl text-textSecondary max-w-2xl mx-auto mb-10">
                                        Answer a few questions and get a custom care kit delivered to your door.
                                    </p>

                                    <button
                                        onClick={handleStartQuiz}
                                        className="btn-primary inline-flex items-center gap-2 text-lg px-8 py-4"
                                    >
                                        <Sparkles className="w-5 h-5" />
                                        Personalise Kit
                                    </button>
                                </motion.div>
                            </div>
                        </section>

                        {/* Features Section */}
                        <section className="py-20 bg-white">
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                <div className="text-center mb-16">
                                    <h2 className="section-title">Why Personalise?</h2>
                                    <p className="section-subtitle">Because every cycle is unique.</p>
                                </div>

                                <div className="grid md:grid-cols-3 gap-8">
                                    {[
                                        {
                                            icon: Package,
                                            title: "Your Choice of Products",
                                            desc: "Pads, tampons, cups, or period panties - you decide what goes in your box.",
                                        },
                                        {
                                            icon: Flame,
                                            title: "Sensitive Skin Friendly",
                                            desc: "Option for 100% Organic Cotton pads free from chemicals and irritants.",
                                        },
                                        {
                                            icon: Heart,
                                            title: "Tailored to Your Flow",
                                            desc: "We calculate exactly how many heavy/light pads you need based on your cycle.",
                                        },
                                    ].map((feature, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: index * 0.1 }}
                                            className="text-center p-6"
                                        >
                                            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-lavender-200 to-peach-200 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                                                <feature.icon className="w-8 h-8 text-deepPurple" />
                                            </div>
                                            <h3 className="font-poppins text-xl font-semibold text-textPrimary mb-3">
                                                {feature.title}
                                            </h3>
                                            <p className="text-textSecondary leading-relaxed">{feature.desc}</p>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </section>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col justify-center py-12 px-4">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={step}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className="w-full"
                            >
                                {renderCurrentStep()}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                )}
            </main>
            {step === 'idle' && <Footer />}
        </>
    );
}
