import { Component } from '@angular/core';

import { CartService } from '../services/cart.service';
import { SidebarToggleService } from '../services/sidebar-toggle.service';
import { ITEM } from '../shared/products';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent {
  constructor(private cartService: CartService,
            public toggleService: SidebarToggleService) { }

  items = this.cartService.getItems();


  ngOnInit(): void {
    this.cartService.itemSubject.subscribe({
      next: (message) => {
        this.items = this.cartService.getItems();
        console.log(message);
      }
    });
  } 
  
  removeFromCart(item: ITEM) {
    this.cartService.removeFromCart(item);
  }

  decreaseQty(item: ITEM) {
    this.cartService.decreaseQty(item);
  }

  increaseQty(item: ITEM) {
    this.cartService.increaseQty(item);
  }

}
