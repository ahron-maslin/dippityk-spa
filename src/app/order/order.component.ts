import { Component } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

import { CartService } from '../services/cart.service';
import { PRODUCT } from '../shared/products';
import { SidebarToggleService } from '../services/sidebar-toggle.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
  animations: [
    trigger('slideInOut', [
      state('out', style({
        transform: 'translate3d(0,0,0)'
      })),
      state('in', style({
        transform: 'translate3d(100%, 0, 0)'
      })),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out'))
    ]),
  ]
})
export class OrderComponent {

  constructor(private cartService: CartService,
              public toggleService: SidebarToggleService) { }
  

  products: PRODUCT[] = this.cartService.getProducts();

  
  
  ngOnInit(): void {
    this.cartService.productSubject.subscribe({
      next: (message) => {
        this.getProducts();
        console.log(message);
      }
    });
    this.toggleService.showCart = true;
    this.toggleService.menuState = 'in';
  }

  ngOnDestroy() {
    this.toggleService.showCart = false;
  }

  getProducts(): void {
    this.products = this.cartService.getProducts();
  }

  addToCart(product: PRODUCT) {
    this.cartService.addToCart(product);
    console.log('Your product has been added to the cart!');
  }

  closeSidebar() {
    if (this.toggleService.menuState === 'out') {
      this.toggleService.toggleMenu();
    }
  }
  
}
