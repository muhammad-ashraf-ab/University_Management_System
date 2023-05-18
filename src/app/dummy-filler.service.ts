import { Injectable} from '@angular/core';
import { DbAccessService, CourseData, Semester, StudCourseData, InstCourseData, CourseStudData} from './db-access.service'
import { AuthenticationService} from './authentication.service'
@Injectable({
  providedIn: 'root'
})
export class DummyFillerService {

  constructor(private dbService: DbAccessService, private authService: AuthenticationService) { 
    // this.dummyCourseFillTwo()
  }


  dummerRegisterInst(){
    this.authService.register('spirit@inst.edu.co.uk', '123321')
    this.authService.register('xeno@inst.edu.eg', '123321')
  }

  dummyInstFillCurrent(){
    this.dbService.putInstructor(this.authService.currUser())
  }

  dummyCourseFillTwo(){

    let course1 = new CourseData('CSE311', 'Course A') 
    let course2 = new CourseData('CSE111', 'Course B')
    let course3 = new CourseData('ASU101', 'Course C')
    
    let sem11 = new Semester('Fall 2019')
    let sem12 = new Semester('Fall 2020')
    let sem13 = new Semester('Fall 2021')
    let sem21 = new Semester('Spring 2020')
    let sem22 = new Semester('Spring 2022')
    let sem31 = new Semester('Summer 2022')
    course1.addSems([sem11, sem12, sem13])
    course2.addSems([sem21, sem22])
    course3.addSems([sem31])
    
    let stu111 = new CourseStudData('108', 'Lotfy', 'B')
    let stu112 = new CourseStudData('109', 'Salama', 'C')
    let stu113 = new CourseStudData('101', 'Adel', 'A')
    let stu114 = new CourseStudData('110', 'Ashraf', 'A-')
    let stu121 = new CourseStudData('111', 'Ahmed', 'B+')
    let stu122 = new CourseStudData('112', 'Ahmad', 'A+')
    let stu123 = new CourseStudData('113', 'Mohamed', 'C-')
    let stu131 = new CourseStudData('114', 'Muhammad', 'A+')
    let stu132 = new CourseStudData('115', 'Mohammad', 'D')
    let stu211 = new CourseStudData('116', 'Mostafa', 'F')
    let stu221 = new CourseStudData('117', 'Omar', 'C+')
    let stu311 = new CourseStudData('118', 'Kareem', 'B-')
    let stu312 = new CourseStudData('119', 'Amr', 'C')
    sem11.addSL([stu111, stu112, stu113, stu114])
    sem12.addSL([stu121, stu122, stu123])
    sem13.addSL([stu131, stu132])
    sem21.addSL([stu211])
    sem22.addSL([stu221])
    sem31.addSL([stu311, stu312])

    this.dbService.putCourse(course1)
    this.dbService.putCourse(course2)
    this.dbService.putCourse(course3)
    

    // let course = new CourseData('CSE346', 'Course 346')
    // let sem = new Semester('Fall 2011')
    // course.addSems([sem])
    // let stu1 = new CourseStudData('108', 'Lotfy', 'B')
    // let stu2 = new CourseStudData('109', 'Salama', 'C')
    // let stuL = [stu1, stu2]
    // sem.addSL(stuL)
    // this.dbService.putCourse(course)
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
