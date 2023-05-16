import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { AuthenticationService } from '../authentication.service'


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  constructor (private router: Router, private route: ActivatedRoute, private authService: AuthenticationService){}


  ngOnInit(): void {
    // this.authService.loggedIn().subscribe(logState => {

    // })
  }



}
