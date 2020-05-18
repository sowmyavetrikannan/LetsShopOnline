import { Component, OnInit } from '@angular/core';
import { AlertServiceService } from '../services/alert-service.service';
import { FirebaseService } from '../services/firebase.service';
import { Router } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-ask-us',
  templateUrl: './ask-us.page.html',
  styleUrls: ['./ask-us.page.scss'],
})
export class AskUsPage implements OnInit {
  query: string = '';
  error: string = '';
  base64ImageFromCamera: string = '';
  voiceNote: string = '';

  constructor(
    private alertService: AlertServiceService,
    public firebaseService: FirebaseService,
    private camera: Camera
  ) { 
    
  }

  takePicture(){
    this.camera.getPicture({
        destinationType: this.camera.DestinationType.DATA_URL,
        targetWidth: 1000,
        targetHeight: 1000
    }).then((imageData) => {
      // imageData is a base64 encoded string
        this.base64ImageFromCamera = "data:image/jpeg;base64," + imageData;
    }, (err) => {
        console.log(err);
    });
  }

  sendQuery() {
    this.alertService.openLoader();
    if(this.query != "") {
      this.firebaseService.sendQuery(this.query, this.base64ImageFromCamera, this.voiceNote).
      then(data => {
        this.alertService.closeLoading();
        this.alertService.presentToast('Your Query has been Registered. You will get a response within 24 hours..!', true, 'bottom');

      })
      .catch(error => {
        this.alertService.closeLoading();
        console.log(`login failed ${error}`);
        this.error = error.message;
      })
    }
    else {
      this.alertService.closeLoading();
      this.error = "Please fill out the fields...!"
    }
  }

  ngOnInit() {
  }

}
