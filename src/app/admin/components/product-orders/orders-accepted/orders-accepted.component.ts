import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Orders } from 'src/app/product';
import { OrderService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-orders-accepted',
  templateUrl: './orders-accepted.component.html',
  styleUrls: ['./orders-accepted.component.css']
})
export class OrdersAcceptedComponent {
  acceptedOrders$: Observable<Orders[]>;
  groupedOrders$: Observable<any[]>;
  constructor(private ordersService: OrderService) { }

  ngOnInit() {
    this.acceptedOrders$ = this.ordersService.getAcceptedOrders();
    this.groupedOrders$ = this.ordersService.getGroupedOrders();
  }
}
