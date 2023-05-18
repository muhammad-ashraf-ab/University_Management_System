import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { CourseData, DbAccessService, StudCourseData } from '../db-access.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit{

  unregisteredCourses: CourseData[] = []
  displayedUnregisteredCoursesColumns: string[] = ['courseId', 'courseName', 'status', 'add'];
  unregisteredCoursesDataSource = this.unregisteredCourses;  
  
  registeredCourses: StudCourseData[] = [];
  displayedRegisteredCoursesColumns: string[] = ['courseId', 'courseName', 'status', 'addDrop'];
  registeredCoursesDataSource = this.registeredCourses;

  constructor(
    private authService: AuthenticationService,
    private dbService: DbAccessService,
    private cdr: ChangeDetectorRef,
    
  ){}
  ngOnInit(): void {
    this.dbService.fetchUnregisteredCourses()
    .subscribe((courses) =>{
      this.unregisteredCourses = courses
      this.unregisteredCoursesDataSource = this.unregisteredCourses
      this.cdr.detectChanges()
      console.log("Unregistered courses: ", courses)
    })
    this.dbService.fetchCurrStudentCourses()
    .subscribe((courses) =>{
      this.registeredCourses = courses
      this.registeredCoursesDataSource = this.registeredCourses;
      this.cdr.detectChanges();
    })
  }

}
