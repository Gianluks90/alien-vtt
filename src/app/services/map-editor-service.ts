import { Injectable, signal } from "@angular/core";
import { FirebaseService } from "./firebase-service";
import { MapData, MapLayer } from "../models/MapData";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, onSnapshot, query, setDoc, Timestamp, where, Unsubscribe, arrayUnion } from "firebase/firestore";

@Injectable({
  providedIn: "root",
})
export class MapEditorService {
  constructor(private firebaseService: FirebaseService) { }

  public myMaps = signal<MapData[]>([]);
  public currentMap = signal<MapData | null>(null);

  private myMapsUnsubscribe: Unsubscribe | null = null;

  public listenMyMapsSnapshot(): void {
    const userUid = this.firebaseService.user()!.uid;
    if (!userUid) throw new Error("User not authenticated");

    // Rimuovi eventuale listener precedente
    if (this.myMapsUnsubscribe) {
      this.myMapsUnsubscribe();
    }

    const docRef = collection(this.firebaseService.database, "maps");
    const q = query(docRef, where("ownerId", "==", userUid));
    this.myMapsUnsubscribe = onSnapshot(q, (querySnap) => {
      const maps: MapData[] = [];
      querySnap.forEach((doc) => {
        const mapData = doc.data() as MapData;
        maps.push(mapData);
      });
      this.myMaps.set(maps);
    });
  }

  public stopListeningMyMapsSnapshot(): void {
    if (this.myMapsUnsubscribe) {
      this.myMapsUnsubscribe();
      this.myMapsUnsubscribe = null;
    }
  }

  public async getMapDataById(mapId: string): Promise<MapData> {
    const docRef = doc(this.firebaseService.database, "maps", mapId);
    return await getDoc(docRef).then((docSnap) => {
      if (!docSnap.exists()) throw new Error("Map not found");

      const mapData = docSnap.data() as MapData;
      return mapData;
    });
  }

  /**
   * Listen to a single map document snapshot by id.
   * @param mapId The id of the map document
   * @param callback Function to call with the MapData (or null if not found)
   * @returns Unsubscribe function
   */
  public listenMapDataSnapshotById(mapId: string, callback: (mapData: MapData | null) => void): Unsubscribe {
    const docRef = doc(this.firebaseService.database, "maps", mapId);
    return onSnapshot(docRef, (docSnap) => {
      if (!docSnap.exists()) {
        callback(null);
      } else {
        callback(docSnap.data() as MapData);

      }
    });
  }

  public async createEmptyMapData(title: string, description: string, isPublic: boolean): Promise<void> {
    const userUid = this.firebaseService.user()!.uid;
    if (!userUid) throw new Error("User not authenticated");

    const newMapId = this.randomId();
    const docRef = doc(this.firebaseService.database, "maps", newMapId);
    const newMapData: MapData = {
      id: newMapId,
      ownerId: userUid,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      title: title,
      description: description,
      public: isPublic,
      status: 'new',
      layers: []
    };
    await setDoc(docRef, newMapData);
  }

  public async deleteMapDataById(mapId: string): Promise<void> {
    const docRef = doc(this.firebaseService.database, "maps", mapId);
    await deleteDoc(docRef);
  }

  public async updateMapStatus(mapId: string, status: string): Promise<void> {
    const docRef = doc(this.firebaseService.database, "maps", mapId);
    await setDoc(docRef, { status: status, updatedAt: Timestamp.now() }, { merge: true });
  }

  public async updateMapData(mapId: string, updatedData: Partial<MapData>): Promise<void> {
    const docRef = doc(this.firebaseService.database, "maps", mapId);
    await setDoc(docRef, { ...updatedData, updatedAt: Timestamp.now() }, { merge: true });
  }

  public async addMapLayer(mapId: string, layerData: any): Promise<void> {
    const docRef = doc(this.firebaseService.database, "maps", mapId);
    const layer = {
      id: this.randomId(),
      label: layerData.layerLabel,
      url: layerData.layerURL,
      width: layerData.width || 1000,
      height: layerData.height || 1000,
      visible: false,
      opacity: 1,
      zIndex: 0,
      type: 'floor'
    } as MapLayer;
    await setDoc(docRef, {
      layers: arrayUnion(layer)
    }, { merge: true });
  }

  private randomId(): string {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }
}
