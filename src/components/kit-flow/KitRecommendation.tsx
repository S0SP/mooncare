"use client";

import React, { useState, useMemo } from 'react';
import { Package, Trash2, Plus, Minus, ArrowLeft, Cherry, Coffee, Sparkles, Droplets, Pill, ShoppingBag, ClipboardList, Zap, PlusCircle, ShieldCheck, GlassWater } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { calculatePadRecommendation } from '@/lib/kitCalculator';

// Icons mapping
const ICONS: any = {
    Droplets: <Droplets className="text-pink-500" />,
    Coffee: <Coffee className="text-amber-600" />,
    Zap: <Zap className="text-teal-500" />,
    Cherry: <Cherry className="text-rose-800" />,
    Pill: <Pill className="text-emerald-500" />,
    Sparkles: <Sparkles className="text-blue-300" />,
    ClipboardList: <ClipboardList className="text-indigo-500" />,
    ShieldCheck: <ShieldCheck className="text-purple-500" />,
    GlassWater: <GlassWater className="text-cyan-500" />,
};

// Expanded Item List supporting all variants
import { ALL_POTENTIAL_ITEMS, ICONS_MAP } from '@/lib/mooncareData';

interface KitRecommendationProps {
    userData: any;
    aiRecommendations?: { id: string | number, quantity: number }[];
    onBack: () => void;
}

