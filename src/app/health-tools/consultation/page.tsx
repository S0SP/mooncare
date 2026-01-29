"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
    Stethoscope,
    Calendar,
    Clock,
    Video,
    MessageCircle,
    Star,
    CheckCircle,
    Award,
    Heart,
    Brain,
    Activity,
    UtensilsCrossed,
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

const expertTypes = [
    {
        id: "gynecologist",
        icon: Stethoscope,
        title: "Gynecologist",
        description: "Women's reproductive health specialists",
        color: "from-pink-500 to-rose-500"
    },
    {
        id: "nutritionist",
        icon: UtensilsCrossed,
        title: "Nutritionist",
        description: "Personalized diet and meal planning",
        color: "from-green-500 to-emerald-500"
    },
    {
        id: "counselor",
        icon: Brain,
        title: "Mental Health Counselor",
        description: "Emotional and psychological support",
        color: "from-purple-500 to-violet-500"
    },
    {
        id: "fitness",
        icon: Activity,
        title: "Fitness Coach",
        description: "Cycle-synced workout planning",
        color: "from-blue-500 to-cyan-500"
    }
];

const experts = [
    {
        id: 1,
        name: "Dr. Priya Sharma",
        specialty: "Gynecologist",
        experience: "15+ years",
        rating: 4.9,
        reviews: 230,
        languages: ["English", "Hindi"],
        available: true,
        fee: "₹800",
        image: "👩‍⚕️"
    },
    {
        id: 2,
        name: "Dr. Anjali Mehta",
        specialty: "Gynecologist",
        experience: "12+ years",
        rating: 4.8,
        reviews: 180,
        languages: ["English", "Hindi", "Gujarati"],
        available: true,
        fee: "₹750",
        image: "👩‍⚕️"
    },
    {
        id: 3,
        name: "Riya Patel",
        specialty: "Nutritionist",
        experience: "8+ years",
        rating: 4.7,
        reviews: 150,
        languages: ["English", "Hindi"],
        available: false,
        fee: "₹500",
        image: "👩‍🔬"
    },
    {
        id: 4,
        name: "Dr. Meera Reddy",
        specialty: "Mental Health Counselor",
        experience: "10+ years",
        rating: 4.9,
        reviews: 200,
        languages: ["English", "Hindi", "Telugu"],
        available: true,
        fee: "₹600",
        image: "👩‍⚕️"
    }
];

