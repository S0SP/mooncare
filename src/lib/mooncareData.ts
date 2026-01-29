export const ALL_POTENTIAL_ITEMS = [
    // --- PADS (Standard) ---
    { id: 'pad_std_h_L', name: 'Standard Heavy Pad (L)', description: 'Max protection, L size.', price: 14, type: 'pad', variant: 'heavy', material: 'standard', size: 'L', image: 'https://loremflickr.com/400/400/sanitary,pad?random=1' },
    { id: 'pad_std_m_L', name: 'Standard Medium Pad (L)', description: 'Balanced flow, L size.', price: 10, type: 'pad', variant: 'medium', material: 'standard', size: 'L', image: 'https://loremflickr.com/400/400/sanitary,pad?random=2' },
    { id: 'pad_std_l_L', name: 'Standard Light Pad (L)', description: 'Light flow, L size.', price: 8, type: 'pad', variant: 'light', material: 'standard', size: 'L', image: 'https://loremflickr.com/400/400/sanitary,pad?random=3' },
    { id: 'pad_std_h_XL', name: 'Standard Heavy Pad (XL)', description: 'Max protection, XL size.', price: 16, type: 'pad', variant: 'heavy', material: 'standard', size: 'XL', image: 'https://loremflickr.com/400/400/sanitary,pad?random=4' },
    { id: 'pad_std_m_XL', name: 'Standard Medium Pad (XL)', description: 'Balanced flow, XL size.', price: 12, type: 'pad', variant: 'medium', material: 'standard', size: 'XL', image: 'https://loremflickr.com/400/400/sanitary,pad?random=5' },
    { id: 'pad_std_l_XL', name: 'Standard Light Pad (XL)', description: 'Light flow, XL size.', price: 9, type: 'pad', variant: 'light', material: 'standard', size: 'XL', image: 'https://loremflickr.com/400/400/sanitary,pad?random=6' },
    { id: 'pad_std_h_XXL', name: 'Standard Heavy Pad (XXL)', description: 'Max protection, XXL size.', price: 18, type: 'pad', variant: 'heavy', material: 'standard', size: 'XXL', image: 'https://loremflickr.com/400/400/sanitary,pad?random=7' },
    { id: 'pad_std_m_XXL', name: 'Standard Medium Pad (XXL)', description: 'Balanced flow, XXL size.', price: 14, type: 'pad', variant: 'medium', material: 'standard', size: 'XXL', image: 'https://loremflickr.com/400/400/sanitary,pad?random=8' },
    { id: 'pad_std_l_XXL', name: 'Standard Light Pad (XXL)', description: 'Light flow, XXL size.', price: 10, type: 'pad', variant: 'light', material: 'standard', size: 'XXL', image: 'https://loremflickr.com/400/400/sanitary,pad?random=9' },

    // --- PADS (Organic) ---
    { id: 'pad_org_h_L', name: 'Organic Heavy Pad (L)', description: '100% Cotton, L size.', price: 20, type: 'pad', variant: 'heavy', material: 'organic', size: 'L', image: 'https://loremflickr.com/400/400/organic,cotton,pad?random=10' },
    { id: 'pad_org_m_L', name: 'Organic Medium Pad (L)', description: '100% Cotton, L size.', price: 16, type: 'pad', variant: 'medium', material: 'organic', size: 'L', image: 'https://loremflickr.com/400/400/organic,cotton,pad?random=11' },
    { id: 'pad_org_l_L', name: 'Organic Light Pad (L)', description: '100% Cotton, L size.', price: 12, type: 'pad', variant: 'light', material: 'organic', size: 'L', image: 'https://loremflickr.com/400/400/organic,cotton,pad?random=12' },
    { id: 'pad_org_h_XL', name: 'Organic Heavy Pad (XL)', description: '100% Cotton, XL size.', price: 22, type: 'pad', variant: 'heavy', material: 'organic', size: 'XL', image: 'https://loremflickr.com/400/400/organic,cotton,pad?random=13' },
    { id: 'pad_org_m_XL', name: 'Organic Medium Pad (XL)', description: '100% Cotton, XL size.', price: 18, type: 'pad', variant: 'medium', material: 'organic', size: 'XL', image: 'https://loremflickr.com/400/400/organic,cotton,pad?random=14' },
    { id: 'pad_org_l_XL', name: 'Organic Light Pad (XL)', description: '100% Cotton, XL size.', price: 14, type: 'pad', variant: 'light', material: 'organic', size: 'XL', image: 'https://loremflickr.com/400/400/organic,cotton,pad?random=15' },
    { id: 'pad_org_h_XXL', name: 'Organic Heavy Pad (XXL)', description: '100% Cotton, XXL size.', price: 25, type: 'pad', variant: 'heavy', material: 'organic', size: 'XXL', image: 'https://loremflickr.com/400/400/organic,cotton,pad?random=16' },
    { id: 'pad_org_m_XXL', name: 'Organic Medium Pad (XXL)', description: '100% Cotton, XXL size.', price: 20, type: 'pad', variant: 'medium', material: 'organic', size: 'XXL', image: 'https://loremflickr.com/400/400/organic,cotton,pad?random=17' },
    { id: 'pad_org_l_XXL', name: 'Organic Light Pad (XXL)', description: '100% Cotton, XXL size.', price: 15, type: 'pad', variant: 'light', material: 'organic', size: 'XXL', image: 'https://loremflickr.com/400/400/organic,cotton,pad?random=18' },

    // --- TAMPONS ---
    { id: 'tamp_reg', name: 'Regular Tampons', description: 'For medium to heavy flow.', price: 15, type: 'tampon', defaultQty: 10, image: 'https://loremflickr.com/400/400/tampon?random=19' },

    // --- CUP ---
    { id: 'cup_std', name: 'Menstrual Cup', description: 'Medical grade silicone, reusable.', price: 400, type: 'cup', defaultQty: 1, image: 'https://loremflickr.com/400/400/menstrual,cup?random=20' },

    // --- PANTIES ---
    { id: 'panty_std', name: 'Period Panty', description: 'Leak-proof, washable.', price: 500, type: 'panty', defaultQty: 2, image: 'https://loremflickr.com/400/400/underwear?random=21' },

    // --- ADD ONS ---
    { id: 4, name: '2 Herbal Tea Sachets', description: 'Soothing blend to reduce bloating.', price: 40, defaultQty: 1, type: 'tea', image: 'https://loremflickr.com/400/400/herbal,tea?random=22' },
    { id: 5, name: 'Cramp Relief Patches', description: 'Fast-acting long-lasting relief.', price: 55, defaultQty: 2, type: 'relief', image: 'https://loremflickr.com/400/400/pink,pattern?random=23' },
    { id: 6, name: 'Dark Chocolate', description: 'Rich 70% cocoa for mood enhancement.', price: 70, defaultQty: 1, type: 'treat', image: 'https://loremflickr.com/400/400/dark,chocolate?random=24' },
    { id: 8, name: 'Herbal Supplement', description: 'Natural hormone balance support.', price: 65, defaultQty: 1, type: 'supplement', image: 'https://loremflickr.com/400/400/vitamins?random=25' },
    { id: 7, name: 'V-Wash', description: 'Gentle pH-balanced intimate cleanser.', price: 56, defaultQty: 1, type: 'hygiene', image: 'https://loremflickr.com/400/400/skincare,product?random=26' },
    { id: 9, name: 'Hygiene Wipes', description: 'Quick refreshing cleanse on the go.', price: 40, defaultQty: 1, type: 'hygiene', image: 'https://loremflickr.com/400/400/wet,wipes?random=27' },
    { id: 10, name: 'Acne Patches', description: 'Hydrocolloid patches for clear skin.', price: 7, defaultQty: 1, type: 'skincare', image: 'https://loremflickr.com/400/400/face,mask?random=28' },
    { id: 11, name: 'Diet Chart', description: 'Personalized nutrition for your cycle.', price: 15, defaultQty: 1, isLocked: true, type: 'digital', image: 'https://loremflickr.com/400/400/healthy,food?random=29' },
];

export const ICONS_MAP: any = {
    'pad': 'Droplets',
    'tampon': 'Pill',
    'cup': 'GlassWater',
    'panty': 'ShieldCheck',
    'tea': 'Coffee',
    'relief': 'Zap',
    'treat': 'Cherry',
    'supplement': 'Pill',
    'hygiene': 'Sparkles',
    'skincare': 'Sparkles',
    'digital': 'ClipboardList'
};
