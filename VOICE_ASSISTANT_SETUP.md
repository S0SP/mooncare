# MoonCare Voice Assistant - Luna Setup Guide

## Overview
Luna is an AI-powered voice assistant that provides personalized menstrual health support through natural conversation. It uses:
- **Vapi.ai** for voice-to-voice AI conversations
- **GPT-4** for intelligent responses
- **ElevenLabs** for natural-sounding voice
- **User's health data** for personalized context

## Features
✅ Real-time voice conversation
✅ Personalized responses based on user's tracked health data
✅ Hardware wearable data integration (coming soon)
✅ Evidence-based health advice
✅ Knows when to recommend professional medical consultation
✅ Conversation transcript logging
✅ Privacy-first design

## Setup Instructions

### 1. Install Vapi SDK

```bash
npm install @vapi-ai/web
```

### 2. Get Vapi API Keys

1. Go to [https://vapi.ai](https://vapi.ai)
2. Sign up for an account
3. Navigate to Dashboard → API Keys
4. Generate a new API key pair:
   - **Public Key** (for client-side)
   - **Private Key** (for server-side - keep secret!)

### 3. Configure Environment Variables

Create a `.env.local` file in your project root:

```bash
# Copy from .env.example
cp .env.example .env.local
```

Add your Vapi keys:

```env
# Vapi Voice Agent Configuration
NEXT_PUBLIC_VAPI_PUBLIC_KEY=your_actual_vapi_public_key
VAPI_PRIVATE_KEY=your_actual_vapi_private_key

# Optional: OpenAI for additional features
OPENAI_API_KEY=your_openai_api_key
```

### 4. Configure Vapi Assistant (Optional Advanced Setup)

You can create a custom Vapi assistant with specific configurations:

1. Go to Vapi Dashboard → Assistants
2. Create new assistant with:
   - **Model**: GPT-4
   - **Voice**: ElevenLabs - Rachel (or any empathetic female voice)
   - **First Message**: Customized greeting
   - **System Prompt**: See below

**Recommended System Prompt:**
```
You are Luna, a compassionate AI health assistant for MoonCare, specializing in menstrual health and women's wellness.

Guidelines:
- Provide empathetic, personalized support
- Use evidence-based advice
- Be warm and non-judgmental
- Recommend professional care when appropriate
- Never diagnose - provide information only
```

## Usage

### Basic Implementation

The voice assistant is already integrated at `/health-tools/voice-assistant`

**Frontend Features:**
- Start/end call buttons
- Real-time conversation status
- Audio controls
- Conversation transcript
- User health context display

### How It Works

1. **Context Building**: When user starts a conversation, Luna receives:
   - Current cycle day and phase
   - Recent symptoms
   - Energy and pain levels
   - Last period date
   - Mood tracking data
   - Custom notes

2. **Personalized Greeting**: Luna greets based on current cycle phase

3. **Natural Conversation**: Users can ask anything:
   - "Why am I experiencing cramping?"
   - "When is my fertile window?"
   - "What foods help with PMS?"
   - "Is my cycle regular?"

4. **Real-time Responses**: Luna provides personalized answers using:
   - User's tracked health data
   - Evidence-based medical knowledge
   - Empathetic communication style

## Integration with User Data

### Current Implementation (Mock Data)

The system currently uses mock health data. Example:

```typescript
const healthContext: UserHealthContext = {
    currentCycleDay: 14,
    currentPhase: "ovulation",
    recentSymptoms: ["Mild cramping", "Bloating"],
    recentMood: ["Happy", "Energetic"],
    energyLevel: 7,
    painLevel: 2,
    lastPeriodDate: "January 15, 2026",
    cycleLength: 28,
    notes: "Feeling good overall"
};
```

### Production Integration with Supabase

To connect real user data:

1. **Fetch user's latest health tracking data** from Supabase:

```typescript
const { data: healthData } = await supabase
    .from('health_tracking')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(30); // Last 30 days

// Transform to UserHealthContext
const context = buildHealthContext(healthData);
```

2. **Pass context to voice assistant**:

```typescript
const { startCall } = useVapi(context);
```

## Hardware Wearable Integration

### Planned Integration

Luna can be enhanced with wearable device data:

**Supported Devices:**
- Fitbit
- Apple Watch
- Oura Ring
- Whoop
- Garmin

**Data Points to Integrate:**
- Heart rate variability (HRV)
- Sleep quality and duration
- Activity levels
- Body temperature
- Resting heart rate

**Implementation:**

```typescript
interface WearableData {
    heartRateVariability?: number;
    sleepScore?: number;
    activityMinutes?: number;
    bodyTemperature?: number;
    restingHeartRate?: number;
}

// Extend health context
const enhancedContext: UserHealthContext = {
    ...healthContext,
    wearableData: {
        heartRateVariability: 65,
        sleepScore: 82,
        bodyTemperature: 36.8,
        // From wearable API
    }
};
```

**API Integration Examples:**

```typescript
// Fitbit
const fitbitData = await fetch('https://api.fitbit.com/1/user/-/activities/heart/date/today/1d.json', {
    headers: { 'Authorization': `Bearer ${fitbitToken}` }
});

// Apple HealthKit (iOS app required)
// Oura Ring
const ouraData = await fetch('https://api.ouraring.com/v2/usercollection/daily_sleep', {
    headers: { 'Authorization': `Bearer ${ouraToken}` }
});
```

## Privacy & Security

### Data Handling
- Voice conversations are encrypted in transit
- No conversation data is permanently stored unless user opts in
- Health context isprovided but not stored by Vapi
- All user data remains in your Supabase database

### HIPAA Compliance Considerations
For production use with health data:
1. Use Vapi's HIPAA-compliant plan
2. Enable end-to-end encryption
3. Implement proper user consent flows
4. Add conversation logging with data retention policies

## Cost Estimation

**Vapi Pricing (as of 2024):**
- ~$0.05 - $0.15 per minute of conversation
- Includes voice synthesis and AI model costs

**Example Monthly Costs:**
- 100 users × 5 mins/month = 500 mins = $25-75/month
- 1000 users × 5 mins/month = 5000 mins = $250-750/month

## Customization Options

### Change Voice
In `useVapi.ts`, modify the voice settings:

```typescript
voice: {
    provider: 'elevenlabs',
    voiceId: 'rachel', // Change to: bella, elli, josh, etc.
}
```

### Change AI Model
```typescript
model: {
    provider: 'openai',
    model: 'gpt-4', // Or: gpt-3.5-turbo (cheaper), anthropic/claude-3
}
```

### Custom Greetings
Modify `getGreeting()` function in `useVapi.ts` to customize based on:
- Time of day
- Cycle phase
- Recent symptoms
- User preferences

## Troubleshooting

### Common Issues

**1. "Vapi not initialized"**
- Ensure NEXT_PUBLIC_VAPI_PUBLIC_KEY is set in .env.local
- Restart dev server after adding env variables

**2. "Failed to start call"**
- Check API key is valid
- Verify microphone permissions in browser
- Check console for detailed error messages

**3. No sound / Can't hear Luna**
- Check browser audio permissions
- Verify device audio output
- Try different browser (Chrome recommended)

**4. Conversation disconnects**
- Network issues - check internet connection
- Vapi service issues - check status.vapi.ai
- Browser tab inactive - keep tab active during call

## Testing

### Manual Testing Checklist
- [ ] Start conversation button works
- [ ] Audio indicator shows when Luna speaks
- [ ] Transcript updates in real-time
- [ ] User health context displays correctly
- [ ] End call closes connection properly
- [ ] Error handling shows appropriate messages

### Sample Test Questions
1. "What phase of my cycle am I in?"
2. "Why do I have these symptoms?"
3. "Should I see a doctor?"
4. "What should I eat during my period?"
5. "How can I track my ovulation?"

## Next Steps

1. **Install Vapi SDK**: `npm install @vapi-ai/web`
2. **Get API keys** from Vapi.ai
3. **Configure .env.local** with your keys
4. **Test the assistant** at `/health-tools/voice-assistant`
5. **Connect real user data** from Supabase
6. **Integrate wearable APIs** (optional)
7. **Customize voice and prompts** to your brand

## Resources

- **Vapi Documentation**: https://docs.vapi.ai
- **ElevenLabs Voices**: https://elevenlabs.io/voice-library
- **OpenAI Models**: https://platform.openai.com/docs/models
- **Wearable APIs**:
  - Fitbit: https://dev.fitbit.com/
  - Apple HealthKit: https://developer.apple.com/healthkit/
  - Oura: https://cloud.ouraring.com/docs/

## Support

For issues with:
- **Vapi setup**: Contact support@vapi.ai
- **MoonCare implementation**: Check the code in:
  - `/src/lib/useVapi.ts` - Voice agent logic
  - `/src/app/health-tools/voice-assistant/page.tsx` - UI component

---

**Luna is ready to help your users! 🌙✨**
