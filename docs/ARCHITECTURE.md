# Architecture Documentation

This document explains the modular structure of the Motion Bird project.

## Modular JavaScript

The project is split into three main JavaScript files to maintain a clean separation of concerns:

### 1. `game.js`
Contains the core game mechanics:
- **`Bird` Class**: Handles bird physics (gravity, velocity) and drawing.
- **`Pipe` Class**: Handles pipe generation, movement, and collision detection.
- **Game Loop**: The `requestAnimationFrame` loop that updates and renders the game state.

### 2. `camera.js`
Handles AI and Camera integration:
- **MediaPipe Initialization**: Sets up the `Hands` model.
- **Camera Stream**: Captures video and sends frames to the AI model.
- **Gesture Recognition**: Calculates the distance between the thumb and index finger to detect a "pinch".
- **Bridge to Game**: Triggers `bird.flap()` or `startGame()` based on detected gestures.

### 3. `loader.js`
Manages application startup:
- **Library Loading**: Dynamically injects MediaPipe scripts into the document.
- **Progress Tracking**: Updates the UI during the loading process.
- **Initialization**: Starts the game environment once all dependencies are met.

## UI & Styling
- **Tailwind CSS**: Used for rapid UI development of screens and overlays.
- **Custom CSS**: Located in `public/css/style.css` for game-specific animations and layout.

## Data Flow
1. User opens `index.html`.
2. `loader.js` downloads MediaPipe libraries.
3. User enables camera via `camera.js`.
4. `camera.js` detects gestures and communicates with `game.js`.
5. `game.js` updates the Canvas and Game State.
