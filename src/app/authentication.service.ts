import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router'
import { Subject, Observable } from 'rxjs';

import { initializeApp } from 'firebase/app';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, Auth } from '@angular/fire/auth';
// const dbLink = "https://cse379-project-ums-default-rtdb.europe-west1.firebasedatabase.app"


@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  
  private userLogState = new Subject<boolean>()
  constructor(private router: Router, private httpClient: HttpClient, private firebaseAuth: Auth) {
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
  // Dummy holder function till we make login through firebase!
  checkAuthUser(email: string, pass: string){
    signInWithEmailAndPassword(this.firebaseAuth, email, pass)
    .then((userCredentials) =>{
      // Signed in!
      const user = userCredentials.user
      console.log(user)
      this.userLogState.next(true)
    })
    .catch((error) =>{
      const errorCode = error.code
      if(errorCode == 'auth/invalid-email'){
        console.log("No such email sir!")
      }else if(errorCode == 'auth/wrong-password'){
        console.log("Ya 7ramy yabnel kalb")
      }
      this.userLogState.next(false)
    })
  }
  // basically, this service will contact firebase to make sure the login auth is correct and give you a go do you!

  loggedIn(): Observable<boolean>{
    return this.userLogState
  }

  logout() {
    this.userLogState.next(false);
  }
}

class User{
  constructor(private name: string, private email: string, private pass: string, private perm: number){}
}













