import { TestBed, tick } from '@angular/core/testing';

import { CartService } from './cart.service';

import { Products } from '../shared/products';

describe('CartService', () => {
  let service: CartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartService);
    service.clearCart()
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add an item to the cart', () => {
    const product = Products[0];
    const initialCartLength = service.getItems().length;
    service.addToCart(product);
    expect(service.getItems().length).toBe(initialCartLength + 1);
  });

  it('should remove an item from the cart', () => {
    const product = Products[0];
    const initialCartLength = service.getItems().length;
    service.addToCart(product);
    expect(service.getItems().length).toBe(initialCartLength + 1);
    const item = service.getItems()[0];
    service.removeFromCart(item);
    expect(service.getItems().length).toBe(initialCartLength);
  });

  it('should decrease the quantity of an item in the cart', () => {
    const product = Products[0];
    service.addToCart(product);
    const item = service.getItems()[0];
    const initialQuantity = item.quantity;
    service.decreaseQty(item);
    expect(item.quantity).toBe(initialQuantity - 1);
  });

  it('should increase the quantity of an item in the cart', () => {
    const product = Products[0];
    service.addToCart(product);
    const item = service.getItems()[0];
    const initialQuantity = item.quantity;
    service.increaseQty(item);
    expect(item.quantity).toBe(initialQuantity + 1);
  });

  it('should clear the cart', () => {
    const product = Products[0];
    service.addToCart(product);
    const initialCartLength = service.getItems().length;
    service.clearCart();
    expect(service.getItems().length).toBe(0);
  });

  it('should calculate the correct total price of the cart', () => {
    const product1 = Products[0];
    const product2 = Products[1];
    service.addToCart(product1);
    service.addToCart(product2);
    const expectedTotal = product1.price + product2.price;
    expect(service.getTotal()).toBe(expectedTotal);
  });
});
