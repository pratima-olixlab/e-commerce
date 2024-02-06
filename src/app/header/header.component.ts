import { Component, EventEmitter, Input, OnInit, ViewChild } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { Product, UserDocument } from '../product';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BehaviorSubject, Observable, map, of, startWith, switchMap } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormControl } from '@angular/forms';
import { NotificationService } from '../services/notification.service';

const getObservable = (collection: AngularFirestoreCollection<Product>) => {
  const subject = new BehaviorSubject<Product[]>([]);
  collection.valueChanges({ idField: 'id' }).subscribe((val: Product[]) => {
    subject.next(val);
  });
  return subject;
};

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isAuthenticated = true;
  configData;
  isSortMenuVisible: boolean;
  datasource: any;
  currentUser: UserDocument | null = null;
  @Input() helpType: string;
  @Input() isLogout = new EventEmitter<void>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort)sort!:MatSort;
  totalItems: number;
  totalNotifications: number;
  product = getObservable(this.store.collection('product')) as Observable<Product[]>;
  dataSource = new MatTableDataSource<Product>([]);
  searchControl = new FormControl();
  searchInput: string = '';
  filteredProducts: Observable<Product[]>;
  filteredProductsArrayValue: Product[] = [];
  showSearchOptions: boolean = false;

  constructor(
    private firebaseService: FirebaseService,
    private router: Router,
    private cartService: CartService,
    private afAuth: AngularFireAuth,
    private store: AngularFirestore,
    private notificationService: NotificationService
  ) {}

  logout() {
    this.firebaseService.logout();
    this.isLogout.emit();
    this.router.navigate(['']);
  }

  logo() {
    this.router.navigate(['/home']);
  }
  ngOnInit() {
   

    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.firebaseService.getUserById(user.uid).subscribe((userData) => {
          this.currentUser = userData as UserDocument;
          this.notificationService.count$.subscribe((count) => {
            this.totalNotifications = count;
            console.log('total', this.totalNotifications);
          });
        });
      }
    });

    this.configData = this.firebaseService.getConfig();
    this.cartService.cartItems$.subscribe(() => {
      this.totalItems = this.cartService.getTotalItems();
    });

    this.product.subscribe((data) => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.filteredProducts = this.searchControl.valueChanges.pipe(
        startWith(''),
        map((value) => (typeof value === 'string' ? value : value.name)),
        map((name) => (name ? this._filterProducts(name) : this.dataSource.data.slice()))
      );
    });

    this.filteredProducts = this.product.pipe(
      switchMap(products => {
        const filterValue = this.searchInput.toLowerCase();
        return of(products.filter(product => product.name.toLowerCase().includes(filterValue)));
      })
    );
  }

  private _filterProducts(name: string): Product[] {
    const filterValue = name.toLowerCase();
    return this.dataSource.data.filter((product) => product.name.toLowerCase().includes(filterValue));
  }

  onSearchInput(event: any) {
  }

  displayProduct(product?: Product): string | undefined {
    return product ? product.name : undefined;
  }

  applyFilter(event: Event) {
    this.searchInput = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.filteredProducts = this.filterProducts(this.searchInput);
  }
  
  public filterProducts(filterValue: string): Observable<Product[]> {
    return this.product.pipe(
      map(products => {
        const filteredProducts = products.filter(product => product.name.toLowerCase().includes(filterValue));
        this.filteredProductsArrayValue = filteredProducts;
        return filteredProducts;
      })
    );
  }

  selectProduct(product: Product) {
    const productId = product.id;
    this.router.navigate(['/product-details', productId]);
    this.searchControl.setValue('');
  }

  public filteredProductsArray(): Product[] {
    return this.filteredProductsArrayValue || [];
  }

  closeMenu(): void {}

  viewProfile() {}
}
