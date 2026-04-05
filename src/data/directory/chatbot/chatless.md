---
title: chatless：A Lightweight Local AI Chat and Knowledge Base Client
description: chatless is a lightweight and open-source AI chat client compatible with Windows, MacOS, and Linux. It aims to provide users with localized AI chatting, document parsing, and knowledge base management features, especially suitable for low-spec computers to avoid excessive resource consumption. The project is developed using Tauri 2.0 and Next.js 15 technologies, featuring a clean interface, supporting AI interactions via local or remote Ollama API, and enabling fast summarization and analysis of knowledge bases. It is expected to be fully open source in the future.
image: https://repo.alisencent.com/upload/file/2026/04/02/3f266995955ab87.png
tags:
  - chatbot
link: https://github.com/kamjin3086/chatless
---

chatless is a lightweight and open-source AI chat client supporting Windows, MacOS, and Linux platforms. It primarily provides users with local AI chat, document parsing, and knowledge base management functions, specially designed for low-performance devices to avoid resource pressure from running heavy programs. Developed by kamjin3086, the project is built with Tauri 2.0 and Next.js 15, combined with a simple interface design to ensure low resource occupation and smooth operation. Users can communicate via local or remote [Ollama](https://www.kdjingpai.com/ollama/) API, with support for quick summarization and analysis of knowledge bases. The project is approximately 85% complete and will be fully open-sourced on GitHub in the future.

![chatless screenshot](https://repo.alisencent.com/upload/file/2026/04/02/ac890f468058d5f.webp)

## Features List

- **AI Chat**: Supports conversations through local or remote Ollama API, suitable for reasoning questions and simple code generation.
- **Local Document Parsing**: Parses and extracts content from local documents with support for conversational queries.
- **Knowledge Base Management**: Builds and manages local knowledge bases, supports embedding generation, fast summarization, and document analysis.
- **History Management**: Saves and manages chat records for easy review and organization.
- **Lightweight Design**: Installation package is only about 20MB, low resource consumption, suitable for low-performance devices.
- **Cross-Platform Support**: Compatible with Windows, MacOS, and Linux systems.
- **Customization Options**: Provides flexible configuration options to meet user preferences.

## Usage Help

### Installation Process

chatless is an open-source project requiring cloning the code from GitHub and building it locally as follows:

1. **Clone the Repository**
Run the following command in your terminal:

```bash
git clone https://github.com/kamjin3086/chatless.git
```

This operation downloads the project locally. Note that as of July 2025, the code is not fully open-sourced yet, and further releases may be required.

2. **Install Dependencies**

chatless is built on Tauri 2.0 and Next.js 15 and requires the following environments:

- **Node.js**: Recommended version 16 or later. Check version with:

```bash
node -v
```

If not installed, please visit the [Node.js official website](https://nodejs.org/) to download.

- **Rust**: Tauri depends on the Rust compiler. Install with:

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

- **Tauri Dependencies**: Refer to the [Tauri official documentation](https://tauri.app/) to install OS-specific dependencies.

3. **Install Project Dependencies**
Change directory to the project folder:

```bash
cd chatless
```

Then install Node.js dependencies:

```bash
npm install
```

4. **Build and Run**
Build the Tauri application:

```bash
npm run tauri build
```

Run in development mode:

```bash
npm run tauri dev
```

After successful startup, chatless will launch and display the main interface. The MacOS installation package size is about 20+ MB, varying slightly depending on the system.

5. **Configure Ollama API**
chatless uses Ollama by default for AI inference. Ensure Ollama is installed and running:

- Local deployment: Download and install Ollama; see details at [Ollama official site](https://ollama.com/).
- Remote deployment: Enter the remote Ollama API address in the settings, formatted as `http://<ip>:<port>`.

Configure and save the API in the “AI Model Provider Settings” page in chatless.

### Feature Operation Process

#### AI Chat

1. Open chatless and go to the “Chat” page.
2. Select local or remote Ollama API (must be set up beforehand).
3. Enter questions or commands, such as “Help me write a Python loop” or “Summarize this document.”
4. AI responds in real time; answers appear in the chat window, supporting follow-up questions and history viewing.

#### Local Document Parsing

1. Select “Document Parsing” on the main interface.
2. Upload supported document formats such as PDF, TXT, DOCX.
3. The software automatically extracts content and generates queryable text.
4. Input document-related questions, like “Extract key points from the document,” and AI will answer based on the content.
5. Parsing results can be saved to the knowledge base for future reference.

#### Knowledge Base Management

1. Visit the “Knowledge Base” page and click “Create Knowledge Base.”
2. Upload documents or manually input data; the system will generate embeddings (supporting local or Ollama inference).
3. Use the chat feature to query knowledge base content, e.g., “Summarize the financial data in the knowledge base.”
4. Manage content or adjust embedding parameters in the “Knowledge Base Details” section.

#### History Management

1. Click the “History” option on the main interface.
2. Browse chat records with filters by time or topic.
3. Support exporting as text files or deleting unnecessary records.

#### Personalization Settings

1. Enter “General Settings” to adjust theme, font size, and other interface options.
2. In “Knowledge Base Settings,” configure embedding generation schemes (local or remote).
3. Switch APIs or adjust model parameters on the “AI Model Provider Settings” page.

### Notes

- **Performance Optimization**: chatless is designed for low-performance devices but requires Ollama inference service stability.
- **Document Support**: Supports most common document formats; complex or encrypted documents may require preprocessing.
- **Open Source Plan**: The code is not yet fully open source; please follow the GitHub repository for updates.
- **Community Support**: Developers welcome feedback and support issues submitted on GitHub.

## Application Scenarios

1. **Personal Knowledge Management**
Conveniently import study notes or work materials into the knowledge base for quick summarization and query, suitable for students and researchers.
2. **Remote AI Inference**
Use a remote Ollama API on a low-performance computer with a high-performance server, ideal for professionals handling complex tasks.
3. **Lightweight Code Assistance**
Programmers can use chatless to generate simple code and debug snippets with a simple interface and resource savings.
4. **Localized Office Needs**
Corporate employees can parse local documents and interact with AI without uploading data to the cloud, effectively protecting privacy.

## Frequently Asked Questions (FAQ)

1. **Which AI models does chatless support?**
Currently primarily supports Ollama’s local and remote APIs, with possible expansion to other models in the future.
2. **How to run on low-performance computers?**
The installation package is small (~20MB), with performance optimized by Tauri and Next.js, supporting remote APIs to reduce local load.
3. **How to use knowledge base features?**
Upload documents or manually input content to generate embeddings, then query via chat for rapid analysis and summarization.
4. **Is internet connection required?**
Local mode does not require network connection; remote mode requires connection to the Ollama service.
