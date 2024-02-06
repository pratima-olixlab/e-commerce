import { CardDetails, UserDocument } from './../product';
import { Component } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { LocalStorageService } from '../services/auth.service';

@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.css']
})
export class CardDetailsComponent {

  card: CardDetails[] = [];
  isToggleOn: boolean;
  current = 1;
  constructor(private firebaseService: FirebaseService, private localStorageService: LocalStorageService) {
    this.isToggleOn = JSON.parse(this.localStorageService.getItem('toggleState')) || false;
  }

  ngOnInit() {
    this.firebaseService.getAllUsernames().subscribe(
      (CardDetails) => {
        this.card = this.card.map((user, index) => ({ ...user, serialNo: index + 1 }));
      },
      (error) => {
        console.error('Error in ngOnInit:', error);
      }
    );
  }

  toggleAdmin(user: UserDocument) {
    this.localStorageService.setItem(`toggleState_${user.userId}`, JSON.stringify(user.access));
  }

  saveCardData(){

  }
}
