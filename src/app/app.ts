import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FirebaseService } from './services/firebase-service';
import { SoundService } from './services/sound-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('alien-vtt');
  constructor(private firebaseService: FirebaseService, private soundService: SoundService) {
    this.soundService.preload('click', '/sounds/button.mp3');
  }

  
}
