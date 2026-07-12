/* ── Initial theme (class + button icon) ── */
if (localStorage.getItem('theme') === 'light') {
    document.documentElement.classList.add('light');
}

/* ── Particle canvas ── */
const pCanvas = document.getElementById('particleCanvas');
const pCtx = pCanvas.getContext('2d');
let pMouse = { x: -1000, y: -1000 };
const PCOLORS = ['#f92672','#a6e22e','#66d9ef','#ae81ff','#fd971f'];
const PCOLORS_LIGHT = ['#e88', '#8c8', '#8cf', '#c8f', '#fa8'];
function pColors() { return document.documentElement.classList.contains('light') ? PCOLORS_LIGHT : PCOLORS; }
let particles = [];
function pResize() { pCanvas.width = window.innerWidth; pCanvas.height = window.innerHeight; }
window.addEventListener('resize', pResize);
pResize();
class Particle {
    constructor() {
        this.x = Math.random() * pCanvas.width;
        this.y = Math.random() * pCanvas.height;
        this.vx = (Math.random() - 0.5) * 0.6;
        this.vy = (Math.random() - 0.5) * 0.6;
        this.color = pColors()[Math.floor(Math.random() * pColors().length)];
        this.s = Math.random() * 1.8 + 1;
    }
    update() {
        const dx = pMouse.x - this.x, dy = pMouse.y - this.y;
        const d = Math.sqrt(dx*dx + dy*dy);
        if (d < 150) { const f = (150 - d) / 150; this.vx -= (dx/d) * f * 1.2; this.vy -= (dy/d) * f * 1.2; }
        this.x += this.vx; this.y += this.vy;
        this.vx *= 0.99; this.vy *= 0.99;
        if (this.x < 0) { this.x = 0; this.vx *= -1; }
        if (this.x > pCanvas.width) { this.x = pCanvas.width; this.vx *= -1; }
        if (this.y < 0) { this.y = 0; this.vy *= -1; }
        if (this.y > pCanvas.height) { this.y = pCanvas.height; this.vy *= -1; }
    }
    draw() {
        pCtx.fillStyle = this.color;
        pCtx.beginPath(); pCtx.arc(this.x, this.y, this.s, 0, Math.PI * 2); pCtx.fill();
    }
}
for (let i = 0; i < 80; i++) particles.push(new Particle());
function drawLines() {
    for (let i = 0; i < particles.length; i++) {
        for (let j = i+1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const d = Math.sqrt(dx*dx + dy*dy);
            if (d < 120) {
                const isLight = document.documentElement.classList.contains('light');
                const a = (1 - d/120) * 0.4;
                pCtx.strokeStyle = isLight ? `rgba(150,150,150,${a})` : `rgba(102,217,239,${a})`;
                pCtx.lineWidth = 0.5;
                pCtx.beginPath(); pCtx.moveTo(particles[i].x, particles[i].y); pCtx.lineTo(particles[j].x, particles[j].y); pCtx.stroke();
            }
        }
    }
}
function pAnimate() {
    pCtx.clearRect(0, 0, pCanvas.width, pCanvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    drawLines();
    requestAnimationFrame(pAnimate);
}
pAnimate();
document.addEventListener('mousemove', e => { pMouse.x = e.clientX; pMouse.y = e.clientY; });
document.addEventListener('mouseleave', () => { pMouse.x = -1000; pMouse.y = -1000; });

/* ── Scroll progress ── */
const progressBar = document.getElementById('scroll-progress');
window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = pct + '%';
});

/* ── Section reveal ── */
document.querySelectorAll('.section').forEach(s => {
    s.classList.add('reveal');
    const rObs = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.1 });
    rObs.observe(s);
});

/* ── Theme toggle ── */
(function() {
    const themeBtn = document.getElementById('themeToggle');
    if (!themeBtn) return;
    if (localStorage.getItem('theme') === 'light') {
        themeBtn.textContent = '\u{1F319}';
    }
    themeBtn.addEventListener('click', () => {
        const isLight = document.documentElement.classList.toggle('light');
        themeBtn.textContent = isLight ? '\u{1F319}' : '\u2600\uFE0F';
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
        const cols = pColors();
        particles.forEach(p => { p.color = cols[Math.floor(Math.random() * cols.length)]; });
    });
})();
