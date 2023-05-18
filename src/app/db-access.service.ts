import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service'
import { HttpClient } from '@angular/common/http';
import { User } from '@angular/fire/auth';
import { Observable, Subject, of, pipe } from 'rxjs';
import { filter, map } from 'rxjs/operators';

const dbLink = "https://cse379-project-ums-default-rtdb.europe-west1.firebasedatabase.app"

@Injectable({
  providedIn: 'root'
})
export class DbAccessService {

  private loggedState = false

  constructor(private authService: AuthenticationService, private httpClient: HttpClient) { 
    this.authService.loggedIn().subscribe((loggedState) =>{
      this.loggedState = loggedState
    })
  }
  


  //////////////////////////////////////////////////////    STUDENT    //////////////////////////////////////////////////////
  addCourses(user: User, courses: StudCourseData[]){
    for(let course of courses){

      this.httpClient.put(dbLink + "/students/" + user.uid + "/courses/" + course.getCid() + ".json", course).subscribe((event) =>{
        console.log(event)
      })
    }
  }

  putStudent(user: User){
    let data = new StudData('newUserId', 'newUserName', user.email)
    // console.log("aaaaa")
    this.httpClient.put(dbLink + "/students/" + user.uid + ".json", data).subscribe((event) =>{
      console.log(event)
    })
  }

  fetchCurrStudentCourses() {
    let currUser = this.authService.currUser()
    return this.httpClient.get <{ [key: string]: StudCourseData }> (dbLink + "/students/" + currUser.uid + "/courses.json")
    .pipe(map(responseData =>{
      let res: StudCourseData[] = []

      for(let key in responseData){
        res.push(
          new StudCourseData(
            key, 
            responseData[key]['grade'], 
            responseData[key]['sem'], 
            responseData[key]['courseName'], 
            responseData[key]['live']
          )
        )
      }
      return res
    }))
    // there isn't even a return type lmao?....fucked, this is so.
    // eksdee
  }

  fetchStudents(){
    this.httpClient.get(dbLink + "/students.json").subscribe(userList =>{
      // console.log(userList)
    })
  }
  
  //////////////////////////////////////////////////////    STUDENT    //////////////////////////////////////////////////////



  
  //////////////////////////////////////////////////////    INSTRUC    //////////////////////////////////////////////////////

  putInstructor(user: User){
    let data = new InstData('DummyInstId', 'DummyInstName', user.email)
    // console.log("aaaaa")
    this.httpClient.put(dbLink + "/instructors/" + user.uid + ".json", data).subscribe((event) =>{
      // console.log(event)
    })
  }

  fetchCurrInstCourses(){
    let user = this.authService.currUser()
    return this.httpClient.get <{ [key: string]: InstCourseData }> (dbLink + "/instructors/" + user.uid + "/courses.json")
    .pipe(map(responseData =>{
      let res: InstCourseData[] = []

      for(let key in responseData){
        res.push(
          new InstCourseData(
            responseData[key]['courseId'],
            responseData[key]['courseName']
          )
        )
      }
      return res
    }))

    // there isn't even a return type lmao?....fucked, this is so.
    // eksdee
  }

  
  fetchCurrInstCoursesDetailed(): Observable<CourseData[]>{
    // console.log("Fetching details")
    let user = this.authService.currUser()
    let myObservable = new Subject<CourseData[]>()
    this.fetchCurrInstCourses().subscribe((courses) =>{

      let courseList: CourseData[] = []
      for(let myCourse in courses){
        this.httpClient.get <CourseData> (dbLink + "/courses/" + courses[myCourse].getCid() + ".json")
        .pipe(map(responseData =>{
          let res: CourseData | undefined
          if(responseData !== null){
            res = new CourseData(
              responseData['courseId'],
              responseData['courseName'],
              responseData['sems']
            )
          }

          return res
        }))
        .subscribe((course) =>{
          if((course !== null) && (course !== undefined)){
            // console.log("Course ain't null!: ", course)
            courseList.push(course!)
          }
          if(courses.indexOf(courses[myCourse])+1 >= courses.length){
            
            myObservable.next(courseList)
          }
        })
      }
      
    })
    return myObservable
  }

  addCourseToInstCurr(courseList: InstCourseData[]){
    let user = this.authService.currUser()
    this.httpClient.put(dbLink + "/instructors/" + user.uid + "/courses.json", courseList).subscribe((event) =>{
      // console.log(event)
    },
    (error) =>{
      console.log(error)
    })
  }

