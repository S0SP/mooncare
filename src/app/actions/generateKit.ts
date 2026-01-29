"use server";

import { ALL_POTENTIAL_ITEMS } from "@/lib/mooncareData";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;

export async function generateKit(userData: any) {
    if (!GEMINI_API_KEY) {
        console.error("GEMINI_API_KEY is missing in environment variables.");
        return { error: "Configuration Error: GEMINI_API_KEY is missing. Please add it to your .env file." };
    }

    const prompt = `
    You are an AI assistant for MoonCare, a personalized period care service.
    Your task is to generate a custom kit recommendation for a user based on their profile and available inventory.

    ### Available Inventory (Use ONLY these IDs):
    ${JSON.stringify(ALL_POTENTIAL_ITEMS.map(i => ({ id: i.id, name: i.name, type: i.type, variant: i.variant || 'n/a', material: i.material || 'n/a' })))}

    ### User Profile:
    - Product Preference: ${userData.preference || 'pad'}
    - Pad Size Preference: ${userData.padSize || 'L'}
    - Material Preference: ${userData.materialPreference || 'standard'} (Is Sensitive Skin: ${userData.isSensitive})
    - Cycle Duration: ${userData.periodDuration || 5} days
    - Symptoms: ${userData.symptoms?.join(', ') || 'None'}
    - Allergies: ${userData.allergies || 'None'}
    - Special Requests: ${userData.specialRequest || 'None'}

    ### Instructions:
    1. Select appropriate core products (pads/tampons/cups) based on preferences.
       - If 'pad', choose the correct material (organic vs standard) and size (L/XL/XXL).
       - Calculate quantities based on cycle duration (usually 3-4 pads/day). Recommend Heavy/Medium/Light flow pads appropriately.
       - If 'tampon', select 'tamp_reg'.
       - If 'cup', select 'cup_std'.
    2. Select convenient add-ons based on symptoms.
       - e.g. Cramp Relief Patches for 'cramps'.
       - e.g. V-Wash for 'itching'.
       - e.g. Acne patches for 'acne'.
    3. **CRITICAL**: Filter out items strictly based on Allergies.
       - If user says 'cocoa' or 'chocolate' allergy, DO NOT include Dark Chocolate.
       - If user says 'caffeine' or 'tea' allergy, DO NOT include Tea.
       - Be intelligent about allergens (e.g. 'nuts' usually ok for these items, but check context).
    4. Return valid JSON only. Format:
    {
        "items": [
            { "id": "item_id", "quantity": number, "reason": "short explanation" }
        ]
    }
    `;

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: prompt }]
                }]
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Gemini API Error: ${response.status} - ${errorText}`);
        }

        const data = await response.json();
        const textResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!textResponse) {
            throw new Error("No response from AI.");
        }

        // Clean markdown code blocks if present
        const jsonString = textResponse.replace(/```json/g, '').replace(/```/g, '').trim();
        const result = JSON.parse(jsonString);

        return { items: result.items };

    } catch (error: any) {
        console.error("AI Generation Failed:", error);
        return { error: error.message || "Failed to generate recommendation." };
    }
}
