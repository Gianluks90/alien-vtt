import { effect, inject, Injectable, signal } from "@angular/core";
import { doc, Firestore, getDoc, getFirestore, onSnapshot } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { UserData } from "../models/UserData";
import { Router } from "@angular/router";
import { FIREBASE_CONFIG } from "../environment/firebase-config";

@Injectable({
  providedIn: "root",
})
export class FirebaseService {
  public database: Firestore;
  public user = signal<UserData | null>(null);
  public router = inject(Router);

  constructor() {
    const app = initializeApp(FIREBASE_CONFIG);
    this.database = getFirestore(app);

    getAuth(app).onAuthStateChanged(async user => {
      if (user) {
        await this.getUserSnapshotByUid(user.uid);
      } else {
        this.user.set(null);
      }
    });
  }

  private async getUserSnapshotByUid(uid: string): Promise<void> {
    const docRef = doc(this.database, "users", uid);
    const unsub = onSnapshot(docRef, (docSnap) => {
      if (!docSnap.exists()) return;
      
      const userData = docSnap.data() as UserData;
      this.user.set(userData);
    });
  }
}
