import { Component } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { Router } from '@angular/router';
import { EMPTY, Observable, of, switchMap } from 'rxjs';
import { Orders,Notification, Product, UserDocument } from 'src/app/product';
import { NotificationService } from 'src/app/services/notification.service';
import { OrderService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-product-orders',
  templateUrl: './product-orders.component.html',
  styleUrls: ['./product-orders.component.css'],
})
export class ProductOrdersComponent {
  totalAmount: number = 0;
  items: any = [];
  orders: Orders[] = [];
  
  constructor(private orderService: OrderService,private router: Router,private afMessaging: AngularFireMessaging, private notificationService: NotificationService) {}

  getItemNames(order: Orders): string {
    return order.items.map((item) => item.name).join(', ');
  }

  orders$: Observable<Orders[]>;

  ngOnInit() {
    this.orders$ = this.orderService.getOrders();
  }

  handleEdit(order: Orders) {
    console.log('Order edited:', order);
  }
  handleAccept(order: Orders) {
    const confirmation = window.confirm('Are you sure you want to accept this order?');
  
    if (confirmation) {
  
      this.orderService.moveOrder(order, 'Accepted');
  
      this.orders = this.orders.filter((o) => o !== order);
    }
  }
  
  handleDecline(order: Orders) {
    const confirmation = window.confirm('Are you sure you want to decline this order?');
  
    if (confirmation) {
  
      this.orderService.moveOrder(order, 'Declined');
  
      this.orders = this.orders.filter((o) => o !== order);
    }
  }
  orderHistory(){
    this.router.navigate(['app-orders-decline']);
  }
  ordersAccepted(){
    this.router.navigate(['app-orders-accepted']);
  }

  handleOrderStatus(order: Orders, status: 'Accepted' | 'Declined') {
    const confirmation = window.confirm(`Are you sure you want to ${status.toLowerCase()} this order?`);
  
    if (confirmation) {
      const notification: Notification = {
        type: status === 'Accepted' ? 'order_accepted' : 'order_declined',
        message: `Hurray! your order with id <b>${order.id}</b> has been <b>${status.toLowerCase()}<b>!`,
        read: false,
        details: { order },
      };

      console.log('notification:::::', notification);

      this.notificationService.sendNotification(notification);
  
      this.orderService.moveOrder(order, status);
      this.orders = this.orders.filter((o) => o !== order);
    }
  }
  

  sendNotificationToUser(userId: string, message: string) {
    const userToken = 'user_fcm_token';
  
    this.afMessaging.requestToken.subscribe((token) => {
      this.afMessaging.requestToken
        .subscribe(
          (token) => {
          },
          (error) => {
            console.error('Unable to get permission to notify.', error);
          }
        );
    });
}


}
