import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class AlertServiceService {

  constructor(
    private alertController: AlertController,
    private toastController: ToastController, 
    public loadingController: LoadingController,
  ) { }

  //Presenting Alert Messages
  async presentAlert(message) {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

  //Presenting Loaders
  async openLoader() {
    const loading = await this.loadingController.create({
      message: 'Please Wait ...',
      duration: 2000
    });
    await loading.present();
  }
  async closeLoading() {
    return await this.loadingController.dismiss();
  }

  //For presenting Toast Messages
  async presentToast(message, show_button, position, duration?) {
    const toast = await this.toastController.create({
      message: message,
      showCloseButton: show_button,
      position: position,
      duration: duration
    });
    toast.present();
  }

}
