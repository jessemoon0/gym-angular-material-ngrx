import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import { WelcomeComponent } from './welcome/welcome.component';
import {AuthGuard} from './auth/auth-guard.service';
import {LoginComponent} from './auth/login/login.component';
import {SignupComponent} from './auth/signup/signup.component';

const routes: Routes = [
  {
    path: 'training',
    loadChildren: './training/training.module#TrainingModule',
    canLoad: [AuthGuard]
  },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent},
  { path: '', component: WelcomeComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
