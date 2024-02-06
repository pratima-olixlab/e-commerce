import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Orders, Product } from 'src/app/product';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent {
  authStateSubscription: Subscription | null = null;
  totalAmount: number = 0;
  orderId: string='';
  cartItems: Product[];
  alertShown: boolean = false;

  constructor(
    private cartService: CartService,
  ) {}

  ngOnInit() {
    this.cartService.cartItems$.subscribe((cartItems) => {
      this.totalAmount = this.cartService.getTotalAmount();
      this.cartItems = cartItems;
    });
  }
}

