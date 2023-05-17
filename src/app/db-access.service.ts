import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service'

const dbLink = "https://cse379-project-ums-default-rtdb.europe-west1.firebasedatabase.app"

@Injectable({
  providedIn: 'root'
})
export class DbAccessService {

  private userID = 0
  private loggedState = false

  constructor(private authService: AuthenticationService) { 
    this.authService.loggedIn().subscribe((loggedState) =>{
      this.loggedState = loggedState
    })
  }

  fetchStudents(){
  //   console.log('AAAAAA')
  //   let data = [
  //     new User('Adel', 'ed.gaia@ymail.com', '123321'),
  //     new User('Muhammad', 'modogogo2000@gmail.com', '123321')
  //   ]
  //   this.httpClient.post(dbLink + "/users.json", data).subscribe(event =>{
  //     console.log(event)
  //   })
  //   console.log('I requested :(')
  }
}
