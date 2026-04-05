---
title: Ai2 OLMoE：Open-source iOS AI Application Running Offline Based on the OLMoE Model
description: Ai2 OLMoE is an open-source iOS AI application developed by the Allen Institute for AI that supports fully offline operation using the OLMoE model, ensuring privacy and data security. It is suitable for researchers and developers for rapid prototyping and on-device AI experiences.
image: https://repo.alisencent.com/upload/file/2026/04/01/d28d084e2cf774d.png
tags:
  - chatbot
link: https://apps.apple.com/us/app/ai2-olmoe/id6738533815
---

Ai2 OLMoE is an open-source iOS application launched by the Allen Institute for AI (AI2), designed to achieve fully offline operation of AI models. This application is based on the OLMoE model and can ensure user privacy and data security without any network connection. It not only provides researchers with an opportunity to explore improvements in local AI models but also offers developers an efficient platform for rapidly designing new AI experiences.

![Ai2 OLMoE: Open-source iOS AI Application Supporting Offline Operation-1](https://repo.alisencent.com/upload/file/2026/04/01/d5171bfe18a4113.png)


![Ai2 OLMoE: Open-source iOS AI Application Running Offline Based on OLMoE Model-1](https://repo.alisencent.com/upload/file/2026/04/01/a6c8d36d1455b53.png)
*Online Experience: https://playground.allenai.org/?model=olmoe-0125*


## Features List

- **Fully Open Source**: Both Ai2 OLMoE models and code are open for researchers and developers to experiment and optimize.
- **Efficient Operation**: Utilizing Mixture-of-Experts technology to realize powerful AI computing capabilities on device.
- **Privacy Protection**: All computations are done locally, ensuring user data is never uploaded.
- **Multi-functional Integration**: Supports embedding the OLMoE model within other iOS apps to extend functionality.
- **Community Support**: Join the AI2 Discord server to connect with peers, share projects and experiences.


## Usage Help

### Installation Process

1. Search for “Ai2 OLMoE” in the App Store.
2. Tap "Get" and complete the installation.
3. Launch the app and follow the prompts to complete the initial setup.


### User Guide

#### Experience AI Models

1. Open the Ai2 OLMoE app.
2. Select the “Experience Model” feature to start interacting with the model.
3. Input or choose a task and observe the model’s response.

#### Research and Improve AI Models

1. Install and launch Ai2 OLMoE.
2. Enter “Research Mode.”
3. Use the built-in tools and datasets to train and improve the model.
4. Upload improved versions and test performance.

#### Integration into Other iOS Apps

1. Access the Ai2 OLMoE GitHub code repository link provided inside the app.
2. Download the code and configure as per documentation.
3. Embed the OLMoE model into your iOS app to extend AI capabilities.


### Detailed Operation Process

1. **Download and Install**: Search and install Ai2 OLMoE from the App Store.
2. **Initial Setup**: Complete language and privacy settings after launch.
3. **Experience Mode**: Enter experience mode, select or input tasks, and listen to model feedback.
4. **Research Mode**: Utilize built-in tools to optimize the model in research mode.
5. **Integration Mode**: Download the GitHub repository, configure, and integrate into other iOS apps.


## Detailed Introduction to Ai2 OLMoE

The Allen Institute for AI (AI2) has released the OLMoE model as an advanced open-source on-device model. Throughout, the institute has adhered to the principle of creating excellent and fully open language models, formally releasing this open-source application on iOS devices that ensures secure and private experiences. This application not only opens new paths for researchers to improve on-device models but also provides developers a platform to build innovative AI experiences.

Users can download the application directly from the Apple App Store or obtain the source code from the code repository for self-building. Due to hardware requirements, the first version of OLMoE adapts to iPhone 15 Pro and later models, or iPads equipped with M-series chips to ensure smooth usage.

![Ai2 OLMoE: Open-source iOS AI Application Running Offline Based on Core OLMoE Model-1](https://repo.alisencent.com/upload/file/2026/04/01/7adb4b504a07919.png)

### Expanding the Depth and Breadth of an Open Ecosystem

Since the launch of the OLMo series, the Allen Institute for AI has upheld a fully open principle, publishing model weights and all software, data, and technical details involved in its creation. AI2 firmly believes that true openness should encompass the user experience layer, building an open AI ecosystem accessible at large scale. For instance, open-source projects such as [vLLM](https://www.kdjingpai.com/vllm/) and SGLang promote cloud-based large language model deployment, while [Ollama](https://www.kdjingpai.com/ollama/) and LM Studio allow users to enjoy the appeal of open models locally on terminals.

In recent years, small models have rapidly improved, with 7B parameter models outperforming previous top models by the end of 2024. The growth of mobile processor performance simultaneously broadens the prospects of on-device AI applications.

To keep pace with these trends, AI2 released OLMoE—a fully open toolkit for researchers and developers to conduct AI experiments on devices. Its applications include:

- **Real-World Task Exploration**: Experience cutting-edge on-device models tackling real tasks.
- **Local AI Model Improvement Research**: Delve into new solutions to enhance local model performance.
- **Local Model Testing**: Conveniently test own models using the open-source code repository.
- **iOS App Integration**: Seamlessly combine OLMoE into other iOS apps to enrich application scenarios.

Compared to cloud models, the biggest advantage of on-device models like OLMoE is privacy and security. All user inputs and model outputs run locally on the device without uploading to the cloud, ensuring data safety. Moreover, no network connection is required, guaranteeing a stable and always-available AI service experience.

### Leap from Model to Application

The development of the Ai2 OLMoE app is based on the institute’s leading fully open-source technology, centered on the most efficient OLMoE language model to date. The new version allenai/OLMoE-1B-7B-0125-Instruct integrates the Dolmino mixture training strategy from OLMo 2 and post-training optimization techniques from Tülu 3. The new model achieves about 35% performance improvement on AI2 evaluation suites while maintaining efficiency.

![Ai2 OLMoE: Open-source iOS AI Application Running Offline Based on Core OLMoE Model-2](https://repo.alisencent.com/upload/file/2026/04/01/fdcffca7034ea02.png)

![Ai2 OLMoE: Open-source iOS AI Application Running Offline Based on Core OLMoE Model-3](https://repo.alisencent.com/upload/file/2026/04/01/155caa8350880f1.png)

*AlpacaEval refers to Alpaca Eval 2 Length Controlled.*

To ensure efficient on-device operation, AI2 uses the Q4_K_M quantization method to compress model size with minimal impact on performance (e.g., IFEval drops slightly from 66.4 to 63.6). For full-precision experience, please visit [Ai2 Playground](https://www.kdjingpai.com/playground/) for online testing. GGUF format quantized models have also been uploaded to HuggingFace, including base and instruct versions for selection.

During development, AI2 closely collaborated with GenUI, building on multiple open-source projects such as Swift bindings for Llama.cpp. After deep optimization, it achieves an average processing speed of 41 Tokens/s on iPhone 16 Pro, delivering excellent performance.

![Ai2 OLMoE: Open-source iOS AI Application Running Offline Based on Core OLMoE Model-4](https://repo.alisencent.com/upload/file/2026/04/01/02992a37901e694.png)

It is worth mentioning that the Ai2 OLMoE application code is fully open-source (https://github.com/allenai/OLMoE.swift), providing an important reference for AI researchers and developers. Developers can use this codebase as a framework to evaluate more efficient on-device models or seamlessly integrate it into other apps to realize powerful AI functions.

AI2 believes the release of the Ai2 OLMoE app is a key step toward the future of intelligent devices. With the continuous improvement of mobile device performance, the application is expected to assist research and development progress steadily, collectively embracing the infinite possibilities of on-device AI.

Experience OLMoE now on your iPhone!

![Ai2 OLMoE: Open-source iOS AI Application Running Offline Based on Core OLMoE Model-5](https://repo.alisencent.com/upload/file/2026/04/01/a40d3c84226d248.png)