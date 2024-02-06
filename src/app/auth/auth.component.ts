import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'auth-login',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  loginForm: FormGroup;
  isSignUpForm: boolean = true;
  isSignedIn = true;
  constructor(private firebaseService: FirebaseService, private router: Router) {
    this.loginForm = new FormGroup({
      name: new FormControl('',[Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }
  onNewUser() {
    this.isSignedIn = false;
    this.loginForm.reset();
  }
  ngOnInit(): void {
    if (localStorage.getItem('user') == null) this.isSignedIn = true;
    else this.isSignedIn = false;
  }

  async onSignup(email: string, password: string, name: string) {
    await this.firebaseService.signup(email, password);
    if (this.firebaseService.isLoggedIn) {
      const user = JSON.parse(localStorage.getItem('user'));
      const userId = user.uid;
      await this.firebaseService.storeUserInfo(userId, name, email);
      this.isSignedIn = true;
    }
  }

  async onSignin(email: string, password: string) {
    await this.firebaseService.signin(email, password);
    if (this.firebaseService.isLoggedIn) this.isSignedIn = false;
    this.loginForm.reset();
    this.router.navigate(['/home']);
  }

  handleLogout() {
    this.isSignedIn = false;
    this.router.navigate(['/auth-login']);
  }
  toggleForm() {
    this.isSignedIn = !this.isSignedIn;
    this.loginForm.reset();
  }

}