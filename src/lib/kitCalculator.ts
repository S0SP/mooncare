/**
 * Refined algorithm to calculate pad recommendation for a starter kit.
 */

export interface KitUserData {
    age?: number;
    heightUnit?: 'cm' | 'ft/in';
    heightValue?: number;
    heightFeet?: number;
    heightInches?: number;
    weightUnit?: 'kg' | 'lb';
    weightValue?: number;
    periodDuration?: number;
    cycleLength?: number;
    preference?: 'pad' | 'tampon' | 'cup' | 'panty';
    padSize?: 'L' | 'XL' | 'XXL';
    isSensitive?: boolean;
    materialPreference?: 'organic' | 'standard'; // standard = "silicone" as per user request
    allergies?: string;
    specialRequest?: string;
    symptoms?: string[];
}

export const calculatePadRecommendation = (userData: KitUserData) => {
    const cycleLength = Math.max(3, Number(userData?.periodDuration) || 5);
    const symptoms = userData?.symptoms || [];

    // 1. Determine Product Type
    const productType = userData.preference || 'pad';

    // 2. Determine Material (Organic vs Standard)
    // "silicone" in user request likely maps to standard synthetic pads
    const isOrganic = userData.materialPreference === 'organic' || userData.isSensitive;

    // 3. Flow Calculation
    let flowType = 'medium';
    if (symptoms.includes('heavy')) flowType = 'heavy';
    else if (symptoms.includes('low')) flowType = 'light';

    // 4. Quantities Calculation (Base)
    let heavyDays = 0, mediumDays = 0, lightDays = 0;
    if (cycleLength === 3) {
        heavyDays = 1; mediumDays = 1; lightDays = 1;
    } else {
        heavyDays = Math.ceil(cycleLength * 0.3);
        mediumDays = Math.ceil(cycleLength * 0.4);
        lightDays = cycleLength - heavyDays - mediumDays;
        if (lightDays < 1) {
            if (heavyDays > 1) heavyDays -= 1;
            else if (mediumDays > 1) mediumDays -= 1;
            lightDays = 1;
        }
    }

    // Base usage per day
    const heavyPerDay = productType === 'tampon' ? 4 : 3;
    const mediumPerDay = productType === 'tampon' ? 3 : 2;
    const lightPerDay = productType === 'tampon' ? 3 : 2;

    let heavyQty = heavyDays * heavyPerDay;
    let mediumQty = mediumDays * mediumPerDay;
    let lightQty = lightDays * lightPerDay;

    // Flow Multipliers
    const multiplier = flowType === 'heavy' ? 1.2 : (flowType === 'light' ? 0.8 : 1.0);
    heavyQty = Math.round(heavyQty * multiplier);
    mediumQty = Math.round(mediumQty * multiplier);
    lightQty = Math.round(lightQty * multiplier);

    // Minimums
    heavyQty = Math.max(1, heavyQty);
    mediumQty = Math.max(1, mediumQty);
    lightQty = Math.max(1, lightQty);

    // Buffers
    mediumQty += 1;
    lightQty += 1;

    // 5. Construct Attributes for Item Matching
    return {
        productType,
        isOrganic,
        padSize: userData.padSize || 'L',
        recommendations: {
            heavy: heavyQty,
            medium: mediumQty,
            light: lightQty,
        }
    };
};
