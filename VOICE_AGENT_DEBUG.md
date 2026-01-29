# Voice Agent Debugging Guide

## Step-by-Step Debugging

### 1. Check Browser Console
Open browser console (F12 or Ctrl+Shift+I) and look for these messages:

**✅ Success Messages:**
```
🎤 [VAPI] Starting initialization...
🔑 [VAPI] Checking API key: ✅ Found
📦 [VAPI] Attempting to import SDK...
✅ [VAPI] SDK loaded successfully
✅ [VAPI] Instance created
✅ [VAPI] All event listeners attached successfully
✅ [VAPI] Voice agent ready!
```

**❌ Error Messages:**

#### Error 1: "Vapi SDK not installed"
```
❌ [VAPI] Failed to import @vapi-ai/web
```
**Fix:**
```bash
npm install @vapi-ai/web
# Then restart the dev server
```

#### Error 2: "Vapi API key not configured"
```
🔑 [VAPI] Checking API key: ❌ Missing
```
**Fix:**
1. Create `.env.local` file in project root
2. Add: `NEXT_PUBLIC_VAPI_PUBLIC_KEY=your_vapi_public_key`
3. Get key from: https://vapi.ai
4. Restart dev server

#### Error 3: Microphone permission
```
❌ Failed to start voice session
🎤 Please allow microphone access in your browser
```
**Fix:**
- Click the microphone icon in browser address bar
- Select "Always allow"
- Refresh the page

### 2. Installation Steps

Run these commands in order:

```bash
# 1. Install Vapi SDK
npm install @vapi-ai/web

# 2. Check if installed
npm list @vapi-ai/web

# 3. Restart dev server (important!)
# Stop current server (Ctrl+C)
npm run dev
```

### 3. Environment Setup

**.env.local should look like:**
```env
# Vapi Voice Agent
NEXT_PUBLIC_VAPI_PUBLIC_KEY=pk_xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx

# Optional
VAPI_PRIVATE_KEY=sk_xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```

**Check environment variables in console:**
```javascript
// Go to /health-tools/voice-assistant
// Open console and type:
console.log(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY);
// Should show your key (not "your_vapi_public_key")
```

### 4. Get Vapi API Keys

1. Go to https://vapi.ai
2. Sign up for free account
3. Navigate to Dashboard
4. Click "API Keys" in sidebar
5. Click "Create New Key"
6. Copy the PUBLIC key (starts with pk_)
7. Add to .env.local

### 5. Test in Browser

1. Open: http://localhost:3000/health-tools/voice-assistant
2. Open Console (F12)
3. Look for initialization messages
4. Click "Start Conversation"
5. Check for call start messages

**Expected console output when clicking button:**
```
📞 [VAPI] Starting call...
📝 [VAPI] System prompt built: You are Luna, a compassionate...
👋 [VAPI] First message: Hi! I see you're on day...
🚀 [VAPI] Calling vapi.start()...
📞 [VAPI] Call started successfully!
🗣️ [VAPI] AI is speaking...
```

### 6. Common Issues

#### Issue: Nothing happens when clicking button
**Check:**
- Is there an error in console?
- Is the button disabled?
- Is `audioEnabled` set to true?

#### Issue: "Module not found" error
**Fix:**
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
npm install @vapi-ai/web
npm run dev
```

#### Issue: Error 403 or unauthorized
**Fix:**
- Double-check API key is correct
- Make sure using PUBLIC key (pk_xxx) not private (sk_xxx)
- Verify key is active in Vapi dashboard

#### Issue: No sound / Can't hear Luna
**Check:**
- Browser audio is not muted
- System volume is up
- Microphone permissions granted
- Try in Chrome (best compatibility)

### 7. Quick Test Code

Paste this in browser console to test API key:

```javascript
// Test if key is loaded
const key = process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY;
console.log('API Key:', key ? '✅ Loaded: ' + key.substring(0, 10) + '...' : '❌ Not found');

// Test if Vapi SDK is available
import('@vapi-ai/web')
  .then(() => console.log('✅ Vapi SDK loaded'))
  .catch(err => console.error('❌ Vapi SDK error:', err));
```

### 8. Still Not Working?

**Last resort checklist:**
- [ ] Vapi SDK installed: `npm list @vapi-ai/web`
- [ ] .env.local exists with correct key
- [ ] Dev server restarted after adding .env.local
- [ ] Browser console shows no errors
- [ ] Using Chrome or Firefox (not Safari)
- [ ] Microphone permission granted
- [ ] Internet connection working

**Get help:**
- Check Vapi docs: https://docs.vapi.ai
- Vapi Discord: https://discord.gg/vapi
- Check console logs carefully

### 9. Success Checklist

When working correctly, you should see:
- ✅ No red errors in console
- ✅ Green success messages in console
- ✅ Button changes from "Start" to "End Call"
- ✅ Pulsing animation when AI speaks
- ✅ Luna's voice through speakers
- ✅ Transcript appears in real-time
- ✅ Your voice is being heard

## Manual Testing Steps

1. **Open page**: http://localhost:3000/health-tools/voice-assistant
2. **Open console**: Press F12
3. **Check init**: Should see green checkmarks  
4. **Click button**: "Start Conversation"
5. **Grant mic**: Allow microphone when prompted
6. **Wait for Luna**: Should start speaking
7. **Speak**: Say "Hello"
8. **Check transcript**: Your words should appear
9. **End call**: Click "End Call" button

---

**Need more help?** Send console logs to support!
