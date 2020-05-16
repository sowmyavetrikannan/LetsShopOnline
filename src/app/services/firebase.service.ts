import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { environment } from '../../environments/environment';

firebase.initializeApp(environment.firebase)

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  unsubscribeOnLogOut() {
    throw new Error("Method not implemented.");
  }

  constructor(

  ) { }

  createTask(value){
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
      firebase.firestore().collection('people').doc(currentUser.uid).collection('tasks').add({
        title: value.title,
        description: value.description,
        image: value.image
      })
      .then(
        res => resolve(res),
        err => reject(err)
      )
    })
  }

  retrieveList(fromCollection){
    return new Promise<any>((resolve, reject) => {
      // let currentUser = firebase.auth().currentUser;
    
      firebase.firestore().collection(fromCollection).get().then(
        res => resolve(res),
        err => reject(err)
      )
    })
  }
}
