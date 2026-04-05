---
title: AI-Chatbox：基于ESP32S3的语音转文字智能对话项目
description: AI-Chatbox 利用 ESP32S3 开发板实现语音交互，支持语音转文字、大模型问答及语音播报，适合儿童、老年人和视障人士，项目采用 Rust 语言开发并集成 Vosk 语音识别，硬件以 XIAO ESP32S3 Sense 为核心，代码托管于 GitHub。
image: https://repo.alisencent.com/upload/file/2026/04/05/3f266995955ab87.png
tags:
   - audio
link: https://github.com/paul356/ai-chatbox
---

AI-Chatbox 是一款基于 ESP32S3 开发板的语音交互设备。用户通过语音输入与大型语言模型（LLM）进行对话，设备会将语音转写成文本，发送给模型获取回答，之后还支持语音合成播报。项目由 Rust 语言编写，集成了 Vosk 语音识别工具，专为不便使用手机应用的人群设计，如儿童、老年人及视障用户。硬件方面，采用 XIAO ESP32S3 Sense 结合语音编码模块，项目代码公开托管于 GitHub。旨在为嵌入式开发爱好者和智能硬件开发者打造便捷的语音交互体验。

## 功能列表

- **语音唤醒与命令识别**：支持唤醒词“hi, 乐鑫”和指令“我有个问题”以启动录音功能。
- **语音转文字**：采用 Vosk 工具将录制的 WAV 音频转换成文本，支持中文识别。
- **大模型交互**：通过 [DeepSeek](https://www.kdjingpai.com/en/deepseek-chatshena/) API 发送文本查询，获取智能回答。
- **日志记录**：支持实时查看设备日志，便于调试和状态监控。
- **跨设备访问**：利用 Flask 构建 REST 服务，允许局域网内其它设备调用语音转文字功能。
- **嵌入式优化**：Rust 代码针对嵌入式环境优化，设置最大生成 token 为 512，兼顾性能与资源限制。

## 使用帮助

### 安装与配置

1. **准备硬件**  
   需要一块带有麦克风和语音编码能力的 XIAO ESP32S3 Sense 开发板。外接语音编码硬件可提升音频处理效果。确保开发板连接 SD 卡，以存储语音模型。

2. **配置开发环境**  
   - 安装 Rust on ESP，参考官方文档。
   - 安装 Python 环境，运行 Vosk 语音转文字服务。
   - 下载 Vosk 中文模型（`vosk-model-cn-0.22.zip`）并解压。
   - 将模型文件（`mn7_cn`、`nsnet2`、`vadnet1_medium`、`wn9_hilexin`）复制至 SD 卡根目录。

3. **安装依赖**  
   运行以下命令安装 Python 依赖：
```
pip install vosk flask flask-cors
```
   确认 Rust 环境配置完成，进入 ESPUP 环境：
```
source $HOME/export-esp.sh
```

4. **编译与上传固件**
   - 克隆项目仓库：
```
git clone https://github.com/paul356/ai-chatbox.git
```
   - 进入项目目录，执行编译：
```
cargo build
```
   - 编译成功后，上传固件：
```
cargo espflash flash -p /dev/ttyACM0 --flash-size 8mb
```
   - 配置环境变量（Wi-Fi 名称和密码及 DeepSeek API 密钥）：
```
export WIFI_SSID=<your-ssid>
export WIFI_PASS=<your-password>
export LLM_AUTH_TOKEN=<your-deepseek-token>
```

5. **运行语音转文字服务**
   - 在 `vosk-model-cn-0.22` 目录上一级运行：
```
python vosk_server.py
```
   - 服务启动后，监听接口 `http://0.0.0.0:5000/transcribe`，支持接收 WAV 文件并返回文本。

6. **测试服务**
   通过命令测试语音转文字服务：
```
curl -X POST -F "file=@record.wav" http://127.0.0.1:5000/transcribe
```

### 操作流程

1. **启动设备**  
   连接开发板运行固件，可用命令查看日志：
```
cargo espflash monitor
```

2. **语音交互**  
   - 通过唤醒词“hi, 乐鑫”激活设备。
   - 说出“我有个问题”进入录音模式。
   - 说出问题，设备检测静音 2 秒后自动结束录音。
   - 语音由 Vosk 转文字后发送至 DeepSeek API，返回内容记录日志。

3. **查看日志**  
   日志显示设备状态、识别结果及大模型回答。例如，询问“大模型是什么”将显示详细模型定义与功能说明。

### 注意事项

- **语音清晰**：Vosk 模型体积较小，发音精准有助于提高识别准确率。
- **网络连接**：设备需接入 Wi-Fi 以访问 DeepSeek API。
- **模型存储**：确保 SD 卡有足够空间（数百 MB）存放语音模型。
- **调试信息**：日志中以 `Error:` 开头的条目表示错误，可用于问题排查。

## 应用场景

1. **智能助手**  
   用户以语音操作设备，获取知识问答或执行任务，适合儿童和老年用户。例如，儿童询问“太阳为什么发光”，设备给出通俗回答。

2. **无屏设备交互**  
   视障或不便使用手机者可通过语音实现信息查询或对话功能。

3. **嵌入式开发实验**  
   开发者能借助项目学习 Rust 在嵌入式上的应用，探索语音识别与大模型结合。

4. **教育与学习**  
   学生通过语音提问，设备连接大模型，提供专业解答，适合课堂及自学。

## QA

1. **Vosk 模型支持哪些语言？**  
   本项目使用 `vosk-model-cn-0.22`，侧重中文识别。Vosk 官网提供多语言模型，可根据需求替换。

2. **如何提升识别准确率？**  
   保持发音清晰，避免背景噪声，使用高品质麦克风，或者升级到更大模型如 `vosk-model-cn-0.22-large`。

3. **怎么获取 DeepSeek API 密钥？**  
   访问 DeepSeek 官网注册账号并申请 API 密钥，配置至环境变量 `LLM_AUTH_TOKEN`。

4. **设备支持离线运行吗？**  
   Vosk 语音识别可离线执行，但大模型交互需联网访问 DeepSeek API。
