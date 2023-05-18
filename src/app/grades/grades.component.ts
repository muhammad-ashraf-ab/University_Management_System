import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { DbAccessService, StudCourseData } from '../db-access.service';
import { DummyFillerService } from '../dummy-filler.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-grades',
  templateUrl: './grades.component.html',
  styleUrls: ['./grades.component.scss']
})
export class GradesComponent implements OnInit {

  courses: StudCourseData[] = [];

  displayedCoursesColumns: string[] = ['courseId', 'courseName', 'semester', 'grade'];
  dataSource = this.courses;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthenticationService,
    private dbService: DbAccessService,
    private dfService: DummyFillerService,
    private cdr: ChangeDetectorRef
  ) {

  }

  ngOnInit(): void {
    this.dbService.fetchCurrStudentCourses().subscribe((courseList) => {
      console.log("Course List")
      console.log(courseList)
      this.courses = courseList;
      this.dataSource = this.courses;
      this.cdr.detectChanges();
      console.log("Hi")
      console.log(this.dataSource)
    })
  }
}
