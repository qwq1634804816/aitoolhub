---
title: Whisper on Cloudflare AI：A Free Tool for Audio-to-Text and Subtitle Generation
description: Whisper_Cloudflare is an open-source project based on the OpenAI Whisper model combined with the Cloudflare Workers serverless architecture. It allows users to deploy a single worker.js file to perform multi-language audio-to-text conversion and generate SRT subtitle files. The operation is simple and completely free, suitable for individuals and teams.
image: https://repo.alisencent.com/upload/file/2026/04/05/3f266995955ab87.png
tags:
   - audio
link: https://github.com/thun888/whisper_cloudflare
---

Whisper_Cloudflare is an open-source project initiated by developer thun888 and hosted on GitHub. It is based on OpenAI's [Whisper](https://www.kdjingpai.com/crisperwhisper/) model and leverages the serverless architecture of Cloudflare Workers to provide efficient speech-to-text services. Users only need to deploy a single `worker.js` file to convert audio into text or generate timestamped SRT subtitle files. This project supports multiple languages and common audio formats, is easy to operate, and is suitable for developers to quickly build speech processing tools. The project is completely free, open-source, requires no server maintenance, and is suitable for personal or team audio transcription and subtitle generation needs.

![Illustration](https://repo.alisencent.com/upload/file/2026/04/05/b23f7a4473cf941.png)

## Features List

- Speech-to-text: Supports multi-language audio transcription.
- Subtitle generation: Outputs SRT subtitle files with timestamp information.
- Multi-format compatibility: Supports common audio formats such as MP3, WAV.
- Serverless deployment: Deploy via Cloudflare Workers with a single `worker.js` file.
- API endpoints: Provides `/raw` (raw transcription JSON) and `/srt` (subtitle file) interfaces.
- Voice Activity Detection (VAD): Supports `vad_filter` parameter to filter out non-speech content.
- Context optimization: Improves recognition accuracy with `initial_prompt` and `prefix` parameters.
- Translation feature: Supports translating audio content into specified languages.

## Usage Guide

### Deployment Process

Deploying Whisper_Cloudflare is very simple; just copy the `worker.js` code to the Cloudflare Workers platform without needing to clone the entire repository. The steps are as follows:

1. **Register a Cloudflare account**

   Visit the official Cloudflare website, sign up or log in, and ensure Workers functionality is enabled (free plan supported). Go to the "Workers" page and click "Create a Worker".

2. **Create Worker and paste code**

   - Create a new Worker in the editor (default name is `worker` or customize as needed).
   - Paste the provided `worker.js` code, replacing the default content.
   - Save the code.

3. **Install Wrangler (optional, command line deployment)**

   To manage Workers via command line, install Wrangler (Cloudflare Workers CLI). Node.js must be installed (recommended v16.17.0 or above), then execute:

```bash
npm install -g wrangler
```

4. **Configure Wrangler and AI binding**

   - Log in to Cloudflare:

```bash
wrangler login
```

   - Edit `wrangler.toml` file to add configuration:

```toml
name = "whisper-cloudflare"
compatibility_flags = ["nodejs_compat"]
[ai]
binding = "AI"
```

   - If not using Wrangler, manually bind the AI model on the Cloudflare dashboard and select `@cf/openai/whisper-large-v3-turbo`.

5. **Deploy Worker**

   - Click the "Deploy" button in the editor to publish the code.
   - Or use the command line:

```bash
wrangler deploy
```

   - After successful deployment, Cloudflare will generate a Worker URL, e.g., `https://whispercloudflare.tchepai.com/`.

6. **Prepare audio files**

   Ensure audio format is MP3 or WAV, and file size under 25MB (Cloudflare limitation). Audio can be uploaded as binary files or provided via accessible URLs (cloud storage recommended).

### Main Function Operations

#### Speech-to-Text

Whisper_Cloudflare uses the Whisper model to convert audio to text. Steps:

- **Upload audio**: Send a POST request with binary audio data to the `/raw` endpoint. For example:

```bash
curl -X POST "https://whisper.ohen5pbf93.workers.dev/raw" \
-H "Content-Type: application/octet-stream" \
--data-binary "@audio.mp3"
```

- **Obtain transcription result**: The interface returns JSON with text and segment time information:

```json
{
  "response": {
    "text": "This is a test audio.",
    "segments": [
      {"text": "This is a", "start": 0.0, "end": 1.2},
      {"text": "test audio", "start": 1.3, "end": 2.5}
    ]
  }
}
```

- **Handling large files**: For files over 25MB, manually split into approximately 1MB chunks, upload separately, then merge results.

#### Subtitle Generation

Generate SRT subtitle files suitable for videos. Process:

- **Request subtitles**: Upload audio to the `/srt` endpoint:

```bash
curl -X POST "https://whispercloudflare.tchepai.com/srt" \
-H "Content-Type: application/octet-stream" \
--data-binary "@audio.mp3"
```

- **Receive subtitle results**: Returns subtitles in SRT format, e.g.:

```
1
00:00:00,000 --> 00:00:01,200
This is a
2
00:00:01,300 --> 00:00:02,500
test audio
```

#### Web Interface Usage

`worker.js` includes a built-in HTML interface allowing users to operate via browser:

- Access the Worker URL root path (e.g., https://whispercloudflare.tchepai.com/).
- Select MP3 or WAV files and set task type (transcription or translation), language, VAD filter, etc.
- Submit and display SRT subtitles with support for `.srt` file download.
- Includes progress bar; processing 41-minute audio takes approximately 1.9 minutes.

#### API Usage

The project provides two key API endpoints:

- `/raw`: Returns raw transcription data in JSON format for developers to further process.
- `/srt`: Outputs SRT subtitle files suitable for video editing.

Example JavaScript usage:

```javascript
const response = await fetch('https://whispercloudflare.tchepai.com/srt', {
  method: 'POST',
  headers: { 'Content-Type': 'application/octet-stream' },
  body: audioFile // binary audio data
});
const srt = await response.text();
console.log(srt); // outputs SRT subtitles
```

#### Context Optimization

Use `initial_prompt` or `prefix` parameters to input context information and improve transcription accuracy. Example:

```bash
curl -X POST "https://whispercloudflare.tchepai.com/raw?initial_prompt=technical meeting" \
-H "Content-Type: application/octet-stream" \
--data-binary "@audio.mp3"
```

#### Voice Activity Detection (VAD)

Enable VAD filtering to remove non-speech content by setting `vad_filter=true`:

```bash
curl -X POST "https://whispercloudflare.tchepai.com/raw?vad_filter=true" \
-H "Content-Type: application/octet-stream" \
--data-binary "@audio.mp3"
```

#### Translation Feature

Set `task=translate` and `language` parameters to translate audio content into the specified language. Example:

```bash
curl -X POST "https://whispercloudflare.tchepai.com/raw?task=translate&language=en" \
-H "Content-Type: application/octet-stream" \
--data-binary "@audio.mp3"
```

### Performance and Limitations

- **Speed**: Processing a 41-minute 39-second audio takes about 1.9 minutes in tests.
- **Limitations**: Cloudflare Workers resource limits may cause occasional failures; multiple attempts are recommended.
- **File size**: Single upload size limit is 25MB.

### Notes

- **API Security**: Correctly configure AI binding in the Cloudflare management platform to avoid token leakage.
- **Error handling**: If the request fails, wait a moment and retry.
- **Browser compatibility**: The web interface supports mainstream modern browsers such as Chrome, Firefox, etc.

## Application Scenarios

1. **Meeting transcription**: Upload meeting audio to generate text or SRT subtitles, supporting multilingual meeting organization.
2. **Podcast subtitle generation**: Create SRT subtitles for podcast content to improve accessibility and search optimization.
3. **Educational resource transcription**: Teachers or students upload classroom recordings to generate notes or subtitles for easy review.
4. **Voice application development**: Developers use the API to build real-time subtitles or voice assistants, suitable for lightweight projects.

## Frequently Asked Questions (FAQ)

1. **Which audio formats are supported?**

   Supports MP3, WAV, and other formats. High-quality audio is recommended.

2. **How to handle large files?**

   Must manually split into approximately 1MB chunks and upload separately before merging.

3. **Is deployment charged?**

   Cloudflare Workers free plan supports deployment. The AI model provides 10,000 free neurons daily; additional usage is charged $0.011 per 1000 neurons.

4. **How to improve transcription accuracy?**

   Optimize recognition using `initial_prompt`, `prefix`, and `vad_filter` parameters.

5. **Which languages are supported?**

   Including English, Chinese, Japanese, and many others. Refer to the official Whisper documentation for details.
