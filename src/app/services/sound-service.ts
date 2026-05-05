import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SoundService {
  private sounds = new Map<string, HTMLAudioElement>();

  preload(key: string, path: string): void {
    if (this.sounds.has(key)) {
      console.log(`[SoundService] Suono già precaricato: ${key}`);
      return;
    }
    const audio = new Audio(path);
    audio.addEventListener('canplaythrough', () => {
      console.log(`[SoundService] Audio pronto: ${key} (${path})`);
    });
    audio.addEventListener('error', (e) => {
      console.error(`[SoundService] Errore caricamento audio: ${key} (${path})`, e);
    });
    audio.load();
    this.sounds.set(key, audio);
  }

  play(key: string): void {
    const audio = this.sounds.get(key);
    if (!audio) {
      console.warn(`[SoundService] Nessun audio trovato per la chiave: ${key}`);
      return;
    }
    audio.currentTime = 0;
    audio.play().then(() => {
      console.log(`[SoundService] Suono riprodotto: ${key}`);
    }).catch((err) => {
      console.error(`[SoundService] Errore riproduzione audio: ${key}`, err);
    });

  }
}
