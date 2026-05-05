// import { Component, effect, signal } from "@angular/core";
// import { MapEditorService } from "../../services/map-editor-service";
// import { MapData } from "../../models/MapData";
// import { MapInfoPipe } from "../../pipes/map-info-pipe";
// import { MapStatusPipe } from "../../pipes/map-status-pipe";
// import { Dialog } from "@angular/cdk/dialog";
// import { MapEditorTutorialDialog } from "../../components/dialogs/map-editor-tutorial-dialog/map-editor-tutorial-dialog";
// import { DIALOGS_CONFIG } from "../../consts/dialogsConfig";
// import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
// import { SidenavComponent } from "../../components/sidenav/sidenav";
// import { SoundClick } from "../../directives/sound-click";
// import * as L from "leaflet";

// @Component({
//   selector: "app-map-editor-page",
//   imports: [ReactiveFormsModule, SidenavComponent, MapInfoPipe, MapStatusPipe, SoundClick],
//   templateUrl: "./map-editor-page.html",
//   styleUrl: "./map-editor-page.scss",
// })
// export class MapEditorPage {
//   public mapData = signal<MapData>({} as MapData);
//   public map: L.Map | null = null;
//   public form: FormGroup;
//   public isOpen = signal(false);

//   constructor(
//     private dialog: Dialog,
//     private mapEditorService: MapEditorService,
//     private fb: FormBuilder
//   ) {
//     this.form = this.fb.group({
//       title: ['', Validators.required],
//       description: ['', Validators.maxLength(200)],
//       public: [false]
//     });
//   }

//   ngOnInit(): void {
//     const mapId = window.location.pathname.split("/").pop()!;
//     this.mapEditorService.listenMapDataSnapshotById(mapId, (mapData) => {
//       if (mapData) {
//         console.log(mapData);
        
//         this.mapData.set(mapData);
//         this.form.patchValue({
//           title: mapData.title,
//           description: mapData.description,
//           public: mapData.public
//         });
//         if (mapData.status === 'new') {
//           this.openMapEditorTutorialDialog();
//         }

//         if (!this.map) {
//           this.initMap();
//         }

//         if (this.map && this.mapData().layers && this.mapData().layers.length > 0) {
//           this.mapData().layers.forEach(layer => {
//             const bounds: L.LatLngBoundsExpression = [[0, 0], [layer.height, layer.width]];
//             if (layer.type === 'floor') {
//               const image = L.imageOverlay(layer.url, bounds, { opacity: layer.opacity ?? 1, zIndex: layer.zIndex ?? 1 });
//               image.addTo(this.map!);
//             }
//           });
//         }
//       } else {
//         this.mapData.set({} as MapData);
//       }
//     });
//   }

//   private initMap(): void {
//     const mapOptions: L.MapOptions = {
//       crs: L.CRS.Simple,
//       zoomControl: false,
//       attributionControl: false,
//       touchZoom: false,
//       doubleClickZoom: false,
//       scrollWheelZoom: false,
//       zoomSnap: 0.25,
//     };

//     this.map = L.map('map', mapOptions);

//     // Aggiungi un pane per i layer overlay
//     if (this.map) {
//       this.map.createPane('overlayPane');
//       this.map.getPane('overlayPane')!.style.zIndex = '650';
//     }
//   }

//   public zoomIn(): void {
//     if (this.map) {
//       this.map.zoomIn();
//     }
//   }

//   public zoomOut(): void {
//     if (this.map) {
//       this.map.zoomOut();
//     }
//   }

//   public saveMap(): void {
//     this.isOpen.set(false);
//     const updatedData: Partial<MapData> = {
//       title: this.form.get('title')!.value,
//       description: this.form.get('description')!.value,
//       public: this.form.get('public')!.value
//     };
//     this.mapEditorService.updateMapData(this.mapData().id, updatedData);
//   }

//   private openMapEditorTutorialDialog(): void {
//     const dialogRef = this.dialog.open(MapEditorTutorialDialog, {
//       ...DIALOGS_CONFIG,
//       disableClose: true,
//     });

//     dialogRef.closed.subscribe((result: any) => {
//       if (result?.success && result.layer) {
//         this.mapEditorService.addMapLayer(this.mapData().id, result.layer).then(() => {
//           this.mapEditorService.updateMapStatus(this.mapData().id, 'draft');
//         });
//       }
//     });
//   }
// }


