import { effect, inject, Injectable, signal } from "@angular/core";
import { doc, Firestore, getDoc, getFirestore, onSnapshot } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { FIREBASE_CONFIG } from "../consts/firebase-config";
import { getAuth } from "firebase/auth";
import { UserData } from "../models/UserData";
import { Router } from "@angular/router";

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
        this.router.navigate(['/home']);
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
