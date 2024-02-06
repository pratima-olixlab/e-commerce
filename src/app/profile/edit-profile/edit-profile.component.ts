import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first, of, switchMap, take } from 'rxjs';
import { Address, UserDocument } from 'src/app/product';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent {
  currentUser: UserDocument | null = null;
  userForm: FormGroup;

  constructor(
    private firebaseService: FirebaseService,
    private afAuth: AngularFireAuth,
    private userDataService: UserDataService,
    private fb: FormBuilder
  ) {
    this.userForm = this.fb.group({
      name: ['', [Validators.required]],
      mobile: ['', [Validators.required, Validators.minLength(10),Validators.maxLength(12)]],
      email: ['', [Validators.required, Validators.email]],
      dob: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.firebaseService.getUserById(user.uid).subscribe((userData) => {
          this.userForm.patchValue({
            name: userData.name,
            mobile: userData.mobile,
            email: userData.email,
            dob: userData.dob
          });

          this.userDataService.setUserForm(this.userForm);
        });
      }
    });
  }
  
  onSubmit() {
    if (this.userForm.valid) {
      this.afAuth.authState.pipe(
        first(),
        switchMap((user) => {
          if (user) {
            return this.firebaseService.getUserById(user.uid);
          } else {
            console.log('User not authenticated.');
            return of(null);
          }
        }),
        take(1) // Add take(1) to automatically unsubscribe after the first emission
      ).subscribe((userData: UserDocument | null) => {
        if (userData !== null) {
          // Update the user data with the form data
          const updatedUserData: UserDocument = { ...userData, ...this.userForm.value };
  
          // Assuming updateUser returns a Promise<void>
          this.firebaseService.updateUser(updatedUserData)
            .then(() => {
              console.log('User data saved successfully.');
            })
            .catch((error) => {
              console.error('Error updating user data:', error);
            });
        } else {
          console.log('User data not available. Cannot update.');
        }
      });
    } else {
      console.log('Form is invalid. Please check the fields.');
    }
  }
}
