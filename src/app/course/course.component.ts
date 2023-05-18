import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { CourseData, CourseStudData, DbAccessService, StudCourseData } from '../db-access.service';
import { DummyFillerService } from '../dummy-filler.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit{
  course: StudCourseData | CourseData | null = null
  grade: string = ""
  inputGrade: string = '';
  student: boolean = true;
  editGrade: boolean = false;

  courseStudents: CourseStudData[] = [];

  displayedInstCoursesColumns: string[] = ['studentId', 'studentName', 'grade', 'edit'];
  dataSource = new MatTableDataSource(this.courseStudents);

  constructor(
    private authService: AuthenticationService,
    private dbService: DbAccessService,
    private dfService: DummyFillerService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef
  ){}


  private cid: string = this.route.snapshot.params['cid']
  
  ngOnInit(): void{
    console.log(this.cid)
    console.log("I'm a course")

    if(this.authService.currUser() !== null){

      if(this.dfService.isInst(this.authService.currUser().email)){
        //Instructor!
        this.student = false;
        this.dbService.fetchCourseInst(this.cid).subscribe((course) =>{
          this.course = course!
          this.courseStudents = course!.getSems()[0].studentList;
          this.dataSource = new MatTableDataSource(this.courseStudents);
          this.cdr.detectChanges();
          console.log(this.dataSource);
        })
      }else{
        //User!
        this.student = true;
        this.dbService.fetchCourse(this.cid).subscribe((course) =>{
          this.course = course!
          console.log(this.course)
          this.grade = course!.getGrade();
        })
      }
    } else {
      //not a user, route
      this.router.navigate(['login'])
    }

  }


  //post the grade of a student as an inst
  postGrade(myGrade: string = 'A+', 
            studId: string = 'dummyStudId',
            courseId: string = 'CSE379'){
    if (this.dfService.isInst(this.authService.currUser().email)){
      this.dbService.editGrade(studId, courseId, myGrade)
      this.inputGrade = '';
    }else{
      //prohibited!
      // proof of concept for post request:
      // let myGrade: string = 'A+' // the variable that takes the grade
      myGrade = this.inputGrade
      studId = this.authService.currUser().uid
      courseId = this.cid
      this.dbService.editGrade(studId, courseId, myGrade)
      this.grade = myGrade;
      this.inputGrade = '';
    }
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
