# AI Model Comparison - Gemini vs OpenAI

## Quick Switch Guide

To switch between AI models, change only the API endpoint URL in `app/chat/page.tsx`:

```typescript
// Line ~60 in handleSend function

// Using Gemini (Default)
const response = await fetch("/api/gemini", {
  method: "POST",
  // ... rest of the code

// Using OpenAI GPT-5
const response = await fetch("/api/chatgpt", {
  method: "POST",
  // ... rest of the code (exactly the same)
```

## API Response Format

Both APIs return **identical response structures**:

```json
{
  "response": "AI generated text response here..."
}
```

This means you can switch between them without changing any other code!

## Configuration

### Gemini AI
- **File**: `app/api/gemini/route.ts`
- **Environment Variable**: `GEMINI_API_KEY`
- **Model**: `gemini-2.0-flash-exp`
- **Provider**: Google AI Studio
- **Free Tier**: Available with rate limits

### OpenAI GPT-5
- **File**: `app/api/chatgpt/route.ts`
- **Environment Variable**: `OPENAI_API_KEY`
- **Model**: `gpt-5-nano-2025-08-07`
- **Provider**: OpenAI Platform
- **Free Tier**: Depends on OpenAI plan

## When to Use Each

### Use Gemini if:
- ✅ You want Google's latest AI technology
- ✅ You need fast response times
- ✅ You prefer Google's AI Studio interface
- ✅ You want generous free tier quotas

### Use OpenAI if:
- ✅ You prefer OpenAI's ecosystem
- ✅ You already have OpenAI credits
- ✅ You want GPT-5 Nano's reasoning capabilities
- ✅ You need consistent response quality

## Performance Comparison

| Feature | Gemini 2.0 Flash | GPT-5 Nano |
|---------|-----------------|------------|
| Response Speed | Very Fast | Fast |
| Context Understanding | Excellent | Excellent |
| Reasoning Effort | Configurable (temp, topP, topK) | Medium |
| Max Tokens | 1024 | Unlimited (based on model) |
| System Instructions | Native support | Developer role |
| Free Tier | Generous | Limited |

## Both Share:
- ✅ Same system instructions (portfolio knowledge)
- ✅ Same conversation history handling
- ✅ Same error handling
- ✅ Same response format
- ✅ Same validation logic

## Setup Checklist

### For Gemini:
- [ ] Get API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
- [ ] Add `GEMINI_API_KEY=xxx` to `.env.local`
- [ ] Keep default API endpoint: `/api/gemini`
- [ ] Restart dev server

### For OpenAI:
- [ ] Get API key from [OpenAI Platform](https://platform.openai.com/api-keys)
- [ ] Add `OPENAI_API_KEY=xxx` to `.env.local`
- [ ] Change API endpoint to: `/api/chatgpt`
- [ ] Restart dev server

## Testing Both Models

You can keep both API keys in your `.env.local`:

```env
GEMINI_API_KEY=your_gemini_key_here
OPENAI_API_KEY=your_openai_key_here
```

Then switch between them by changing just one line in the chat page!

## Error Messages

Both APIs provide consistent error messages:

```json
// Missing API key
{ "error": "API key not configured. Please add XXXXX_API_KEY to your .env file" }

// Invalid message
{ "error": "Message is required" }

// API failure
{ "error": "Failed to generate response: [specific error message]" }
```
