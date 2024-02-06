// order.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Orders , Notification } from '../product';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private acceptedOrdersCollection: AngularFirestoreCollection<Orders>;
  private declinedOrdersCollection: AngularFirestoreCollection<Orders>;
  private ordersCollection: AngularFirestoreCollection<Orders>;
  private notificationSubject = new BehaviorSubject<Notification[]>([]);

  constructor(private firestore: AngularFirestore, private auth: AngularFireAuth) {
    this.acceptedOrdersCollection = this.firestore.collection('orders-accepted');
    this.declinedOrdersCollection = this.firestore.collection('orders-declined');
    this.ordersCollection = this.firestore.collection<Orders>('orders');
  }

  // notification$ = this.notificationSubject.asObservable();

  getAcceptedOrders(): Observable<Orders[]> {
    return this.acceptedOrdersCollection.valueChanges({ idField: 'orderId' });
  }
  
  getAcceptedOrdersByUser(userId: string): Observable<Orders[]> {
    return this.firestore.collection<Orders>('orders-accepted', ref => ref.where('userId', '==', userId)).valueChanges({ idField: 'orderId' });
  }


  getDeclinedOrders(): Observable<Orders[]> {
    return this.declinedOrdersCollection.valueChanges({ idField: 'orderId' });
  }

  getOrders(): Observable<Orders[]> {
    return this.ordersCollection.valueChanges({ idField: 'id' });
  }
  moveOrder(order: Orders, status: string): void {
    
    this.firestore.collection('orders').doc(order.id).delete()
      .then(() => {
        order.status = status;
        const destinationCollection =
          status === 'Accepted' ? 'orders-accepted' : 'orders-declined';
        this.firestore.collection(destinationCollection).add(order);
      })
      .catch((error) => {
        console.error('Error deleting order:', error);
      });
  }

  getOrdersByStatus(status: string): Observable<Orders[]> {
    return this.firestore.collection<Orders>('orders', ref => ref.where('status', '==', status)).valueChanges({ idField: 'id' });
  }
  getGroupedOrders(): Observable<any[]> {
    return this.firestore.collection('yourCollectionName')
      .valueChanges();
  }
  // public notificationKey = 'notifications';
  // private notificationSource = new BehaviorSubject<Notification[]>([]);
  
  // sendNotification(notification: Notification) {
  //   const currentNotifications = this.notificationSource.value;
  //   const updatedNotifications = [...currentNotifications, notification];
  //   this.notificationSource.next(updatedNotifications);
    
  //   // Store notifications in localStorage
  //   localStorage.setItem(this.notificationKey, JSON.stringify(updatedNotifications));
  // }
}