import { Component, effect, signal } from "@angular/core";
import { Header } from "../../components/header/header";
import { AuthService } from "../../services/auth-service";
import { FirebaseService } from "../../services/firebase-service";
import { Dialog } from "@angular/cdk/dialog";
import { SettingsDialog } from "../../components/dialogs/settings-dialog/settings-dialog";
import { DIALOGS_CONFIG } from "../../consts/dialogsConfig";
import { MapData } from "../../models/MapData";
import { MapEditorService } from "../../services/map-editor-service";
import { SoundClick } from "../../directives/sound-click";
import { NewMapDialog } from "../../components/dialogs/new-map-dialog/new-map-dialog";
import { MapInfoPipe } from "../../pipes/map-info-pipe";
import { DeleteDialog } from "../../components/dialogs/delete-dialog/delete-dialog";
import { Router } from "@angular/router";

@Component({
  selector: "app-home-page",
  imports: [Header, SoundClick, MapInfoPipe],
  templateUrl: "./home-page.html",
  styleUrl: "./home-page.scss",
})
export class HomePage {
  public isAdmin = signal<boolean>(false);
  public maps: any;
  public missions: any;

  constructor(
    private dialog: Dialog,
    private authService: AuthService,
    private firebaseService: FirebaseService,
    private mapEditorService: MapEditorService,
    private router: Router
  ) {
    effect(() => {
      const user = this.firebaseService.user();
      if (!user) return;

      this.isAdmin.set(user.role === 'admin');

      queueMicrotask(() => {
        this.mapEditorService.listenMyMapsSnapshot();
      });
    });
  }

  ngOnInit() {
    this.maps = this.mapEditorService.myMaps;
    this.missions = signal<any[]>([]); // Placeholder for missions data
  }

  ngOnDestroy() {
    this.mapEditorService.stopListeningMyMapsSnapshot();
  }


  public logout() {
    console.log('Logging out...');
    this.authService.logout();
  }

  public openSettingsDialog() {
    const dialogRef = this.dialog.open(SettingsDialog, {
      ...DIALOGS_CONFIG,
      data: {
        user: this.firebaseService.user()
      }
    });
  }

  public openNewMapDialog() {
    const dialogRef = this.dialog.open(NewMapDialog, {
      ...DIALOGS_CONFIG,
      data: {
        user: this.firebaseService.user()
      }
    })
  }

  public openDeleteDialog(mapId: string): void {
    const dialogRef = this.dialog.open(DeleteDialog, {
      ...DIALOGS_CONFIG,
    });

    dialogRef.closed.subscribe((result: any) => {
      if (result?.success) {
        this.mapEditorService.deleteMapDataById(mapId).catch((error) => {
          console.error("Error deleting map:", error);
        });
      }
    })
  }

  public navigateToMap(map: MapData): void {
    if (map.status === 'completed') {
      // TODO: navigate to map viewer
    } else {
      this.router.navigate(['/map-editor', map.id]);
    }
  }
}
