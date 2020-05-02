import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AuthServiceService } from '../services/auth-service.service';
import { AlertServiceService } from '../services/alert-service.service';

import { IonicModule } from '@ionic/angular';

import { ForgotPasswordPageRoutingModule } from './forgot-password-routing.module';

import { ForgotPasswordPage } from './forgot-password.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ForgotPasswordPageRoutingModule
  ],
  providers: [AuthServiceService, AlertServiceService],
  declarations: [ForgotPasswordPage]
})
export class ForgotPasswordPageModule {}