export default function ConsultationPage() {
    const [selectedType, setSelectedType] = useState<string>("gynecologist");
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTime, setSelectedTime] = useState("");

    const filteredExperts = experts.filter(
        e => e.specialty.toLowerCase() === selectedType.toLowerCase()
    );

    return (
        <>
            <Header />
            <main className="pt-16 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 min-h-screen">
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
                                <Stethoscope className="w-4 h-4" />
                                Expert Consultation
                            </span>
                        </motion.div>
                        <motion.h1
                            variants={fadeInUp}
                            className="font-poppins text-4xl sm:text-5xl font-bold text-textPrimary mb-4"
                        >
                            Talk to <span className="gradient-text">Health Experts</span>
                        </motion.h1>
                        <motion.p variants={fadeInUp} className="text-lg text-textSecondary max-w-2xl mx-auto">
                            Book sessions with certified health professionals for personalized care
                        </motion.p>
                    </motion.div>

                    {/* Expert Type Selection */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={stagger}
                        className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
                    >
                        {expertTypes.map((type) => (
                            <motion.button
                                key={type.id}
                                variants={fadeInUp}
                                onClick={() => setSelectedType(type.id)}
                                className={`p-6 rounded-2xl transition-all ${selectedType === type.id
                                        ? "bg-white shadow-hover border-2 border-purple-500"
                                        : "bg-white/60 shadow-card border-2 border-transparent hover:border-purple-200"
                                    }`}
                            >
                                <div className={`w-14 h-14 mx-auto bg-gradient-to-br ${type.color} rounded-xl flex items-center justify-center mb-4`}>
                                    <type.icon className="w-7 h-7 text-white" />
                                </div>
                                <h3 className="font-semibold text-textPrimary mb-1">{type.title}</h3>
                                <p className="text-sm text-textSecondary">{type.description}</p>
                            </motion.button>
                        ))}
                    </motion.div>

                    {/* Experts List */}
                    <div className="grid lg:grid-cols-2 gap-6">
                        {filteredExperts.map((expert, index) => (
                            <motion.div
                                key={expert.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white rounded-3xl p-6 shadow-card"
                            >
                                <div className="flex gap-4 mb-4">
                                    <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center text-4xl">
                                        {expert.image}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-poppins text-xl font-semibold text-textPrimary mb-1">
                                            {expert.name}
                                        </h3>
                                        <p className="text-sm text-textSecondary mb-2">{expert.specialty}</p>
                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center gap-1">
                                                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                                <span className="text-sm font-medium">{expert.rating}</span>
                                                <span className="text-xs text-textSecondary">({expert.reviews})</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Award className="w-4 h-4 text-purple-500" />
                                                <span className="text-xs text-textSecondary">{expert.experience}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-3 mb-4">
                                    <div className="flex items-center gap-2 text-sm text-textSecondary">
                                        <MessageCircle className="w-4 h-4 text-purple-500" />
                                        <span>{expert.languages.join(", ")}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                        {expert.available ? (
                                            <>
                                                <div className="w-2 h-2 bg-green-500 rounded-full" />
                                                <span className="text-green-600 font-medium">Available Today</span>
                                            </>
                                        ) : (
                                            <>
                                                <div className="w-2 h-2 bg-gray-400 rounded-full" />
                                                <span className="text-gray-600">Next Available: Tomorrow</span>
                                            </>
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                    <div>
                                        <p className="text-sm text-textSecondary">Consultation Fee</p>
                                        <p className="text-2xl font-bold text-textPrimary">{expert.fee}</p>
                                    </div>
                                    <button className="btn-primary flex items-center gap-2">
                                        <Calendar className="w-4 h-4" />
                                        Book Now
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Consultation Types */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={stagger}
                        className="mt-12 bg-white rounded-3xl p-8 shadow-card"
                    >
                        <h2 className="font-poppins text-2xl font-semibold text-textPrimary mb-6 text-center">
                            How Consultations Work
                        </h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="text-center">
                                <div className="w-16 h-16 mx-auto bg-blue-100 rounded-2xl flex items-center justify-center mb-4">
                                    <Video className="w-8 h-8 text-blue-600" />
                                </div>
                                <h3 className="font-semibold text-textPrimary mb-2">Video Consultation</h3>
                                <p className="text-sm text-textSecondary">
                                    Face-to-face consultation from the comfort of your home
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="w-16 h-16 mx-auto bg-green-100 rounded-2xl flex items-center justify-center mb-4">
                                    <MessageCircle className="w-8 h-8 text-green-600" />
                                </div>
                                <h3 className="font-semibold text-textPrimary mb-2">Chat Consultation</h3>
                                <p className="text-sm text-textSecondary">
                                    Text-based consultation with detailed responses
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="w-16 h-16 mx-auto bg-purple-100 rounded-2xl flex items-center justify-center mb-4">
                                    <Clock className="w-8 h-8 text-purple-600" />
                                </div>
                                <h3 className="font-semibold text-textPrimary mb-2">Follow-up Support</h3>
                                <p className="text-sm text-textSecondary">
                                    Free follow-up messages for 7 days after consultation
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Trust Indicators */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={stagger}
                        className="mt-12 grid md:grid-cols-4 gap-6"
                    >
                        {[
                            { icon: CheckCircle, text: "100% Verified Experts" },
                            { icon: Award, text: "Certified Professionals" },
                            { icon: Heart, text: "Compassionate Care" },
                            { icon: Sparkles, text: "AI-Matched Experts" }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                variants={fadeInUp}
                                className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-6 text-white text-center"
                            >
                                <item.icon className="w-8 h-8 mx-auto mb-2" />
                                <p className="font-medium">{item.text}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </main>
            <Footer />
        </>
    );
}
