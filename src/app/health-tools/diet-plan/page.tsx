"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
    UtensilsCrossed,
    Calendar,
    Apple,
    Fish,
    Salad,
    Coffee,
    Droplet,
    Moon,
    Sun,
    Heart,
    Activity,
    Sparkles,
    CheckCircle,
    Download,
    ShoppingCart,
    Clock,
    Target
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

const cyclePhases = [
    {
        id: "menstrual",
        name: "Menstrual Phase",
        days: "1-5",
        icon: Droplet,
        color: "red",
        focus: "Iron & Protein",
        description: "Replenish nutrients lost during menstruation"
    },
    {
        id: "follicular",
        name: "Follicular Phase",
        days: "6-14",
        icon: Sun,
        color: "yellow",
        focus: "Complex Carbs & Protein",
        description: "Fuel rising energy levels"
    },
    {
        id: "ovulation",
        name: "Ovulation",
        days: "14-16",
        icon: Heart,
        color: "pink",
        focus: "Antioxidants & Fiber",
        description: "Support hormonal balance"
    },
    {
        id: "luteal",
        name: "Luteal Phase",
        days: "17-28",
        icon: Moon,
        color: "purple",
        focus: "Calcium & B Vitamins",
        description: "Manage PMS symptoms"
    }
];

const sampleMealPlan = {
    menstrual: {
        breakfast: ["Spinach omelette with whole grain toast", "Iron-fortified cereal with berries", "Green smoothie with chia seeds"],
        lunch: ["Grilled chicken with quinoa and vegetables", "Lentil soup with whole grain bread", "Salmon salad with avocado"],
        dinner: ["Lean beef stir-fry with brown rice", "Tofu curry with vegetables", "Grilled fish with roasted vegetables"],
        snacks: ["Dark chocolate", "Nuts and seeds", "Greek yogurt with berries"]
    },
    follicular: {
        breakfast: ["Overnight oats with nuts and fruits", "Whole grain pancakes with berries", "Egg white scramble with vegetables"],
        lunch: ["Chicken breast with sweet potato", "Turkey wrap with vegetables", "Quinoa bowl with chickpeas"],
        dinner: ["Grilled fish with brown rice", "Lean meat with roasted vegetables", "Vegetable stir-fry with tofu"],
        snacks: ["Fresh fruits", "Hummus with vegetables", "Protein smoothie"]
    },
    ovulation: {
        breakfast: ["Berry smoothie bowl", "Avocado toast with eggs", "Greek yogurt parfait"],
        lunch: ["Colorful salad with grilled chicken", "Vegetable soup with legumes", "Salmon with mixed greens"],
        dinner: ["Grilled vegetables with quinoa", "Baked fish with asparagus", "Chickpea curry"],
        snacks: ["Fresh berries", "Mixed nuts", "Vegetable sticks with hummus"]
    },
    luteal: {
        breakfast: ["Banana smoothie with almond butter", "Whole grain toast with avocado", "Oatmeal with dried fruits"],
        lunch: ["Turkey with sweet potato", "Chickpea salad", "Grilled chicken with vegetables"],
        dinner: ["Salmon with quinoa", "Vegetable pasta", "Lean meat with greens"],
        snacks: ["Dark chocolate", "Trail mix", "Cheese with crackers"]
    }
};

const pcosGuidelines = [
    {
        icon: CheckCircle,
        title: "Low Glycemic Index",
        description: "Choose foods that don't spike blood sugar"
    },
    {
        icon: Heart,
        title: "Anti-inflammatory",
        description: "Include omega-3 rich foods and antioxidants"
    },
    {
        icon: Activity,
        title: "Balanced Macros",
        description: "Optimal protein, healthy fats, and complex carbs"
    },
    {
        icon: Sparkles,
        title: "Nutrient Dense",
        description: "Focus on whole foods rich in vitamins and minerals"
    }
];

