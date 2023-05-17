import { Injectable} from '@angular/core';
import { DbAccessService, CourseData, Semester, StudCourseData, InstCourseData} from './db-access.service'
import { AuthenticationService} from './authentication.service'
@Injectable({
  providedIn: 'root'
})
export class DummyFillerService {

  constructor(private dbService: DbAccessService, private authService: AuthenticationService) { }


  dummerRegisterInst(){
    this.authService.register('spirit@inst.edu.co.uk', '123321')
    this.authService.register('xeno@inst.edu.eg', '123321')
  }

  dummyInstFillCurrent(){
    this.dbService.putInstructor(this.authService.currUser())
  }

  dummyCourseFillTwo(){

    let course = new CourseData()
    let sem = new Semester()
    course.addSems([sem])
    let stu1 = "studentId1"
    let stu2 = "studentId2"
    let stuL = [stu1, stu2]
    sem.addSL(stuL)
    this.dbService.putCourse(course)
  }

  dummyStudFillCurrent(){
    this.dbService.putStudent(this.authService.currUser())
  }

  dummyStudCourseFillCurrent(){
    const addedCourses: StudCourseData[] = [
      new StudCourseData('CSE311', 'A', 'Fall 2021', 'Course A'), 
      new StudCourseData('CSE111', 'B', 'Spring 2022', 'Logic Design'), 
      new StudCourseData('ASU101', 'C', 'Summer 2020', 'Course C'),
      new StudCourseData('CSE379', 'A', 'Spring 2023', 'Human Computer Interaction'), 
      new StudCourseData('ASU112', 'B', 'Summer 2022', 'Report Writing & Communication skills'), 
      new StudCourseData('ASU113', 'C', 'Fall 2021', 'Professional Ethics and Legislation'),
      new StudCourseData('ASU114', 'B', 'Summer 2018', 'Selected Topics in Contemporary Issues'), 
      new StudCourseData('CSE341', 'C', 'Summer 2021', 'Course D'),
    ]

    this.dbService.addCourses(this.authService.currUser(), addedCourses)
  }

  isInst(email: string | null | undefined){
    const instPart = 'inst.edu'
    let afterAt = email!.split('@')[1]
    return afterAt.includes(instPart)
  }

  dummyInstCourseFillCurrent(){
    let courseList: InstCourseData[] = []

    courseList.push(new InstCourseData('CSE311', 'Course A'), new InstCourseData('CSE111', 'Course B'), new InstCourseData('ASU101', 'Course C'))
    this.dbService.addCourseToInstCurr(courseList)
  }
}
