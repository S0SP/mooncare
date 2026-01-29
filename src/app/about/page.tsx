"use client";

import { motion } from "framer-motion";
import {
    Heart,
    Target,
    Users,
    Leaf,
    Scale,
    Sparkles,
    Linkedin,
    ArrowRight
} from "lucide-react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
    visible: { transition: { staggerChildren: 0.15 } },
};

const team = [
    {
        name: "Shreshtha Sharma",
        role: "CEO",
        specialty: "Pitch & Product Planning",
        color: "from-lavender-200 to-lavender-300",
    },
    {
        name: "Sumit Chourasia",
        role: "CTO",
        specialty: "Tech Lead & Innovation",
        color: "from-peach-200 to-peach-300",
    },
    {
        name: "Rupsa Dutta",
        role: "COO",
        specialty: "Operations & Feasibility",
        color: "from-softpink-200 to-softpink-300",
    },
    {
        name: "Shakshi Singh",
        role: "CFO",
        specialty: "Finance & Record",
        color: "from-sage/30 to-sage/50",
    },
];

const sdgs = [
    {
        number: 3,
        title: "Good Health & Wellbeing",
        description: "Reducing period pain and improving menstrual health outcomes for millions of women",
        color: "bg-sage",
        metrics: "70% reduction in unprepared periods",
    },
    {
        number: 5,
        title: "Gender Equality",
        description: "Empowering women with body intelligence and removing the stigma around menstruation",
        color: "bg-coral",
        metrics: "Menstrual dignity for all",
    },
    {
        number: 12,
        title: "Responsible Consumption",
        description: "Need-based product delivery reduces waste from unused or over-purchased products",
        color: "bg-deepPurple",
        metrics: "30% less product waste",
    },
];

