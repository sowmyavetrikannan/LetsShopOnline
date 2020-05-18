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

  sendQuery(query, image, voiceNote) {
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
      firebase.firestore().collection('queries').add({
        id : currentUser.uid,
        query: query,
        image : image,
        voiceNote : voiceNote,
        resolved: false,
        dateTime : new Date().toString()
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
        res => {
          // Declare an array which we'll use to store retrieved documents
          let obj : any = [];


          // Iterate through each document, retrieve the values for each field
          // and then assign these to a key in an object that is pushed into the 
          // obj array
          res.forEach((doc : any) => 
          {
              obj.push({
                id : doc.id,
                title : doc.data().title,
                image : doc.data().image
              });
          });
          
          resolve(obj);
        },
        err => reject(err)
      )
    })
  }
}
