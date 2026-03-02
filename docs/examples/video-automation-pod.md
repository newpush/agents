# Video Automation Pod (The Amanda Horvath Methodology)

This example demonstrates a multi-agent orchestration pattern designed to automate the video content lifecycle for high-authority brands. It replicates the **Amanda Horvath Methodology**, focusing on strategic "packaging" (thumbnails, titles, SEO) through a "Shooting for the Edit" and "Batch Processing" workflow.

## 🏗️ Architecture: The Marketing Pod

The system is composed of three specialized micro-agents coordinated by a central Orchestrator.

### 1. The Manager (The Orchestrator)
**File:** `manager.py`  
The Creative Director. It manages the **Project Context**, taking the raw inputs (Rough Cut + Pose Clip) and directing the specialized sub-agents.

### 2. The Strategist (SEO Agent)
**File:** `seo_agent.py`  
The "Brain." It analyzes the rough cut audio/transcript to extract the core message, target keywords, and curiosity-driven hooks. It generates the "Creative Brief" that informs both the thumbnail design and the SEO metadata.

### 3. The Visualizer (Thumbnail Agent)
**File:** `thumb_agent.py`  
The "Eyes." It uses programmatic compositing to generate high-volume thumbnail variations. It pulls expressive "faces" from a dedicated pose clip, removes backgrounds, and layers them with brand assets and the strategist's hook text.

---

## 🚀 Getting Started

### Prerequisites
- Python 3.10+
- `ffmpeg` installed on your system.
- An API key for Google Gemini.

### Installation
```bash
cd examples/video-automation-pod
pip install -r requirements.txt
```

### Usage
Drop your **Rough Cut** (for intelligence) and your **Pose Clip** (for visuals) into the project folder.

```bash
python manager.py --project "MyProject" --rough_cut main_v1_rough.mp4 --pose_clip thumb_poses.mp4
```

---

## 📚 Methodology Principles

1.  **Shooting for the Edit:** We don't wait for a final edit to start marketing. Intelligence is extracted from the "Rough Cut."
2.  **Separate Visual Sources:** We use a dedicated clip for thumbnails (poses) to ensure high-energy, expressive assets.
3.  **Programmatic Design:** We don't "paint from scratch." We use code to composite layers, ensuring perfect brand consistency (colors, fonts, assets).
4.  **A/B Testing Loops:** The agent generates 15+ variations in seconds, allowing the creator to choose the winner based on data, not just intuition.
