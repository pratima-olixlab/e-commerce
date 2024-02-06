import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../product';
import { CartService } from '../services/cart.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
const getObservable = (collection: AngularFirestoreCollection<Product>) => {
  const subject = new BehaviorSubject<Product[]>([]);
  collection.valueChanges({ idField: 'id' }).subscribe((val: Product[]) => {
    subject.next(val);
  });
  return subject;
};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  @Input() task: Product | null = null;
  @Output() edit = new EventEmitter<Product>();
  productMessage: string;
  constructor(private cartService: CartService, 
              private store: AngularFirestore,
              private router: Router){}
  product = getObservable(this.store.collection('product')) as Observable<Product[]>;
  
  addToCart() {
    
    this.cartService.addToCart(this.task);
    this.productAddedtoCart();
    this.router.navigate(['/product']);
  }
  ngOnInit(){

  }

  productAddedtoCart(){
    this.productMessage = 'Product Added to Cart Successfully!' ;
    setTimeout(() => (this.productMessage = undefined), 3000); 
  }

  buyProduct(){
    this.router.navigate(['/buy']);
  }

  navigateToProductDetails(productId: string) {
    this.router.navigate(['/product-details', productId]);
  }
}