export default function DietPlanPage() {
    const [selectedPhase, setSelectedPhase] = useState<string>("menstrual");
    const [isPCOS, setIsPCOS] = useState(false);

    const currentMealPlan = sampleMealPlan[selectedPhase as keyof typeof sampleMealPlan];

    return (
        <>
            <Header />
            <main className="pt-16 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 min-h-screen">
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
                                <UtensilsCrossed className="w-4 h-4" />
                                Personalized Nutrition
                            </span>
                        </motion.div>
                        <motion.h1
                            variants={fadeInUp}
                            className="font-poppins text-4xl sm:text-5xl font-bold text-textPrimary mb-4"
                        >
                            Cycle-Based <span className="gradient-text">Diet Plan</span>
                        </motion.h1>
                        <motion.p variants={fadeInUp} className="text-lg text-textSecondary max-w-2xl mx-auto">
                            Personalized meal plans that sync with your menstrual cycle for optimal health
                        </motion.p>
                    </motion.div>

                    {/* PCOS Toggle */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-md mx-auto mb-8"
                    >
                        <div className="bg-white rounded-2xl p-4 shadow-card flex items-center justify-between">
                            <span className="font-medium text-textPrimary">PCOS-Friendly Plan</span>
                            <button
                                onClick={() => setIsPCOS(!isPCOS)}
                                className={`relative w-14 h-7 rounded-full transition-colors ${isPCOS ? "bg-purple-500" : "bg-gray-300"
                                    }`}
                            >
                                <div
                                    className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform ${isPCOS ? "translate-x-8" : "translate-x-1"
                                        }`}
                                />
                            </button>
                        </div>
                    </motion.div>

                    {/* Cycle Phase Selection */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={stagger}
                        className="grid md:grid-cols-4 gap-4 mb-12"
                    >
                        {cyclePhases.map((phase) => (
                            <motion.button
                                key={phase.id}
                                variants={fadeInUp}
                                onClick={() => setSelectedPhase(phase.id)}
                                className={`p-6 rounded-2xl transition-all ${selectedPhase === phase.id
                                        ? `bg-white shadow-hover border-2 border-${phase.color}-500`
                                        : "bg-white/60 shadow-card border-2 border-transparent hover:border-gray-200"
                                    }`}
                            >
                                <div className={`w-12 h-12 mx-auto bg-${phase.color}-100 rounded-xl flex items-center justify-center mb-3`}>
                                    <phase.icon className={`w-6 h-6 text-${phase.color}-600`} />
                                </div>
                                <h3 className="font-semibold text-textPrimary mb-1 text-sm">{phase.name}</h3>
                                <p className="text-xs text-textSecondary mb-2">Days {phase.days}</p>
                                <div className="text-xs font-medium text-purple-600">{phase.focus}</div>
                            </motion.button>
                        ))}
                    </motion.div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Meal Plan */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Daily Meal Plan */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white rounded-3xl p-8 shadow-card"
                            >
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="font-poppins text-2xl font-semibold text-textPrimary flex items-center gap-2">
                                        <Calendar className="w-6 h-6 text-green-500" />
                                        Today's Meal Plan
                                    </h2>
                                    <button className="text-sm font-medium text-purple-600 flex items-center gap-2 hover:text-purple-700">
                                        <Download className="w-4 h-4" />
                                        Download
                                    </button>
                                </div>

                                <div className="space-y-6">
                                    {/* Breakfast */}
                                    <div>
                                        <div className="flex items-center gap-2 mb-3">
                                            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                                                <Coffee className="w-5 h-5 text-yellow-600" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-textPrimary">Breakfast</h3>
                                                <p className="text-xs text-textSecondary">7:00 - 9:00 AM</p>
                                            </div>
                                        </div>
                                        <div className="space-y-2 pl-12">
                                            {currentMealPlan.breakfast.map((meal, index) => (
                                                <div key={index} className="flex items-center gap-2 text-sm text-textSecondary">
                                                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                                                    <span>{meal}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Lunch */}
                                    <div>
                                        <div className="flex items-center gap-2 mb-3">
                                            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                                                <Salad className="w-5 h-5 text-orange-600" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-textPrimary">Lunch</h3>
                                                <p className="text-xs text-textSecondary">12:00 - 2:00 PM</p>
                                            </div>
                                        </div>
                                        <div className="space-y-2 pl-12">
                                            {currentMealPlan.lunch.map((meal, index) => (
                                                <div key={index} className="flex items-center gap-2 text-sm text-textSecondary">
                                                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                                                    <span>{meal}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Dinner */}
                                    <div>
                                        <div className="flex items-center gap-2 mb-3">
                                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                                <Fish className="w-5 h-5 text-blue-600" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-textPrimary">Dinner</h3>
                                                <p className="text-xs text-textSecondary">7:00 - 9:00 PM</p>
                                            </div>
                                        </div>
                                        <div className="space-y-2 pl-12">
                                            {currentMealPlan.dinner.map((meal, index) => (
                                                <div key={index} className="flex items-center gap-2 text-sm text-textSecondary">
                                                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                                                    <span>{meal}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Snacks */}
                                    <div>
                                        <div className="flex items-center gap-2 mb-3">
                                            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                                <Apple className="w-5 h-5 text-green-600" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-textPrimary">Snacks</h3>
                                                <p className="text-xs text-textSecondary">Throughout the day</p>
                                            </div>
                                        </div>
                                        <div className="space-y-2 pl-12">
                                            {currentMealPlan.snacks.map((snack, index) => (
                                                <div key={index} className="flex items-center gap-2 text-sm text-textSecondary">
                                                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                                                    <span>{snack}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* PCOS Guidelines */}
                            {isPCOS && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl p-8 shadow-card text-white"
                                >
                                    <h3 className="font-poppins text-2xl font-semibold mb-6 flex items-center gap-2">
                                        <Sparkles className="w-6 h-6" />
                                        PCOS-Friendly Guidelines
                                    </h3>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        {pcosGuidelines.map((guideline, index) => (
                                            <div key={index} className="bg-white/10 backdrop-blur rounded-xl p-4">
                                                <div className="flex items-start gap-3">
                                                    <guideline.icon className="w-6 h-6 flex-shrink-0" />
                                                    <div>
                                                        <h4 className="font-semibold mb-1">{guideline.title}</h4>
                                                        <p className="text-sm text-white/90">{guideline.description}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {/* Shopping List */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="bg-white rounded-3xl p-8 shadow-card"
                            >
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="font-poppins text-2xl font-semibold text-textPrimary flex items-center gap-2">
                                        <ShoppingCart className="w-6 h-6 text-green-500" />
                                        Shopping List
                                    </h3>
                                    <button className="btn-primary text-sm py-2">
                                        Get Full List
                                    </button>
                                </div>
                                <div className="grid md:grid-cols-3 gap-6">
                                    <div>
                                        <h4 className="font-semibold text-textPrimary mb-3">Proteins</h4>
                                        <ul className="space-y-2 text-sm text-textSecondary">
                                            <li>• Chicken breast</li>
                                            <li>• Salmon</li>
                                            <li>• Eggs</li>
                                            <li>• Greek yogurt</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-textPrimary mb-3">Vegetables</h4>
                                        <ul className="space-y-2 text-sm text-textSecondary">
                                            <li>• Spinach</li>
                                            <li>• Broccoli</li>
                                            <li>• Sweet potatoes</li>
                                            <li>• Avocado</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-textPrimary mb-3">Grains & Others</h4>
                                        <ul className="space-y-2 text-sm text-textSecondary">
                                            <li>• Quinoa</li>
                                            <li>• Brown rice</li>
                                            <li>• Whole grain bread</li>
                                            <li>• Nuts & seeds</li>
                                        </ul>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Nutrition Goals */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="bg-white rounded-3xl p-6 shadow-card"
                            >
                                <h3 className="font-poppins text-lg font-semibold text-textPrimary mb-4 flex items-center gap-2">
                                    <Target className="w-5 h-5 text-purple-500" />
                                    Daily Targets
                                </h3>
                                <div className="space-y-4">
                                    <div>
                                        <div className="flex justify-between text-sm mb-2">
                                            <span className="text-textSecondary">Calories</span>
                                            <span className="font-semibold">1800 / 2000</span>
                                        </div>
                                        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                            <div className="h-full bg-purple-500" style={{ width: "90%" }} />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between text-sm mb-2">
                                            <span className="text-textSecondary">Protein</span>
                                            <span className="font-semibold">60g / 70g</span>
                                        </div>
                                        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                            <div className="h-full bg-green-500" style={{ width: "85%" }} />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between text-sm mb-2">
                                            <span className="text-textSecondary">Water</span>
                                            <span className="font-semibold">2L / 3L</span>
                                        </div>
                                        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                            <div className="h-full bg-blue-500" style={{ width: "67%" }} />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Hydration Reminder */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 }}
                                className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-3xl p-6 shadow-card text-white"
                            >
                                <Droplet className="w-12 h-12 mb-4" />
                                <h3 className="font-poppins text-xl font-semibold mb-2">Stay Hydrated</h3>
                                <p className="text-white/90 text-sm mb-4">
                                    Drink at least 2-3 liters of water daily to support your cycle
                                </p>
                                <button className="w-full bg-white text-blue-600 font-medium py-2 rounded-xl hover:bg-white/90 transition-colors">
                                    Set Reminder
                                </button>
                            </motion.div>

                            {/* Phase Tips */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                                className="bg-white rounded-3xl p-6 shadow-card"
                            >
                                <h3 className="font-poppins text-lg font-semibold text-textPrimary mb-4">
                                    Phase-Specific Tips
                                </h3>
                                <ul className="space-y-2">
                                    <li className="text-sm text-textSecondary flex items-start gap-2">
                                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                                        <span>Focus on iron-rich foods during menstruation</span>
                                    </li>
                                    <li className="text-sm text-textSecondary flex items-start gap-2">
                                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                                        <span>Reduce caffeine to manage PMS</span>
                                    </li>
                                    <li className="text-sm text-textSecondary flex items-start gap-2">
                                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                                        <span>Include omega-3 for hormonal balance</span>
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
