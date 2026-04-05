---
title: Kitten-TTS-Server：A Lightweight Self-Deployable Text-to-Speech Service
description: Kitten-TTS-Server is an open-source project based on the KittenTTS model that provides a fully functional and easy-to-deploy text-to-speech server. It integrates a web interface, multiple voices, and GPU acceleration, supports long-text audiobook generation, and simplifies the model usage process.
image: https://repo.alisencent.com/upload/file/2026/04/05/3f266995955ab87.png
tags:
  - audio
link: https://github.com/devnen/Kitten-TTS-Server
---

Kitten-TTS-Server is an open-source project that builds a feature-rich server environment for the lightweight [KittenTTS](https://www.kdjingpai.com/kittentts/) model. Users can set up their own text-to-speech (TTS) service using this project. Its core advantage lies in being built on a compact model (under 25MB), featuring a user-friendly web interface, support for long-text audiobook generation, and significant GPU acceleration. The server greatly simplifies the model installation and running process, making it easy for non-expert users to use. It includes 8 preset voices (4 male, 4 female), supports fast deployment via Docker containers, reducing maintenance difficulty.

![Kitten-TTS-Server schematic](https://repo.alisencent.com/upload/file/2026/04/05/3fa1ccc1d40a10c.png)

## Feature List

- **Lightweight Model**: Based on the KittenTTS ONNX model, less than 25MB in size, with low resource usage.
- **GPU Acceleration**: Uses optimized `onnxruntime-gpu` pipeline and I/O binding technology, supports NVIDIA CUDA GPUs, greatly increasing speech synthesis speed.
- **Long Text and Audiobook Generation**: Supports intelligent sentence segmentation and chunk processing, seamlessly splicing audio suitable for complete audiobook production.
- **Modern Web Interface**: Provides an intuitive Web UI supporting text input, voice selection, speed adjustment, and real-time waveform display.
- **Multiple Built-in Voices**: Integrates 8 voices from the model itself (4 male, 4 female), selectable directly.
- **Dual API Interfaces**: Offers a full-function `/tts` endpoint and an OpenAI TTS API compatible `/v1/audio/speech` endpoint for easy integration.
- **Simple Configuration**: All parameters managed in a single `config.yaml` file.
- **State Memory**: The web client remembers the last text, voice, and settings for convenient continuous use.
- **Docker Support**: Provides Docker Compose files for both CPU and GPU environments for one-click hosting deployment.

## Usage Guide

Kitten-TTS-Server provides complete installation and usage instructions to ensure users can successfully deploy it on local devices.

### System Environment Preparation

Please prepare the following environment before installation:

1. **Operating System**: Windows 10/11 (64-bit) or Linux (Debian/Ubuntu recommended).
2. **Python**: Version 3.10 or above.
3. **Git**: For cloning the code.
4. **eSpeak NG**: A dependency for text phonemization.
   - Windows: Download and install `espeak-ng-X.XX-x64.msi`, then restart the terminal.
   - Linux: Run `sudo apt install espeak-ng`.
5. **(Optional GPU Acceleration)**:
   - An NVIDIA GPU supporting CUDA.
   - (Linux) Install `libsndfile1` and `ffmpeg` via `sudo apt install libsndfile1 ffmpeg`.

### Installation Steps

The entire installation process is designed as "one-click execution," with paths chosen based on hardware environment.

**Step 1: Clone the Code Repository**

Open the terminal (PowerShell on Windows, Bash on Linux) and run:

```bash
git clone https://github.com/devnen/Kitten-TTS-Server.git
cd Kitten-TTS-Server
```

**Step 2: Create and Activate Python Virtual Environment**

To avoid dependency conflicts, it is recommended to use an isolated virtual environment.

- Windows (PowerShell):

```powershell
python -m venv venv
.\venv\Scripts\activate
```

- Linux (Bash):

```bash
python3 -m venv venv
source venv/bin/activate
```

After activation, the command prompt will show `(venv)`.

**Step 3: Install Python Dependencies**

Choose according to whether you have an NVIDIA GPU:

- **CPU-only Installation (simple)**

```bash
pip install --upgrade pip
pip install -r requirements.txt
```

- **NVIDIA GPU Acceleration Installation (better performance)**

```bash
pip install --upgrade pip
# Install ONNX Runtime with GPU support
pip install onnxruntime-gpu
# Install PyTorch with CUDA support and dependencies
pip install torch torchaudio --index-url https://download.pytorch.org/whl/cu121
# Install the rest of the dependencies
pip install -r requirements-nvidia.txt
```

After installation, run the following script to check if CUDA is available:

```bash
python -c "import torch; print(f'CUDA available: {torch.cuda.is_available()}')"
```

If the output is `CUDA available: True`, GPU support is successfully configured.

### Running the Server

> **Note**: The first server start will automatically download about 25MB of the KittenTTS model; this is a one-time process. Subsequent startups will be faster.

1. Make sure the virtual environment is activated (prompt shows `(venv)`).
2. Run in terminal:

```bash
python server.py
```
3. After startup, the default browser will automatically open the operation page.

- Web address: `http://localhost:8005`
- API documentation: `http://localhost:8005/docs`

Stop the server by pressing `CTRL+C`.

### Docker Installation (Optional)

Users familiar with Docker can use Docker Compose for a simple and efficient deployment.

1. Prepare the environment:

   - Install Docker and Docker Compose.
   - (GPU users) Install NVIDIA Container Toolkit.

2. Clone the project (if not done):

```bash
git clone https://github.com/devnen/Kitten-TTS-Server.git
cd Kitten-TTS-Server
```

3. Start the container (based on hardware environment):

- NVIDIA GPU users:

```bash
docker compose up -d --build
```

- CPU only users:

```bash
docker compose -f docker-compose-cpu.yml up -d --build
```

4. Access and manage containers:

- Web access: `http://localhost:8005`
- View logs: `docker compose logs -f`
- Stop containers: `docker compose down`

### Feature Operations

- **Generate Regular Speech**
  1. Start the server and open `http://localhost:8005`.
  2. Enter the target text.
  3. Select the preferred voice.
  4. Adjust the speech rate slider.
  5. Click "Generate Speech"; audio will play automatically and be available for download.

- **Generate Audiobooks**
  1. Copy the entire book or chapter plain text.
  2. Paste into the web text box.
  3. Ensure the "Split text into chunks" option is enabled.
  4. Set an appropriate chunk size (recommended 300-500 characters).
  5. Click "Generate Speech"; the long text will be segmented and synthesized, offering a complete downloadable audio file.

## Application Scenarios

1. **Audiobook Production**

   Convert e-books, long articles, or novels into audiobooks, with automatic splitting and splicing of long texts.

2. **Personal Voice Assistant**

   Developers can call the API to add voice broadcast features to applications, such as news, weather, and notifications.

3. **Video Content Dubbing**

   Used by content creators to generate video narration or commentary, improving efficiency at low cost with flexible modifications.

4. **Learning Assistant Tool**

   Language learners input words or sentences to get standard pronunciation, or convert study materials into audio for listening during commutes or exercise.

## FAQs

1. **How does this project differ from directly using the KittenTTS model?**

   This project is a service-based wrapper around KittenTTS, solving issues of complex environment setup, lack of interface, long text handling, and GPU acceleration. It provides a ready-to-use website interface and APIs, making it user-friendly for non-experts.

2. **What to do if I encounter eSpeak related errors during installation?**

   Please ensure you have correctly installed eSpeak NG for your OS and restarted the terminal. If issues persist, check if it was installed in a standard system path.

3. **How to confirm GPU acceleration is effective?**

   Confirm that NVIDIA-style dependencies have been installed and run commands to verify CUDA support. You can also monitor GPU usage via Task Manager or `nvidia-smi` while the server is running.

4. **What if the server shows "port already in use" message?**

   This means the port 8005 is occupied by another program on your machine. You can change `server.port` to another unused port (e.g., 8006) in `config.yaml` and restart the server.
