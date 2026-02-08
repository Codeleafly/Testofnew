// --- GAME LOGIC ---
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let frames = 0;
let score = 0;
// Rebranding: Fallback to old high score if new one doesn't exist
let highScore = localStorage.getItem('motionBirdHighScore') || localStorage.getItem('flappyHighScore') || 0;
let gameRunning = false;
let bird;
let pipes = [];
let animationId;

// Assets
const backgroundImg = new Image();
backgroundImg.src = 'public/assets/background.svg';

const birdImg = new Image();
birdImg.src = 'public/assets/bird.svg';

// **SPEED SETTINGS**
const GAME_SPEED = 2.5; 
const BG_SPEED = 0.5; // Distant background moves slower

// Scrolling positions
let bgX = 0;
let groundX = 0;

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

class Bird {
    constructor() {
        this.x = canvas.width / 3;
        this.y = canvas.height / 2;
        this.velocity = 0;
        this.gravity = 0.5;
        this.jumpStrength = -8;
        this.width = 50;
        this.height = 40;
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        let rotation = Math.min(Math.PI / 4, Math.max(-Math.PI / 4, (this.velocity * 0.1)));
        ctx.rotate(rotation);
        
        if (birdImg.complete && birdImg.naturalHeight !== 0) {
             ctx.drawImage(birdImg, -this.width/2, -this.height/2, this.width, this.height);
        } else {
            ctx.fillStyle = '#f48c42';
            ctx.beginPath();
            ctx.arc(0, 0, 20, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.restore();
    }

    update() {
        this.velocity += this.gravity;
        this.y += this.velocity;
        
        if (this.y < 0) { 
            this.y = 0; 
            this.velocity = 0; 
        }
        
        // Hit floor (at 85% of screen height to leave room for ground)
        if (this.y + this.height/2 >= canvas.height * 0.85) {
            this.y = canvas.height * 0.85 - this.height/2;
            gameOver();
        }
    }

    flap() {
        this.velocity = this.jumpStrength;
        audioManager.playJump();
    }
}

class Pipe {
    constructor() {
        this.x = canvas.width;
        this.topHeight = 50 + Math.random() * (canvas.height * 0.5);
        this.gap = 200;
        this.bottomY = this.topHeight + this.gap; 
        this.width = 80;
        this.color = '#73bf2e';
        this.passed = false;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.strokeStyle = '#558c22';
        ctx.lineWidth = 3;

        // Top Pipe
        ctx.fillRect(this.x, 0, this.width, this.topHeight);
        ctx.strokeRect(this.x, 0, this.width, this.topHeight);
        ctx.fillRect(this.x - 5, this.topHeight - 30, this.width + 10, 30);
        ctx.strokeRect(this.x - 5, this.topHeight - 30, this.width + 10, 30);

        // Bottom Pipe
        const groundLevel = canvas.height * 0.85;
        ctx.fillRect(this.x, this.bottomY, this.width, groundLevel - this.bottomY);
        ctx.strokeRect(this.x, this.bottomY, this.width, groundLevel - this.bottomY);
        ctx.fillRect(this.x - 5, this.bottomY, this.width + 10, 30);
        ctx.strokeRect(this.x - 5, this.bottomY, this.width + 10, 30);
    }

    update() {
        this.x -= GAME_SPEED; 
        
        if (bird.x + bird.width/2 > this.x && bird.x - bird.width/2 < this.x + this.width) {
            if (bird.y - bird.height/2 < this.topHeight || bird.y + bird.height/2 > this.bottomY) {
                gameOver();
            }
        }
        
        if (this.x + this.width < bird.x && !this.passed) {
            score++;
            document.getElementById('scoreBoard').innerText = score;
            audioManager.playScore();
            this.passed = true;
        }
    }
}

function drawBackground() {
    // Distant Parallax Background
    if (backgroundImg.complete && backgroundImg.naturalHeight !== 0) {
        // Draw image twice for seamless loop
        ctx.drawImage(backgroundImg, bgX, 0, canvas.width, canvas.height);
        ctx.drawImage(backgroundImg, bgX + canvas.width, 0, canvas.width, canvas.height);
    } else {
        ctx.fillStyle = "#70c5ce";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    
    if (gameRunning) {
        bgX -= BG_SPEED;
        if (bgX <= -canvas.width) bgX = 0;
    }
}

function drawGround() {
    const groundLevel = canvas.height * 0.85;
    const groundHeight = canvas.height * 0.15;
    
    ctx.fillStyle = "#ded895"; // Ground color
    ctx.fillRect(0, groundLevel, canvas.width, groundHeight);
    
    // Animated Ground Pattern (Grass)
    ctx.fillStyle = "#73bf2e";
    ctx.fillRect(0, groundLevel, canvas.width, 20);
    
    // Moving lines on ground for speed effect
    ctx.strokeStyle = "#558c22";
    ctx.lineWidth = 2;
    for (let i = 0; i < 20; i++) {
        let xPos = (groundX + i * 100) % (canvas.width + 100) - 100;
        ctx.beginPath();
        ctx.moveTo(xPos, groundLevel + 5);
        ctx.lineTo(xPos + 20, groundLevel + 5);
        ctx.stroke();
    }

    if (gameRunning) {
        groundX -= GAME_SPEED;
        if (groundX <= -100) groundX = 0;
    }
}

function initGame() {
    bird = new Bird();
    pipes = [];
    score = 0;
    frames = 0; 
    bgX = 0;
    groundX = 0;
    document.getElementById('scoreBoard').innerText = score;
}

function gameLoop() {
    if (!gameRunning) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    drawBackground();
    
    bird.update();
    bird.draw();

    if (frames > 100 && frames % 100 === 0) {
        pipes.push(new Pipe());
    }

    for (let i = 0; i < pipes.length; i++) {
        pipes[i].update();
        pipes[i].draw();
        if (pipes[i].x + pipes[i].width < -20) {
            pipes.shift();
            i--;
        }
    }

    drawGround();

    frames++;
    animationId = requestAnimationFrame(gameLoop);
}

function startGame() {
    if (gameRunning) return;
    initGame();
    gameRunning = true;
    
    document.getElementById('startScreen').style.display = 'none';
    document.getElementById('gameOverScreen').style.display = 'none';
    document.getElementById('scoreBoard').style.display = 'block';
    
    audioManager.startMusic();
    bird.flap();
    gameLoop();
}

function shakeScreen() {
    const body = document.body;
    body.style.transition = "none";
    body.style.transform = "translate(5px, 5px)";
    setTimeout(() => body.style.transform = "translate(-5px, -5px)", 50);
    setTimeout(() => body.style.transform = "translate(5px, -5px)", 100);
    setTimeout(() => {
        body.style.transform = "translate(0, 0)";
        body.style.transition = "transform 0.5s";
    }, 150);
}

function gameOver() {
    if(!gameRunning) return;
    gameRunning = false;
    cancelAnimationFrame(animationId);
    
    audioManager.playHit();
    audioManager.stopMusic();
    shakeScreen();

    if (score > highScore) {
        highScore = score;
        localStorage.setItem('motionBirdHighScore', highScore);
    }

    let medalSrc = "";
    if (score >= 40) {
        medalSrc = "public/assets/medal_platinum.svg";
        incrementMedal('platinum');
    } else if (score >= 30) {
        medalSrc = "public/assets/medal_gold.svg";
        incrementMedal('gold');
    } else if (score >= 20) {
        medalSrc = "public/assets/medal_silver.svg";
        incrementMedal('silver');
    } else if (score >= 10) {
        medalSrc = "public/assets/medal_bronze.svg";
        incrementMedal('bronze');
    }

    document.getElementById('finalScore').innerText = score;
    document.getElementById('bestScore').innerText = highScore;
    
    const medalImg = document.getElementById('medalImg');
    if (medalSrc) {
        medalImg.src = medalSrc;
        medalImg.style.display = 'block';
    } else {
        medalImg.style.display = 'none';
    }

    document.getElementById('gameOverScreen').style.display = 'block';
    document.getElementById('scoreBoard').style.display = 'none';
    updateHomeStats(); // Update stats for next time
}

function incrementMedal(type) {
    let key = 'motionBirdMedal_' + type;
    let oldKey = 'flappyMedal_' + type;
    let count = parseInt(localStorage.getItem(key) || localStorage.getItem(oldKey) || '0');
    localStorage.setItem(key, count + 1);
}

// Function to update stats on the home screen (called from index.html/loader.js)
function updateHomeStats() {
    const highScore = localStorage.getItem('motionBirdHighScore') || localStorage.getItem('flappyHighScore') || 0;
    const pCount = localStorage.getItem('motionBirdMedal_platinum') || localStorage.getItem('flappyMedal_platinum') || 0;
    const gCount = localStorage.getItem('motionBirdMedal_gold') || localStorage.getItem('flappyMedal_gold') || 0;
    const sCount = localStorage.getItem('motionBirdMedal_silver') || localStorage.getItem('flappyMedal_silver') || 0;
    const bCount = localStorage.getItem('motionBirdMedal_bronze') || localStorage.getItem('flappyMedal_bronze') || 0;

    const elBest = document.getElementById('homeBestScore');
    const elP = document.getElementById('countPlatinum');
    const elG = document.getElementById('countGold');
    const elS = document.getElementById('countSilver');
    const elB = document.getElementById('countBronze');

    if (elBest) elBest.innerText = highScore;
    if (elP) elP.innerText = pCount;
    if (elG) elG.innerText = gCount;
    if (elS) elS.innerText = sCount;
    if (elB) elB.innerText = bCount;
}

function resetGame() {
    startGame();
}
