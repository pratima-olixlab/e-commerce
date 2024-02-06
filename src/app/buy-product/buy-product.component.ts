import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { Address, Orders, UserDocument } from '../product';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FirebaseService } from '../services/firebase.service';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import { UserDataService } from '../services/user-data.service';
import { FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { OrderService } from '../services/orders.service';
import 'jspdf-autotable';

@Component({
  selector: 'app-buy-product',
  templateUrl: './buy-product.component.html',
  styleUrls: ['./buy-product.component.css'],
})
export class BuyProductComponent {
  isAddress = false;
  upiApps = false;
  upiAppsValue: string = '';
  currentUser: UserDocument | null = null;
  user: UserDocument[] = [];
  orders: Orders[] = [];
  userForm: FormGroup | null = null;
  isDataLoaded = false;
  addresses: Address[] = [];
  acceptedOrders$: Observable<Orders[]> = of([]);
  @ViewChild('htmlData') htmlData!: ElementRef;
  constructor(
    private store: AngularFirestore,
    private firebaseService: FirebaseService,
    private afAuth: AngularFireAuth,
    private router: Router,
    private userDataService: UserDataService,
    private ordersService: OrderService
  ) {
    console.log('user', this.user);
  }

  task: Address;
  @Output() edit = new EventEmitter<Address>();
  fulladdress: any = null;
  ngOnInit() {
    console.log('user//////', this.userForm);
    this.userDataService.userForm$.subscribe((userForm) => {
      if (userForm !== null) {
        this.userForm = userForm;
        console.log('user/////sfdsdf/', this.userForm);
      }
    });
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.firebaseService.getUserById(user.uid).subscribe(
          (userData) => {
            this.userDataService.setCurrentUser(userData);
            this.fetchAddresses(userData.userId);
            console.log('addresses:::::', this.addresses);
            this.currentUser = userData as UserDocument;
            this.ordersService
              .getAcceptedOrdersByUser(user.uid)
              .subscribe((userAcceptedOrders) => {
                this.acceptedOrders$ = of(userAcceptedOrders);
                console.log('acceptedOrders::::::', this.acceptedOrders$);
              });
          },
          (error) => {
            console.error('Error fetching user data:', error);
            this.isDataLoaded = true;
          }
        );
      }
    });
  }
  selectedRadioButton: string | null = null;

  isAddressRight() {
    this.isAddress = !this.isAddress;
  }
  updateUpiApps(): void {
    this.upiApps = !this.upiApps;
  }

  onPayment() {
    this.router.navigate(['/payment']);
  }
  fetchAddresses(userId: string) {
    this.firebaseService.getAddressById(userId).subscribe((addresses) => {
      this.userDataService.setAddresses(addresses);
      this.addresses = addresses;
      this.isDataLoaded = true;
      console.log('addressesZxZXZx:::::', this.addresses);
    });
  }
}
