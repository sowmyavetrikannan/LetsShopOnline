import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';
import { AlertServiceService } from '../services/alert-service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['../app.component.scss','./login.page.scss'],
})

export class LoginPage implements OnInit {
  email: string = '';
  password: string = '';
  error: string = '';

  constructor(
    private authService: AuthServiceService,
    private alertService: AlertServiceService,
    private router: Router
  ){ 
    // this.loginForm = new FormGroup({ 
    //   email: new FormControl('', Validators.compose([
    //     Validators.required,
    //     Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    //     )
    //   ])),
    //   password: new FormControl('', Validators.compose([
    //     // Validators.minLength(8),
    //     // Validators.maxLength(16),
    //     Validators.required,
    //  ])),
    // }),

    // /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/
    // (?=.*[a-zA-Z >>!#$%&? "<<])[a-zA-Z0-9 >>!#$%&?<< ]
    // /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,20}$/

    
    // this.account_validation_messages = {
      
    //   'email': [
    //     { type: 'required', message: 'Email is required' },
    //     { type: 'pattern', message: 'Enter a valid email' }
    //   ],
    //   'password': [
    //     { type: 'required', message: 'Password is required' },
    //   ],
    //   // 'terms': [
    //   //   { type: 'pattern', message: 'You must accept terms and conditions' }
    //   // ]
    //   }
  }

  ngOnInit() {
    
  }

  login() {
  this.alertService.openLoader();
  this.authService.doLogin(this.email, this.password).
    then(data => {
      this.alertService.closeLoading();
      if (data.user) {
        console.log(data.user);
        if(data.user.emailVerified) {
          this.router.navigateByUrl('/home');
        }
        else {
          this.alertService.presentToast('We sent an email to ' + data.user.email + '. Open it up to activate your account.', true, 'bottom');
        }
      }
    })
    .catch(error => {
      this.alertService.closeLoading();
      console.log(`login failed ${error}`);
      this.error = error.message;
    })
  }
}
