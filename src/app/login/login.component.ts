import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { AuthenticationService } from '../authentication.service';
import { MaterialModule } from '../material/material.module';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  loginForm = new FormGroup({
    emailFormControl: new FormControl('', [Validators.required, Validators.email]),
    passwordFormControl: new FormControl('', [Validators.required]),
  })
  
  constructor(private router: Router, private authService: AuthenticationService){
    
  }
  ngOnInit(): void {
    this.authService.loggedIn().subscribe(logState => {
      if(logState){
        this.router.navigate(['home'])
      } else {
        this.router.navigate(['login'])
      }
    })
  }

  authSubmit(){
    // take user
    // take pass
    // pass to service
    // where serivce?
    // email = 123@321.com
    // pass = 123321
    let userEmail = this.loginForm.value.emailFormControl;
    let userPass = this.loginForm.value.passwordFormControl;
    if(userEmail != '' && userPass != ''){
      this.authService.checkAuthUser(userEmail!, userPass!)
    }
    // this.router.navigate(['home'])
  }

}
