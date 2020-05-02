import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';
import { AlertServiceService } from '../services/alert-service.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['../app.component.scss','./register.page.scss'],
})
export class RegisterPage implements OnInit {

  email: string = '';
  password: string = '';
  error: string = '';
  username: string = '';
  image: number;


  // registerForm: FormGroup;
  // account_validation_messages: any;

  constructor(
    private fireauth: AngularFireAuth,
    private authService: AuthServiceService,
    private alertService: AlertServiceService,
    private router: Router
  ){ 
   

    // this.registerForm = new FormGroup({ 
    //     name: new FormControl('', Validators.compose([
    //       Validators.minLength(3),
    //       Validators.maxLength(25),
    //       Validators.required,
    //     ])),
    //     email: new FormControl('', Validators.compose([
    //       Validators.required,
    //       Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    //       )
    //     ])),
    //     password: new FormControl('', Validators.compose([
    //       Validators.minLength(8),
    //       Validators.maxLength(16),
    //       Validators.required,
    //   ])),
    //   confirmPassword: new FormControl('', Validators.compose([
    //       Validators.required,
    //   ])),
    // }),

    // /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/
    // (?=.*[a-zA-Z >>!#$%&? "<<])[a-zA-Z0-9 >>!#$%&?<< ]
    // /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,20}$/

    
    // this.account_validation_messages = {
    //   'name': [
    //     { type: 'required', message: 'Name is required' },
    //     { type: 'minlength', message: 'Name must be at least 3 characters long' },
    //     { type: 'maxlength', message: 'Name cannot be more than 25 characters long' }
    //   ],
    //   'email': [
    //     { type: 'required', message: 'Email is required' },
    //     { type: 'pattern', message: 'Enter a valid email' }
    //   ],
    //   'confirmPassword': [
    //     { type: 'required', message: 'Confirm password is required.' },
    //     { type: 'areEqual', message: 'Password mismatch' }
    //   ],
    //   'password': [
    //     { type: 'required', message: 'Password is required' },
    //     { type: 'minlength', message: 'Password must be at least 8 characters long' },
    //     { type: 'maxlength', message: 'Username cannot be more than 16 characters long' },
    //   ],
    //   'terms': [
    //     { type: 'pattern', message: 'You must accept terms and conditions' }
    //   ]
    //   }
  }

  ngOnInit() {
  }

  signup() {
    this.alertService.openLoader();
    this.authService.doRegister(this.email, this.password).
      then(data => {
        if (data.user) {
          console.log(data.user);
          this.authService.sendEmailVerification();
          this.updateProfile();
        }
      })
      .catch(error => {
        this.alertService.closeLoading();
        console.log(`signup failed ${error}`);
        this.error = error.message;
      })
  }

  updateProfile() {
    this.fireauth.auth.onAuthStateChanged((user) => {
      if (user) {
        console.log(user);
        user.updateProfile({
          displayName: this.username,
          photoURL: `https://picsum.photos/id/${this.image}/200/200`
        })
          .then(() => {
            console.log(user);
            if(user.emailVerified) {
              this.router.navigateByUrl('/home');
            }
            else {
              this.alertService.presentToast('We will send an email to ' + this.email + '. Open it up to activate your account.', true, 'bottom');
              this.router.navigateByUrl('/login');
            }
            
          })
      }
    })



    // this.authService.updateProfile(this.username, this.image).
    // then(data => {
    //   this.alertService.closeLoading();
    //   console.log(data);
    //   this.router.navigateByUrl('/home');
    // })
    // .catch(error => {
    //   console.log(`login failed ${error}`);
    //   this.error = error.message;
    // })
  }
}
