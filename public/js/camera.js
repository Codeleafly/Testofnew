// --- CAMERA & AI SETUP ---
const videoElement = document.getElementById('input_video');
const canvasElement = document.getElementById('output_canvas');
const canvasCtx = canvasElement.getContext('2d');
const statusText = document.getElementById('statusText');
const enableCameraBtn = document.getElementById('enableCameraBtn');
const startBtn = document.getElementById('startBtn');
const gestureHint = document.getElementById('gestureHint');
const cameraLoader = document.getElementById('cameraLoader');

let isPinching = false;
let lastActionTime = 0;
let lastStartTrigger = 0;
let isCameraReady = false;
let firstFrameDetected = false;

function enableCamera() {
    enableCameraBtn.disabled = true;
    enableCameraBtn.innerHTML = 'Starting <div class="spinner"></div>';
    statusText.innerText = "Requesting Camera...";
    
    document.getElementById('cameraBox').style.display = 'block';
    cameraLoader.style.display = 'flex';

    const hands = new Hands({locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
    }});

    hands.setOptions({
        maxNumHands: 1,
        modelComplexity: 1,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5
    });

    hands.onResults(onResults);

    const camera = new Camera(videoElement, {
        onFrame: async () => {
            await hands.send({image: videoElement});
        },
        width: 320,
        height: 240
    });

    camera.start()
        .then(() => {
            console.log("Camera Initialized");
            statusText.innerText = "Processing AI...";
        })
        .catch(err => {
            console.error(err);
            statusText.innerText = "Error: Camera Blocked";
            statusText.style.color = "red";
            cameraLoader.innerHTML = "Camera<br>Blocked";
            enableCameraBtn.innerText = "Retry";
            enableCameraBtn.disabled = false;
        });
}

function onResults(results) {
    if (!firstFrameDetected) {
        firstFrameDetected = true;
        cameraLoader.style.display = 'none';
        
        enableCameraBtn.style.display = 'none';
        startBtn.style.display = 'block';
        gestureHint.style.display = 'block';
        document.getElementById('startInstruction').innerText = "Camera Active!";
        statusText.innerText = "Ready! Pinch to Fly";
        statusText.style.color = "#4ade80";
        isCameraReady = true;
    }

    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);

    if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
        const landmarks = results.multiHandLandmarks[0];
        drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS, {color: '#00FF00', lineWidth: 2});
        drawLandmarks(canvasCtx, landmarks, {color: '#FF0000', lineWidth: 1, radius: 2});

        const indexTip = landmarks[8];
        const thumbTip = landmarks[4];
        const distance = Math.hypot(indexTip.x - thumbTip.x, indexTip.y - thumbTip.y);
        const pinchThreshold = 0.05;

        if (distance < pinchThreshold) {
            canvasCtx.beginPath();
            canvasCtx.arc(indexTip.x * canvasElement.width, indexTip.y * canvasElement.height, 15, 0, 2 * Math.PI);
            canvasCtx.fillStyle = "#00FF00";
            canvasCtx.fill();

            if (!isPinching) {
                isPinching = true; 
                const now = Date.now();
                if (now - lastActionTime > 150) { 
                    if (gameRunning) {
                        bird.flap();
                        lastActionTime = now;
                    } else if (isCameraReady) {
                        if (now - lastStartTrigger > 1000) {
                            startGame();
                            lastStartTrigger = now;
                        }
                    }
                }
            }
        } else {
            isPinching = false;
        }
    } else {
        isPinching = false;
    }
    canvasCtx.restore();
}
