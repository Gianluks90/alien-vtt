import { Timestamp } from "firebase/firestore";

export interface MissionData {
    id: string;
    ownerId: string;
    createdAt: Timestamp;
    updatedAt: Timestamp;
    mapId: string;
    public?: boolean;
    title: string;
    description: string;
    status: 'new' | 'draft' | 'completed';
}