import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SidebarToggleService {
  public showCart = false;

  public menuState:string = 'in';

  constructor() { }


  public toggleMenu() {
    this.menuState = this.menuState === 'out' ? 'in' : 'out';
    return this.menuState;
  }
}
