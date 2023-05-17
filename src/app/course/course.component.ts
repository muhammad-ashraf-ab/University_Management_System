import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { DbAccessService } from '../db-access.service';
import { DummyFillerService } from '../dummy-filler.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit{
  
  constructor(
    private authService: AuthenticationService,
    private dbService: DbAccessService,
    private dfService: DummyFillerService,
    private route: ActivatedRoute,
    private router: Router,
  ){}


  private cid: string = this.route.snapshot.params['cid']
  
  ngOnInit(): void{
    console.log(this.cid)
    console.log("I'm a course")
  }

}
