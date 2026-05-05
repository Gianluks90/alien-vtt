import {
  Component,
  input,
  output,
  HostBinding,
  computed,
} from '@angular/core';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  templateUrl: './sidenav.html',
  styleUrl: './sidenav.scss',
})
export class SidenavComponent {
  // ===== STATE
  opened = input(false);
  position = input<'left' | 'right'>('left');
  backdrop = input(true);
  width = input('300px');

  openedChange = output<boolean>();

  // ===== TRIGGER CONFIG
  showTrigger = input(true);
  triggerText = input<string | null>(null);
  triggerIcon = input<string | null>(null); // es: "☰" oppure svg inline
  triggerPosition = input<'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'>('top-left');

  // ===== COMPUTED
  isOpened = computed(() => this.opened());
  isRight = computed(() => this.position() === 'right');

  // ===== ACTIONS
  open() {
    this.openedChange.emit(true);
  }

  close() {
    this.openedChange.emit(false);
  }

  toggle() {
    this.opened() ? this.close() : this.open();
  }

  // ===== HOST CLASSES
  @HostBinding('class.opened')
  get openedClass() {
    return this.isOpened();
  }

  @HostBinding('class.right')
  get rightClass() {
    return this.isRight();
  }

  @HostBinding('class.top-left')
  get isTopLeft() {
    return this.triggerPosition() === 'top-left';
  }

  @HostBinding('class.top-right')
  get isTopRight() {
    return this.triggerPosition() === 'top-right';
  }

  @HostBinding('class.bottom-left')
  get isBottomLeft() {
    return this.triggerPosition() === 'bottom-left';
  }

  @HostBinding('class.bottom-right')
  get isBottomRight() {
    return this.triggerPosition() === 'bottom-right';
  }
}