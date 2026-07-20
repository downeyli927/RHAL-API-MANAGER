# RHAL API Manager

A comprehensive API documentation manager for RHAL, built with [Docusaurus 3](https://docusaurus.io/) and featuring a built-in Context-Aware AI Assistant powered by RealGPT.

## Features

- 📚 **Documentation**: Structured API reference and guides.
- 🔍 **Local Search**: Integrated offline search using `@cmfcmf/docusaurus-search-local`.
- 🤖 **Context-Aware AI Assistant**: A floating AI chatbot that understands the documentation you are currently reading to provide accurate, page-specific answers.
- 🔒 **Secure AI Proxy**: A lightweight Node.js backend (`proxy.js`) that securely proxies LLM API requests, ensuring API keys are never exposed to the client's browser.

## Prerequisites

- **Node.js**: `>= 20.0.0` (Strictly required by Docusaurus 3)
- **Docker** (Highly recommended if your host's Node.js version is older than v20)

## Environment Setup

The AI Assistant requires specific environment variables to connect to the internal RealGPT models securely.

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and fill in your configurations:
   ```env
   # Your RealGPT API Key (Keep this secret, do not commit to Git)
   AI_API_KEY=your_api_key_here

   # RealGPT API Endpoint (e.g., https://proxy.realtek.com/...)
   AI_API_URL=your_api_url_here

   # The port you want the website and proxy to run on (Default: 3001)
   PORT=3001
   ```

## Development & Build

### Using Docker (Recommended for older host environments)

If your local server runs Node < 20 (e.g., Node 16), use Docker to install dependencies and build the project:

1. **Install Dependencies**:
   ```bash
   docker run --rm -v $(pwd):/app -w /app node:20-alpine npm install
   ```

2. **Build the Static Site** (This step is required to generate the search index):
   ```bash
   docker run --rm -v $(pwd):/app -w /app node:20-alpine npm run build
   ```

### Using Local Node.js (If Node >= 20)

```bash
npm install
npm run build
```

## Deployment & Running the Server

Because the AI Assistant needs to securely append the `Authorization` header to RealGPT API calls, the frontend cannot just be served via a dumb static server (like Nginx alone). You **must** run the included `proxy.js` server, which serves both the Docusaurus static files (`/build`) and the AI proxy route.

Run the production server using Docker:

```bash
# Runs the proxy server in the background on the port specified in your .env
docker run -d \
  --name rhal-api-manager \
  --restart always \
  -v $(pwd):/app \
  -w /app \
  -p 3001:3001 \
  node:20-alpine node proxy.js
```

Once running, access the site at: `http://<your-server-ip>:3001/`

## Architecture Note

*   **Frontend (`src/components/AIAssistant`)**: A React component swizzled into Docusaurus's `Root` component. It scrapes the text of the currently viewed article (`<article>`) to provide RAG context to the LLM. It routes requests to `/api/ai` instead of directly to the LLM.
*   **Backend (`proxy.js`)**: Intercepts requests to `/api/ai`, injects the `AI_API_KEY` from `.env`, forwards the payload to the RealGPT endpoint, and streams the response back to the client while bypassing CORS restrictions.
