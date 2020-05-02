import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { FirebaseService } from './firebase.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})


export class AuthServiceService {

  constructor(
    private firebaseService: FirebaseService,
		public afAuth: AngularFireAuth
  ) { }

  doRegister(email, password){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(
        res => resolve(res),
        err => reject(err))
    })
   }

   sendEmailVerification() {
    let user = firebase.auth().currentUser;
    user.sendEmailVerification();
   }
 
   doLogin(email, password){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(email, password)
      .then(
        res => resolve(res),
        err => reject(err))
    })
   }

   updateProfile(username, image) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          console.log(user);
          user.updateProfile({
            displayName: username,
            photoURL: `https://picsum.photos/id/${image}/200/200`
          })
          .then(
            res => resolve(res),
            err => reject(err))
        }
      })
    })
  }

   recoverPassword(email){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().sendPasswordResetEmail(email)
      .then(
        res => resolve(res),
        err => reject(err))
    })  
   }
 
   doLogout(){
     return new Promise((resolve, reject) => {
       this.afAuth.auth.signOut()
       .then(() => {
         this.firebaseService.unsubscribeOnLogOut();
         resolve();
       }).catch((error) => {
         reject();
       });
     })
   }
}
