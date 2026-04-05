---
title: Whisper on Cloudflare AI：将音频转文字并生成字幕的免费工具
description: Whisper_Cloudflare 是一个基于 OpenAI Whisper 模型并结合 Cloudflare Workers 无服务器架构的开源项目。它允许用户部署单个 worker.js 文件，实现多语言音频转文字及生成 SRT 字幕文件，操作简单且完全免费，适合个人及团队使用。
image: https://repo.alisencent.com/upload/file/2026/04/05/3f266995955ab87.png
tags:
   - audio
link: https://github.com/thun888/whisper_cloudflare
---

Whisper_Cloudflare 是由开发者 thun888 发起的开源项目，托管于 GitHub。它基于 OpenAI 的 [Whisper](https://www.kdjingpai.com/crisperwhisper/) 模型，并利用 Cloudflare Workers 的无服务器架构，提供高效的语音转文字服务。用户仅需部署一个 `worker.js` 文件，即可将音频转换成文本或生成带时间戳的 SRT 字幕文件。此项目支持多种语言及常见音频格式，操作简便，适合开发者快速搭建语音处理工具。项目完全免费，代码公开，无需服务器维护，适合个人或团队的音频转录和字幕生成需求。

![示意图](https://repo.alisencent.com/upload/file/2026/04/05/b23f7a4473cf941.png)

## 功能列表

- 语音转文字：支持多语言音频转录。
- 字幕生成：输出带时间信息的 SRT 格式字幕文件。
- 多格式兼容：支持 MP3、WAV 等常见音频格式。
- 无服务器部署：通过 Cloudflare Workers 部署，单文件 `worker.js` 即可。
- API 接口：提供 `/raw`（原始转录 JSON）和 `/srt`（字幕文件）两种接口。
- 语音活动检测（VAD）：支持 `vad_filter` 参数过滤非语音内容。
- 上下文优化：通过 `initial_prompt` 和 `prefix` 参数提升识别准确度。
- 翻译功能：支持将音频内容翻译成指定语言。

## 使用帮助

### 部署流程

部署 Whisper_Cloudflare 非常简便，仅需将 `worker.js` 代码拷贝到 Cloudflare Workers 平台，无须克隆整个仓库。步骤如下：

1. **注册 Cloudflare 账号**

   访问 Cloudflare 官网，注册或登录账号，确保启用 Workers 功能（免费计划支持）。进入“Workers”页面，点击“创建 Worker”。

2. **创建 Worker 并粘贴代码**

   - 在编辑器中新建 Worker（默认名为 `worker` 或自定义）。
   - 粘贴提供的 `worker.js` 代码，替换默认内容。
   - 保存代码。

3. **安装 Wrangler（可选，命令行部署）**

   若需命令行管理 Worker，安装 Wrangler（Cloudflare Workers CLI）。需要安装 Node.js（建议 v16.17.0 及以上），执行：

```bash
npm install -g wrangler
```

4. **配置 Wrangler 和 AI 绑定**

   - 登录 Cloudflare:

```bash
wrangler login
```

   - 编辑 `wrangler.toml` 文件，添加配置:

```toml
name = "whisper-cloudflare"
compatibility_flags = ["nodejs_compat"]
[ai]
binding = "AI"
```

   - 若不使用 Wrangler，可在 Cloudflare 仪表板手动绑定 AI 模型，选择 `@cf/openai/whisper-large-v3-turbo`。

5. **发布 Worker**

   - 在编辑器点击“部署”按钮，发布代码。
   - 或使用命令行:

```bash
wrangler deploy
```

   - 部署成功后，Cloudflare 会生成 Worker URL，如 `https://whispercloudflare.tchepai.com/`。

6. **准备音频文件**

   确保音频格式为 MP3 或 WAV，文件不超过 25MB（受 Cloudflare 限制）。音频可上传为二进制文件或提供可访问 URL（推荐云存储）。

### 主要功能操作

#### 语音转文字

Whisper_Cloudflare 利用 Whisper 模型将音频转换为文本，步骤如下：

- **上传音频**：以 POST 请求向 `/raw` 接口发送二进制音频数据。例如：

```bash
curl -X POST "https://whisper.ohen5pbf93.workers.dev/raw" \
-H "Content-Type: application/octet-stream" \
--data-binary "@audio.mp3"
```

- **获取转录结果**：接口返回 JSON 格式，含文本及时间段信息：

```json
{
  "response": {
    "text": "这是一个测试音频。",
    "segments": [
      {"text": "这是一个", "start": 0.0, "end": 1.2},
      {"text": "测试音频", "start": 1.3, "end": 2.5}
    ]
  }
}
```

- **处理大文件**：若超过 25MB，需人工拆分为约 1MB 小块，分别上传后合并结果。

#### 字幕生成

生成适用于视频的 SRT 字幕文件，流程如下：

- **请求字幕**：向 `/srt` 接口上传音频：

```bash
curl -X POST "https://whispercloudflare.tchepai.com/srt" \
-H "Content-Type: application/octet-stream" \
--data-binary "@audio.mp3"
```

- **获取字幕结果**：返回 SRT 格式字幕，例如：

```
1
00:00:00,000 --> 00:00:01,200
这是一个
2
00:00:01,300 --> 00:00:02,500
测试音频
```

#### Web 界面使用

`worker.js` 内置一个 HTML 界面，用户可通过浏览器操作：

- 访问 Worker URL 根路径（例如 https://whispercloudflare.tchepai.com/）。
- 选择 MP3 或 WAV 文件，设定任务类型（转录或翻译）、语言、VAD 过滤等参数。
- 提交后，显示 SRT 字幕，支持下载 `.srt` 文件。
- 支持进度条，处理 41 分钟音频约需 1.9 分钟。

#### API 使用

项目提供两个关键 API 接口：

- `/raw`：返回 JSON 格式原始转录数据，适合开发者进一步处理。
- `/srt`：输出 SRT 字幕文件，适合视频编辑。

示例 JavaScript 调用：

```javascript
const response = await fetch('https://whispercloudflare.tchepai.com/srt', {
  method: 'POST',
  headers: { 'Content-Type': 'application/octet-stream' },
  body: audioFile // 音频二进制数据
});
const srt = await response.text();
console.log(srt); // 输出 SRT 字幕
```

#### 上下文优化

利用 `initial_prompt` 或 `prefix` 参数输入上下文信息，提高转录准确率。例如：

```bash
curl -X POST "https://whispercloudflare.tchepai.com/raw?initial_prompt=技术会议" \
-H "Content-Type: application/octet-stream" \
--data-binary "@audio.mp3"
```

#### 语音活动检测（VAD）

启用 VAD 过滤去除非语音内容，传入参数 `vad_filter=true`：

```bash
curl -X POST "https://whispercloudflare.tchepai.com/raw?vad_filter=true" \
-H "Content-Type: application/octet-stream" \
--data-binary "@audio.mp3"
```

#### 翻译功能

通过设置 `task=translate` 和 `language` 参数，将音频内容翻译为指定语言。例如：

```bash
curl -X POST "https://whispercloudflare.tchepai.com/raw?task=translate&language=en" \
-H "Content-Type: application/octet-stream" \
--data-binary "@audio.mp3"
```

### 性能与限制

- **速度**：测试中处理 41 分钟 39 秒音频仅需约 1.9 分钟。
- **限制**：Cloudflare Workers 的资源限制可能导致偶尔失败，建议多尝试。
- **文件大小**：单次上传文件大小上限为 25MB。

### 注意事项

- **API 安全**：在 Cloudflare 管理平台正确配置 AI 绑定，避免泄露令牌。
- **错误处理**：请求失败时，请稍作等待后重试。
- **浏览器兼容**：Web 界面兼容主流现代浏览器，如 Chrome、Firefox 等。

## 应用场景

1. **会议记录转录**：上传会议音频，生成文本或 SRT 字幕，支持多语言会议整理。
2. **播客字幕生成**：为播客内容生成 SRT 字幕，提升内容可访问性与搜索优化。
3. **教育资源转录**：教师或学生上传课堂录音，生成笔记或字幕，方便复习。
4. **语音应用开发**：开发者利用 API 构建实时字幕或语音助手，适合轻量项目。

## 常见问答（QA）

1. **支持哪些音频格式？**

   支持 MP3、WAV 等格式，建议使用高质量音频。

2. **如何处理大文件？**

   需手动切分为约 1MB 小文件，分块上传后合并。

3. **部署是否收费？**

   Cloudflare Workers 免费计划即可部署，AI 模型每日提供 10,000 免费神经元，额外部分按每 1000 神经元收费 $0.011。

4. **如何提升转录准确度？**

   通过 `initial_prompt`、`prefix` 和 `vad_filter` 参数来优化识别效果。

5. **支持哪些语言？**

   包括英语、中文、日语等多种语言，详见 Whisper 官方文档。
