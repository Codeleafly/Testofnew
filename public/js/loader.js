// --- ASSET LOADING ---
const libraries = [
    "https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js",
    "https://cdn.jsdelivr.net/npm/@mediapipe/control_utils/control_utils.js",
    "https://cdn.jsdelivr.net/npm/@mediapipe/drawing_utils/drawing_utils.js",
    "https://cdn.jsdelivr.net/npm/@mediapipe/hands/hands.js"
];

let loadedCount = 0;

function updateProgress(percent, filename) {
    const loadingFill = document.getElementById('loadingFill');
    const loadingPercent = document.getElementById('loadingPercent');
    const currentFile = document.getElementById('currentFile');
    
    if (loadingFill) loadingFill.style.width = percent + '%';
    if (loadingPercent) loadingPercent.innerText = percent + '%';
    if (currentFile) currentFile.innerText = 'Loading: ' + filename;
}

function loadScript(url) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = url;
        script.crossOrigin = "anonymous";
        script.onload = () => resolve(url);
        script.onerror = () => reject(url);
        document.head.appendChild(script);
    });
}

async function loadAllLibraries() {
    try {
        for (let i = 0; i < libraries.length; i++) {
            const libName = libraries[i].split('/').pop();
            updateProgress(Math.floor((i / libraries.length) * 100), libName);
            await loadScript(libraries[i]);
            loadedCount++;
        }
        updateProgress(100, "Complete!");
        
        setTimeout(() => {
            const loadingOverlay = document.getElementById('loadingOverlay');
            const startScreen = document.getElementById('startScreen');
            
            // Populate stats before showing
            if (typeof updateHomeStats === 'function') {
                updateHomeStats();
            }

            if (loadingOverlay) {
                loadingOverlay.style.opacity = '0';
                setTimeout(() => {
                    loadingOverlay.style.display = 'none';
                    if (startScreen) startScreen.style.display = 'block';
                }, 500);
            }
        }, 500);

    } catch (error) {
        console.error("Failed to load script", error);
        const currentFile = document.getElementById('currentFile');
        if (currentFile) {
            currentFile.innerText = "Load failed. Please Refresh.";
            currentFile.style.color = "#ef4444";
        }
    }
}

// Initial draw for clouds
window.addEventListener('load', () => {
    loadAllLibraries();
    if (typeof drawClouds === 'function') {
        drawClouds();
    }
});
