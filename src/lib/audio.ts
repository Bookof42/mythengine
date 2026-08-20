type Section = "threshold" | "play" | "reveal" | "question" | "omen" | "quiet";

class ApertureAudio {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private music: GainNode | null = null;
  private sfx: GainNode | null = null;
  private comp: DynamicsCompressorNode | null = null;
  private nodes: AudioNode[] = [];
  private wind: GainNode | null = null;
  private lampGain: GainNode | null = null;
  private wellFilter: BiquadFilterNode | null = null;
  private lastFlap = 0;
  private armed = false;
  muted = false;
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
      this.comp = this.ctx.createDynamicsCompressor();
      this.comp.threshold.value = -18;
      this.comp.knee.value = 18;
      this.comp.ratio.value = 3;
      this.comp.attack.value = 0.01;
      this.comp.release.value = 0.18;
      this.music.gain.value = 0.1;
      this.sfx.gain.value = 0.22;
      this.master.gain.value = this.muted ? 0 : 0.48;
      this.sfx.connect(this.comp);
      this.music.connect(this.comp);
      this.comp.connect(this.master);
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
    this.master.gain.setTargetAtTime(muted ? 0 : 0.48, this.ctx.currentTime, 0.05);
    if (!muted && this.nodes.length === 0) this.setSection(this.section);
  }

  setSection(section: Section) {
    const same = this.section === section && this.nodes.length > 0;
    this.section = section;
    if (!this.ctx || !this.music) return;
    if (same) return;
    this.clearAmbient(0.35);
    if (this.muted || !this.unlocked) return;
    if (section === "quiet") return;
    if (section === "play") {
      this.startFlightBus();
      return;
    }
    this.air();
    if (section === "reveal") this.pad(196, 0.008);
    else this.pad(174.61, 0.006);
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
    if (name === "flip") {
      this.blip(t, 392, 0.09, 0.04);
    } else if (name === "step") {
      this.blip(t, 164, 0.1, 0.04);
    } else if (name === "choose") {
      this.blip(t, 220, 0.1, 0.035);
    } else if (name === "begin") {
      this.blip(t, 174.61, 0.18, 0.05);
    } else if (name === "capture" || name === "take") {
      this.blip(t, 246.94, 0.16, 0.06);
      this.noise(t, 0.07, 900, 0.03);
    } else if (name === "gap") {
      this.blip(t, 130.81, 0.22, 0.05);
    } else if (name === "omen") {
      this.blip(t, 196, 0.2, 0.035);
    } else if (name === "reveal") {
      this.blip(t, 146.83, 0.28, 0.05);
    }
  }

  setFlight(state: { speed: number; lamp: number; well: boolean; flap: boolean }) {
    if (!this.ctx || this.muted) return;
    const t = this.ctx.currentTime;
    if (this.wind) {
      const air = Math.min(0.07, 0.01 + state.speed / 4200);
      this.wind.gain.setTargetAtTime(air, t, 0.12);
    }
    if (this.lampGain) {
      const near = Math.min(0.045, 18 / Math.max(40, state.lamp));
      this.lampGain.gain.setTargetAtTime(near, t, 0.2);
    }
    if (this.wellFilter) {
      this.wellFilter.frequency.setTargetAtTime(state.well ? 280 : 900, t, 0.3);
    }
    if (state.flap && t - this.lastFlap > 0.48) {
      this.lastFlap = t;
      this.noise(t, 0.06, 480, 0.018);
    }
  }

  private startFlightBus() {
    if (!this.ctx || !this.music) return;
    const ctx = this.ctx;
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 900;
    filter.Q.value = 0.7;
    filter.connect(this.music);
    this.wellFilter = filter;

    const windGain = ctx.createGain();
    windGain.gain.value = 0.012;
    const src = ctx.createBufferSource();
    src.buffer = this.pinkBuffer(2);
    src.loop = true;
    const wf = ctx.createBiquadFilter();
    wf.type = "bandpass";
    wf.frequency.value = 520;
    wf.Q.value = 0.45;
    src.connect(wf);
    wf.connect(windGain);
    windGain.connect(filter);
    src.start();
    this.wind = windGain;
    this.nodes.push(src, wf, windGain, filter);

    const lg = ctx.createGain();
    lg.gain.value = 0.01;
    const o1 = ctx.createOscillator();
    o1.type = "sine";
    o1.frequency.value = 82.41;
    o1.connect(lg);
    lg.connect(filter);
    o1.start();
    this.lampGain = lg;
    this.nodes.push(o1, lg);
  }

  private air() {
    if (!this.ctx || !this.music) return;
    const ctx = this.ctx;
    const src = ctx.createBufferSource();
    src.buffer = this.pinkBuffer(3);
    src.loop = true;
    const hp = ctx.createBiquadFilter();
    hp.type = "highpass";
    hp.frequency.value = 1200;
    const bp = ctx.createBiquadFilter();
    bp.type = "bandpass";
    bp.frequency.value = 2400;
    bp.Q.value = 0.6;
    const g = ctx.createGain();
    g.gain.value = 0.018;
    src.connect(hp);
    hp.connect(bp);
    bp.connect(g);
    g.connect(this.music);
    src.start();
    this.nodes.push(src, hp, bp, g);
  }

  private pad(freq: number, gain: number) {
    if (!this.ctx || !this.music) return;
    const ctx = this.ctx;
    const g = ctx.createGain();
    g.gain.value = 0;
    g.gain.setTargetAtTime(gain, ctx.currentTime, 0.9);
    const f = ctx.createBiquadFilter();
    f.type = "lowpass";
    f.frequency.value = Math.max(1800, freq * 3);
    f.Q.value = 0.5;
    const a = ctx.createOscillator();
    const b = ctx.createOscillator();
    a.type = "sine";
    b.type = "sine";
    a.frequency.value = freq;
    b.frequency.value = freq * 1.002;
    const lfo = ctx.createOscillator();
    const lg = ctx.createGain();
    lfo.type = "sine";
    lfo.frequency.value = 0.07;
    lg.gain.value = gain * 0.12;
    lfo.connect(lg);
    lg.connect(g.gain);
    a.connect(f);
    b.connect(f);
    f.connect(g);
    g.connect(this.music);
    a.start();
    b.start();
    lfo.start();
    this.nodes.push(a, b, lfo, lg, f, g);
  }

  private blip(when: number, freq: number, dur: number, vol: number) {
    if (!this.ctx || !this.sfx) return;
    const osc = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    const f = this.ctx.createBiquadFilter();
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, when);
    osc.frequency.exponentialRampToValueAtTime(Math.max(40, freq * 0.72), when + dur);
    f.type = "lowpass";
    f.frequency.value = freq * 3;
    g.gain.setValueAtTime(0.0001, when);
    g.gain.exponentialRampToValueAtTime(vol, when + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, when + dur);
    osc.connect(f);
    f.connect(g);
    g.connect(this.sfx);
    osc.start(when);
    osc.stop(when + dur + 0.06);
  }

  private noise(when: number, dur: number, cutoff: number, vol = 0.08) {
    if (!this.ctx || !this.sfx) return;
    const src = this.ctx.createBufferSource();
    src.buffer = this.pinkBuffer(Math.max(0.05, dur));
    const f = this.ctx.createBiquadFilter();
    f.type = "lowpass";
    f.frequency.value = cutoff;
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(vol, when);
    g.gain.exponentialRampToValueAtTime(0.0001, when + dur);
    src.connect(f);
    f.connect(g);
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
    this.wellFilter = null;
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
