import { Component } from '@angular/core';
import { DefaultLoginLayoutComponent } from '../../components/default-login-layout/default-login-layout.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { ToastrService } from 'ngx-toastr';

interface LoginForm {
  email: FormControl,
  password: FormControl
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    DefaultLoginLayoutComponent,
    ReactiveFormsModule,
    PrimaryInputComponent
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm!: FormGroup<LoginForm>;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private toastService: ToastrService
  ){
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    })
  }

  submit() {
    this.loginService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe({
      next: () => {
        console.log('Login completed successfully');
      },
      error: (err) => {
        console.error('Login failed:', err);
        this.toastService.error("Invalid credentials! Please try again.");
      }
    });
  }
  
  
  private fetchUserId(name: string): void {
    this.loginService.getAllUsers().subscribe({
      next: (users: any[]) => {
        console.log('Fetched Users:', users); // Log da lista de usuários
        const user = users.find((u) => u.name === name);
        if (user && user.id) {
          sessionStorage.setItem('userId', user.id);
          console.log('User ID fetched and saved:', user.id); // Log do ID buscado
          this.router.navigate(['/dashboard']);
        } else {
          this.toastService.error('User ID not found. Please try again later.');
          console.error('User not found in the user list:', name);
        }
      },
      error: (err) => {
        console.error('Error fetching user ID:', err);
        this.toastService.error('Failed to retrieve user information.');
      }
    });
  }  

  navigate(){
    this.router.navigate(["signup"]);
  }
}