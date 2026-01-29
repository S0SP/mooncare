// Vapi Voice Agent Hook
// Install: npm install @vapi-ai/web

import { useEffect, useRef, useState } from 'react';

export interface VapiMessage {
    role: 'user' | 'assistant' | 'system';
    content: string;
    timestamp: Date;
}

export interface UserHealthContext {
    currentCycleDay?: number;
    currentPhase?: string;
    recentSymptoms?: string[];
    recentMood?: string[];
    energyLevel?: number;
    painLevel?: number;
    lastPeriodDate?: string;
    cycleLength?: number;
    notes?: string;
}

export const useVapi = (healthContext?: UserHealthContext) => {
    const [isSessionActive, setIsSessionActive] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [messages, setMessages] = useState<VapiMessage[]>([]);
    const [error, setError] = useState<string | null>(null);
    const vapiRef = useRef<any>(null);

    useEffect(() => {
        // Initialize Vapi when component mounts
        const initVapi = async () => {
            console.log('🎤 [VAPI] Starting initialization...');

            try {
                const publicKey = process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY;

                console.log('🔑 [VAPI] Checking API key:', publicKey ? '✅ Found' : '❌ Missing');
                console.log('🔑 [VAPI] Key value:', publicKey?.substring(0, 10) + '...');

                if (!publicKey || publicKey === 'your_vapi_public_key') {
                    const errorMsg = '❌ Vapi API key not configured!\n\n' +
                        'Steps to fix:\n' +
                        '1. Install Vapi SDK: npm install @vapi-ai/web\n' +
                        '2. Create .env.local file\n' +
                        '3. Add: NEXT_PUBLIC_VAPI_PUBLIC_KEY=your_actual_key\n' +
                        '4. Get key from: https://vapi.ai';
                    console.error(errorMsg);
                    setError(errorMsg);
                    return;
                }

                console.log('📦 [VAPI] Attempting to import SDK...');

                // Dynamically import Vapi to avoid SSR issues
                const VapiModule = await import('@vapi-ai/web').catch((importErr) => {
                    console.error('❌ [VAPI] Failed to import @vapi-ai/web:', importErr);
                    throw new Error('Vapi SDK not installed.\n\nRun: npm install @vapi-ai/web\n\nThen restart the dev server.');
                });

                const Vapi = VapiModule.default;
                console.log('✅ [VAPI] SDK loaded successfully');

                vapiRef.current = new Vapi(publicKey);
                console.log('✅ [VAPI] Instance created');

                // Listen for speech start/end
                vapiRef.current.on('speech-start', () => {
                    console.log('🗣️ [VAPI] AI is speaking...');
                    setIsSpeaking(true);
                    setIsListening(false);
                });

                vapiRef.current.on('speech-end', () => {
                    console.log('🤐 [VAPI] AI stopped speaking');
                    setIsSpeaking(false);
                });

                // Listen for user speech
                vapiRef.current.on('call-start', () => {
                    console.log('📞 [VAPI] Call started successfully!');
                    setIsSessionActive(true);
                });

                vapiRef.current.on('call-end', () => {
                    console.log('📞 [VAPI] Call ended');
                    setIsSessionActive(false);
                    setIsSpeaking(false);
                    setIsListening(false);
                });

                // Listen for messages
                vapiRef.current.on('message', (message: any) => {
                    console.log('💬 [VAPI] Message received:', message);
                    if (message.type === 'transcript') {
                        const newMessage: VapiMessage = {
                            role: message.role,
                            content: message.transcript,
                            timestamp: new Date(),
                        };
                        setMessages(prev => [...prev, newMessage]);
                    }
                });

                // Listen for errors
                vapiRef.current.on('error', (error: any) => {
                    console.error('❌ [VAPI] Error event:', error);
                    setError(error.message || 'An error occurred with the voice agent');
                });

                console.log('✅ [VAPI] All event listeners attached successfully');
                console.log('✅ [VAPI] Voice agent ready!');

            } catch (err: any) {
                console.error('❌ [VAPI] Initialization failed:', err);
                console.error('❌ [VAPI] Error details:', err.message);
                setError(err.message || 'Failed to initialize voice agent');
            }
        };

        initVapi();

        return () => {
            // Cleanup on unmount
            if (vapiRef.current) {
                console.log('🧹 [VAPI] Cleaning up...');
                vapiRef.current.stop();
            }
        };
    }, []);

    const startCall = async () => {
        console.log('📞 [VAPI] Starting call...');

        if (!vapiRef.current) {
            const errorMsg = '❌ Vapi not initialized. Please refresh the page.';
            console.error(errorMsg);
            setError(errorMsg);
            return;
        }

        try {
            // Check for Assistant ID (Recommended for Production)
            const assistantId = process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID;

            // Build system context from health data
            const systemPrompt = buildSystemPrompt(healthContext);
            const greeting = getGreeting(healthContext);

            console.log('📝 [VAPI] System prompt built:', systemPrompt.substring(0, 100) + '...');
            console.log('👋 [VAPI] First message:', greeting);

            console.log('🚀 [VAPI] Calling vapi.start()...');

            if (assistantId && assistantId !== 'your_assistant_id') {
                console.log('🆔 [VAPI] Using Assistant ID:', assistantId);
                // Start call with pre-configured assistant (Most Reliable)
                await vapiRef.current.start(assistantId, {
                    variableValues: {
                        name: "MoonCare User",
                        // Pass health context variables if your assistant is configured to use them
                        cyclePath: healthContext?.currentPhase || "unknown",
                    }
                });
            } else {
                console.log('⚠️ [VAPI] No Assistant ID found. Attempting to create ephemeral assistant...');
                console.log('ℹ️ [VAPI] Note: This may require "Transient Assistant" permission enabled on your account.');

                await vapiRef.current.start({
                    model: {
                        provider: 'openai',
                        model: 'gpt-4',
                        messages: [
                            {
                                role: 'system',
                                content: systemPrompt,
                            },
                        ],
                    },
                    voice: {
                        provider: 'elevenlabs',
                        voiceId: 'rachel', // Warm, empathetic female voice
                    },
                    name: 'MoonCare Health Assistant',
                    firstMessage: greeting,
                });
            }

            console.log('✅ [VAPI] Call started successfully!');
            setIsSessionActive(true);
            setError(null);
        } catch (err: any) {
            console.error('❌ [VAPI] Failed to start call:', err);
            console.error('❌ [VAPI] Error message:', err.message);
            console.error('❌ [VAPI] Error stack:', err.stack);

            let userFriendlyError = 'Failed to start voice session.\n\n';

            if (err.message && (err.message.includes('403') || err.message.includes('Forbidden'))) {
                userFriendlyError += '🔒 Access Denied (403).\n\n' +
                    'Creating a temporary assistant from the browser was blocked.\n\n' +
                    '✅ FIX: Create an Assistant in Vapi Dashboard and add to .env.local:\n' +
                    'NEXT_PUBLIC_VAPI_ASSISTANT_ID=your_assistant_id';
            } else if (err.message?.includes('microphone')) {
                userFriendlyError += '🎤 Please allow microphone access in your browser.';
            } else if (err.message?.includes('api') || err.message?.includes('key')) {
                userFriendlyError += '🔑 API key issue. Check your Vapi configuration.';
            } else {
                userFriendlyError += err.message || 'Unknown error occurred.';
            }

            setError(userFriendlyError);
        }
    };

    const endCall = () => {
        if (vapiRef.current) {
            vapiRef.current.stop();
            setIsSessionActive(false);
        }
    };

    const sendMessage = (text: string) => {
        if (vapiRef.current && isSessionActive) {
            vapiRef.current.send({
                type: 'add-message',
                message: {
                    role: 'user',
                    content: text,
                },
            });
        }
    };

    return {
        isSessionActive,
        isSpeaking,
        isListening,
        messages,
        error,
        startCall,
        endCall,
        sendMessage,
    };
};

