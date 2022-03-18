import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComService {

  public isDrawerOpen: BehaviorSubject<boolean>;

  constructor() {
    this.isDrawerOpen = new BehaviorSubject<boolean>(false);
  }
}
