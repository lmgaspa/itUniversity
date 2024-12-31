import { Component } from '@angular/core';
import { DefaultLoginLayoutComponent } from '../../components/default-login-layout/default-login-layout.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { ToastrService } from 'ngx-toastr';

interface SignupForm {
  name: FormControl;
  email: FormControl;
  password: FormControl;
  passwordConfirm: FormControl;
}

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    DefaultLoginLayoutComponent,
    ReactiveFormsModule,
    PrimaryInputComponent
  ],
  providers: [
    LoginService
  ],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'] // Corrigido para 'styleUrls'
})
export class SignUpComponent {
  signupForm!: FormGroup<SignupForm>;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private toastService: ToastrService
  ) {
    this.signupForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      passwordConfirm: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  submit() {
    this.loginService.signup(
      this.signupForm.value.name,
      this.signupForm.value.email,
      this.signupForm.value.password
    ).subscribe({
      next: (response: any) => {
        console.log('Signup Response:', response); // Log da resposta completa do signup
  
        const userId = response.userId || response.id;
  
        if (!userId) {
          console.warn('User ID not found in the response. Fetching from the user list...');
          this.loginService.getUserIdByName(response.name).subscribe({
            next: (fetchedUserId: string) => {
              if (fetchedUserId) {
                sessionStorage.setItem('userId', fetchedUserId);
                sessionStorage.setItem('auth-token', response.token);
                sessionStorage.setItem('name', response.name);
  
                console.log('User ID fetched and saved:', fetchedUserId);
                this.toastService.success("Register successful!");
                this.router.navigate(['/dashboard']); // Redireciona após salvar o ID
              } else {
                console.error('Failed to fetch user ID.');
                this.toastService.error('Failed to fetch user information. Please try again.');
              }
            },
            error: (err) => {
              console.error('Error fetching user ID:', err);
              this.toastService.error('Failed to fetch user information. Please try again.');
            },
          });
        } else {
          // Se o ID já existir, salva diretamente e redireciona
          sessionStorage.setItem('userId', userId);
          sessionStorage.setItem('auth-token', response.token);
          sessionStorage.setItem('name', response.name);
  
          console.log('User ID saved:', userId); // Log do ID salvo
          console.log('User Name saved:', response.name); // Log do nome salvo
  
          this.toastService.success("Register successful!");
          this.router.navigate(['/dashboard']);
        }
      },
      error: (err) => {
        console.error('Signup failed:', err);
        this.toastService.error("Unexpected error! Please try again later.");
      }
    });
  }  

  navigate() {
    this.router.navigate(['login']);
  }
}
