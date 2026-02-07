# Project Sitemap - Flappy Hands

This sitemap provides an overview of the project structure and the purpose of each file in the **Flappy Hands** AI-controlled game.

## 📁 Root Directory
- **`index.html`**: The main entry point of the application. Contains the UI layout, game canvas, and overlays for the start/game-over screens.
- **`README.md`**: Project overview, features, and setup instructions.
- **`report.md`**: Detailed project report, development timeline, technical architecture, and change log.
- **`GEMINI.md`**: Project-specific rules, reporting standards, and guidelines for the Gemini CLI agent.
- **`time.js`**: A utility script to get the current authoritative time and date for reporting.
- **`SITEMAP.md`**: (This file) A map of the project's file structure and descriptions.

## 📁 `docs/`
- **`ARCHITECTURE.md`**: Technical documentation explaining the modular JavaScript structure and data flow.

## 📁 `public/`
The main directory for client-side assets and logic.

### 📁 `public/assets/`
Contains all visual and auditory resources.
- **`background.svg`**: Parallax background image for the game.
- **`bird.svg`**: The player character asset.
- **`message.svg`**: Placeholder or UI message asset.
- **`medal_*.svg`**: Assets for Bronze, Silver, Gold, and Platinum medals.
- **`music.mp3`**: Background music for the game (Optional).

### 📁 `public/css/`
- **`style.css`**: Custom CSS for game animations, loading overlays, and layout styling.

### 📁 `public/js/`
Modular JavaScript logic.
- **`audio.js`**: Manages sound effects (using Web Audio API) and background music.
- **`camera.js`**: Handles MediaPipe AI integration, camera stream, and gesture recognition (pinch-to-jump).
- **`game.js`**: Core game engine including physics, pipe generation, collision detection, and score management.
- **`loader.js`**: Handles dynamic loading of external libraries and asset initialization.

---
*Last updated on February 7, 2026.*
