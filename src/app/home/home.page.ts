import { Component } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { FirebaseService } from '../services/firebase.service';
import { AlertServiceService } from '../services/alert-service.service';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  slideOptions = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay: {
      disableOnInteraction: true
    }
  };

  noOfItems: any;
  public categories: any = [];
  public news: any = [];

  constructor( 
    public firebaseService: FirebaseService,
    private alertService: AlertServiceService
  ){
    this.alertService.openLoader();
    this.retrieveCategories();
    this.retrieveNews();
  }

  retrieveCategories() {
    this.firebaseService.retrieveList("Categories").
    then(data => {
      // Declare an array which we'll use to store retrieved documents
      let obj : any = [];


      // Iterate through each document, retrieve the values for each field
      // and then assign these to a key in an object that is pushed into the 
      // obj array
      data.forEach((doc : any) => 
      {
          obj.push({
            id : doc.id,
            title : doc.data().title,
            image : doc.data().image
          });
      });
      this.categories = obj;
      console.log(obj);
      this.alertService.closeLoading();
    })
    .catch(error => {
      console.log(error);
    })
  }
  retrieveNews() {
    this.alertService.openLoader();
    this.firebaseService.retrieveList("news").
    then(data => {
      // Declare an array which we'll use to store retrieved documents
      let obj : any = [];


      // Iterate through each document, retrieve the values for each field
      // and then assign these to a key in an object that is pushed into the 
      // obj array
      data.forEach((doc : any) => 
      {
          obj.push({
            id : doc.id,
            title : doc.data().title,
            description : doc.data().description,
            image : doc.data().image
          });
      });
      this.news = obj;
      console.log(obj);
      this.alertService.closeLoading();
    })
    .catch(error => {
      console.log(error);
    })
  }

  slidesDidLoad(slides: IonSlides) {
    slides.startAutoplay();
  }

  // add(name: string, email: string) {
  //     return firebase.firestore().collection('contacts').doc(email).set({name, email});
    

  // }
  // get() {
    
  //   return firebase.firestore().collection('contacts').get();
  // }
  
   

}
