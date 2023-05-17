import { Injectable, OnInit } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { CanActivate, Router } from '@angular/router'


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService{

  userLogState = false

  constructor(private authService: AuthenticationService, private router: Router) {
    // console.log("I was constructed")
    this.authService.loggedIn().subscribe(logState => {
      this.userLogState = logState
      // console.log("Subscriber says " + logState)
      if(logState){
        this.router.navigate(['home'])
      }
    })
   }



  canActivate(): boolean{
    // console.log(this.userLogState)
    return this.userLogState
  }

}
