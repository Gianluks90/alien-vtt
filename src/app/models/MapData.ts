import { Timestamp } from "firebase/firestore";

export interface MapData {
    id: string;
    ownerId: string;
    createdAt: Timestamp;
    updatedAt: Timestamp;
    public?: boolean;
    title: string;
    description: string;
    layers: MapLayer[];
    
    status: 'new' | 'draft' | 'completed';
}

export interface MapLayer {
  id: string;
  label: string;
  url: string;

  width: number;
  height: number;

  bounds?: [[number, number], [number, number]];

  visible: boolean;
  opacity?: number;
  zIndex?: number;

  type?: 'floor' | 'overlay'; // optional ma ti salva la vita dopo
};