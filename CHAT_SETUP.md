# Chat Feature - Setup Guide

## Overview
The chat feature allows visitors to interact with an AI assistant powered by either Google's Gemini AI or OpenAI's GPT-5. The AI is trained with comprehensive information about Mohd Azkar's profile, skills, projects, experience, and education.

## Setup Instructions

### Option 1: Gemini AI (Default)

#### 1. Get Gemini API Key
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Create a new API key
4. Copy the API key

#### 2. Configure Environment Variables
1. Create a `.env.local` file in the root directory (or rename `.env.example`)
2. Add your Gemini API key:
   ```
   GEMINI_API_KEY=your_actual_api_key_here
   ```

#### 3. Use Gemini API
The chat page is configured to use `/api/gemini` by default.

### Option 2: OpenAI GPT-5

#### 1. Get OpenAI API Key
1. Visit [OpenAI Platform](https://platform.openai.com/api-keys)
2. Sign in to your OpenAI account
3. Create a new API key
4. Copy the API key

#### 2. Configure Environment Variables
1. Create a `.env.local` file in the root directory (or rename `.env.example`)
2. Add your OpenAI API key:
   ```
   OPENAI_API_KEY=your_actual_api_key_here
   ```

#### 3. Switch to OpenAI API
In `app/chat/page.tsx`, change the API endpoint:
```typescript
// Change from:
const response = await fetch("/api/gemini", {
  
// To:
const response = await fetch("/api/chatgpt", {
```

### Restart Development Server
```bash
pnpm dev
```

## Features

### Chat UI (`/chat`)
- Professional chat interface with gradient design
- Real-time messaging with typing indicators
- Message history with timestamps
- User and AI avatars
- Responsive design
- Smooth animations with Framer Motion

### Chat Icon (Homepage)
- Sticky floating button in bottom-right corner
- Pulse animation to draw attention
- Notification badge
- Hover tooltip
- Direct navigation to chat page

### AI Backend

#### `/api/gemini` (Gemini 2.0 Flash Exp)
- Integration with Google's Gemini 2.0 Flash Exp model
- Comprehensive system instructions with portfolio data
- Conversation history support for context-aware responses
- Error handling and validation
- Temperature and token configuration for optimal responses

#### `/api/chatgpt` (GPT-5 Nano)
- Integration with OpenAI's GPT-5 Nano (2025-08-07)
- Same comprehensive system instructions as Gemini
- Developer role messages for system instructions
- Medium reasoning effort configuration
- Conversation history support for context-aware responses

## AI Knowledge Base

The AI assistant has detailed information about:
- **Profile**: Name, role, contact details, location
- **Skills**: Frontend, backend, databases, cloud, DevOps technologies
- **Work Experience**: 3 positions with detailed descriptions
- **Education**: 3 educational qualifications
- **Projects**: 9 major projects with tech stacks and descriptions

## API Endpoints

Both endpoints accept the same request format and return the same response structure, making them interchangeable.

### POST `/api/gemini` (Gemini AI)
**Request Body:**
```json
{
  "message": "What projects has Mohd Azkar worked on?",
  "conversationHistory": [
    { "role": "user", "content": "Hello" },
    { "role": "assistant", "content": "Hi! How can I help?" }
  ]
}
```

**Response:**
```json
{
  "response": "Mohd Azkar has worked on several impressive projects..."
}
```

### POST `/api/chatgpt` (OpenAI GPT-5)
**Request Body:** (Same as above)
```json
{
  "message": "What are Mohd Azkar's skills?",
  "conversationHistory": [...]
}
```

**Response:** (Same format)
```json
{
  "response": "Mohd Azkar is skilled in JavaScript, TypeScript, React, Next.js..."
}
```

## Configuration

### Gemini Model Settings
- **Model**: `gemini-2.0-flash-exp`
- **Temperature**: 0.7 (balanced creativity and consistency)
- **Top P**: 0.8
- **Top K**: 40
- **Max Output Tokens**: 1024

### OpenAI Model Settings
- **Model**: `gpt-5-nano-2025-08-07`
- **Reasoning Effort**: Medium (balanced speed and quality)
- **Role Structure**: Developer role for system instructions
- **Response Format**: `output_text`

### Switching Between Models
To switch from Gemini to OpenAI (or vice versa), simply change the API endpoint in `app/chat/page.tsx`:

```typescript
// For Gemini
const response = await fetch("/api/gemini", {

// For OpenAI
const response = await fetch("/api/chatgpt", {
```

Both APIs return the same response structure, so no other code changes are needed.

### Customization
To update the AI's knowledge, edit the `SYSTEM_INSTRUCTION` constant in `/app/api/gemini/route.ts`.

## Troubleshooting

### "API key not configured" Error
- Ensure `.env.local` file exists in the root directory
- Verify the variable name is exactly `GEMINI_API_KEY`
- Restart the development server after adding the key

### Chat Not Responding
- Check browser console for errors
- Verify the API endpoint is accessible
- Check network tab for failed requests
- Ensure API key has proper permissions

### Rate Limiting
- Gemini API has rate limits based on your plan
- Implement caching or rate limiting on client-side if needed
- Consider upgrading API quota for production use

## Security Notes
- Never commit `.env.local` or `.env` files to version control
- API key should be kept secret
- In production, consider implementing rate limiting
- Add CORS protection if deploying to different domain

## Future Enhancements
- [ ] Add message persistence (save chat history)
- [ ] Implement streaming responses for faster perceived performance
- [ ] Add conversation reset button
- [ ] Include code syntax highlighting in responses
- [ ] Add voice input/output capabilities
- [ ] Implement chat analytics
