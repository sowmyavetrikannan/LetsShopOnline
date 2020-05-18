import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AskUsPageRoutingModule } from './ask-us-routing.module';

import { AskUsPage } from './ask-us.page';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AskUsPageRoutingModule
  ],
  providers: [Camera],
  declarations: [AskUsPage]
})
export class AskUsPageModule {}
