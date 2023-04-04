import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { CartService } from '../services/cart.service';
import { ITEM } from '../shared/products';
import { Router } from '@angular/router'
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutComponent } from './checkout.component';

describe('CheckoutComponent', () => {
  let cartServiceSpy: jasmine.SpyObj<CartService>;
  let component: CheckoutComponent;
  let fixture: ComponentFixture<CheckoutComponent>;
  let cartService: CartService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckoutComponent ],
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientTestingModule,
      ],
      providers: [ FormBuilder, CartService ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutComponent);
    component = fixture.componentInstance;
    cartService = TestBed.inject(CartService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with name and email fields', () => {
    expect(component.orderForm.contains('name')).toBeTruthy();
    expect(component.orderForm.contains('email')).toBeTruthy();
  });

  it('should mark name and email fields as required', () => {
    const nameControl = component.orderForm.get('name');
    const emailControl = component.orderForm.get('email');
    nameControl?.setValue('');
    emailControl?.setValue('');
    expect(nameControl?.valid).toBeFalsy();
    expect(emailControl?.valid).toBeFalsy();
    expect(component.orderForm.valid).toBeFalsy();
  });

  it('should sanitize order', () => {
    const items: ITEM[] = [
      { id: 1, name: 'Item 1', price: 10, quantity: 1 },
      { id: 2, name: 'Item 2', price: 15, quantity: 2 },
      { id: 3, name: 'Item 3', price: 20, quantity: 3 },
    ];
    const sanitizedOrder = component.sanitizeOrder(items);
    expect(sanitizedOrder).toEqual('1 Item 1\n2 Item 2\n3 Item 3\n');
  });

  it('should calculate sumTotal', () => {
    const items: ITEM[] = [
      { id: 1, name: 'Item 1', price: 10, quantity: 2 },
      { id: 2, name: 'Item 2', price: 20, quantity: 1 }
    ];
    cartServiceSpy.getItems.and.returnValue(items);

    component.ngOnInit();

    expect(component.sumTotal).toBe(40);
  });

  it('should disable form on submit', () => {
    component.onSubmit();
    expect(component.orderForm.disabled).toBeTruthy();
  });

  it('should submit form with correct data', () => {
    spyOn(cartService, 'getItems').and.returnValue([
      { id: 2, name: 'Item 1', price: 10, quantity: 1 },
      { id: 3, name: 'Item 2', price: 15, quantity: 2 },
      { id: 5, name: 'Item 3', price: 20, quantity: 3 },
    ]);
    const formDataSpy = spyOn(window, 'FormData').and.callThrough();
    const httpPostSpy = spyOn(component['http'], 'post').and.callThrough();
    component.orderForm.setValue({ name: 'John', email: 'john@example.com', honeypot: '' });
    component.onSubmit();
    expect(formDataSpy).toHaveBeenCalled();
    expect(httpPostSpy).toHaveBeenCalledWith('https://formspree.io/f/xjvlyjod', jasmine.any(FormData));
  });

  
  it('should clear cart on success', () => {
    spyOn(component['router'], 'navigate');
    spyOn(window, 'alert');
    cartServiceSpy.clearCart.and.returnValue([]);
    spyOn(component['http'], 'post').and.returnValue(of({}));

    component.onSubmit();

    expect(cartServiceSpy.clearCart).toHaveBeenCalled();
    expect(component['router'].navigate).toHaveBeenCalledWith(['/thanks']);
    expect(component.orderForm.reset).toHaveBeenCalled();
    expect(window.alert).not.toHaveBeenCalled();
  });

  it('should show error message on error', () => {
    spyOn(component['router'], 'navigate');
    spyOn(window, 'alert');
    spyOn(component['http'], 'post').and.returnValue(of({}).pipe(() => { throw new Error(); }));

    component.onSubmit();

    expect(component.responseMessage).toContain('Oops!');
    expect(component.orderForm.enable).toHaveBeenCalled();
    expect(component.submitted).toBeTrue();
    expect(component.isLoading).toBeFalse();
    expect(component.orderForm.reset).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalled();
  });
});

