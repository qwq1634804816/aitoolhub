---
title: AI-Chatbox：Voice-to-Text Intelligent Chat Project Based on ESP32S3
description: AI-Chatbox utilizes the ESP32S3 development board to achieve voice interaction, supporting voice-to-text conversion, large model Q&A, and speech synthesis. It is suitable for children, elderly, and visually impaired users. The project is developed in Rust and integrates Vosk speech recognition. The hardware centers on the XIAO ESP32S3 Sense, with code hosted on GitHub.
image: https://repo.alisencent.com/upload/file/2026/04/05/3f266995955ab87.png
tags:
   - audio
link: https://github.com/paul356/ai-chatbox
---

AI-Chatbox is a voice interactive device based on the ESP32S3 development board. Users interact with a large language model (LLM) through voice input. The device transcribes voice into text, sends it to the model to get answers, and supports voice synthesis playback afterwards. The project is written in Rust and integrates the Vosk speech recognition tool, specially designed for people who have difficulty using mobile applications, such as children, elderly, and visually impaired users. On the hardware side, it uses XIAO ESP32S3 Sense combined with a voice encoding module. The project code is publicly hosted on GitHub. The aim is to provide embedded development enthusiasts and smart hardware developers with a convenient voice interaction experience.

## Features List

- **Voice Wake-up and Command Recognition**: Supports wake-up phrase "hi, Lexin" and command "I have a question" to start recording.
- **Voice to Text**: Uses Vosk tool to convert recorded WAV audio to text, supporting Chinese recognition.
- **Large Model Interaction**: Sends text queries via the [DeepSeek](https://www.kdjingpai.com/en/deepseek-chatshena/) API to obtain intelligent answers.
- **Logging**: Supports real-time device log viewing, facilitating debugging and status monitoring.
- **Cross-Device Access**: Builds a REST service using Flask, allowing other devices on the local network to call the voice-to-text function.
- **Embedded Optimization**: Rust code optimized for embedded environments, setting maximum generated tokens to 512, balancing performance and resource constraints.

## Usage Help

### Installation and Configuration

1. **Prepare Hardware**  
   Requires a XIAO ESP32S3 Sense development board with microphone and voice encoding capabilities. External voice encoding hardware can improve audio processing. Ensure the board is connected with an SD card to store voice models.

2. **Configure Development Environment**  
   - Install Rust on ESP, following the official documentation.  
   - Install Python environment and run the Vosk voice-to-text service.  
   - Download the Vosk Chinese model (`vosk-model-cn-0.22.zip`) and unzip it.  
   - Copy model files (`mn7_cn`, `nsnet2`, `vadnet1_medium`, `wn9_hilexin`) to the root directory of the SD card.

3. **Install Dependencies**  
   Run the following commands to install Python dependencies:
```
pip install vosk flask flask-cors
```
   Confirm Rust environment configuration is complete, enter ESPUP environment:
```
source $HOME/export-esp.sh
```

4. **Build and Upload Firmware**  
   - Clone the project repository:
```
git clone https://github.com/paul356/ai-chatbox.git
```
   - Enter the project directory and build:
```
cargo build
```
   - After successful build, upload the firmware:
```
cargo espflash flash -p /dev/ttyACM0 --flash-size 8mb
```
   - Configure environment variables (Wi-Fi SSID and password, and DeepSeek API key):
```
export WIFI_SSID=<your-ssid>
export WIFI_PASS=<your-password>
export LLM_AUTH_TOKEN=<your-deepseek-token>
```

5. **Run Voice to Text Service**  
   - Run one level above the `vosk-model-cn-0.22` directory:
```
python vosk_server.py
```
   - After service starts, it listens on the interface `http://0.0.0.0:5000/transcribe`, supports receiving WAV files and returns text.

6. **Test Service**  
   Test the voice-to-text service with the command:
```
curl -X POST -F "file=@record.wav" http://127.0.0.1:5000/transcribe
```

### Operation Process

1. **Start Device**  
   Connect the development board and run the firmware. Logs can be viewed with:
```
cargo espflash monitor
```

2. **Voice Interaction**  
   - Activate device with wake-up words "hi, Lexin."  
   - Say "I have a question" to enter recording mode.  
   - Speak the question; the device will automatically stop recording after detecting 2 seconds of silence.  
   - The audio is converted by Vosk to text and sent to the DeepSeek API. The response is recorded in logs.

3. **View Logs**  
   Logs display device status, recognition results, and large model answers. For example, asking "What is a large model" will display detailed definitions and functional explanations of the model.

### Notes

- **Clear Speech**: Vosk’s model size is small; precise pronunciation helps improve recognition accuracy.  
- **Network Connection**: The device must connect to Wi-Fi to access the DeepSeek API.  
- **Model Storage**: Ensure the SD card has enough space (hundreds of MB) to store the voice models.  
- **Debug Information**: Log entries starting with `Error:` indicate errors and can be used for troubleshooting.

## Application Scenarios

1. **Intelligent Assistant**  
   Users operate the device by voice to get knowledge Q&A or execute tasks, suitable for children and elderly users. For example, when a child asks "Why does the sun shine?", the device provides an easy-to-understand answer.

2. **Screenless Device Interaction**  
   Visually impaired or users who find mobile phones inconvenient can query information or hold conversations through voice.

3. **Embedded Development Experiment**  
   Developers can use the project to learn Rust applications in embedded systems and explore the combination of speech recognition and large models.

4. **Education and Learning**  
   Students ask questions by voice; the device connects to the large model to provide expert answers, suitable for classrooms and self-study.

## QA

1. **Which languages does the Vosk model support?**  
   This project uses `vosk-model-cn-0.22` focused on Chinese recognition. The Vosk official website offers multilingual models that can be replaced as needed.

2. **How to improve recognition accuracy?**  
   Maintain clear pronunciation, avoid background noise, use high-quality microphones, or upgrade to larger models like `vosk-model-cn-0.22-large`.

3. **How to get the DeepSeek API key?**  
   Register an account on the DeepSeek official site and apply for an API key, then configure it in the environment variable `LLM_AUTH_TOKEN`.

4. **Does the device support offline operation?**  
   Vosk speech recognition can run offline, but large model interaction requires internet access to the DeepSeek API.