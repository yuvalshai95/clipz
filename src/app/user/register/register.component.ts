import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { RegisterValidators } from '../validators/register-validators';
import { EmailTaken } from '../validators/email-taken';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  constructor(
    private auth: AuthService,
    private emailTakenValidator: EmailTaken
  ) {}

  isFormInSubmission = false;
  name = new FormControl('', [Validators.required, Validators.minLength(3)]);
  email = new FormControl(
    '',
    [Validators.required, Validators.email],
    [this.emailTakenValidator.validate]
  );
  age = new FormControl('', [
    Validators.required,
    Validators.min(18),
    Validators.max(120),
  ]);
  /* 
  - at least 8 characters
  - must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number
  - Can contain special characters  
  */
  password = new FormControl('', [
    Validators.required,
    Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm),
  ]);
  confirm_password = new FormControl('', [Validators.required]);
  phoneNumber = new FormControl('', [
    Validators.required,
    Validators.minLength(12),
    Validators.maxLength(12),
  ]);

  // FormGroup with passwords validator from our service
  registerForm = new FormGroup(
    {
      name: this.name,
      email: this.email,
      age: this.age,
      password: this.password,
      confirm_password: this.confirm_password,
      phoneNumber: this.phoneNumber,
    },
    [RegisterValidators.match('password', 'confirm_password')]
  );
  showAlert = false;
  alertMsg = 'Please wait! Your account is being created';
  alertColor = 'blue';

  async handleRegisterForm() {
    this.isFormInSubmission = true;
    this.showAlert = true;
    this.alertMsg = 'Please wait! Your account is being created';
    this.alertColor = 'blue';

    try {
      await this.auth.createUser(this.registerForm.value);
    } catch (err) {
      console.error(err);
      this.alertMsg = 'An unexpected error occurred. Please try again later';
      this.alertColor = 'rose';
      this.isFormInSubmission = false;
      return;
    }
    this.alertMsg = 'Success! Your Account has been created';
    this.alertColor = 'emerald';
  }
}
