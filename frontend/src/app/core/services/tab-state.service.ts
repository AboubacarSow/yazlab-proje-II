import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Tabs } from '../utils/tabs-enum';

@Injectable({
  providedIn: 'root'
})
export class TabStateService {

  private currentTabSubject = new BehaviorSubject<Tabs| null>(null);
  currentTab$ = this.currentTabSubject.asObservable();
  constructor() { }

  setTab(tab : Tabs){
    this.currentTabSubject.next(tab);
    localStorage.setItem('currentTab',JSON.stringify(tab));
  }
  
  getCurrentTab() : Observable<Tabs | null>{
    return this.currentTab$
  }
}
