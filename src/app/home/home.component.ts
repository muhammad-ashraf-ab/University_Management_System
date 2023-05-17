import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { AuthenticationService } from '../authentication.service'
import { DbAccessService, studentCourseData, courseData, semester, studentData, instructorData} from '../db-access.service'
import { User } from '@angular/fire/auth'


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  private currUser: User
  constructor (private router: Router, private route: ActivatedRoute, private authService: AuthenticationService, private dbService: DbAccessService){
    this.currUser = this.authService.currUser()

  }


  ngOnInit(): void {
    // this.authService.loggedIn().subscribe(logState => {

    // })
    if(JSON.stringify(this.currUser) != JSON.stringify({})){

      if(this.currUser.email == '123@321.com'){
        //////////////////////////////////////////////////////    INSTRUC    //////////////////////////////////////////////////////

        this.dbService.putInstructor(this.authService.currUser())

        let course = new courseData()
        let sem = new semester()
        course.addSems([sem])
        let stu1 = "studentId1"
        let stu2 = "studentId2"
        let stuL = [stu1, stu2]
        sem.addSL(stuL)
        this.dbService.putCourse(course)

        //////////////////////////////////////////////////////    INSTRUC    //////////////////////////////////////////////////////

      }else{
        //////////////////////////////////////////////////////    STUDENT    //////////////////////////////////////////////////////

        this.dbService.putStudent(this.authService.currUser())

        const addedCourses: studentCourseData[] = [
          new studentCourseData('CSE311', 'A', 'Fall 2021', 'Course A'), 
          new studentCourseData('CSE111', 'B', 'Spring 2022', 'Course B'), 
          new studentCourseData('ASU101', 'C', 'Summer 2020', 'Course C')
        ]

        this.dbService.addCourses(this.authService.currUser(), addedCourses)

        //////////////////////////////////////////////////////    STUDENT    //////////////////////////////////////////////////////
      }
    }
  }



}

