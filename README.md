[English](#english) | [简体中文](#中文版)

---

<h1 id="english">RHAL API Manager</h1>

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
   AI_API_URL_BACKEND=your_api_url_here

   # The port for the Backend Proxy Server (Default: 3099)
   PROXY_PORT=3099

   # The port for the Frontend Web UI (Default: 3001)
   WEB_PORT=3001
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

Because the project runs both a Docusaurus web server and a Node.js proxy concurrently, we recommend running it via Docker, mapping both ports defined in your `.env`.

To make deployment easier, a `deploy.sh` script is provided.

1. **Rebuild the frontend** (if you modified any `src/` files):
   ```bash
   # Rebuild inside the existing container
   docker exec rhal-api-docs npm run build
   ```

2. **Run the deployment script**:
   ```bash
   ./deploy.sh
   ```

*Note: The script automatically stops the old container, reads your new `.env` settings, and starts a new container with the correct ports mapped.*

Once running, access the site at: `http://<your-server-ip>:3001/` (or the port you configured for `WEB_PORT`).

## Architecture Note

*   **Frontend (`src/components/AIAssistant`)**: A React component swizzled into Docusaurus's `Root` component. It scrapes the text of the currently viewed article (`<article>`) to provide RAG context to the LLM. It routes requests to `/chat/completions` via the local proxy instead of directly to the LLM.
*   **Backend (`proxy.js`)**: Intercepts requests, injects the `AI_API_KEY` from `.env`, forwards the payload to the RealGPT endpoint, and streams the response back to the client while bypassing CORS restrictions.

<br>
<br>

---

<h1 id="中文版">RHAL API Manager (中文说明)</h1>

一个为 RHAL 构建的综合 API 文档管理器，基于 [Docusaurus 3](https://docusaurus.io/) 构建，并内置了由 RealGPT 驱动的上下文感知 AI 助手。

## 核心特性

- 📚 **文档**: 结构化的 API 参考与开发指南。
- 🔍 **本地搜索**: 使用 `@cmfcmf/docusaurus-search-local` 插件集成的离线全文搜索功能。
- 🤖 **上下文感知 AI 助手**: 页面悬浮 AI 聊天机器人。它能够智能读取您当前正在浏览的文档内容，从而提供精确的、针对当前页面的解答（无需复杂的 RAG 向量库）。
- 🔒 **安全的 AI 代理**: 使用轻量级的 Node.js 后端 (`proxy.js`) 安全地代理大模型 API 请求，彻底杜绝在前端浏览器中暴露 API 密钥的风险。

## 环境要求

- **Node.js**: `>= 20.0.0` (Docusaurus 3 的严格限制要求)
- **Docker** (如果您的服务器 Node.js 版本低于 20，比如老旧的 Node 16，强烈推荐使用 Docker)

## 环境变量配置

AI 助手和网页端口需要通过特定的环境变量来安全配置。

1. 复制环境变量示例文件：
   ```bash
   cp .env.example .env
   ```

2. 编辑 `.env` 文件并填入您自己的配置：
   ```env
   # 您的 RealGPT API Key（注意保密，绝对不要提交到 Git 仓库）
   AI_API_KEY=您的_api_key_填写在这里

   # RealGPT API 接口地址 (例如 https://proxy.realtek.com/...)
   AI_API_URL_BACKEND=您的_api_url_填写在这里

   # AI 代理服务运行的端口 (默认: 3099)
   PROXY_PORT=3099

   # 前端网页运行的端口 (默认: 3001，若冲突请修改此处)
   WEB_PORT=3001
   ```

## 开发与构建

### 方式一：使用 Docker（推荐用于老旧的宿主服务器环境）

如果您的本地或开发服务器上的 Node 版本 < 20，请使用 Docker 来安装依赖并构建项目，以免污染或报错：

1. **安装依赖**:
   ```bash
   docker run --rm -v $(pwd):/app -w /app node:20-alpine npm install
   ```

2. **构建静态网站** (注意：必须执行构建才能生成供本地搜索使用的索引文件):
   ```bash
   docker run --rm -v $(pwd):/app -w /app node:20-alpine npm run build
   ```

### 方式二：使用本地 Node.js（如果本地 Node >= 20）

```bash
npm install
npm run build
```

## 部署与启动服务器

由于项目需要同时运行网页前端 (`npm run serve`) 和 AI 代理服务器 (`proxy.js`)，并且我们需要将 `.env` 中的端口配置动态注入到启动命令中，推荐使用提供的 `deploy.sh` 脚本一键启动部署。

1. **重新打包前端代码**（如果您修改了前端 `src/` 目录下的任何代码，需要先打包更新 `build`）：
   ```bash
   docker exec rhal-api-docs npm run build
   ```

2. **一键启动/重启部署**：
   ```bash
   ./deploy.sh
   ```

*说明：该脚本会自动停止并删除旧容器，提取 `.env` 中的最新端口配置，并使用正确的映射参数后台启动全新的 Docker 容器。*

启动成功后，即可在浏览器中访问: `http://<您的服务器IP>:3001/` (或您在 `WEB_PORT` 中修改的其他端口)。

## 架构说明

*   **前端 (`src/components/AIAssistant`)**: 这是一个注入（Swizzle）到 Docusaurus `Root` 组件中的 React 独立组件。它通过直接抓取当前浏览区 `<article>` 标签内的文本内容来实现“上下文 RAG”。它的所有请求都会发向本地的 AI 代理路由，而不是直接连接大模型后端。
*   **后端 (`proxy.js`)**: 这是一个轻量 Express/HTTP 服务，负责拦截请求，从宿主的 `.env` 中读取 `AI_API_KEY` 注入到 Header 中，然后转发给 RealGPT 节点。它还能将流式 (Stream) 响应原样返回给客户端，且天然绕过了前端的 CORS 跨域限制。