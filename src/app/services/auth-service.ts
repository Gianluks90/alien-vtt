import { inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { createUserWithEmailAndPassword, deleteUser, getAuth, signInWithEmailAndPassword, User, UserCredential } from "firebase/auth";
import { deleteDoc, doc, setDoc, Timestamp } from "firebase/firestore";
import { FirebaseService } from "./firebase-service";
import { UserData } from "../models/UserData";

interface GrantedCredential {
  email: string;
  password: string;
}

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private router: Router, private firebaseService: FirebaseService) {}

  /**
   * This method creates a new user in Firebase Authentication using the provided email and password. After successfully creating the user, it also creates a corresponding document in Firestore to store additional user information. If there's an error during the process, it logs the error details to the console.
   * @param credential 
   * @returns 
   */
  public async createWithEmailAndPassword(credential: GrantedCredential): Promise<void> {
    const auth = getAuth();
    return createUserWithEmailAndPassword(auth, credential.email, credential.password)
    .then((userCredential) => {
      this.createUserDocument(userCredential.user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error('Error creating user:', errorCode, errorMessage);
    });
  }


  /**
   * This method deletes the user from Firebase Authentication and then deletes the corresponding document from Firestore. Finally, it navigates the user back to the landing page.
   * @returns 
   */
  public async destroyUser(): Promise<void> {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) return;
    deleteUser(user).then(() => {
      this.deleteUserDocument(user.uid).then(() => {
        this.router.navigate(['/']);
      })
    }).catch((error) => {
      console.error('Error deleting user:', error);
    });
  }

  /**
   * This method logs in a user using the provided email and password. If the login is successful, it logs the user information to the console. If there's an error during the process, it logs the error details to the console.
   * @param credential
   * @returns 
   */
  public async loginWithEmailAndPassword(credential: GrantedCredential): Promise<void> {
    const auth = getAuth();
    return signInWithEmailAndPassword(auth, credential.email, credential.password).then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log('Login successful:', user);
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error('Login failed:', errorCode, errorMessage);
    });
  }

  public logout() {
    getAuth().signOut();
    this.router.navigate(['/']);
  };

  private async createUserDocument(user: User): Promise<void> {
    const docRef = doc(this.firebaseService.database, "users", user.uid);
    const userData: UserData = {
      uid: user.uid,
      email: user.email || "",
      nickname: user.displayName || "",
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    }
    return await setDoc(docRef, userData);
  }

  private async deleteUserDocument(uid: string): Promise<void> {
    const docRef = doc(this.firebaseService.database, "users", uid);
    return await deleteDoc(docRef);
  }
}
