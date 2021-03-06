import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, first, map, Observable, of } from 'rxjs';
import { Task } from "../model/task";

@Injectable({
  providedIn: 'root'
})
export class Api2Service {

  private readonly API_URL = 'https://6229de55be12fc4538aa6c8e.mockapi.io/task';

  public activeTasks$ = new BehaviorSubject<Task[]>([]);
  public doneTasks$ = new BehaviorSubject<Task[]>([]);

  constructor(private http: HttpClient) {
    this.getActiveTasks();
    this.getDoneTasks()
  }



  getActiveTasks(){
    this.http.get<any[]>(this.API_URL + "?doneDate=Undefined").pipe(
      // map(tasks => tasks.filter(t => t.doneDate === undefined)),
      map(tasks => tasks.map(t => this.parseTask(t)))
    ).subscribe(tasks => this.activeTasks$.next(tasks))
  }

  removeActiveTask(task: Task){
    let activeArray = this.activeTasks$.value;
    activeArray = activeArray.filter(t => t.id !== task.id);
    this.activeTasks$.next(activeArray);
  }

  addActiveTask(task: Task){
    let activeArray = this.activeTasks$.value;
    activeArray.push(task);
    this.activeTasks$.next(activeArray);
  }

  getDoneTasks(){
    this.http.get<any[]>(this.API_URL).pipe(
      map(tasks => tasks.filter(t => t.doneDate !== undefined)),
      map(tasks => tasks.map(t => this.parseTask(t)))
    ).subscribe(tasks => this.doneTasks$.next(tasks))
  }

  removeDoneTask(task: Task){
    let doneArray = this.doneTasks$.value;
    doneArray = doneArray.filter(t => t.id !== task.id);
    this.doneTasks$.next(doneArray);
  }

  addDoneTask(task: Task){
    let doneArray = this.doneTasks$.value;
    doneArray.push(task);
    this.doneTasks$.next(doneArray);
  }

  getSingleTask(taskId:string): Observable<Task | undefined>{
    return this.http.get<any>(this.API_URL + "/" + taskId).pipe(
      map(taskObj => this.parseTask(taskObj))
    );
  }


  createTask(task: Task): Observable<Task>{
    const httpOptions = {headers: new HttpHeaders({"Content-Type": "application/json"})}
    return this.http.post<Task>(this.API_URL, task.toDatabaseModel(), httpOptions).pipe(
      map(taskObj => this.parseTask(taskObj))
    );
  }

  deleteTask(taskId: string): Observable<any>{
    const httpOptions = {headers: new HttpHeaders({"Content-Type": "application/json"})}
    return this.http.delete<any>(this.API_URL + "/" + taskId, httpOptions);
  }


  completeTask(task: Task): Observable<Task>{
    const httpOptions = {headers: new HttpHeaders({"Content-Type": "application/json"})}
    task.doneDate = new Date();
    return this.http.put<Task>(this.API_URL + "/" + task.id, task.toDatabaseModel() ,httpOptions).pipe(
      map(taskObj => this.parseTask(taskObj))
    );;
  }



  parseTask(obj: any): Task {
    const task = new Task(obj.id, obj.name, obj.priority, obj.creationDate);
    if (obj.doneDate) {
      task.doneDate = new Date(obj.doneDate);
    }
    return task;
  }

}
