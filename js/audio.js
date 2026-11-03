/**
 * Diwali OS Quest - Audio Engine
 * Pure Web Audio API synthesis: zero external audio assets, instant loading, works offline.
 */
class SoundEngine {
  constructor() {
    this.ctx = null;
    this.enabled = true;
    this.bgmPlaying = false;
    this.bgmTimer = null;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  vibrate(pattern = [40]) {
    if ('vibrate' in navigator) {
      try { navigator.vibrate(pattern); } catch (e) {}
    }
  }

  // Pleasant temple bell / Brass chime
  playBell(freq = 660) {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    
    // Fundamental + harmonics for rich brass bell sound
    [freq, freq * 1.5, freq * 2.76, freq * 3.8].forEach((f, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, now);
      
      const initialGain = 0.2 / (idx + 1);
      gain.gain.setValueAtTime(initialGain, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + (idx === 0 ? 1.8 : 0.8));
      
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 1.8);
    });
  }

  // Soft Diya lighting flame whoosh + chime
  playDiyaLight() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    this.vibrate([30, 30, 60]);
    const now = this.ctx.currentTime;
    
    // Warm rising tone
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(280, now);
    osc.frequency.exponentialRampToValueAtTime(560, now + 0.35);
    
    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
    
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.45);

    // Chime overtone
    setTimeout(() => this.playBell(880), 120);
  }

  // Firecracker crackle / Sparkler pops
  playFirecracker() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    this.vibrate([20, 10, 30, 10, 40]);
    const now = this.ctx.currentTime;
    
    // Synthesize noise burst for cracker snap
    const bufferSize = this.ctx.sampleRate * 0.25;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      // Noise with random pop spikes
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (this.ctx.sampleRate * 0.05));
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    // Filter to make it crackly like a patakha
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1400, now);
    filter.Q.setValueAtTime(2.5, now);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);
    noise.start(now);
  }

  // Rocket whoosh and high explosion
  playRocketLaunch() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    this.vibrate([60, 40, 80]);
    const now = this.ctx.currentTime;
    
    // Whoosh up
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(120, now);
    osc.frequency.exponentialRampToValueAtTime(1100, now + 0.45);
    
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(900, now);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.45);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.45);

    // Boom after delay
    setTimeout(() => {
      this.playFirecracker();
      this.playBell(1046.5); // High C
    }, 400);
  }

  // Raga Bhoopali Victory Fanfare (C, D, E, G, A, high C)
  playSuccess() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    this.vibrate([50, 40, 50, 40, 150]);
    const notes = [523.25, 587.33, 659.25, 783.99, 880.00, 1046.50];
    const delays = [0, 90, 180, 270, 360, 460];
    
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = idx === notes.length - 1 ? 'triangle' : 'sine';
        osc.frequency.setValueAtTime(freq, now);
        
        gain.gain.setValueAtTime(0.22, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.6);
        
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.6);
      }, delays[idx]);
    });
  }

  // Gentle error buzz
  playError() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    this.vibrate([100]);
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(140, now);
    osc.frequency.linearRampToValueAtTime(80, now + 0.25);
    
    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
    
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.25);
  }

  // UI button click / tap
  playClick() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    this.vibrate([15]);
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.exponentialRampToValueAtTime(400, now + 0.04);
    
    gain.gain.setValueAtTime(0.1, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
    
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.04);
  }

  // Ambient festive meditative Tanpura drone (Sa-Pa-Sa') loop
  toggleBgm() {
    this.init();
    this.bgmPlaying = !this.bgmPlaying;
    if (this.bgmPlaying) {
      this._startTanpura();
    } else {
      this._stopTanpura();
    }
    return this.bgmPlaying;
  }

  _startTanpura() {
    if (!this.ctx) return;
    const playDroneChord = () => {
      if (!this.bgmPlaying || !this.enabled || !this.ctx) return;
      const now = this.ctx.currentTime;
      // D (approx Sa = 146.8 Hz, Pa = 220 Hz, High Sa = 293.6 Hz)
      const freqs = [146.83, 220.00, 293.66, 440.00];
      freqs.forEach((f, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f + (Math.random() * 0.4 - 0.2), now);
        
        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.linearRampToValueAtTime(0.03 / (i + 1), now + 1.2);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.8);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + i * 0.35);
        osc.stop(now + 4.2);
      });
      this.bgmTimer = setTimeout(playDroneChord, 3500);
    };
    playDroneChord();
  }

  _stopTanpura() {
    if (this.bgmTimer) {
      clearTimeout(this.bgmTimer);
      this.bgmTimer = null;
    }
  }
}

const soundEngine = new SoundEngine();
