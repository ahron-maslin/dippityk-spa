import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { CartService } from '../services/cart.service';
import { ITEM } from '../shared/products';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {

  items = this.cartService.getItems();

  sumTotal = this.items.reduce((sum, { price, quantity }) => sum + price * quantity, 0);
  
  submitted: boolean = false; // show and hide the success message
  isLoading: boolean = false; // disable the submit button if we're loading

  responseMessage: string = '';

  orderForm!: FormGroup;
  honeypot: FormControl = new FormControl('');

  
  constructor(
    private cartService: CartService,
    private router: Router,
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.orderForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      email:  new FormControl('', [Validators.required, Validators.email]),
      honeypot: this.honeypot // we will use this to prevent spam
    });
  }

  public onSubmit(): void {
    if (this.orderForm.status == 'VALID'
        && this.items.length > 0
        && this.honeypot.value == '') {
      this.orderForm.disable() // disable form to prevent multiple submissions
      
      let formData: FormData = new FormData(); // data we will be sending to formspree

      formData.append('Name', this.orderForm.get('name')?.value);
      formData.append('Email', this.orderForm.get('email')?.value);
      formData.append('Order', this.sanitizeOrder(this.cartService.getItems())); // clean up order items
      formData.append('Total', this.sumTotal.toString() + ' Shekels');

      this.isLoading = true;
      
      this.http.post('https://formspree.io/f/xjvlyjod', formData).subscribe({
        next: (response) => {
          this.submitted = true;
          this.isLoading = false;
          console.log(response);
          this.items = this.cartService.clearCart(); // remove items (from local storage as well)
          console.warn('Your order has been submitted', this.orderForm.value);
          this.orderForm.reset();
          this.router.navigate(['/thanks']); // when finished (if all is ok) navigate to thanks page
        },
        error: (error) => {
          this.responseMessage =
            'Oops! An error occurred... Reload the page and try again.';
          this.orderForm.enable(); // re enable the form after a success
          this.submitted = true; // show the response message
          this.isLoading = false; // re enable the submit button
          console.log(error);
          this.orderForm.reset();
          alert(this.responseMessage); // remove this on prod
        } 
      })
    }
  }

  sanitizeOrder(items: ITEM[]): string {
    let outstr = '';
    items.map((item: ITEM) => {
      outstr += item.quantity + ' ' + item.name;
      outstr += '\n'
    })
    console.log(outstr);
    return outstr;
  }
}
