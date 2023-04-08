import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

import { Products, PRODUCT, ITEM } from '../shared/products';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private items: ITEM[] = [];

  public itemSubject = new BehaviorSubject<any>(null);
  public productSubject = new BehaviorSubject<any>(null);

  constructor() {
    this.loadItems();
  }

  public getProducts() {
    return Products;
  }

  public addToCart(product: PRODUCT) {
    product.added = true;
    const item: ITEM = {id: product.id, name: product.name, price: product.price, quantity: product.quantity}
    console.log(item);
    this.items.push(item);
    console.log(this.items);

    localStorage.setItem('cart_items', JSON.stringify(this.items));
    this.itemSubject.next(this.items);
    
    console.log(JSON.stringify(this.items));
  }

  public removeFromCart(item: ITEM) {
    Products[item.id - 1].added = false;
    Products[item.id - 1].quantity = 1;
    var index = this.items.indexOf(item);
    this.items.splice(index, 1);

    localStorage.setItem('cart_items', JSON.stringify(this.items));
    this.itemSubject.next(this.items);

    console.log(this.items);
  }

  public getItems(): ITEM[] {
    this.items = this.getLocalStorage()
    return this.items;
  }

  public getTotal(): number {
    return this.items.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  public clearCart() {
    this.items = [];
    localStorage.removeItem("cart_items");
    this.productSubject.next(true);
    this.itemSubject.next(this.items);
    return this.items;
  }

  public decreaseQty(item: ITEM) {
    Products[item.id - 1].quantity--;
    item.quantity--;
    localStorage.setItem('cart_items', JSON.stringify(this.items));
    if (item.quantity === 0) {
      this.removeFromCart(item);
    }
  }

  public increaseQty(item: ITEM) {
    Products[item.id - 1].quantity++;
    item.quantity++;
    localStorage.setItem('cart_items', JSON.stringify(this.items));
  }

  private getLocalStorage() {
    let ls = localStorage.getItem('cart_items');
    //console.log("Got localStorage " + JSON.stringify(ls));
    
    if (ls == null) {
      return new Array;
    } else { // repopulate products from localstorage
      let parsed_ls = JSON.parse(ls);
  
      parsed_ls.map((item:ITEM) => {
        console.log("item :", item);
        var id = item.id;
        Products[id - 1].added = true;
        Products[id - 1].quantity = item.quantity;
      })
      return JSON.parse(ls);
    }
  }

  private loadItems(): void {
    const items = localStorage.getItem('cart_items');
    if (items) {
      this.items = JSON.parse(items);
    }
  }

}
