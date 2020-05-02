import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AuthServiceService } from '../services/auth-service.service';
import { AlertServiceService } from '../services/alert-service.service';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    LoginPageRoutingModule
  ],
  providers: [AuthServiceService, AlertServiceService],
  declarations: [LoginPage]
})
export class LoginPageModule {

  constructor(
  ) { }
}
