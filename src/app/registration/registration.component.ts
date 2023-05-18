import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { CourseData, DbAccessService, StudCourseData } from '../db-access.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit{

  private unRegCourses: CourseData[] = []
  private regCourses: StudCourseData[] = []
  constructor(
    private authService: AuthenticationService,
    private dbService: DbAccessService,
    
  ){}
  ngOnInit(): void {
    this.dbService.fetchUnregisteredCourses()
    .subscribe((courses) =>{
      this.unRegCourses = courses
    })
    this.dbService.fetchCurrStudentCourses()
    .subscribe((courses) =>{
      this.regCourses = courses
    })
  }

}
