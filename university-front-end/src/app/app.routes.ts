import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/signup/signup.component';
import { DashboardComponent } from './pages/dashboard/dashboardcomponent';
import { AuthGuard } from './services/auth-guard.service';

export const routes: Routes = [
    {
        path: "",
        component: LoginComponent
    },
    {
        path: "login",
        component: LoginComponent
    },
    {
        path: "signup",
        component: SignUpComponent
    },
    {
        path: "dashboard",
        component: DashboardComponent,
        canActivate: [AuthGuard]
    }
];
