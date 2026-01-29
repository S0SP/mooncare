import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "MoonCare - Predictive Menstrual Care for Women",
    description: "From Calendar Tracking to Body Intelligence. Predictive, personalized menstrual care for women with irregular cycles, PCOD & PCOS.",
    keywords: ["menstrual health", "PCOS", "PCOD", "period tracking", "women health", "care kits"],
    openGraph: {
        title: "MoonCare - Predictive Menstrual Care",
        description: "Predictive, personalized menstrual care for women with irregular cycles, PCOD & PCOS.",
        type: "website",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="font-inter antialiased">
                {children}
            </body>
        </html>
    );
}