export default function AboutPage() {
    return (
        <>
            <Header />
            <main className="pt-16">
                {/* Hero Section */}
                <section className="bg-gradient-hero py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={stagger}
                        >
                            <motion.h1
                                variants={fadeInUp}
                                className="font-poppins text-4xl md:text-5xl font-bold text-textPrimary mb-6"
                            >
                                About MoonCare
                            </motion.h1>
                            <motion.p
                                variants={fadeInUp}
                                className="text-xl text-textSecondary max-w-3xl mx-auto"
                            >
                                We&apos;re on a mission to transform how women experience their menstrual cycles —
                                from uncertainty to empowerment, from pain to prepared.
                            </motion.p>
                        </motion.div>
                    </div>
                </section>

                {/* Mission Section */}
                <section className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={stagger}
                            className="grid lg:grid-cols-2 gap-12 items-center"
                        >
                            <div>
                                <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 bg-lavender-100 text-deepPurple px-4 py-2 rounded-full mb-6">
                                    <Target className="w-5 h-5" />
                                    Our Mission
                                </motion.div>
                                <motion.h2 variants={fadeInUp} className="section-title mb-6">
                                    To reduce stress, discomfort, and uncertainty around menstruation
                                </motion.h2>
                                <motion.p variants={fadeInUp} className="text-textSecondary text-lg mb-8">
                                    Through predictive intelligence and personalized care, we&apos;re giving women
                                    the power to understand their bodies and prepare for every cycle —
                                    especially those with PCOS, PCOD, and irregular periods who need it most.
                                </motion.p>

                                <motion.div variants={fadeInUp} className="space-y-4">
                                    {[
                                        { icon: Heart, text: "Empathetic, women-first approach" },
                                        { icon: Sparkles, text: "Science-backed technology" },
                                        { icon: Users, text: "Built by women, for women" },
                                    ].map((item, index) => (
                                        <div key={index} className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-lavender-100 rounded-lg flex items-center justify-center">
                                                <item.icon className="w-5 h-5 text-deepPurple" />
                                            </div>
                                            <span className="text-textPrimary font-medium">{item.text}</span>
                                        </div>
                                    ))}
                                </motion.div>
                            </div>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                className="relative"
                            >
                                <div className="bg-gradient-to-br from-lavender-100 to-peach-100 rounded-3xl p-8 md:p-12">
                                    <blockquote className="text-center">
                                        <p className="font-poppins text-2xl md:text-3xl font-semibold text-textPrimary mb-6 leading-relaxed">
                                            &ldquo;Your body knows. We help you listen.&rdquo;
                                        </p>
                                        <div className="w-16 h-1 bg-deepPurple mx-auto rounded-full" />
                                    </blockquote>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </section>

                {/* SDG Alignment Section */}
                <section id="impact" className="py-20 bg-gradient-to-b from-cream-100 to-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={stagger}
                            className="text-center mb-16"
                        >
                            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 bg-deepPurple/10 text-deepPurple px-4 py-2 rounded-full mb-4">
                                <Leaf className="w-5 h-5" />
                                Social Impact
                            </motion.div>
                            <motion.h2 variants={fadeInUp} className="section-title">
                                Aligned with UN Sustainable Development Goals
                            </motion.h2>
                            <motion.p variants={fadeInUp} className="section-subtitle">
                                Making a real difference in women&apos;s health and sustainability
                            </motion.p>
                        </motion.div>

                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={stagger}
                            className="grid md:grid-cols-3 gap-8"
                        >
                            {sdgs.map((sdg, index) => (
                                <motion.div
                                    key={index}
                                    variants={fadeInUp}
                                    className="bg-white rounded-3xl p-8 shadow-card hover:shadow-hover transition-shadow"
                                >
                                    <div className={`w-16 h-16 ${sdg.color} rounded-2xl flex items-center justify-center mb-6`}>
                                        <span className="text-white font-poppins font-bold text-2xl">{sdg.number}</span>
                                    </div>
                                    <h3 className="font-poppins text-xl font-semibold text-textPrimary mb-3">
                                        {sdg.title}
                                    </h3>
                                    <p className="text-textSecondary mb-4">{sdg.description}</p>
                                    <div className="bg-cream-100 rounded-xl px-4 py-2 inline-block">
                                        <span className="text-sm font-medium text-deepPurple">{sdg.metrics}</span>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* Team Section */}
                <section id="team" className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={stagger}
                            className="text-center mb-16"
                        >
                            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 bg-peach-200 text-coral px-4 py-2 rounded-full mb-4">
                                <Users className="w-5 h-5" />
                                Our Team
                            </motion.div>
                            <motion.h2 variants={fadeInUp} className="section-title">
                                Meet the Visionaries
                            </motion.h2>
                            <motion.p variants={fadeInUp} className="section-subtitle">
                                Passionate individuals committed to women&apos;s health innovation
                            </motion.p>
                        </motion.div>

                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={stagger}
                            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8"
                        >
                            {team.map((member, index) => (
                                <motion.div
                                    key={index}
                                    variants={fadeInUp}
                                    className="text-center group"
                                >
                                    <div className={`w-32 h-32 mx-auto mb-6 bg-gradient-to-br ${member.color} rounded-full flex items-center justify-center group-hover:scale-105 transition-transform`}>
                                        <span className="text-4xl font-poppins font-bold text-deepPurple/70">
                                            {member.name.charAt(0)}
                                        </span>
                                    </div>
                                    <h3 className="font-poppins text-xl font-semibold text-textPrimary mb-1">
                                        {member.name}
                                    </h3>
                                    <p className="text-deepPurple font-medium mb-2">{member.role}</p>
                                    <p className="text-textSecondary text-sm mb-4">{member.specialty}</p>
                                    <a
                                        href="#"
                                        className="inline-flex items-center justify-center w-10 h-10 bg-lavender-100 rounded-full hover:bg-deepPurple hover:text-white transition-colors"
                                    >
                                        <Linkedin className="w-5 h-5" />
                                    </a>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* Values Section */}
                <section className="py-20 bg-gradient-to-b from-cream-100 to-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={stagger}
                            className="text-center mb-16"
                        >
                            <motion.h2 variants={fadeInUp} className="section-title">
                                Our Core Values
                            </motion.h2>
                        </motion.div>

                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={stagger}
                            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
                        >
                            {[
                                { icon: Heart, title: "Empathy First", desc: "We understand because we care" },
                                { icon: Sparkles, title: "Innovation", desc: "Science-backed solutions" },
                                { icon: Scale, title: "Accessibility", desc: "Quality care for everyone" },
                                { icon: Users, title: "Community", desc: "Women supporting women" },
                            ].map((value, index) => (
                                <motion.div
                                    key={index}
                                    variants={fadeInUp}
                                    className="bg-white rounded-2xl p-6 text-center shadow-soft hover:shadow-card transition-shadow"
                                >
                                    <div className="w-14 h-14 mx-auto bg-lavender-100 rounded-xl flex items-center justify-center mb-4">
                                        <value.icon className="w-7 h-7 text-deepPurple" />
                                    </div>
                                    <h3 className="font-poppins font-semibold text-textPrimary mb-2">{value.title}</h3>
                                    <p className="text-textSecondary text-sm">{value.desc}</p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20 bg-gradient-cta">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={stagger}
                        >
                            <motion.h2 variants={fadeInUp} className="font-poppins text-3xl md:text-4xl font-bold mb-6">
                                Join the MoonCare Movement
                            </motion.h2>
                            <motion.p variants={fadeInUp} className="text-white/80 text-lg mb-10">
                                Be part of the revolution in women&apos;s menstrual health
                            </motion.p>
                            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    href="/kits"
                                    className="bg-white text-deepPurple font-semibold py-3 px-8 rounded-xl hover:bg-cream-100 transition-colors inline-flex items-center justify-center gap-2"
                                >
                                    Get Started <ArrowRight className="w-5 h-5" />
                                </Link>
                                <a
                                    href="mailto:hello@mooncare.in"
                                    className="border-2 border-white text-white font-semibold py-3 px-8 rounded-xl hover:bg-white/10 transition-colors"
                                >
                                    Contact Us
                                </a>
                            </motion.div>
                        </motion.div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
