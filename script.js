// Audio Context
let audioContext;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initializeAudio();
    drawCat();
    startFireworks();
});

// Audio Setup
function initializeAudio() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
}

// Play Sound Effects
function playSound(type) {
    if (!audioContext) return;
    
    const now = audioContext.currentTime;
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();
    
    osc.connect(gain);
    gain.connect(audioContext.destination);
    
    switch(type) {
        case 'click':
            osc.frequency.value = 600;
            osc.type = 'sine';
            gain.gain.setValueAtTime(0.1, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
            osc.start(now);
            osc.stop(now + 0.1);
            break;
        case 'success':
            osc.frequency.setValueAtTime(400, now);
            osc.frequency.exponentialRampToValueAtTime(800, now + 0.2);
            osc.type = 'sine';
            gain.gain.setValueAtTime(0.1, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
            osc.start(now);
            osc.stop(now + 0.2);
            break;
    }
}

// Page Navigation
function goToPage(pageNum) {
    playSound('click');
    
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show target page
    const targetPage = document.getElementById(`page${pageNum}`);
    if (targetPage) {
        targetPage.classList.add('active');
        
        // Trigger specific animations
        if (pageNum === 2) {
            drawCat();
            animateCatIntro();
        } else if (pageNum === 3) {
            drawCatWalking();
        } else if (pageNum === 5) {
            drawTreeScene();
        } else if (pageNum === 7) {
            startFireworks();
            animateFinalPage();
        }
    }
}

// Handle Yes/No Choices
let noClickCount = 0;
function handleChoice(choice) {
    playSound('click');
    
    if (choice === 'yes') {
        noClickCount = 0;
        playSound('success');
        goToPage(3);
    } else if (choice === 'no') {
        noClickCount++;
        const catMsg = document.getElementById('catMessage');
        
        const pleadings = [
            "Please 🥺 cutie, say yes!",
            "Come on, don't be shy! 💕",
            "I promise it will be amazing! ✨",
            "Just one adventure with me? 🥰",
            "You'll love it, I promise! 💖",
            "Please please please? 🙏",
            "For me? 💕✨"
        ];
        
        catMsg.textContent = pleadings[noClickCount % pleadings.length];
        
        // Animate the "please" effect
        catMsg.style.animation = 'none';
        setTimeout(() => {
            catMsg.style.animation = 'slideUp 0.5s ease';
        }, 10);
    }
}

// Canvas: Draw Cat
function drawCat() {
    const canvas = document.getElementById('catCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Cat position (centered)
    const catX = canvas.width / 2;
    const catY = canvas.height / 2;
    
    // Draw Cat Body
    ctx.fillStyle = '#FFB6C1';
    ctx.beginPath();
    ctx.ellipse(catX, catY, 60, 70, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Cat Head
    ctx.fillStyle = '#FFB6C1';
    ctx.beginPath();
    ctx.arc(catX, catY - 60, 45, 0, Math.PI * 2);
    ctx.fill();
    
    // Ears
    ctx.fillStyle = '#FFB6C1';
    ctx.beginPath();
    ctx.ellipse(catX - 25, catY - 100, 15, 30, -0.3, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.beginPath();
    ctx.ellipse(catX + 25, catY - 100, 15, 30, 0.3, 0, Math.PI * 2);
    ctx.fill();
    
    // Inner Ears
    ctx.fillStyle = '#FFE4E1';
    ctx.beginPath();
    ctx.ellipse(catX - 25, catY - 95, 8, 18, -0.3, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.beginPath();
    ctx.ellipse(catX + 25, catY - 95, 8, 18, 0.3, 0, Math.PI * 2);
    ctx.fill();
    
    // Eyes
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.arc(catX - 15, catY - 70, 6, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.beginPath();
    ctx.arc(catX + 15, catY - 70, 6, 0, Math.PI * 2);
    ctx.fill();
    
    // Eye shine
    ctx.fillStyle = '#FFF';
    ctx.beginPath();
    ctx.arc(catX - 13, catY - 72, 2, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.beginPath();
    ctx.arc(catX + 17, catY - 72, 2, 0, Math.PI * 2);
    ctx.fill();
    
    // Nose
    ctx.fillStyle = '#FF69B4';
    ctx.beginPath();
    ctx.arc(catX, catY - 55, 4, 0, Math.PI * 2);
    ctx.fill();
    
    // Mouth
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(catX, catY - 50, 10, 0, Math.PI);
    ctx.stroke();
    
    // Whiskers
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(catX - 45, catY - 60);
    ctx.lineTo(catX - 65, catY - 60);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(catX + 45, catY - 60);
    ctx.lineTo(catX + 65, catY - 60);
    ctx.stroke();
    
    // Front Legs
    ctx.fillStyle = '#FFB6C1';
    ctx.fillRect(catX - 30, catY + 50, 15, 35);
    ctx.fillRect(catX + 15, catY + 50, 15, 35);
    
    // Paws
    ctx.fillStyle = '#FFE4E1';
    ctx.beginPath();
    ctx.ellipse(catX - 22.5, catY + 90, 10, 8, 0, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.beginPath();
    ctx.ellipse(catX + 22.5, catY + 90, 10, 8, 0, 0, Math.PI * 2);
    ctx.fill();
}

// Canvas: Cat Walking
function drawCatWalking() {
    const canvas = document.getElementById('catWalkCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    let catX = canvas.width * 0.2;
    const catY = canvas.height * 0.6;
    let frame = 0;
    
    const drawWalkingCat = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Leg animation
        const legOffset = Math.sin(frame * 0.05) * 5;
        
        // Simple walking cat
        ctx.fillStyle = '#FFB6C1';
        
        // Body
        ctx.beginPath();
        ctx.ellipse(catX, catY, 40, 35, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // Head
        ctx.beginPath();
        ctx.arc(catX + 35, catY - 30, 28, 0, Math.PI * 2);
        ctx.fill();
        
        // Legs (walking motion)
        ctx.fillRect(catX - 15, catY + 25 + legOffset, 10, 20);
        ctx.fillRect(catX - 5, catY + 25 - legOffset, 10, 20);
        ctx.fillRect(catX + 5, catY + 25 + legOffset, 10, 20);
        ctx.fillRect(catX + 15, catY + 25 - legOffset, 10, 20);
        
        // Tail (waving)
        ctx.strokeStyle = '#FFB6C1';
        ctx.lineWidth = 8;
        ctx.beginPath();
        ctx.moveTo(catX - 30, catY);
        const tailWave = Math.sin(frame * 0.08) * 20;
        ctx.quadraticCurveTo(catX - 50, catY + tailWave, catX - 60, catY - 20);
        ctx.stroke();
        
        frame++;
        if (catX < canvas.width + 50) {
            catX += 1.5;
            requestAnimationFrame(drawWalkingCat);
        }
    };
    
    drawWalkingCat();
}

// Canvas: Tree Scene
function drawTreeScene() {
    const canvas = document.getElementById('treeCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    let frame = 0;
    
    const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw glowing orbs/lights
        const orbCount = 5;
        for (let i = 0; i < orbCount; i++) {
            const x = (canvas.width / orbCount) * i + 50;
            const y = canvas.height * 0.3 + Math.sin(frame * 0.02 + i) * 20;
            
            // Glow effect
            const gradient = ctx.createRadialGradient(x, y, 0, x, y, 30);
            gradient.addColorStop(0, 'rgba(255, 200, 100, 0.8)');
            gradient.addColorStop(1, 'rgba(255, 200, 100, 0)');
            
            ctx.fillStyle = gradient;
            ctx.fillRect(x - 30, y - 30, 60, 60);
            
            // Center light
            ctx.fillStyle = 'rgba(255, 255, 150, 1)';
            ctx.beginPath();
            ctx.arc(x, y, 5, 0, Math.PI * 2);
            ctx.fill();
        }
        
        frame++;
        requestAnimationFrame(animate);
    };
    
    animate();
}

// Animate Cat Intro
function animateCatIntro() {
    const canvas = document.getElementById('catCanvas');
    if (!canvas) return;
    
    canvas.style.animation = 'none';
    setTimeout(() => {
        canvas.style.animation = 'slideUp 0.5s ease';
    }, 10);
}

// Fireworks
function startFireworks() {
    const canvas = document.getElementById('fireworksCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    const particles = [];
    
    class Particle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.vx = (Math.random() - 0.5) * 8;
            this.vy = (Math.random() - 0.5) * 8;
            this.life = 1;
            this.color = ['#FF1493', '#FF69B4', '#FFB6C1', '#FFC0CB', '#FFE4E1'][Math.floor(Math.random() * 5)];
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.vy += 0.2; // gravity
            this.life -= 0.02;
        }
        
        draw(ctx) {
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.life;
            ctx.beginPath();
            ctx.arc(this.x, this.y, 4, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalAlpha = 1;
        }
    }
    
    function createFirework(x, y) {
        for (let i = 0; i < 30; i++) {
            particles.push(new Particle(x, y));
        }
    }
    
    // Create fireworks at random intervals
    const fireworkInterval = setInterval(() => {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height * 0.5;
        createFirework(x, y);
    }, 400);
    
    const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach((p, i) => {
            p.update();
            p.draw(ctx);
            if (p.life <= 0) {
                particles.splice(i, 1);
            }
        });
        
        if (particles.length > 0 || Math.random() > 0.9) {
            requestAnimationFrame(animate);
        } else {
            clearInterval(fireworkInterval);
        }
    };
    
    animate();
}

// Animate Final Page
function animateFinalPage() {
    const heart = document.querySelector('.heart-animation');
    if (heart) {
        heart.style.animation = 'none';
        setTimeout(() => {
            heart.style.animation = 'heartBeat 1.2s infinite';
        }, 10);
    }
}

// Add some additional interactive effects
document.addEventListener('mousemove', (e) => {
    const hearts = document.querySelectorAll('.heart-animation');
    hearts.forEach(heart => {
        const x = e.clientX;
        const y = e.clientY;
        
        // Optional: create floating heart particles on hover
        if (Math.random() > 0.95) {
            createFloatingHeart(x, y);
        }
    });
});

function createFloatingHeart(x, y) {
    const heart = document.createElement('div');
    heart.textContent = '💖';
    heart.style.position = 'fixed';
    heart.style.left = x + 'px';
    heart.style.top = y + 'px';
    heart.style.pointerEvents = 'none';
    heart.style.fontSize = '1.5em';
    heart.style.animation = 'float-up 2s ease-out forwards';
    
    document.body.appendChild(heart);
    
    setTimeout(() => heart.remove(), 2000);
}

// Add floating animation
const style = document.createElement('style');
style.textContent = `
    @keyframes float-up {
        0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
        }
        100% {
            transform: translate(${Math.random() * 100 - 50}px, -100px) scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
