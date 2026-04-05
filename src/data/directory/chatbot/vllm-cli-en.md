---
title: vLLM CLI：Command Line Tool for Deploying Large Language Models with vLLM
description: vllm-cli is a command line tool specifically designed for vLLM that simplifies the deployment and management of large language models. It supports interactive menus and command line operations, providing rich features such as model management, remote loading, configuration adjustment, and server monitoring. It is suitable for local testing and automated integration needs.
image: https://repo.alisencent.com/upload/file/2026/04/02/9c01315defe1404.png
tags:
  - chatbot
link: https://github.com/Chen-zexi/vllm-cli
---

vllm-cli is a command line tool developed for [vLLM](https://www.kdjingpai.com/vllm/), greatly simplifying the deployment and management of large language models. The tool offers both interactive menu and traditional command line modes, supporting users to manage local and remote models, configure various schemes, and monitor model server status in real-time. Whether it is rapid local testing of multiple models or integrating model services into automated scripts, vllm-cli provides a convenient and efficient experience. Additionally, it includes built-in system information detection and log viewing to help users quickly locate issues.

![vLLM CLI interface screenshot](https://repo.alisencent.com/upload/file/2026/04/02/76f8ccf34b74014-scaled.png)

## Features List

- **Interactive Mode**: Provides a comprehensive and rich terminal menu interface, simple to operate and suitable for beginners.
- **Command Line Mode**: Supports quick command instructions, convenient for automation and script invocation.
- **Model Management**: Automatically detects and manages local model files.
- **Remote Model Support**: Loads models directly from the HuggingFace Hub without downloading.
- **Configuration Schemes**: Built-in multiple optimization configurations (such as high throughput, low memory) and supports user customization.
- **Server Monitoring**: Displays the vLLM server status in real-time, including GPU utilization and logs.
- **System Information**: Detects and displays GPU, memory, and CUDA compatibility.
- **Log Viewer**: Quickly view full logs to locate issues when server startup fails.
- **LoRA Support**: Allows loading the base model and multiple LoRA adapters simultaneously.

## Usage Help

vllm-cli aims to simplify the deployment process of large language models. The following is a detailed step-by-step guide.

### 1. Installation

**Prerequisites**
- Python 3.11 or above
- NVIDIA GPU with CUDA support
- vLLM core package installed

**Install via PyPI**
```bash
pip install vllm-cli
```

**Compile and install from source**
```bash
git clone https://repo.alisencent.com/upload/file/2026/04/02/vllm-cli.git
cd vllm-cli
pip install -r requirements.txt
pip install hf-model-tool
pip install -e .
```
It is recommended to execute the above steps in a clean virtual environment.

### 2. Usage

vllm-cli supports both interactive interface and command line operation modes.

#### Interactive Mode

Suitable for beginners, run the command:
```bash
vllm-cli
```
After startup, enter the welcome screen and complete model selection, configuration, and service startup via the menu.

- **Model Selection**: Lists local and HuggingFace Hub remote models for direct deployment.
- **Quick Start**: Automatically loads the last successful configuration and runs with one click.
- **Custom Configuration**: Adjust various parameters such as quantization methods and tensor parallelism.
- **Server Monitoring**: Displays real-time GPU usage, server status, and logs.

#### Command Line Mode

Suitable for automation and advanced users. The core command is `serve`.

**Basic Usage**
```bash
vllm-cli serve <MODEL_NAME>
```
Where `<MODEL_NAME>` can be for example `Qwen/Qwen2-1.5B-Instruct`.

**Use preset configurations**
```bash
vllm-cli serve <MODEL_NAME> --profile high_throughput
```
Built-in profiles include:
- `standard`: intelligent default configuration
- `moe_optimized`: optimized for mixture of experts models
- `high_throughput`: optimized for maximum throughput
- `low_memory`: configuration for memory-constrained environments (e.g., FP8 quantization)

**Pass custom parameters**
```bash
vllm-cli serve <MODEL_NAME> --quantization awq --tensor-parallel-size 2
```

**Other common commands**

- List available models:
```bash
vllm-cli models
```
- Display system information:
```bash
vllm-cli info
```
- Check service status:
```bash
vllm-cli status
```
- Stop service (specify port):
```bash
vllm-cli stop --port 8000
```

### 3. Configuration Files

Configuration files are located in the user directory at `~/.config/vllm-cli/`.

- `config.yaml`: main configuration file
- `user_profiles.json`: user-defined configuration schemes
- `cache.json`: caches model lists and system information to improve performance

When model loading fails, you can check the logs directly for troubleshooting.

## Application Scenarios

1. **Local Development and Model Evaluation**: Quickly deploy multiple large language models to facilitate algorithm verification and performance testing.
2. **Automated Deployment Scripts**: Integrate into CI/CD or operations scripts for automated model deployment and testing.
3. **Teaching and Demonstration**: Use the interactive interface to showcase model effects without configuration details.
4. **Lightweight Application Backend**: Quickly build a stable inference backend for small-scale call requirements.

## Q&A

1. **What hardware does vllm-cli support?**
Currently supports NVIDIA GPUs with CUDA. AMD GPU support is under development.

2. **What to do if model loading fails?**
First use the log viewing feature to locate the problem, confirm GPU and vLLM version compatibility, and check official documentation for any special parameters.

3. **How to discover local HuggingFace models?**
Integrated with `hf-model-tool`, automatically scans default cache and custom paths to manage models.

4. **Is it possible to run without a GPU?**
No. vLLM is designed to rely on GPUs and requires NVIDIA GPU hardware with CUDA support.