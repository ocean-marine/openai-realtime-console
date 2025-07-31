# Vercel Environment Variables Setup

## Required Environment Variables

For this application to work properly on Vercel, you need to set the following environment variables:

### Server-side Variables
- `OPENAI_API_KEY` - Your OpenAI API key for server-side API calls

### Client-side Variables (Vite Build-time)
- `VITE_GROQ_API_KEY` - Your GROQ API key (prefixed with `VITE_` for client-side access)

### Optional
- `GROQ_API_KEY` - Alternative GROQ API key name (server-side fallback)

## Setting Environment Variables in Vercel

1. Go to your Vercel project dashboard
2. Navigate to Settings → Environment Variables
3. Add the required variables:
   - Key: `OPENAI_API_KEY`, Value: `your-openai-api-key`
   - Key: `VITE_GROQ_API_KEY`, Value: `your-groq-api-key`

## Important Notes

- **Client-side variables** in Vite must be prefixed with `VITE_` to be accessible during build time
- If you set `GROQ_API_KEY` without the `VITE_` prefix, it won't be available to the client-side code
- The application will log the status of all environment variables at startup for debugging

## Troubleshooting

If you see "Missing" for `GROQ_API_KEY` in the logs:
1. Make sure you've set `VITE_GROQ_API_KEY` in Vercel (not just `GROQ_API_KEY`)
2. Redeploy your application after setting the environment variables
3. Check the function logs in Vercel to see the startup logging output