import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { CartService } from '../services/cart.service';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA, NgZone } from '@angular/core';
import { Router } from '@angular/router';

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutComponent } from './checkout.component';

describe('CheckoutComponent', () => {
  let component: CheckoutComponent;
  let fixture: ComponentFixture<CheckoutComponent>;
  let cartService: CartService;
  let httpMock: HttpTestingController;
  let router: Router;
  let ngZone: NgZone; // <-- import NgZone service

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CheckoutComponent],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        HttpClientTestingModule,
      ],
      providers: [FormBuilder, CartService],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    cartService = TestBed.inject(CartService);
    httpMock = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(CheckoutComponent);
    router = TestBed.inject(Router);
    ngZone = TestBed.inject(NgZone); // <-- inject NgZone
    component = fixture.componentInstance;
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
/*
  it('should clear the cart on successful form submission', () => {
    // Arrange
    spyOn(cartService, 'clearCart').and.returnValue([]);
    spyOn(console, 'warn');
    const formData = new FormData();
    const formBuilder = TestBed.inject(FormBuilder);
    formData.append('Name', 'John');
    formData.append('Email', 'john@example.com');
    formData.append('Order', '1 Product A\n2 Product B\n');
    formData.append('Total', '100 Shekels');

    component.orderForm = formBuilder.group({
      name: 'John',
      email: 'john@example.com',
      honeypot: ''
    });

    component.items = [
      { id: 1, name: 'Product A', price: 10, quantity: 1 },
      { id: 2, name: 'Product B', price: 20, quantity: 2 },
    ];
    
    const formValues = component.orderForm.value

    // Act
    component.onSubmit();
    const req = httpMock.expectOne('https://formspree.io/f/xjvlyjod');
    req.flush(of({}));

    // Assert
    expect(cartService.clearCart).toHaveBeenCalled();
    expect(console.warn).toHaveBeenCalledWith(
      'Your order has been submitted',
      formValues
    );
    expect(component.items).toEqual([]);
    expect(component.orderForm.enabled).toBeTrue();
    expect(component.submitted).toBeTrue();
    expect(component.isLoading).toBeFalse();
    expect(component.orderForm.pristine).toBeTrue();
  });

  it('should show an error message when form submission fails', () => {
    // Arrange
    spyOn(console, 'log');
    component.orderForm.setValue({
      name: 'John',
      email: 'john@example.com',
      honeypot: '',
    });

    component.items = [
      { id: 1, name: 'Product A', price: 10, quantity: 1 },
      { id: 2, name: 'Product B', price: 20, quantity: 2 },
    ];

    // Act
    component.onSubmit();
    const req = httpMock.expectOne('https://formspree.io/f/xjvlyjod');
    
    req.error(new ErrorEvent('An error occurred'));

    // Assert
    expect(component.responseMessage).toBe(
      'Oops! An error occurred... Reload the page and try again.'
    );
    expect(component.orderForm.enabled).toBeTrue();
    expect(component.submitted).toBeFalse();
    expect(component.isLoading).toBeFalse();
    expect(component.orderForm.pristine).toBeTrue();
  });
  */
});
