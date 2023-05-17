import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service'
import { HttpClient } from '@angular/common/http';
import { User } from '@angular/fire/auth';

const dbLink = "https://cse379-project-ums-default-rtdb.europe-west1.firebasedatabase.app"

@Injectable({
  providedIn: 'root'
})
export class DbAccessService {

  private userID = 0
  private loggedState = false

  constructor(private authService: AuthenticationService, private httpClient: HttpClient) { 
    this.authService.loggedIn().subscribe((loggedState) =>{
      this.loggedState = loggedState
    })
  }
  


  //////////////////////////////////////////////////////    STUDENT    //////////////////////////////////////////////////////
  addCourses(user: User, courses: studentCourseData[]){
    for(let course of courses){

      this.httpClient.put(dbLink + "/students/" + user.uid + "/courses/" + course.getCid() + ".json", course).subscribe((event) =>{
        console.log(event)
      })
    }
    // this.httpClient.put(dbLink + "/users/" + user.uid + "/grades.json", courses).subscribe((event) =>{
    //   console.log(event)
    // })
  }

  putStudent(user: User){
    let data = new studentData(user.email)
    // console.log("aaaaa")
    this.httpClient.put(dbLink + "/students/" + user.uid + ".json", data).subscribe((event) =>{
      console.log(event)
    })

  }

  fetchStudents(){
    this.httpClient.get(dbLink + "/students.json").subscribe(userList =>{
      console.log(userList)
    })
  }
  
  //////////////////////////////////////////////////////    STUDENT    //////////////////////////////////////////////////////



  
  //////////////////////////////////////////////////////    INSTRUC    //////////////////////////////////////////////////////

  putInstructor(user: User){
    let data = new instructorData('DummyInstId', 'DummyInstName', user.email)
    // console.log("aaaaa")
    this.httpClient.put(dbLink + "/instructors/" + user.uid + ".json", data).subscribe((event) =>{
      console.log(event)
    })
  }

  //////////////////////////////////////////////////////    INSTRUC    //////////////////////////////////////////////////////



  
  //////////////////////////////////////////////////////    COURSES    //////////////////////////////////////////////////////

  putCourse(course: courseData){
    this.httpClient.put(dbLink + "/courses/" + course.getCid() + ".json", course).subscribe((event) =>{
      console.log(event)
    })
  }

  //////////////////////////////////////////////////////    COURSES    //////////////////////////////////////////////////////
}

export class studentData{
  private stuId: string = '┬─┬ノ( º _ ºノ)'
  private name: string = '(╯°□°)╯︵ ┻━┻'
  constructor(
    private email: string | null | undefined,
    private gpa: number = 2.98, 
    private coursesID: string[] = []){}

  addCourse(courseID: string){
    this.coursesID.push(courseID)
  }
}

export class studentCourseData{
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
  
}

export class instructorData{
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

export class courseData{

  constructor(
    private courseId: string = 'DummyCourseId',
    private courseName: string = 'DummyCourseName',
    private sems: semester[] = []
  ){}

  getCid(): string{
    return this.courseId
  }
  getCname(): string{
    return this.courseName
  }
  getSems(): semester[]{
    return this.sems
  }

  addSems(sems: semester[]){
    for(let sem of sems){
      this.sems.push(sem)
    }
  }

}

export class semester{
  
  private studentList: string[] = []
  constructor(
    private name: string = 'Spring 2022'
  ){}

  getSL(): string[]{
    return this.studentList
  }
  getName(): string{
    return this.name
  }

  addSL(sl: string[]){
    for(let studentId of sl){
      this.studentList.push(studentId)
    }
  }

}