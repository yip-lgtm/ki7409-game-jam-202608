// My HTML5 Game — entry point
// Replace the Game class with your own. See README in this folder.

const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
const scoreEl = document.getElementById('score');
const fpsEl = document.getElementById('fps');

const W = canvas.width;
const H = canvas.height;

const input = { left: false, right: false, action: false };

window.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft')  input.left = true;
  if (e.key === 'ArrowRight') input.right = true;
  if (e.key === ' ')          input.action = true;
});
window.addEventListener('keyup', (e) => {
  if (e.key === 'ArrowLeft')  input.left = false;
  if (e.key === 'ArrowRight') input.right = false;
  if (e.key === ' ')          input.action = false;
});
canvas.addEventListener('click', () => canvas.focus());

class Game {
  constructor() {
    this.player = { x: W / 2, y: H - 40, w: 32, h: 16, vx: 0 };
    this.score = 0;
    this.last = performance.now();
    this.fps = 0;
    this.frameCount = 0;
    this.fpsAccum = 0;
  }

  update(dt) {
    const speed = 240;
    if (input.left)  this.player.vx = -speed;
    else if (input.right) this.player.vx = speed;
    else this.player.vx = 0;

    this.player.x += this.player.vx * dt;
    this.player.x = Math.max(this.player.w / 2, Math.min(W - this.player.w / 2, this.player.x));
  }

  render() {
    ctx.fillStyle = '#14162a';
    ctx.fillRect(0, 0, W, H);

    // grid for visual reference
    ctx.strokeStyle = 'rgba(255,255,255,0.04)';
    ctx.lineWidth = 1;
    for (let x = 0; x < W; x += 40) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
    }
    for (let y = 0; y < H; y += 40) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
    }

    // player
    ctx.fillStyle = '#6cf';
    const p = this.player;
    ctx.fillRect(p.x - p.w / 2, p.y - p.h / 2, p.w, p.h);
  }

  loop(now) {
    const dt = Math.min(0.05, (now - this.last) / 1000);
    this.last = now;

    this.update(dt);
    this.render();

    this.frameCount++;
    this.fpsAccum += dt;
    if (this.fpsAccum >= 0.5) {
      this.fps = Math.round(this.frameCount / this.fpsAccum);
      this.frameCount = 0;
      this.fpsAccum = 0;
      fpsEl.textContent = this.fps;
      scoreEl.textContent = this.score;
    }

    requestAnimationFrame((t) => this.loop(t));
  }

  start() {
    this.last = performance.now();
    requestAnimationFrame((t) => this.loop(t));
  }
}

const game = new Game();
game.start();

// expose for debugging in the browser console
window.__game = game;
