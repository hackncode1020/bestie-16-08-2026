/**
 * Dreamy watercolor soundtrack and sound FX generator using WebAudio.
 * Generates an organic music-box / acoustic lofi piano melody in key of D Major / A Major.
 * Fallback-safe and works without any external mp3 files.
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMusicPlaying: boolean = false;
  private musicInterval: any = null;
  private masterGain: GainNode | null = null;
  private musicGain: GainNode | null = null;
  private sfxGain: GainNode | null = null;
  private customAudio: HTMLAudioElement | null = null;
  private volume: number = 0.45;
  private sfxVolume: number = 0.55;
  private isMuted: boolean = false;
  private noteIndex: number = 0;

  private melodyNotes = [
    // Dreamy, warm birthday lullaby / indie melody in D Major
    { f: 587.33, d: 0.6 }, // D5
    { f: 659.25, d: 0.5 }, // E5
    { f: 739.99, d: 0.8 }, // F#5
    { f: 880.00, d: 0.9 }, // A5
    { f: 739.99, d: 0.5 }, // F#5
    { f: 659.25, d: 0.6 }, // E5
    { f: 587.33, d: 1.1 }, // D5
    
    { f: 493.88, d: 0.5 }, // B4
    { f: 587.33, d: 0.6 }, // D5
    { f: 739.99, d: 0.8 }, // F#5
    { f: 659.25, d: 1.2 }, // E5

    { f: 587.33, d: 0.6 }, // D5
    { f: 659.25, d: 0.5 }, // E5
    { f: 739.99, d: 0.8 }, // F#5
    { f: 987.77, d: 1.0 }, // B5
    { f: 880.00, d: 0.7 }, // A5
    { f: 739.99, d: 0.7 }, // F#5
    { f: 659.25, d: 0.6 }, // E5
    { f: 587.33, d: 1.4 }, // D5
    
    { f: 440.00, d: 0.6 }, // A4
    { f: 587.33, d: 0.6 }, // D5
    { f: 659.25, d: 0.7 }, // E5
    { f: 587.33, d: 1.5 }, // D5
  ];

  private bassChords = [
    [146.83, 220.00, 293.66], // D Major
    [196.00, 293.66, 369.99], // G Major
    [220.00, 277.18, 329.63], // A Major
    [164.81, 246.94, 293.66], // B Minor
  ];
  private chordIndex = 0;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioCtx();
      
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(1.0, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      this.musicGain = this.ctx.createGain();
      this.musicGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
      this.musicGain.connect(this.masterGain);

      this.sfxGain = this.ctx.createGain();
      this.sfxGain.gain.setValueAtTime(this.sfxVolume, this.ctx.currentTime);
      this.sfxGain.connect(this.masterGain);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public async startMusic(customUrl?: string) {
    this.initContext();

    if (customUrl) {
      try {
        if (!this.customAudio) {
          this.customAudio = new Audio(customUrl);
          this.customAudio.loop = true;
          this.customAudio.volume = this.volume;
        }
        await this.customAudio.play();
        this.isMusicPlaying = true;
        return;
      } catch {
        // Fallback to synthesized music box
      }
    }

    if (this.isMusicPlaying) return;
    this.isMusicPlaying = true;
    this.playSynthesizedMelodyLoop();
  }

  public pauseMusic() {
    this.isMusicPlaying = false;
    if (this.musicInterval) {
      clearTimeout(this.musicInterval);
      this.musicInterval = null;
    }
    if (this.customAudio) {
      this.customAudio.pause();
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 1, this.ctx.currentTime);
    }
    if (this.customAudio) {
      this.customAudio.muted = this.isMuted;
    }
    return this.isMuted;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public getIsPlaying(): boolean {
    return this.isMusicPlaying;
  }

  private playTone(freq: number, duration: number, type: OscillatorType = 'sine', gainNode: GainNode, velocity = 0.25) {
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const noteGain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      const now = this.ctx.currentTime;
      noteGain.gain.setValueAtTime(0.001, now);
      // Soft attack & organic music-box decay
      noteGain.gain.exponentialRampToValueAtTime(velocity, now + 0.04);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(noteGain);
      noteGain.connect(gainNode);

      osc.start(now);
      osc.stop(now + duration + 0.05);
    } catch {
      // Audio safety
    }
  }

  private playSynthesizedMelodyLoop = () => {
    if (!this.isMusicPlaying || !this.ctx || !this.musicGain) return;

    const note = this.melodyNotes[this.noteIndex % this.melodyNotes.length];
    
    // Play warm music box tone (sine + soft triangle harmonics)
    this.playTone(note.f, note.d * 1.5, 'sine', this.musicGain, 0.22);
    this.playTone(note.f * 2, note.d * 0.8, 'triangle', this.musicGain, 0.06);

    // Play subtle soft chord every 4 notes
    if (this.noteIndex % 4 === 0) {
      const chord = this.bassChords[this.chordIndex % this.bassChords.length];
      chord.forEach((freq) => {
        this.playTone(freq, 2.5, 'sine', this.musicGain!, 0.08);
      });
      this.chordIndex++;
    }

    this.noteIndex++;
    const stepDuration = note.d * 720;
    this.musicInterval = setTimeout(this.playSynthesizedMelodyLoop, stepDuration);
  };

  // Sound Effects
  public playPageTurn() {
    this.initContext();
    if (!this.ctx || !this.sfxGain || this.isMuted) return;

    try {
      // Paper swoosh sound
      const bufferSize = this.ctx.sampleRate * 0.15;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.4));
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1400, this.ctx.currentTime);
      filter.Q.setValueAtTime(1.8, this.ctx.currentTime);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.15);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.sfxGain);

      noise.start();
    } catch {}
  }

  public playTwinkle() {
    this.initContext();
    if (!this.ctx || !this.sfxGain || this.isMuted) return;
    
    [880, 1108.73, 1318.51, 1760].forEach((freq, idx) => {
      setTimeout(() => {
        this.playTone(freq, 0.6, 'sine', this.sfxGain!, 0.2);
      }, idx * 75);
    });
  }

  public playUnlockSuccess() {
    this.initContext();
    if (!this.ctx || !this.sfxGain || this.isMuted) return;

    [523.25, 659.25, 783.99, 1046.50].forEach((freq, idx) => {
      setTimeout(() => {
        this.playTone(freq, 0.7, 'triangle', this.sfxGain!, 0.3);
      }, idx * 100);
    });
  }

  public playWrongBuzz() {
    this.initContext();
    if (!this.ctx || !this.sfxGain || this.isMuted) return;

    this.playTone(220, 0.2, 'sawtooth', this.sfxGain, 0.15);
    setTimeout(() => {
      this.playTone(196, 0.3, 'sawtooth', this.sfxGain!, 0.15);
    }, 150);
  }

  public playConfettiPop() {
    this.initContext();
    if (!this.ctx || !this.sfxGain || this.isMuted) return;

    // Pop tone + chime flourish
    this.playTone(350, 0.08, 'sine', this.sfxGain, 0.4);
    setTimeout(() => {
      [659.25, 880, 1046.5, 1318.5, 1567.98].forEach((freq, idx) => {
        setTimeout(() => {
          this.playTone(freq, 0.8, 'sine', this.sfxGain!, 0.25);
        }, idx * 60);
      });
    }, 80);
  }
}

export const soundEngine = new SoundEngine();
