import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router'
import { Subject, Observable } from 'rxjs';
// import { CookieService } from '@angular/platform-browser'

import { initializeApp } from 'firebase/app';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, Auth, User } from '@angular/fire/auth';
// const dbLink = "https://cse379-project-ums-default-rtdb.europe-west1.firebasedatabase.app"


@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  
  private currFullUser: User | null = null
  private userLogState = new Subject<boolean>()

  constructor(
    private router: Router, 
    private httpClient: HttpClient, 
    private firebaseAuth: Auth,
    // private cookieService: CookieService,
    ) {
    console.log("Authentication Created!")
    this.initServ()
  }

  initServ(){
    // createUserWithEmailAndPassword(this.firebaseAuth, 'ed.gaia@ymail.com', '123321').then((userCredential) =>{
    //   const user = userCredential.user
    // })
    // .catch((error) =>{
    //   const errorCode = error.code
    //   const errorMessage = error.message
    //   console.log(errorCode)
    //   console.log(errorMessage)
    // })

  }
  
  register(email: string, pass: string){
    createUserWithEmailAndPassword(this.firebaseAuth, email, pass).then((userCredential) =>{
      const user = userCredential.user
    })
    .catch((error) =>{
      const errorCode = error.code
      const errorMessage = error.message
      console.log(errorCode)
      console.log(errorMessage)
    })
  }

  checkAuthUser(email: string, pass: string){
    signInWithEmailAndPassword(this.firebaseAuth, email, pass)
    .then((userCredentials) =>{
      // Signed in!
      this.currFullUser = userCredentials.user
      // console.log(user)
  
      this.userLogState.next(true)
      
    })
    .catch((error) =>{
      const errorCode = error.code
      if(errorCode == 'auth/invalid-email'){
        console.log("Email is literally wrong dude..")
      }else if(errorCode == 'auth/wrong-password'){
        console.log("Ya 7ramy yabnel kalb")
      }else if(errorCode == 'auth/user-not-found'){
        console.log('User isn\'t registered sadly :(')
      }
      this.userLogState.next(false)
      this.currFullUser = {} as User
    })
  }
  // basically, this service will contact firebase to make sure the login auth is correct and give you a go do you!

  loggedIn(): Observable<boolean>{
    return this.userLogState
  }

  currUser(): User{
    // console.log("Someone asked for my user!: ", this.currFullUser)
    return this.currFullUser!
  }

  logout(): boolean {
    this.userLogState.next(false);
    this.currFullUser = null;
    return true
  }

}

// class User{
//   constructor(private name: string, private email: string, private pass: string, private perm: number){}
// }













