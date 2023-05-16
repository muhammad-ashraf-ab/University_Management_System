import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { Subject, Observable } from 'rxjs';


const dbLink = "https://cse379-project-ums-default-rtdb.europe-west1.firebasedatabase.app"

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  
  private userLogState = new Subject<boolean>()
  constructor(private router: Router, private httpClient: HttpClient) {
    this.initServ()
  }



  initServ(){
    // console.log('AAAAAA')
    // let data = [
    //   new User('Adel', 'ed.gaia@ymail.com', '123321'),
    //   new User('Muhammad', 'modogogo2000@gmail.com', '123321')
    // ]
    // this.httpClient.post(dbLink + "/users.json", data).subscribe(event =>{
    //   console.log(event)
    // })
    // console.log('I requested :(')
  }
  // Dummy holder function till we make login through firebase!
  checkAuthUser(email: String, pass: String){

    if(email == "123" && pass == "321"){
      this.userLogState.next(true)
    }else{
      this.userLogState.next(false)
    }
  }
  // basically, this service will contact firebase to make sure the login auth is correct and give you a go do you!

  loggedIn(): Observable<boolean>{
    return this.userLogState
  }
}

class User{
  constructor(private name: String, private email: String, private pass: String){}
}













