import { Timestamp } from "firebase/firestore";

export interface MapData {
    id: string;
    ownerId: string;
    createdAt: Timestamp;
    updatedAt: Timestamp;
    public?: boolean;
    title: string;
    description: string;
    status: 'new' | 'draft' | 'completed';
}