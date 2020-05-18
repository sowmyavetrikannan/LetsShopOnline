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
    speed: 1000,
    autoplay: {
      disableOnInteraction: false
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
      // let obj : any = [];


      // // Iterate through each document, retrieve the values for each field
      // // and then assign these to a key in an object that is pushed into the 
      // // obj array
      // data.forEach((doc : any) => 
      // {
      //     obj.push({
      //       id : doc.id,
      //       title : doc.data().title,
      //       image : doc.data().image
      //     });
      // });
      this.categories = data;
      console.log(data);
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
      
      this.news = data;
      console.log(data);
      this.alertService.closeLoading();
    })
    .catch(error => {
      console.log(error);
    })
  }

  slidesDidLoad(slides: IonSlides) {
    slides.startAutoplay();
  }
}
