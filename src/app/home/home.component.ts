import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { AuthenticationService } from '../authentication.service'
import { DummyFillerService } from '../dummy-filler.service'
import { DbAccessService, StudCourseData, CourseData, Semester, StudData, InstData} from '../db-access.service'
import { User } from '@angular/fire/auth'


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  courses: StudCourseData[] = []
  recents: StudCourseData[] = []

  private currUser: User
  constructor (
    private router: Router, 
    private route: ActivatedRoute, 
    private authService: AuthenticationService, 
    private dbService: DbAccessService,
    private dfService: DummyFillerService
    ){
    this.currUser = this.authService.currUser()

  }


  ngOnInit(): void {
    // this.authService.loggedIn().subscribe(logState => {

    // })
    if(this.currUser.email !== null){

      if(this.dfService.isInst(this.currUser.email)){
        //Instructor!
        // this.dfService.dummyInstFillCurrent()
        // this.dfService.dummyInstCourseFillCurrent()
        this.dbService.fetchCurrInstCoursesDetailed().subscribe((courseList) =>{
          console.log(courseList)
        })
      }else{
        //User!
        // this.dfService.dummyStudFillCurrent()
        // this.dfService.dummyStudCourseFillCurrent()

      }
      this.getMyCourses()
      // this.dfService.dummyCourseFillTwo()
    }else{
      //not a user, route
      this.router.navigate(['login'])
    }
  }

  // Universal Role function
  getMyCourses(){
    if(this.dfService.isInst(this.currUser.email)){
      this.dbService.fetchCurrInstCourses().subscribe((courses) =>{
        console.log(courses)
      },
      (error) =>{
        console.log(error)
      })
    }else{
      this.dbService.fetchCurrStudentCourses().subscribe((courses) =>{
        // console.log(courses)
        this.courses = courses
      },
      (error) =>{
        console.log(error)
      })
    }
    
  }

}

