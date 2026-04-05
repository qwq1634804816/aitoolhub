---
title: InkoS：A Multi-Agent System for Automated Generation and Revision of Long Novels
description: InkoS is a multi-agent automated long novel writing system open-sourced by developer Narcooo in 2026. Through the “Truth Files” mechanism, it addresses various issues in AI long-form creation, supports automatic continuation and multiple operational modes, making it an industrial-grade writing platform for professional creators and developers.
image: https://repo.alisencent.com/upload/file/2026/04/04/3f266995955ab87.png
tags:
  - writing
link: https://github.com/Narcooo/inkos
---

InkoS (Ink Operating System), released by developer Narcooo in 2026, is a multi-agent automated writing system tailored for long novels. To solve common long-text generation problems such as character forgetting, broken foreshadowing, logical confusion, and repetitive vocabulary, InkoS adopts a unique “Truth Files” architecture, splitting the writing process into three agent phases: Writer, Auditor, and Revisor, which synchronize and update seven categories of plot knowledge and worldview states in real time. The system not only enables fully automated pipeline creation from scratch but also supports importing existing unfinished novel texts, reverse engineering, and reconstructing the worldview to achieve seamless continuation.

With its flexible terminal design, InkoS offers fully automatic mode, atomic operation mode based on JSON commands, and a natural language interaction Agent mode, making it a high-quality industrial infrastructure for long-text writing aimed at professional text creators and AI developers.

## Feature List

- **Truth Files underlying architecture**: Dynamically maintains seven separate truth files for each book, precisely tracking character information, resource consumption, worldview constraints, and vocabulary frequency, effectively curing hallucination issues in multi-chapter long AI writing.
- **Reverse engineering and continuation capability**: Supports importing local novel files or chapter directories, allows custom chapter splitting with regex `--split`, automatically disassembles old works and builds character matrices and foreshadowing states to achieve continuous seamless continuation.
- **Fully automatic multi-agent closed-loop creation**: A clearly divided writing pipeline where the drafting agent focuses on description, the auditing agent validates the plot according to multiple checks, and the revision agent amends the text based on audit reports.
- **Manual review checkpoint mechanism**: Supports setting batch continuous multi-chapter writing, automatically suspends tasks to introduce manual supervision, ensuring the storyline conforms to the creator’s intent.
- **Support for three major working modes**: Including one-click complete pipeline generation, a fine-grained JSON command interface, and a natural language Agent session containing 13 tools.
- **Automatic vocabulary fatigue detection**: Built-in vocabulary monitor effectively avoids high-frequency repetition and clichés, enhancing the realism and richness of the text.

## Usage Help

### 1. Environment Preparation and Installation

InkoS is a CLI program implemented in TypeScript; please ensure an appropriate development environment before use.

- **Environment configuration**: Please visit the official Node.js website to download and install the latest LTS version (recommended 18.x or above).
- **Code download and installation**: Run the following commands in the terminal:

```bash
git clone https://github.com/Narcooo/inkos.git
cd inkos
npm install
npm run build
npm link
```

- **Set API key**: Set your OpenAI API key as an environment variable:

```bash
export OPENAI_API_KEY="YOUR_API_KEY_HERE"
```

### 2. Three Core Workflow Modes

InkoS supports three operation modes to suit creators' varying needs.

#### Mode One: Complete Pipeline Mode (One-Click Fully Automatic Production)

This mode achieves efficient output by automatically completing writing, auditing, and revision processes.

- **Single chapter generation and polishing**

```bash
inkos write next TheDevouringHeavenlyEmperor
```

  The system automatically drafts the next chapter, performs multi-dimensional logical audits, and finalizes the text via the revision module.

- **Batch continuous writing**

```bash
inkos write next TheDevouringHeavenlyEmperor --count 5
```

  Automatically creates multiple chapters consecutively without manual intervention and saves them upon completion.

#### Mode Two: Atomic Command Mode (Fine-Grained Control and Integration)

Designed for advanced users, this mode allows decomposed processing flows and custom operations.

- **Restricted outline drafting**

```bash
inkos draft TheDevouringHeavenlyEmperor --context "This chapter focuses on the mentor-disciple conflict eruption, the protagonist leaves home angrily" --json
```

  Uses `--context` to forcibly guide the plot, `--json` outputs structured data suitable for integration with external Agents such as [OpenClaw](https://www.kdjingpai.com/openclaw-ai/).

- **Separate audit calls**

```bash
inkos audit TheDevouringHeavenlyEmperor 31 --json
```

  Performs AI audit on self-written drafts to locate logical flaws.

- **Automatic revision**

```bash
inkos revise TheDevouringHeavenlyEmperor 31 --json
```

  Automatically revises text based on audit results.

#### Mode Three: Natural Language Agent Mode

No command memorization required; interact naturally to instruct creation.

- **Scenario conversation command issuance**

```bash
inkos agent "Help me write an urban cultivation novel, the protagonist is a programmer, immediately help me create the profile and write the first chapter."
```

- **Comprehensive strategy planning**

```bash
inkos agent "First scan the current web novel market trends, then create an outline for a new book based on popular data."
```

### 3. Advanced Features: Import Old Works and Seamless Continuation

Supports importing old texts, using reverse engineering to restore worldview and achieve automatic continuation.

- **Step A: Prepare text files**

  Save already written chapters as local text files.

- **Step B: Import and dissect texts**

```bash
inkos import TheDevouringHeavenlyEmperor --file ./novel.txt --split "Chapter [一二三四五六七八九十百千万\d]+"
```

  `--split` supports regex-defined chapter splitting; in case of interruption, use `--resume-from <chapter_number>` for breakpoint continuation.

- **Step C: Rebuild worldview and truth files**

  The system automatically parses the text and generates seven truth files, covering character states, foreshadowing, and world constraints.

- **Step D: Automatic continuation**

```bash
inkos write next TheDevouringHeavenlyEmperor
```

  The system inherits the original style and foreshadowing, smoothly continuing the story.

## Application Scenarios

1. Improve update frequency and output capacity of online long novels, reduce writing pressure via automated pipelines, and ensure tightly logical plots.
2. Fix abandoned works or create fan continuations; the system flawlessly replicates old work style and foreshadowing for seamless connection.
3. Manage complex game plots and dynamic settings by precisely tracking character and resource state changes, suitable for large narrative games and tabletop RPGs.
4. Provide developers with low-level command interfaces facilitating integration into various intelligent or automated creative platforms, building unmanned content production systems.

## FAQ

1. **How to prevent AI from forgetting settings or fictional props?**

   InkoS relies on the “Truth Files” engineering architecture, creating seven independent truth files as the sole objective reference of the plot to fundamentally block hallucinations in long texts.

2. **Can the audit function be used independently?**

   Absolutely, use the `inkos audit <book_name> <chapter>` command to invoke the auditing agent for logical checks on self-written drafts.

3. **What if novel formatting is chaotic?**

   Supports flexible chapter splitting with regex, accurately splitting chapters for special format texts, and breakpoint continuation import ensuring stable processing of massive old drafts.