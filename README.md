# Motion Bird - AI Controlled Game

A professional, modularized version of the Flappy Bird game controlled by hand gestures using MediaPipe AI.

## 🚀 Features
- **AI Gesture Control**: Control the bird by pinching your thumb and index finger.
- **Real-time Hand Tracking**: Uses MediaPipe Hands for low-latency gesture recognition.
- **Immersive Audio**: Sound effects for jumping, scoring, and collisions, plus background music support.
- **Polished UI**: Start screen, Medals, Scoreboard, and High Score tracking.
- **Modular Structure**: Clean separation of HTML, CSS, JavaScript, and Assets.

## 📂 Project Structure
```text
.
├── index.html          # Entry point
├── public/
│   ├── assets/         # Images and Sounds
│   │   ├── background.svg
│   │   ├── bird.svg
│   │   ├── message.svg
│   │   ├── medal_*.svg
│   │   └── music.mp3   # (Optional) Background music
│   ├── css/
│   │   └── style.css   # Game styles
│   ├── js/
│   │   ├── audio.js    # Sound effects manager
│   │   ├── game.js     # Core game logic and physics
│   │   ├── camera.js   # MediaPipe integration and AI logic
│   │   └── loader.js   # Dependency and asset loading
├── docs/               # Additional documentation
└── README.md           # Project overview
```

## 🎮 How to Play
1. **Enable Camera**: Click the "ENABLE CAMERA" button and allow camera access.
2. **Calibration**: Wait for the camera feed to appear in the top-right corner.
3. **Pinch to Start**: Pinch your thumb and index finger together to start the game.
4. **Pinch to Fly**: Each pinch makes the bird flap its wings.
5. **Avoid Obstacles**: Pass through the green pipes to score points.
6. **Win Medals**: Score 10, 20, 30, or 40+ points to earn Bronze, Silver, Gold, or Platinum medals.

## 🎨 Customization
You can easily replace the placeholder assets in `public/assets/` with your own:
- **Bird**: Replace `bird.svg` (or .png) and update the reference in `game.js` if changing the extension.
- **Background**: Replace `background.svg`.
- **Music**: Add a `music.mp3` file to `public/assets/` for background music.

## 🛠️ Technologies Used
- **HTML5 Canvas**: For game rendering.
- **Web Audio API**: For real-time sound synthesis.
- **MediaPipe Hands**: For AI hand tracking.
- **Tailwind CSS**: For UI styling.

## 🔧 Installation & Setup
Simply open `index.html` in any modern web browser. A local web server (like Live Server or `python -m http.server`) is recommended for the best experience with camera permissions.

## 📜 License
This project is open-source and available under the MIT License.