// Build system prompt with user's health context
function buildSystemPrompt(context?: UserHealthContext): string {
    let prompt = `You are Luna, a compassionate AI health assistant for MoonCare, specializing in menstrual health and women's wellness. 

Your Role:
- Provide empathetic, personalized support for menstrual health questions
- Help users understand their cycle patterns and symptoms
- Offer evidence-based advice on period care, nutrition, and wellness
- Recognize when to recommend professional medical consultation
- Be warm, supportive, and non-judgmental

Guidelines:
- Always maintain medical accuracy but speak in friendly, accessible language
- If you don't know something, admit it and suggest consulting a healthcare provider
- Never diagnose medical conditions - provide information and recommend professional care when needed
- Be culturally sensitive and respect all backgrounds
- Prioritize user privacy and confidentiality

`;

    if (context) {
        prompt += `\nCurrent User Context:\n`;

        if (context.currentCycleDay && context.currentPhase) {
            prompt += `- Cycle Day: ${context.currentCycleDay}, Phase: ${context.currentPhase}\n`;
        }

        if (context.lastPeriodDate) {
            prompt += `- Last Period: ${context.lastPeriodDate}\n`;
        }

        if (context.cycleLength) {
            prompt += `- Average Cycle Length: ${context.cycleLength} days\n`;
        }

        if (context.recentSymptoms && context.recentSymptoms.length > 0) {
            prompt += `- Recent Symptoms: ${context.recentSymptoms.join(', ')}\n`;
        }

        if (context.recentMood && context.recentMood.length > 0) {
            prompt += `- Recent Mood: ${context.recentMood.join(', ')}\n`;
        }

        if (context.energyLevel !== undefined) {
            prompt += `- Energy Level: ${context.energyLevel}/10\n`;
        }

        if (context.painLevel !== undefined) {
            prompt += `- Pain Level: ${context.painLevel}/10\n`;
        }

        if (context.notes) {
            prompt += `- User Notes: ${context.notes}\n`;
        }
    }

    prompt += `\nUse this context to provide personalized, relevant responses. Reference their current phase and symptoms naturally in conversation.`;

    return prompt;
}

// Generate personalized greeting based on user context
function getGreeting(context?: UserHealthContext): string {
    if (!context) {
        return "Hi! I'm Luna, your MoonCare health assistant. I'm here to help answer any questions about your menstrual health and wellness. What can I help you with today?";
    }

    const { currentPhase, recentSymptoms, currentCycleDay } = context;

    if (currentPhase === 'menstrual') {
        return `Hi! I see you're on day ${currentCycleDay} of your cycle. How are you feeling today? I'm here to help with any questions or concerns.`;
    } else if (currentPhase === 'luteal' && recentSymptoms && recentSymptoms.length > 0) {
        return `Hello! I noticed you've been tracking some symptoms recently. How can I support you today?`;
    } else if (currentPhase === 'ovulation') {
        return "Hi! You're in your ovulation phase - a great time for energy and productivity! What would you like to talk about?";
    } else {
        return `Hi! I'm Luna, your health assistant. I can see your health data and I'm here to answer any questions about your cycle, symptoms, or wellness. What's on your mind?`;
    }
}
