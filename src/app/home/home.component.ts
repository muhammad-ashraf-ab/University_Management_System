import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { AuthenticationService } from '../authentication.service'
import { DummyFillerService } from '../dummy-filler.service'
import { DbAccessService, StudCourseData, CourseData, Semester, StudData, InstData, InstCourseData, CourseInstData} from '../db-access.service'
import { User } from '@angular/fire/auth'
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  courses: StudCourseData[] = [];
  recents: StudCourseData[] = [];
  student: boolean = true;
  instCourses: CourseInstData[] = [];

  displayedInstCoursesColumns: string[] = ['courseId', 'courseName', 'semester', 'noOfStudents'];
  dataSource = new MatTableDataSource(this.instCourses);

  constructor (
    private router: Router, 
    private route: ActivatedRoute, 
    private authService: AuthenticationService, 
    private dbService: DbAccessService,
    private dfService: DummyFillerService,
    private cdr: ChangeDetectorRef
    ){
    
  }

  ngOnInit(): void {
    
    // this.authService.loggedIn().subscribe(logState => {

    // })
    console.log("Home Init")
    if(this.authService.currUser() !== null){

      if(this.dfService.isInst(this.authService.currUser().email)){
        //Instructor!
        // this.dfService.dummyInstFillCurrent()
        // this.dfService.dummyInstCourseFillCurrent()
        this.student = false;
        this.dbService.fetchCurrInstCoursesDetailed().subscribe((courseList) =>{
          console.log("Course List")
          console.log(courseList)
          for (const course of courseList) {
            const courseInstDataList = this.mapCourseDataToCourseInstData(course);
            this.instCourses.push(...courseInstDataList);
          }
          this.dataSource = new MatTableDataSource(this.instCourses);
          this.cdr.detectChanges();
        })
      }else{
        //Student!
        // this.dfService.dummyStudFillCurrent()
        // this.dfService.dummyStudCourseFillCurrent()
        this.dbService.fetchUnregisteredCourses()
        this.student = true;
      }
      this.getMyCourses()
      // this.dfService.dummyCourseFillTwo()
    } else {
      //not a user, route
      this.router.navigate(['login'])
    }
  }

  // Universal Role function
  getMyCourses(){
    if(this.dfService.isInst(this.authService.currUser().email)){
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
        this.recents = courses
      },
      (error) =>{
        console.log(error)
      })
    }
    
  }

  gotoCourse(cid: string){
    this.router.navigate(['course', cid])
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
    }
  }

  mapCourseDataToCourseInstData(courseData: CourseData): CourseInstData[] {
    const courseInstDataList: CourseInstData[] = [];
    const semesters = courseData.getSems();
    for (const semester of semesters) {
      const courseInstData: CourseInstData = new CourseInstData(
        courseData.getCid(),
        courseData.getCname(),
        semester.name,
        semester.noOfStudents
      );
      courseInstDataList.push(courseInstData);
    }
    return courseInstDataList;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}

