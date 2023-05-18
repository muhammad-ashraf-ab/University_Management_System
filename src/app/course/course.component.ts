import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { DbAccessService, StudCourseData } from '../db-access.service';
import { DummyFillerService } from '../dummy-filler.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit{
  course: StudCourseData | null = null
  grade: string = ""
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

    this.dbService.fetchCourse(this.cid).subscribe((course) =>{
      this.course = course!
      console.log(this.course)
    })
  }


  //post the grade of a student as an inst
  postGrade(){
    if (this.dfService.isInst(this.authService.currUser().email)){
      let myGrade: string = 'A+' // the variable that takes the grade
      let studId: string = 'dummyStudId'
      let courseId: string = 'CSE379'
      this.dbService.editGrade(studId, courseId, myGrade)
    }else{
      //prohibited!
      // proof of concept for post request:
      // let myGrade: string = 'A+' // the variable that takes the grade
      let myGrade = this.grade
      let studId: string = this.authService.currUser().uid
      let courseId: string = this.cid
      this.dbService.editGrade(studId, courseId, myGrade)
    }
  }
  
}
