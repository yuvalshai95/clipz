import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  userCredentials = {
    email: '',
    password: '',
  };

  showAlert = false;
  alertMsg = 'Please wait! We are logging you in.';
  alertColor = 'blue';
  inSubmission = false;

  constructor(private auth: AngularFireAuth) {}

  ngOnInit(): void {}

  async handleLoginForm() {
    this.inSubmission = true;
    this.showAlert = true;
    this.alertMsg = 'Please wait! We are logging you in.';
    this.alertColor = 'blue';
    try {
      await this.auth.signInWithEmailAndPassword(
        this.userCredentials.email,
        this.userCredentials.password
      );
    } catch (err) {
      this.inSubmission = false;
      this.alertMsg = 'An unexpected error occurred. Please try again later';
      this.alertColor = 'rose';

      console.error(err);

      return;
    }
    this.alertMsg = 'Success! You are now logged in.';
    this.alertColor = 'emerald';
  }
}
