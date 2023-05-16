import { Injectable, OnInit } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { CanActivate, Router } from '@angular/router'


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements OnInit{

  userLogState = false

  constructor(private authService: AuthenticationService, private router: Router) { }


  ngOnInit(): void {
    this.authService.loggedIn().subscribe(logState => {
      this.userLogState = logState
      if(logState){
        this.router.navigate(['home'])
      }
    })
  }


  canActivate(): boolean{
    return this.userLogState
  }

}
