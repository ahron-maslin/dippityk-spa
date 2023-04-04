import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Products, PRODUCT, ITEM } from '../shared/products';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public itemSubject = new Subject<any>();
  public productSubject = new Subject<any>();
  
  public items :ITEM[] = this.getLocalStorage() as any || [];


  constructor() { }

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


  private resetProducts() {
    Products.map((index) => {
      index.quantity = 0;
      index.added = false;
    })
    
    localStorage.removeItem("cart_items");
    return Products;
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
    this.itemSubject.next('added to cart');
    
    console.log(JSON.stringify(this.items));
  }

  public removeFromCart(item: ITEM) {
    Products[item.id - 1].added = false;
    Products[item.id - 1].quantity = 1;
    var index = this.items.indexOf(item);
    this.items.splice(index, 1);

    localStorage.setItem('cart_items', JSON.stringify(this.items));
    this.itemSubject.next('removed to cart');

    console.log(this.items);
  }

  public getItems() {
    this.items = this.getLocalStorage();
    console.log(JSON.stringify(this.items));
    return this.items;
  }

  public clearCart() {
    this.items = [];
    this.resetProducts();
    this.productSubject.next('reset products');
    this.itemSubject.next('cleared cart');
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

}
