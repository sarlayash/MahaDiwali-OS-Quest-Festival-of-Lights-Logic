/**
 * Diwali OS Quest - Festive Particle & FX Engine
 * Fireworks, sparkling Diyas, falling marigold petals, and celebratory Rangoli bursts.
 */
class ParticleEngine {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.petals = [];
    this.animating = false;
    this.resize();
    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    if (!this.canvas) return;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  // Explode fireworks (e.g. at celebration, rocket launch, or victory)
  burstFireworks(x, y, count = 60, customColors = null) {
    const colors = customColors || [
      '#FFD700', // Gold
      '#FF4500', // Saffron / OrangeRed
      '#FF1493', // Deep Pink
      '#00FFFF', // Cyan
      '#00FF7F', // Spring Green
      '#FFFFFF'  // Radiant White
    ];

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 6 + 2;
      const color = colors[Math.floor(Math.random() * colors.length)];
      this.particles.push({
        x: x || this.canvas.width / 2,
        y: y || this.canvas.height / 2,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 1,
        decay: Math.random() * 0.02 + 0.015,
        size: Math.random() * 3.5 + 1.5,
        color: color,
        gravity: 0.12,
        trail: []
      });
    }

    if (!this.animating) {
      this.animating = true;
      this.loop();
    }
  }

  // Grand celebratory shower of fireworks + marigold petals
  celebrateGrandVictory() {
    let bursts = 0;
    const interval = setInterval(() => {
      const x = Math.random() * (this.canvas.width * 0.8) + (this.canvas.width * 0.1);
      const y = Math.random() * (this.canvas.height * 0.5) + (this.canvas.height * 0.1);
      this.burstFireworks(x, y, 70);
      bursts++;
      if (bursts > 8) {
        clearInterval(interval);
      }
    }, 450);

    // Spawn falling flower petals
    for (let i = 0; i < 40; i++) {
      this.petals.push({
        x: Math.random() * this.canvas.width,
        y: -20 - Math.random() * 100,
        vx: Math.random() * 2 - 1,
        vy: Math.random() * 2 + 1.5,
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 4,
        size: Math.random() * 8 + 6,
        color: Math.random() > 0.5 ? '#FFA500' : '#FFD700', // Saffron & Golden marigold
        alpha: 1
      });
    }
  }

  // Sparkler trail at coordinates
  sparkleAt(x, y, count = 12) {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 3 + 1;
      this.particles.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 1,
        decay: 0.04,
        size: Math.random() * 2.5 + 1,
        color: '#FFF275',
        gravity: 0.05
      });
    }
    if (!this.animating) {
      this.animating = true;
      this.loop();
    }
  }

  loop() {
    if (!this.canvas) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Update & draw fireworks / sparkles
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.alpha -= p.decay;

      if (p.alpha <= 0) {
        this.particles.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.globalAlpha = p.alpha;
      this.ctx.fillStyle = p.color;
      this.ctx.shadowBlur = 8;
      this.ctx.shadowColor = p.color;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    }

    // Update & draw marigold petals
    for (let i = this.petals.length - 1; i >= 0; i--) {
      const pt = this.petals[i];
      pt.x += pt.vx + Math.sin(pt.y * 0.02) * 0.5;
      pt.y += pt.vy;
      pt.rotation += pt.rotSpeed;

      if (pt.y > this.canvas.height + 20) {
        this.petals.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.translate(pt.x, pt.y);
      this.ctx.rotate((pt.rotation * Math.PI) / 180);
      this.ctx.fillStyle = pt.color;
      this.ctx.beginPath();
      this.ctx.ellipse(0, 0, pt.size, pt.size * 0.6, 0, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    }

    if (this.particles.length > 0 || this.petals.length > 0) {
      requestAnimationFrame(() => this.loop());
    } else {
      this.animating = false;
    }
  }
}
