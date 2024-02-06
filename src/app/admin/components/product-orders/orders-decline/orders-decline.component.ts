import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Orders } from 'src/app/product';
import { OrderService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-orders-decline',
  templateUrl: './orders-decline.component.html',
  styleUrls: ['./orders-decline.component.css']
})
export class OrdersDeclineComponent {
  acceptedOrders$: Observable<Orders[]>; // Replace with the actual Orders interface
  declinedOrders$: Observable<Orders[]>;

  constructor(private ordersService: OrderService) { }

  ngOnInit() {
    this.acceptedOrders$ = this.ordersService.getAcceptedOrders();
    this.declinedOrders$ = this.ordersService.getDeclinedOrders();
  }
}
