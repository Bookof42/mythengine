type Section = "threshold" | "play" | "reveal" | "question" | "omen" | "quiet";

class ApertureAudio {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private music: GainNode | null = null;
  private sfx: GainNode | null = null;
  private nodes: AudioNode[] = [];
  private wind: GainNode | null = null;
  private lampGain: GainNode | null = null;
  private lastFlap = 0;
  private armed = false;
  muted = true;
  unlocked = false;
  section: Section = "threshold";

  unlock() {
    if (typeof window === "undefined") return;
    const AC =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!AC) return;
    if (!this.ctx) {
      this.ctx = new AC({ latencyHint: "interactive" });
      this.master = this.ctx.createGain();
      this.music = this.ctx.createGain();
      this.sfx = this.ctx.createGain();
      this.music.gain.value = 0.16;
      this.sfx.gain.value = 0.38;
      this.master.gain.value = this.muted ? 0 : 0.55;
      this.sfx.connect(this.master);
      this.music.connect(this.master);
      this.master.connect(this.ctx.destination);
    }
    if (this.ctx.state === "suspended") void this.ctx.resume();
    this.unlocked = true;
    if (!this.armed) {
      this.armed = true;
      document.addEventListener("visibilitychange", () => {
        if (document.visibilityState === "visible" && this.ctx?.state === "suspended") {
          void this.ctx.resume();
        }
      });
    }
    this.setSection(this.section);
  }

  setMuted(muted: boolean) {
    this.muted = muted;
    if (!this.master || !this.ctx) return;
    this.master.gain.setTargetAtTime(muted ? 0 : 0.55, this.ctx.currentTime, 0.04);
    if (!muted && this.nodes.length === 0) this.setSection(this.section);
  }

  setSection(section: Section) {
    this.section = section;
    if (!this.ctx || !this.music) return;
    this.clearAmbient(0.12);
    if (this.muted || !this.unlocked) return;
    if (section === "play") this.startFlightBus();
  }

  cue(
    name:
      | "flip"
      | "step"
      | "reveal"
      | "omen"
      | "choose"
      | "begin"
      | "capture"
      | "gap"
      | "take",
  ) {
    if (!this.ctx || !this.sfx || this.muted) return;
    const t = this.ctx.currentTime;
    if (name === "flip") this.pluck(t, 784, 0.12, 0.09);
    else if (name === "step") this.pluck(t, 523.25, 0.1, 0.07);
    else if (name === "choose") this.pluck(t, 659.25, 0.11, 0.08);
    else if (name === "begin") {
      this.pluck(t, 392, 0.16, 0.1);
      this.pluck(t + 0.08, 587.33, 0.18, 0.08);
    }
    else if (name === "capture" || name === "take") {
      this.pluck(t, 659.25, 0.1, 0.11);
      this.pluck(t + 0.05, 987.77, 0.14, 0.08);
    }
    else if (name === "gap") this.pluck(t, 329.63, 0.2, 0.07);
    else if (name === "omen") this.pluck(t, 587.33, 0.18, 0.08);
    else if (name === "reveal") {
      this.pluck(t, 392, 0.2, 0.09);
      this.pluck(t + 0.12, 493.88, 0.22, 0.07);
      this.pluck(t + 0.24, 659.25, 0.28, 0.06);
    }
  }

  setFlight(state: { speed: number; lamp: number; well: boolean; flap: boolean }) {
    if (!this.ctx || this.muted || !this.wind) return;
    const t = this.ctx.currentTime;
    const air = state.flap ? Math.min(0.035, 0.012 + state.speed / 8000) : 0.0001;
    this.wind.gain.setTargetAtTime(air, t, state.flap ? 0.06 : 0.04);
  }

  private startFlightBus() {
    if (!this.ctx || !this.music) return;
    const ctx = this.ctx;
    const windGain = ctx.createGain();
    windGain.gain.value = 0.0001;
    const src = ctx.createBufferSource();
    src.buffer = this.pinkBuffer(1.2);
    src.loop = true;
    const hp = ctx.createBiquadFilter();
    hp.type = "highpass";
    hp.frequency.value = 1400;
    const bp = ctx.createBiquadFilter();
    bp.type = "bandpass";
    bp.frequency.value = 2400;
    bp.Q.value = 0.9;
    src.connect(hp);
    hp.connect(bp);
    bp.connect(windGain);
    windGain.connect(this.music);
    src.start();
    this.wind = windGain;
    this.nodes.push(src, hp, bp, windGain);
  }

  private pluck(when: number, freq: number, dur: number, vol: number) {
    if (!this.ctx || !this.sfx) return;
    const osc = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    const f = this.ctx.createBiquadFilter();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(freq, when);
    osc.frequency.exponentialRampToValueAtTime(Math.max(80, freq * 0.92), when + dur);
    f.type = "lowpass";
    f.frequency.value = freq * 6;
    g.gain.setValueAtTime(0.0001, when);
    g.gain.exponentialRampToValueAtTime(vol, when + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, when + dur);
    osc.connect(f);
    f.connect(g);
    g.connect(this.sfx);
    osc.start(when);
    osc.stop(when + dur + 0.05);
  }

  private noise(when: number, dur: number, cutoff: number, vol = 0.08) {
    if (!this.ctx || !this.sfx) return;
    const src = this.ctx.createBufferSource();
    src.buffer = this.pinkBuffer(Math.max(0.05, dur));
    const f = this.ctx.createBiquadFilter();
    f.type = "highpass";
    f.frequency.value = cutoff * 0.45;
    const bp = this.ctx.createBiquadFilter();
    bp.type = "bandpass";
    bp.frequency.value = cutoff;
    bp.Q.value = 0.8;
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(vol, when);
    g.gain.exponentialRampToValueAtTime(0.0001, when + dur);
    src.connect(f);
    f.connect(bp);
    bp.connect(g);
    g.connect(this.sfx);
    src.start(when);
  }

  private pinkBuffer(seconds: number) {
    const ctx = this.ctx!;
    const length = Math.max(1, Math.floor(ctx.sampleRate * seconds));
    const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let b0 = 0;
    let b1 = 0;
    let b2 = 0;
    let b3 = 0;
    let b4 = 0;
    let b5 = 0;
    let b6 = 0;
    for (let i = 0; i < length; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.969 * b2 + white * 0.153852;
      b3 = 0.8665 * b3 + white * 0.3104856;
      b4 = 0.55 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.016898;
      const pink = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
      b6 = white * 0.115926;
      data[i] = pink * 0.11;
    }
    return buffer;
  }

  private clearAmbient(fade = 0.2) {
    const ctx = this.ctx;
    const dying = this.nodes;
    this.nodes = [];
    this.wind = null;
    this.lampGain = null;
    if (!ctx) return;
    const t = ctx.currentTime;
    for (const node of dying) {
      try {
        if (node instanceof GainNode) {
          node.gain.cancelScheduledValues(t);
          node.gain.setTargetAtTime(0.0001, t, fade / 3);
        }
      } catch {
        /* already gone */
      }
    }
    window.setTimeout(() => {
      for (const node of dying) {
        try {
          if (node instanceof OscillatorNode || node instanceof AudioBufferSourceNode) {
            node.stop();
          }
          node.disconnect();
        } catch {
          /* already stopped */
        }
      }
    }, fade * 1000 + 40);
  }
}

export const audio = new ApertureAudio();