export const KitRecommendation = ({ userData, aiRecommendations, onBack }: KitRecommendationProps) => {
    // Initial State Setup
    const [items, setItems] = useState(() => {
        // If AI provided recommendations, use them
        if (aiRecommendations && aiRecommendations.length > 0) {
            return ALL_POTENTIAL_ITEMS
                .filter(item => aiRecommendations.some(r => String(r.id) === String(item.id)))
                .map(item => {
                    const rec = aiRecommendations.find(r => String(r.id) === String(item.id));
                    return { ...item, quantity: rec ? rec.quantity : 1, iconName: (item as any).type ? ICONS_MAP[(item as any).type] : 'Sparkles' };
                });
        }

        // Fallback: Local Logic (Previous implementation)
        const rec = calculatePadRecommendation(userData);
        const { productType, isOrganic, padSize, recommendations } = rec;

        const hasSevereCramps = userData?.symptoms?.includes('cramps');
        const hasAcne = userData?.symptoms?.includes('acne');
        const hasItching = userData?.symptoms?.includes('itching') || userData?.isSensitive;
        const allergies = (userData?.allergies || '').toLowerCase();

        // 1. Select Core Items based on Preference
        const selectedIds: string[] = [];
        const quantityMap: any = {};

        if (productType === 'pad') {
            const material = isOrganic ? 'organic' : 'standard';
            const heavyId = `pad_${material === 'organic' ? 'org' : 'std'}_h_${padSize}`;
            const mediumId = `pad_${material === 'organic' ? 'org' : 'std'}_m_${padSize}`;
            const lightId = `pad_${material === 'organic' ? 'org' : 'std'}_l_${padSize}`;

            selectedIds.push(heavyId, mediumId, lightId);
            quantityMap[heavyId] = recommendations.heavy;
            quantityMap[mediumId] = recommendations.medium;
            quantityMap[lightId] = recommendations.light;

        } else if (productType === 'tampon') {
            const id = 'tamp_reg';
            selectedIds.push(id);
            quantityMap[id] = recommendations.heavy + recommendations.medium;

        } else if (productType === 'cup') {
            const id = 'cup_std';
            selectedIds.push(id);
            quantityMap[id] = 1;

        } else if (productType === 'panty') {
            const id = 'panty_std';
            selectedIds.push(id);
            quantityMap[id] = 3;
        }

        // 2. Select Add-ons
        const potentialAddons = [4, 5, 6, 8, 9];

        potentialAddons.forEach(id => {
            const item = ALL_POTENTIAL_ITEMS.find(i => i.id === id);
            if (!item) return;

            if (id === 6 && allergies.includes('chocolate')) return;
            if (id === 4 && (allergies.includes('tea') || allergies.includes('caffeine'))) return;

            if (id === 5 && hasSevereCramps) {
                selectedIds.push(String(id));
                quantityMap[String(id)] = 4;
            } else {
                selectedIds.push(String(id));
                quantityMap[String(id)] = item.defaultQty || 1;
            }
        });

        if (hasItching) { selectedIds.push(String(7)); quantityMap[String(7)] = 1; }
        if (hasAcne) { selectedIds.push(String(10)); quantityMap[String(10)] = 1; }

        return ALL_POTENTIAL_ITEMS
            .filter(item => selectedIds.includes(String(item.id)))
            .map(item => ({
                ...item,
                quantity: quantityMap[String(item.id)] || item.defaultQty || 1,
                iconName: (item as any).type ? ICONS_MAP[(item as any).type] : 'Sparkles'
            }));
    });

    const [addons, setAddons] = useState(() => {
        const selectedIds = items.map(i => i.id);
        return ALL_POTENTIAL_ITEMS
            .filter(item => !selectedIds.includes(item.id) && typeof item.id === 'number')
            .map(item => ({ ...item, iconName: (item as any).type ? ICONS_MAP[(item as any).type] : 'Sparkles' }));
    });


    const [showSuccess, setShowSuccess] = useState(false);
    const [showCheckout, setShowCheckout] = useState(false);
    const [formData, setFormData] = useState({ name: '', address: '', phone: '', pincode: '' });
    const [formErrors, setFormErrors] = useState<any>({});

    const packagingFee = 80;
    const deliveryFee = 100;

    const updateQuantity = (id: string | number, delta: number) => {
        setItems(prev => prev.map(item => {
            if (item.id === id && !item.isLocked) {
                return { ...item, quantity: Math.max(1, item.quantity + delta) };
            }
            return item;
        }));
    };

    const handleRemoveFromKit = (itemToRemove: any) => {
        setItems(prev => prev.filter(item => item.id !== itemToRemove.id));
        if (typeof itemToRemove.id === 'number') {
            setAddons(prev => [...prev, { ...itemToRemove, quantity: itemToRemove.defaultQty || 1 }]);
        }
    };

    const handleAddToKit = (addonToAdd: any) => {
        setAddons(prev => prev.filter(item => item.id !== addonToAdd.id));
        setItems(prev => [...prev, { ...addonToAdd, quantity: addonToAdd.defaultQty || 1 }]);
    };

    const handleCheckout = () => setShowCheckout(true);

    const handleBuyNow = (e: React.FormEvent) => {
        e.preventDefault();
        const errors: any = {};
        if (!formData.name.trim()) errors.name = 'Name is required';
        if (!formData.address.trim()) errors.address = 'Address is required';
        if (!formData.phone.trim()) errors.phone = 'Phone number is required';
        if (!formData.pincode.trim()) errors.pincode = 'Pincode is required';
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }
        setShowCheckout(false);
        setShowSuccess(true);
    };

    const subtotal = useMemo(() => items.reduce((sum, item) => sum + (item.price * item.quantity), 0), [items]);
    const grandTotal = subtotal + packagingFee + deliveryFee;

    const renderIcon = (iconName: string, size: number = 24) => {
        const IconImpl = ICONS[iconName];
        return IconImpl ? React.cloneElement(IconImpl, { size }) : <Sparkles size={size} />;
    };

    return (
        <div className="w-full max-w-6xl mx-auto p-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <button onClick={onBack} className="flex items-center gap-2 text-gray-500 hover:text-deepPurple transition-colors mb-8 font-medium">
                <ArrowLeft size={20} /> Back to Dashboard
            </button>

            <header className="mb-8">
                <h1 className="text-3xl font-display font-bold text-deepPurple mb-2">Your Personalised Kit</h1>
                <p className="text-slate-600">Curated based on your preferences, sensitivity, and cycle needs.</p>
                {userData.specialRequest && (
                    <div className="mt-4 p-3 bg-yellow-50 text-yellow-800 text-sm rounded-lg inline-block border border-yellow-200">
                        <strong>Note:</strong> We've noted your special request: "{userData.specialRequest}"
                    </div>
                )}
            </header>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Items List */}
                <div className="flex-1 space-y-4">
                    {items.length === 0 ? (
                        <div className="bg-white p-8 rounded-3xl border border-pink-100 text-center space-y-4">
                            <ShoppingBag size={48} className="mx-auto text-pink-200" />
                            <p className="text-slate-500 font-medium">Your kit is empty.</p>
                        </div>
                    ) : (
                        items.map(item => (
                            <div key={item.id} className="bg-white p-4 rounded-2xl border border-pink-50 flex items-center gap-4 transition-all hover:shadow-md hover:border-pink-200">
                                <div className="w-16 h-16 bg-pink-50 rounded-xl flex items-center justify-center shrink-0">
                                    {renderIcon(item.iconName, 32)}
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-gray-800">{item.name}</h3>
                                    <p className="text-xs text-gray-500 mb-1">{item.description}</p>
                                    <p className="text-sm font-bold text-deepPurple">₹{item.price}</p>
                                </div>
                                <div className="flex flex-col items-end gap-2 shrink-0">
                                    {!item.isLocked ? (
                                        <div className="flex items-center gap-3 bg-slate-50 rounded-full px-3 py-1 border border-slate-100">
                                            <button onClick={() => updateQuantity(item.id, -1)} className="text-gray-400 hover:text-deepPurple"><Minus size={16} /></button>
                                            <span className="font-bold text-gray-700 w-4 text-center">{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item.id, 1)} className="text-gray-400 hover:text-deepPurple"><Plus size={16} /></button>
                                        </div>
                                    ) : (
                                        <div className="px-4 py-1 bg-slate-50 text-xs font-bold text-gray-400 italic">Fixed: 1</div>
                                    )}
                                    <button onClick={() => handleRemoveFromKit(item)} className="text-xs text-slate-400 hover:text-red-500 flex items-center gap-1 group">
                                        <Trash2 size={12} /> Remove
                                    </button>
                                </div>
                            </div>
                        ))
                    )}

                    <div className="bg-white p-6 rounded-3xl border border-pink-100 shadow-sm mt-8">
                        <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                            <PlusCircle className="text-coral-500" size={24} /> Recommended Add-Ons
                        </h2>
                        <div className="space-y-4">
                            {addons.map(addon => (
                                <div key={addon.id} className="flex items-center gap-3 p-3 rounded-2xl border border-dashed border-pink-200 hover:border-coral-500 transition-colors group">
                                    <div className="w-10 h-10 bg-pink-50 rounded-lg flex items-center justify-center shrink-0">
                                        {renderIcon(addon.iconName, 20)}
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-sm font-bold text-gray-800">{addon.name}</h4>
                                    </div>
                                    <button onClick={() => handleAddToKit(addon)} className="p-2 text-coral-500 hover:bg-pink-50 rounded-full"><Plus size={20} /></button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Summary Section */}
                <div className="w-full lg:w-96 h-fit space-y-4 lg:sticky lg:top-8">
                    <div className="bg-white p-6 rounded-3xl border border-pink-100 shadow-sm">
                        <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                            <Package className="text-deepPurple" size={24} /> Order Summary
                        </h2>
                        <div className="space-y-4 text-sm font-medium">
                            <div className="flex justify-between text-gray-600"><span>Subtotal</span><span>₹{subtotal}</span></div>
                            <div className="flex justify-between text-gray-600"><span>Packaging</span><span>₹{packagingFee}</span></div>
                            <div className="flex justify-between text-gray-600"><span>Delivery</span><span>₹{deliveryFee}</span></div>
                            <div className="flex justify-between text-lg font-bold text-gray-800 pt-4 border-t border-pink-50">
                                <span>Grand Total</span><span className="text-deepPurple">₹{grandTotal}</span>
                            </div>
                        </div>
                        <button onClick={handleCheckout} className="w-full mt-8 py-4 bg-deepPurple text-white font-bold rounded-2xl shadow-lg hover:bg-deepPurple/90 hover:scale-[1.02] transition-all">
                            Place Order
                        </button>
                    </div>
                </div>
            </div>

            {/* Checkout & Success Modals (Simplified for brevity as they are same as before) */}
            <AnimatePresence>
                {showCheckout && (
                    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="bg-white w-full max-w-md rounded-3xl p-8 shadow-2xl relative">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">Delivery Details</h2>
                            <form onSubmit={handleBuyNow} className="space-y-4">
                                <input type="text" placeholder="Full Name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full p-3 border rounded-xl" />
                                <textarea placeholder="Address" value={formData.address} onChange={e => setFormData({ ...formData, address: e.target.value })} className="w-full p-3 border rounded-xl" />
                                <div className="flex gap-4">
                                    <input type="tel" placeholder="Phone" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} className="w-full p-3 border rounded-xl" />
                                    <input type="text" placeholder="Pincode" value={formData.pincode} onChange={e => setFormData({ ...formData, pincode: e.target.value })} className="w-full p-3 border rounded-xl" />
                                </div>
                                <div className="flex gap-3 pt-4">
                                    <button type="button" onClick={() => setShowCheckout(false)} className="flex-1 py-3 text-gray-500 font-bold hover:bg-gray-50 rounded-xl">Cancel</button>
                                    <button type="submit" className="flex-[2] py-3 bg-deepPurple text-white font-bold rounded-xl shadow-md">Buy Now</button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
            <AnimatePresence>
                {showSuccess && (
                    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
                        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-white w-full max-w-sm rounded-[2rem] p-8 shadow-2xl text-center space-y-6">
                            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto"><Sparkles className="text-green-500" size={40} /></div>
                            <h3 className="text-2xl font-bold text-gray-800">Order Placed!</h3>
                            <button onClick={() => { setShowSuccess(false); onBack(); }} className="w-full py-4 bg-deepPurple text-white font-bold rounded-2xl">Ok</button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};
