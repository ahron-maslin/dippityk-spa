import { Component } from '@angular/core';
import { SidebarToggleService } from '../services/sidebar-toggle.service';

import { ITEM } from '../shared/products';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private cartService: CartService,
              public toggleService: SidebarToggleService) { }

  items: ITEM[] = [];

  ngOnInit(): void {
    this.cartService.itemSubject.subscribe({
      next: (message) => {
        this.items = this.cartService.getItems();
      }
    })
    // used to get localstorage from service (after subscribing)
    this.cartService.itemSubject.next("GetLocalStorage"); 
  }

}
