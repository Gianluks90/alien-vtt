import { Directive, HostListener, Input } from "@angular/core";
import { SoundService } from "../services/sound-service";

@Directive({
  selector: "[appSoundClick]",
})
export class SoundClick {
  @Input('appSoundClick') soundKey: string = 'click';

  constructor(private soundService: SoundService) { }

  @HostListener('click')

  onClick(): void {
    // console.log(`[SoundClick] Click su elemento con suono: ${this.soundKey}`);
    this.soundService.play(this.soundKey);
  }
}
