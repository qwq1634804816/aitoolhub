---
title: vLLM CLI：使用 vLLM 部署大语言模型的命令行工具
description: vllm-cli 是一款专为 vLLM 设计的命令行工具，它简化了大语言模型的部署和管理流程，支持交互式菜单和命令行操作，提供丰富的功能如模型管理、远程加载、配置调整及服务器监控，适合本地测试和自动化集成需求。
image: https://repo.alisencent.com/upload/file/2026/04/02/9c01315defe1404.png
tags:
  - chatbot
link: https://github.com/Chen-zexi/vllm-cli
---

vllm-cli 是一款为 [vLLM](https://www.kdjingpai.com/vllm/) 打造的命令行工具，它极大地简化了大语言模型的部署和管理工作。该工具兼具交互式菜单和传统命令行两种操作模式，支持用户管理本地及远程模型，配置多种方案，并实时监控模型服务器状态。无论是本地快速测试多模型，还是自动化脚本中集成模型服务，vllm-cli 都能提供便捷且高效的体验。此外，它还内置系统信息检测和日志查看，帮助用户快速定位问题。

![vLLM CLI 界面截图](https://repo.alisencent.com/upload/file/2026/04/02/76f8ccf34b74014-scaled.png)

## 功能列表

- **交互模式**：提供完整丰富的终端菜单界面，操作简单，适合新手使用。
- **命令行模式**：支持快捷的命令指令，方便自动化和脚本调用。
- **模型管理**：自动识别并管理本地模型文件。
- **远程模型支持**：无需下载，直接从 HuggingFace Hub 载入模型。
- **配置方案**：内置多种优化配置（如高吞吐量、低内存），并支持用户自定义。
- **服务器监控**：实时显示 vLLM 服务器状态，包括 GPU 使用率及日志。
- **系统信息**：检测并展示 GPU、内存与 CUDA 兼容情况。
- **日志查看器**：服务器启动失败时，可快速查看完整日志定位问题。
- **LoRA 支持**：允许同时加载基础模型和多个 LoRA 适配器。

## 使用帮助

vllm-cli 致力于简化大语言模型的部署过程，以下是详细步骤指导。

### 1. 安装

**先决条件**
- Python 3.11 及以上版本
- 支持 CUDA 的 NVIDIA GPU
- 已安装 vLLM 核心包

**通过 PyPI 安装**
```bash
pip install vllm-cli
```

**从源码编译安装**
```bash
git clone https://repo.alisencent.com/upload/file/2026/04/02/vllm-cli.git
cd vllm-cli
pip install -r requirements.txt
pip install hf-model-tool
pip install -e .
```
建议在干净的虚拟环境中执行以上步骤。

### 2. 使用方法

vllm-cli 支持交互式界面和命令行两种操作模式。

#### 交互模式

适合初学者，运行命令：
```bash
vllm-cli
```
启动后进入欢迎界面，通过菜单完成模型选择、配置与服务启动。

- **模型选择**：列出本地和 HuggingFace Hub 远程模型，直接选择部署。
- **快速启动**：自动加载上次成功配置，一键运行。
- **自定义配置**：调整量化方式、张量并行等多种参数。
- **服务器监控**：实时显示 GPU 利用率、服务器状态和日志。

#### 命令行模式

适合自动化和高级用户，核心命令为 `serve`。

**基本用法**
```bash
vllm-cli serve <MODEL_NAME>
```
其中 `<MODEL_NAME>` 例如 `Qwen/Qwen2-1.5B-Instruct`。

**使用预设配置**
```bash
vllm-cli serve <MODEL_NAME> --profile high_throughput
```
内置配置包括：
- `standard`：智能默认配置
- `moe_optimized`：针对混合专家模型优化
- `high_throughput`：极致吞吐量优化
- `low_memory`：内存受限环境配置（如 FP8 量化）

**传递自定义参数**
```bash
vllm-cli serve <MODEL_NAME> --quantization awq --tensor-parallel-size 2
```

**其他常用命令**

- 列出可用模型：
```bash
vllm-cli models
```
- 显示系统信息：
```bash
vllm-cli info
```
- 检查服务状态：
```bash
vllm-cli status
```
- 停止服务（指定端口）：
```bash
vllm-cli stop --port 8000
```

### 3. 配置文件

配置文件位于用户目录下 `~/.config/vllm-cli/`。

- `config.yaml`：主配置文件
- `user_profiles.json`：用户自定义配置方案
- `cache.json`：缓存模型列表和系统信息以提升性能

遇到模型加载失败时，可以直接查看日志进行排查。

## 应用场景

1. **本地开发与模型评估**：快速部署多种大语言模型，方便算法验证与性能测试。
2. **自动化部署脚本**：集成到 CI/CD 或运维脚本，实现自动化模型部署和测试。
3. **教学与演示**：用交互式界面展示模型效果，无需配置细节。
4. **轻量级应用后端**：为小规模调用需求快速搭建稳定推理后端。

## QA

1. **vllm-cli 支持哪些硬件？**
   目前支持支持 CUDA 的 NVIDIA GPU，AMD GPU 支持尚在开发中。

2. **模型加载失败怎么办？**
   先利用日志查看功能定位问题，确认 GPU 和 vLLM 版本兼容性，并查阅官方文档是否需特殊参数。

3. **如何发现本地 HuggingFace 模型？**
   集成了 `hf-model-tool`，自动扫描默认缓存及自定义路径管理模型。

4. **无 GPU 可用吗？**
   不可行。vLLM 设计依赖于 GPU，必须具备支持 CUDA 的 NVIDIA GPU 硬件。
