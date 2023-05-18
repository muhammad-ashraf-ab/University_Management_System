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
      console.log("Subscriber says " + logState)
    })
   }



  canActivate(): boolean{
    // console.log(this.userLogState)
    if(this.authService.currUser() !== null){
      // console.log("AAAA", this.authService.currUser().email)
      return true
    }else{
      // this.router.navigate(['login'])
      console.log('Malek4 7a2')
      return false
    }
    // return this.userLogState
  }

}
