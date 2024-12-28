import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FontAwesomeModule],
})
export class SignUpComponent {
  registerForm: FormGroup;
  showPassword: boolean = false;
  faEye = faEye;
  faEyeSlash = faEyeSlash;

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const { fullName, email, password, confirmPassword } = this.registerForm.value;
      console.log('Full Name:', fullName, 'Email:', email, 'Password:', password, 'Confirm Password:', confirmPassword);
    }
  }
}
