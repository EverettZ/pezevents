import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { of, throwError, Observable, from } from 'rxjs';
import * as firebase from 'firebase';
import { filter, map, take, tap } from 'rxjs/operators';
import { AngularFireFunctions } from '@angular/fire/functions';

const BASE_COLLECTION = 'users';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private GET_USER_DATA = this.functions.httpsCallable("getUserData");

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore, private functions: AngularFireFunctions) { }

  //#region User Auth
  public signInWithEmail(email: string, password: string) {
    return from(this.afAuth.signInWithEmailAndPassword(email, password));
  }

  public signOut() {
    return from(this.afAuth.signOut());
  }

  public passwordReset(email: string) {
    return from(this.afAuth.sendPasswordResetEmail(email));
  }

  public createUserWithEmailAndPassword(email: string, password: string) {
    return from(this.afAuth.createUserWithEmailAndPassword(email, password));
  }

  public sendPasswordResetEmail(email: string) {
    return from(this.afAuth.sendPasswordResetEmail(email));
  }

  // public getUser(id: string | null) {
  //   if (id) {
  //     return this.afs.collection(BASE_COLLECTION).doc<User>(id).valueChanges();
  //   }
  //   return throwError("user authstate does not exist")
  // }

  public getFirebaseAuthState() {
    return this.afAuth.authState.pipe(
      take(1)
    );
  }

  public googleSignIn() {
    return from(this.afAuth.signInWithPopup(new firebase.default.auth.GoogleAuthProvider()));
  }
  //#endregion

  //#region User Businesses
  public getUserData(uid: string) {
    return this.GET_USER_DATA({ uid });
  }
  //#endregion
}
