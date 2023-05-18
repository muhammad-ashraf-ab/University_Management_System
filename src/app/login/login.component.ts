import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { AuthenticationService } from '../authentication.service';
import { DbAccessService } from '../db-access.service';
import { DummyFillerService } from '../dummy-filler.service'
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
  loginErrorCode: string = ''
  constructor(
    private router: Router, 
    private authService: AuthenticationService, 
    private dbService: DbAccessService,
    private dfService: DummyFillerService,
    ){
    
  }
  ngOnInit(): void {
    this.loginErrorCode = ''
    if(this.authService.currUser() !== null){
      this.router.navigate(['home'])
    }
    this.authService.loggedIn().subscribe(logState => {
      if(logState){
        this.router.navigate(['home'])
      } else {
        this.router.navigate(['login'])
      }
    })

    // this.dbService.putStudents()
    this.dbService.fetchStudents()
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
      .subscribe((errorCode) =>{
        this.loginErrorCode = errorCode
      })
    }
    // this.router.navigate(['home'])
  }

}