  editGrade(studId: string, courseId: string, grade: string){
    let data = {'': grade}
    this.httpClient.get <StudData> (dbLink + "/students/" + studId + ".json")
    .pipe(map(responseData =>{
      let res: StudData | undefined
      if(responseData !== null){
        res = new StudData(
          responseData['stuId'],
          responseData['name'],
          responseData['email'],
          responseData['gpa'],
          responseData['courses']
        )
      }
      return res
    }))
    .subscribe((user)=>{
      user!.editGrade(grade, courseId)
      this.httpClient.put(dbLink + "/students/" + studId + ".json", user).subscribe((event) =>{
        console.log(event)
      })
    })
    // this.httpClient.put(dbLink + "/students/" + studId + "/courses/" + courseId + "/grade.json", data).subscribe((event) =>{
    //   console.log(event)
    // },
    // (error)=>{
    //   console.log(error)
    // })
  }
  //////////////////////////////////////////////////////    INSTRUC    //////////////////////////////////////////////////////


  
  //////////////////////////////////////////////////////    COURSES    //////////////////////////////////////////////////////

  putCourse(course: CourseData){
    this.httpClient.put(dbLink + "/courses/" + course.getCid() + ".json", course).subscribe((event) =>{
      // console.log(event)
    })
  }

  fetchCourse(cid: string){
    return this.httpClient.get <StudCourseData> (dbLink + "/students/" + this.authService.currUser().uid + "/courses/" + cid + ".json")
    .pipe(map(responseData =>{
      let res: StudCourseData | undefined
      if(responseData !== null){
        res = new StudCourseData(
          responseData['courseId'],
          responseData['grade'], 
          responseData['sem'], 
          responseData['courseName'], 
          responseData['live']
        )
      }
      return res
    }))
  }

  fetchCourseInst(cid: string){
    return this.httpClient.get <CourseData> (dbLink + "/courses/" + cid + ".json")
    .pipe(map(responseData =>{
      let res: CourseData | undefined
      if(responseData !== null){
        res = new CourseData(
          responseData['courseId'],
          responseData['courseName'],
          responseData['sems']
        )
      }

      return res
    }))
  }

  //////////////////////////////////////////////////////    COURSES    //////////////////////////////////////////////////////
}

export class StudData{
  
  constructor(
    
    private stuId: string = '┬─┬ノ( º _ ºノ)',
    private name: string = '(╯°□°)╯︵ ┻━┻',
    private email: string | null | undefined,
    private gpa: number = 2.98, 
    private courses: StudCourseData[] = []){}

  // addCourse(courseID: string){
  //   this.courses.push(courseId)
  // }
  editGrade(grade: string, courseId: string){
    for(let element in this.courses){
      if(this.courses[element]['courseId'] == courseId){
        this.courses[element]['grade'] = grade
      }
    }
  }
}

export class StudCourseData{
  constructor(
    private courseId: string, 
    private grade: string, 
    private sem: string, 
    private courseName: string, 
    private live: boolean = false){}

  getCid(): string{
    return this.courseId
  }
  getGrade(): string{
    return this.grade
  }
  getSem(): string{
    return this.sem
  }
  getCname(): string{
    return this.courseName
  }
  getLive(): boolean{
    return this.live
  }

  setGrade(grade: string){
    this.grade = grade
  }
  
}

export class InstData{
  constructor(
    private instId: string, 
    private name: string, 
    private email: string | null | undefined, 
    private givenCourses: string[] = []){}

  getInstid(): string{
    return this.instId
  }
  getName(): string{
    return this.name
  }
  getEmail(): string | null | undefined{
    return this.email
  }
  getGC(): string[]{
    return this.givenCourses
  }

  addGC(courses: string[]){
    for(let course of courses){
      
      this.givenCourses.push(course)
    }
  }
}

export class InstCourseData{
  constructor(
    private courseId: string,
    private courseName: string
  ){}

  getCid(): string{
    return this.courseId
  }
  getCname(): string{
    return this.courseName
  }
}

export class CourseData{

  constructor(
    private courseId: string = 'DummyCourseId',
    private courseName: string = 'DummyCourseName',
    private sems: Semester[] = []
  ){}

  getCid(): string{
    return this.courseId
  }
  getCname(): string{
    return this.courseName
  }
  getSems(): Semester[]{
    return this.sems
  }

  addSems(sems: Semester[]){
    for(let sem of sems){
      this.sems.push(sem)
    }
  }

}

export class CourseInstData {
  constructor(
    private courseId: string = 'DummyCourseId',
    private courseName: string = 'DummyCourseName',
    private semesterName: string = '',
    private numOfStudents: number = 0
  ) {}

  getCid(): string {
    return this.courseId;
  }
  getCname(): string {
    return this.courseName;
  }

  getSemName(): string {
    return this.semesterName;
  }

  getNoOfStudents(): number {
    return this.numOfStudents;
  }
}

export class CourseStudData{

  constructor(
    private studId: string,
    private studName: string,
    private grade: string
  ){}
}

export class Semester {
  public studentList: CourseStudData[] = [];
  public noOfStudents: number = 0

  constructor(
    public name: string = 'Spring 2022',
  ) {}

  getSL(): CourseStudData[] {
    return this.studentList;
  }

  getSemName(): string {
    return this.name;
  }

  addSL(sl: CourseStudData[]) {
    for (let student of sl) {
      this.studentList.push(student);
    }
    this.noOfStudents = this.studentList.length
  }

  getNoStud(): number {
    return this.studentList.length;
  }
}