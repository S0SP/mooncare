import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                // Primary Colors - Updated to match MoonCare theme
                moonPurple: {
                    100: "#F0EDF7",
                    200: "#D9D3EA",
                    300: "#B8AED6",
                    400: "#9789C3",
                    500: "#6B5B95", // Logo purple
                    600: "#5A4D7E",
                    700: "#4A3F68",
                },
                coral: {
                    50: "#FFF8FA",
                    100: "#FFF0F3",
                    200: "#FFE0E8",
                    300: "#FFB8CD",
                    400: "#FF8FAF",
                    500: "#FF6B9D", // Primary pink/coral
                    600: "#E5478A",
                    700: "#CC2D76",
                },
                softPink: {
                    50: "#FFFBFC",
                    100: "#FFF5F7",
                    200: "#FFE5EC",
                    300: "#FFD5E2",
                    400: "#FFC5D8",
                },
                cream: {
                    50: "#FFFEFB",
                    100: "#FFFDFB",
                    200: "#FFF8F0",
                    300: "#FFEEDD",
                },
                // Legacy colors for backward compatibility
                lavender: {
                    100: "#F0EDF7",
                    200: "#D9D3EA",
                    300: "#B8AED6",
                },
                peach: {
                    100: "#FFF0F3",
                    200: "#FFE5EC",
                    300: "#FFD5E2",
                },
                // Accent Colors
                deepPurple: "#6B5B95", // Updated to match logo
                sage: "#A8DADC",
                // Text Colors
                textPrimary: "#2D2D2D",
                textSecondary: "#6B7280",
                textLight: "#9CA3AF",
            },
            fontFamily: {
                poppins: ["Poppins", "sans-serif"],
                inter: ["Inter", "sans-serif"],
            },
            boxShadow: {
                soft: "0 4px 20px rgba(255, 107, 157, 0.1)",
                card: "0 8px 30px rgba(255, 107, 157, 0.12)",
                hover: "0 12px 40px rgba(255, 107, 157, 0.18)",
            },
            borderRadius: {
                xl: "16px",
                "2xl": "24px",
                "3xl": "32px",
            },
            backgroundImage: {
                "gradient-hero": "linear-gradient(135deg, #FFF5F7 0%, #FFE5EC 50%, #FFF8F0 100%)",
                "gradient-card": "linear-gradient(180deg, #FFFFFF 0%, #FFF5F7 100%)",
                "gradient-cta": "linear-gradient(135deg, #FF6B9D 0%, #FF8FAF 100%)",
                "gradient-text": "linear-gradient(135deg, #FF6B9D 0%, #6B5B95 100%)",
            },
        },
    },
    plugins: [],
};
export default config;
