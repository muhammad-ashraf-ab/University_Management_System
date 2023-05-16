import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { AuthenticationService } from '../authentication.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  userEmail: string = '';
  userPass: string = '';
  
  constructor(private router: Router, private authService: AuthenticationService){
    
  }
  ngOnInit(): void {
    this.authService.loggedIn().subscribe(logState => {
      if(logState){
        this.router.navigate(['home'])
      }
    })
  }

  authSubmit(){
    // take user
    // take pass
    // pass to service
    // where serivce?
    // email = 123
    // pass = 321
    if(this.userEmail != '' && this.userPass != ''){
      // console.log(this.userEmail + "/" + this.userPass)
      this.authService.checkAuthUser(this.userEmail, this.userPass)
    }
    this.router.navigate(['home'])
  }

}
