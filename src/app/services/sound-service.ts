import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SoundService {
  private sounds = new Map<string, HTMLAudioElement>();

  preload(key: string, path: string): void {
    if (this.sounds.has(key)) return;
    const audio = new Audio(path);
    audio.load();
    this.sounds.set(key, audio);
  }

  play(key: string): void {
    const audio = this.sounds.get(key);
    if (!audio) return;
    audio.currentTime = 0;
    audio.play().catch(() => {
      // browser policy: serve interazione utente
    });

  }
}
