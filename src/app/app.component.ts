import { Component } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { Router } from '@angular/router';
import { AuthGuardService } from './auth-guard.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  username: string = '';
  userId: string = '';

  constructor(private authService: AuthenticationService, private authGuardService: AuthGuardService, protected router: Router){
    authService.loggedIn().subscribe((loggedIn)=>{
      if (loggedIn) {
        // Make it get the username & userId
        this.username = "Ahmed Mohamed Mahmoud Mostafa";
        this.userId = "18P****"
      }
    })
  }

  opened = false;
  student = true;
  
  logout() {
    this.authService.logout();
  }
}
