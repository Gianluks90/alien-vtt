import { Injectable } from "@angular/core";
import { Firestore, getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { FIREBASE_CONFIG } from "../consts/firebase-config";

@Injectable({
  providedIn: "root",
})
export class FirebaseService {
  public database: Firestore;

  constructor() {
    const app = initializeApp(FIREBASE_CONFIG);
    this.database = getFirestore(app);
  }
}
