import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';
import { AlertServiceService } from '../services/alert-service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['../app.component.scss', './forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  email: string = '';
  password: string = '';
  error: string = '';
  // username: string = '';
  // image: number;
  constructor(
    private authService: AuthServiceService,
    private alertService: AlertServiceService,
    private router: Router, 
    
  ) { }

  recover() {
    this.authService.recoverPassword(this.email).then(data => {
      console.log(data);
        this.alertService.presentToast('Password reset email is sent to ' + this.email, true, 'bottom');
        this.router.navigateByUrl('/login');
    })
    .catch(error => {
      console.log(` failed ${error}`);
      this.error = error.message;
    })


    // this.fireauth.auth.sendPasswordResetEmail(this.email)
    //   .then(data => {
    //     console.log(data);
    //     this.alertService.presentToast('Password reset email sent', false, 'bottom', 1000);
    //     this.router.navigateByUrl('/login');
    //   })
    //   .catch(err => {
    //     console.log(` failed ${err}`);
    //     this.error = err.message;
    //   });
  }

  ngOnInit() {
  }

}
