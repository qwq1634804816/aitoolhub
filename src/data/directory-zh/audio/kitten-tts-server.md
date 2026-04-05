---
title: Kitten-TTS-Server：一个可自行部署的轻量级文本转语音服务
description: Kitten-TTS-Server 是一个基于 KittenTTS 模型的开源项目，提供了功能完善且易于部署的文本转语音服务器。它集成了网页界面、多样语音和 GPU 加速，支持长文本有声读物生成，简化了模型使用流程。
image: https://repo.alisencent.com/upload/file/2026/04/05/3f266995955ab87.png
tags:
  - audio
link: https://github.com/devnen/Kitten-TTS-Server
---

Kitten-TTS-Server 是一款开源项目，为轻量级的 [KittenTTS](https://www.kdjingpai.com/kittentts/) 模型打造了一个功能丰富的服务器环境。用户可以借助此项目自行搭建文本转语音（TTS）服务。核心优势在于其基于小巧的模型（不足25MB）构建，拥有用户友好的网页界面、长文本有声书生成支持及显著的 GPU 加速性能。服务器极大简化了模型安装与运行过程，使非专业用户也能轻松上手。内置8种预设语音（4男4女），并支持通过 Docker 容器快速部署，降低维护难度。

![Kitten-TTS-Server示意图](https://repo.alisencent.com/upload/file/2026/04/05/3fa1ccc1d40a10c.png)

## 功能列表

- **轻量级模型**：基于 KittenTTS ONNX 模型，体积小于25MB，资源占用低。
- **GPU 加速**：采用优化的 `onnxruntime-gpu` 管道与 I/O 绑定技术，支持 NVIDIA CUDA 显卡，大幅提升语音合成速度。
- **长文本与有声书生成**：支持智能断句与分块处理，能无缝拼接音频，适合制作完整有声读物。
- **现代化网页界面**：提供直观的 Web UI，支持文本输入、语音选择、语速调节以及实时波形显示。
- **多种内置语音**：集成模型自带8种声音（4男4女），可直接选择使用。
- **双 API 接口**：分别提供全功能 `/tts` 接口和兼容 OpenAI TTS API 的 `/v1/audio/speech` 接口，便于集成。
- **配置简便**：所有参数集中于单一 `config.yaml` 文件中管理。
- **状态记忆**：网页端会记忆上次文本、语音及设置，方便连续使用。
- **Docker 支持**：提供适用于 CPU 和 GPU 的 Docker Compose 文件，实现一键托管部署。

## 使用帮助

Kitten-TTS-Server 提供完整的安装及使用指南，确保用户能顺利部署于本地设备。

### 系统环境准备

安装前请准备如下环境：

1. **操作系统**：Windows 10/11 (64位) 或 Linux（推荐 Debian/Ubuntu）。
2. **Python**：版本需为 3.10 及以上。
3. **Git**：用于克隆代码。
4. **eSpeak NG**：文本音素化所需依赖。
   - Windows：下载并安装 `espeak-ng-X.XX-x64.msi`，安装后重启终端。
   - Linux：执行 `sudo apt install espeak-ng` 安装。
5. **（GPU 加速可选）**：
   - 一块支持 CUDA 的 NVIDIA 显卡。
   - （Linux）需安装 `libsndfile1` 和 `ffmpeg`，用命令 `sudo apt install libsndfile1 ffmpeg` 安装。

### 安装步骤

整个安装流程设计为“一键执行”，根据硬件环境选择相应路径。

**第一步：克隆代码仓库**

打开终端（Windows 使用 PowerShell，Linux 使用 Bash），执行：

```bash
git clone https://github.com/devnen/Kitten-TTS-Server.git
cd Kitten-TTS-Server
```

**第二步：创建并激活 Python 虚拟环境**

避免依赖冲突，建议使用独立虚拟环境。

- Windows (PowerShell)：

```powershell
python -m venv venv
.\venv\Scripts\activate
```

- Linux (Bash)：

```bash
python3 -m venv venv
source venv/bin/activate
```

激活成功后，命令行提示符前会出现 `(venv)`。

**第三步：安装 Python 依赖**

根据是否拥有 NVIDIA 显卡，选择如下方案：

- **仅 CPU 安装（简便）**

```bash
pip install --upgrade pip
pip install -r requirements.txt
```

- **NVIDIA GPU 加速安装（性能更佳）**

```bash
pip install --upgrade pip
# 安装GPU支持的ONNX Runtime
pip install onnxruntime-gpu
# 安装支持CUDA的PyTorch及依赖
pip install torch torchaudio --index-url https://download.pytorch.org/whl/cu121
# 安装其余依赖
pip install -r requirements-nvidia.txt
```
安装后，运行以下脚本检测 CUDA 是否可用：

```bash
python -c "import torch; print(f'CUDA available: {torch.cuda.is_available()}')"
```
若输出 `CUDA available: True`，表示 GPU 支持已配置成功。

### 运行服务器

> **注意**：首次启动服务器时会自动下载约25MB的 KittenTTS 模型，仅需一次，后续启动速度较快。

1. 确认激活虚拟环境 (提示符带有 `(venv)`)。
2. 在终端执行：

```bash
python server.py
```
3. 启动后，默认浏览器会自动打开操作页面。

- 网页地址：`http://localhost:8005`
- API 文档：`http://localhost:8005/docs`

停止服务器只需按 `CTRL+C`。

### Docker 安装（可选）

熟悉 Docker 的用户可选用 Docker Compose 部署，简便高效。

1. 准备环境：

   - 安装 Docker 和 Docker Compose。
   - （GPU 用户）安装 NVIDIA Container Toolkit。

2. 克隆项目（若未完成）

```bash
git clone https://github.com/devnen/Kitten-TTS-Server.git
cd Kitten-TTS-Server
```

3. 启动容器（根据硬件环境）

- NVIDIA GPU 用户：

```bash
docker compose up -d --build
```

- 仅 CPU 用户：

```bash
docker compose -f docker-compose-cpu.yml up -d --build
```

4. 访问和管理容器：

- 网页访问：`http://localhost:8005`
- 查看日志：`docker compose logs -f`
- 停止容器：`docker compose down`

### 功能操作

- **生成普通语音**
  1. 启动服务器并打开 `http://localhost:8005`。
  2. 输入目标文本。
  3. 选择喜欢的语音。
  4. 调节语速滑块。
  5. 点击“Generate Speech”，音频将自动播放并提供下载。

- **生成有声书**
  1. 复制整本书/章节的纯文本。
  2. 粘贴至网页文本框。
  3. 确保“Split text into chunks”选项启用。
  4. 设置合适的分块大小（推荐300-500字符）。
  5. 点击“Generate Speech”，长文本将被切片合成音频，供下载完整文件。

## 应用场景

1. **制作有声书**

   将电子书、长文章或小说转换为有声读物，长文本处理功能自动完成切分与拼接。

2. **个人语音助手**

   开发者可调用 API，为应用增添语音播报功能，如新闻、天气和通知等。

3. **视频内容配音**

   自媒体使用，生成视频旁白或解说，提升效率且成本低廉，支持灵活修改。

4. **学习辅助工具**

   语言学习者输入单词或句子，得到标准发音。也可将学习资料转成音频，在通勤或运动时收听。

## 常见问答（QA）

1. **本项目与直接使用 KittenTTS 模型有何不同？**

   本项目是 KittenTTS 的服务化封装，解决了环境配置复杂、界面缺失、长文本处理及 GPU 加速等问题。提供开箱即用的网站界面与 API，方便非专业用户使用。

2. **安装时遇到 eSpeak 相关错误怎么办？**

   请确认已正确安装对应系统的 eSpeak NG，并重启命令行终端。若问题依旧，检查是否安装在系统标准路径。

3. **如何确认 GPU 加速生效？**

   确认已按 NVIDIA 方式安装依赖，执行命令检测是否支持 CUDA，服务器运行时也可用任务管理器或 `nvidia-smi` 查询显卡利用情况。

4. **服务器提示“端口被占用”怎么办？**

   说明本机已有程序占用了端口8005，可在 `config.yaml` 中修改 `server.port` 为其他未被占用端口（例如8006），再重启服务器。
