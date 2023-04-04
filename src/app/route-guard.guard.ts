import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';

import { CartService } from './services/cart.service';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardGuard implements CanActivate {
  constructor(private cartService: CartService,
              private router: Router) { }
  
  public canActivate(){
    const items = this.cartService.getItems();
    if (items.length === 0) {
      this.router.navigate(['/order']);
    } else {
      console.log("hello from route guard");
    }
    return true;
  }
  
}
