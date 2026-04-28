import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { getAuth } from "firebase/auth";
import { log } from "firebase/firestore/pipelines";

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const auth = getAuth();

  return getCurrentUser(auth).then(user => {
    if (user) {
      return true;
    } else {
      router.navigate(['/']);
      return false;
    }
  }).catch(error => {
    log('Error checking auth state:', error);
    router.navigate(['/']);
    return false;
  });

  return true
};

function getCurrentUser(auth: any): Promise<any> {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((user: any) => {
      unsubscribe(); // Unsubscribe immediately to avoid memory leaks
      resolve(user);
    }, reject);
  });
}