import { Component, effect, signal, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { MapEditorService } from "../../services/map-editor-service";
import { MapData } from "../../models/MapData";
import { MapInfoPipe } from "../../pipes/map-info-pipe";
import { MapStatusPipe } from "../../pipes/map-status-pipe";
import { Dialog } from "@angular/cdk/dialog";
import { MapEditorTutorialDialog } from "../../components/dialogs/map-editor-tutorial-dialog/map-editor-tutorial-dialog";
import { DIALOGS_CONFIG } from "../../consts/dialogsConfig";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { SidenavComponent } from "../../components/sidenav/sidenav";
import { SoundClick } from "../../directives/sound-click";
import * as L from "leaflet";

@Component({
  selector: "app-map-editor-page",
  imports: [ReactiveFormsModule, SidenavComponent, MapInfoPipe, MapStatusPipe, SoundClick],
  templateUrl: "./map-editor-page.html",
  styleUrl: "./map-editor-page.scss",
})
export class MapEditorPage implements OnInit, OnDestroy {
  public mapData = signal<MapData>({} as MapData);
  public map: L.Map | null = null;
  public form: FormGroup;
  public isOpen = signal(false);

  private layersMap = new Map<string, L.ImageOverlay>();
  private tutorialOpened = false;

  constructor(
    private dialog: Dialog,
    private mapEditorService: MapEditorService,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.maxLength(200)],
      public: [false]
    });

    // 🔥 EFFECT 1 — gestione stato base + init
    effect(() => {
      const data = this.mapData();

      if (!data?.id) return;

      this.form.patchValue({
        title: data.title,
        description: data.description,
        public: data.public
      });

      if (data.status === 'new' && !this.tutorialOpened) {
        this.tutorialOpened = true;
        this.openMapEditorTutorialDialog();
      }

      if (!this.map) {
        this.initMap();
      }
    });

    // 🔥 EFFECT 2 — rendering layer (IL CUORE)
    effect(() => {
      const map = this.map;
      const layers = this.mapData().layers;

      if (!map || !layers) return;

      // 🧹 cleanup
      this.layersMap.forEach(layer => map.removeLayer(layer));
      this.layersMap.clear();

      // 🧱 rebuild
      layers.forEach(layer => {
        if (layer.type !== 'floor') return;

        const bounds: L.LatLngBoundsExpression = [[0, 0], [1000, 1000]];

        const image = L.imageOverlay(layer.url, bounds, {
          opacity: layer.opacity ?? 1,
          zIndex: layer.zIndex ?? 1,
          pane: 'overlayPane'
        });

        image.addTo(map);
        this.layersMap.set(layer.id, image);
      });

      // 🎯 fit primo layer
      const first = layers.find(l => l.type === 'floor');
      if (first) {
        map.fitBounds([[0, 0], [1000, 1000]]);
      }
    });
  }

  ngOnInit(): void {
    const mapId = this.route.snapshot.paramMap.get('id')!;

    // 🔥 SOLO stato, niente side-effect
    this.mapEditorService.listenMapDataSnapshotById(mapId, (mapData) => {
      this.mapData.set(mapData ?? ({} as MapData));
    });
  }

  ngOnDestroy(): void {
    this.map?.remove();
  }

  private initMap(): void {
    const mapOptions: L.MapOptions = {
      crs: L.CRS.Simple,
      zoomControl: false,
      attributionControl: false,
      touchZoom: false,
      doubleClickZoom: false,
      scrollWheelZoom: false,
      zoomSnap: 0.25,
      minZoom: -1,
      maxZoom: 5,
    };

    this.map = L.map('map', mapOptions);

    // pane custom
    this.map.createPane('overlayPane');
    this.map.getPane('overlayPane')!.style.zIndex = '650';
  }

  public zoomIn(): void {
    if (!this.map) return;
    this.map.zoomIn();
  }

  public zoomOut(): void {
    if (!this.map) return;
    this.map.zoomOut();
  }

  public saveMap(): void {
    this.isOpen.set(false);

    const updatedData: Partial<MapData> = {
      title: this.form.get('title')!.value,
      description: this.form.get('description')!.value,
      public: this.form.get('public')!.value
    };

    this.mapEditorService.updateMapData(this.mapData().id, updatedData);
  }

  private openMapEditorTutorialDialog(): void {
    const dialogRef = this.dialog.open(MapEditorTutorialDialog, {
      ...DIALOGS_CONFIG,
      disableClose: true,
    });

    dialogRef.closed.subscribe((result: any) => {
      if (result?.success && result.layer) {
        this.mapEditorService.addMapLayer(this.mapData().id, result.layer).then(() => {
          this.mapEditorService.updateMapStatus(this.mapData().id, 'draft');
        });
      }
    });
  }
}