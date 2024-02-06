import { Component } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Orders, Product } from '../product';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {
  authStateSubscription: Subscription | null = null;
  constructor(
    private cartService: CartService,
    private store: AngularFirestore,
    private afAuth: AngularFireAuth,) { }
  cartItems: Product[] = [];
  handler:any = null;
  totalAmount: number = 0;
  orderId: string='';
  alertShown: boolean = false;
  ngOnInit() {
 
    this.loadStripe();
    this.cartService.cartItems$.subscribe((items) => {
      this.cartItems = items;
    this.calculateTotalAmount();
    });
  }
  calculateTotalAmount() {
    this.totalAmount = this.cartService.getTotalAmount();
  }
  pay(amount: number) {    
    var handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51OQMS8SBmrKIRoJWhVgg6myQKYC6OSEFOCcVQLT3TMBs7LWV30GvB9MZkKYAKBOzdnLQQTta3ZlQYTIcrJmfqNbs00NlzjPYwh',
      locale: 'auto',
      token: (token: any) => {
        if (token && token.error) {
          console.error('Stripe token creation error:', token.error);
          alert('Error occurred during payment: ' + token.error.message);
        } else {
          alert('Payment Success!!');
          this.placeOrder();
        }
      },
      closed: (data: any) => {
        if (data && data.error) {
          console.error('Stripe Checkout closed with an error:', data.error);
          alert('Error occurred during payment. Please try again.');
        } else {
          console.log('Stripe Checkout closed without an error.');
        }
      }
    });
 
    handler.open({
      name: 'Demo Site',
      description: '2 widgets',
      amount: amount * 100,
      currency: "inr"
    });
 
  }
 
  loadStripe() {
     
    if(!window.document.getElementById('stripe-script')) {
      var script = window.document.createElement("script");
      script.id = "stripe-script";
      script.type = "text/javascript";
      script.src = "https://buy.stripe.com/test_00g6p02RY7GN41O7ss";
      script.onload = () => {
        this.handler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51OQMS8SBmrKIRoJWhVgg6myQKYC6OSEFOCcVQLT3TMBs7LWV30GvB9MZkKYAKBOzdnLQQTta3ZlQYTIcrJmfqNbs00NlzjPYwh',
          locale: 'auto',
          token: function (token: any) {
            alert('Payment Success!!');
          }
        });
      }
       
      window.document.body.appendChild(script);
    }
  }

  placeOrder() {
    if (this.authStateSubscription) {
      this.authStateSubscription.unsubscribe();
    }
    this.authStateSubscription = this.afAuth.authState.subscribe((user) => {
      if (user) {
        const order: Orders = {
          status: 'In Progress',
          userId: user.uid,
          userName: user.displayName || user.email,
          items: this.cartItems,
          totalAmount: this.totalAmount,
        };
        this.store
          .collection('orders')
          .add(order)
          .then((docRef) => {
            const orderId = docRef.id;
            this.orderId = orderId;

            this.cartService.clearCart();

            if (!this.alertShown) {
              alert('Your order is in Progress!');
              this.alertShown = true;

              if (this.authStateSubscription) {
                this.authStateSubscription.unsubscribe();
              }
            }
          })
          .catch((error) => {
            console.error('Error adding order: ', error);
          });
      }
    });
  }
}
