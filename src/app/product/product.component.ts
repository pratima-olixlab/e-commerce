import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { Product } from '../product';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartService } from '../services/cart.service';
import { Router } from '@angular/router';

const getObservable = (collection: AngularFirestoreCollection<Product>) => {
  const subject = new BehaviorSubject<Product[]>([]);
  collection.valueChanges({ idField: 'id' }).subscribe((val: Product[]) => {
    subject.next(val);
  });
  return subject;
};

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  @Input() task: Product | null = null;
  constructor(private dialog: MatDialog,private store: AngularFirestore,private router: Router){}
  product = getObservable(this.store.collection('product')) as Observable<Product[]>;
 
  ngOnInit(){
  }

  navigateToProductDetails(productId: string) {
    this.router.navigate(['/product-details', productId]);
  }
}
