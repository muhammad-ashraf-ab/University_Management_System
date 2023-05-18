import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { CourseComponent } from './course/course.component';
import { AuthGuardService } from './auth-guard.service';
import { GradesComponent } from './grades/grades.component';
import { RegistrationComponent } from './registration/registration.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent, title: 'UMS - Login'},
  {path: 'home', component: HomeComponent, title: 'UMS - Dashboard', canActivate: [AuthGuardService]},
  {path: 'course/:cid', component: CourseComponent, title: 'UMS - Course', canActivate: [AuthGuardService]},
  {path: 'grades', component: GradesComponent, title: 'UMS - Grades', canActivate: [AuthGuardService]},
  {path: 'registration', component: RegistrationComponent, title: 'UMS - Registration', canActivate: [AuthGuardService]},
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
