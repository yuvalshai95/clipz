import { Injectable } from '@angular/core';

// Router
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

// Interfaces
import { IUser } from '../models/user.model';

// Firestore
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';

// Rxjs
import { Observable } from 'rxjs';
import { map, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userCollection: AngularFirestoreCollection<IUser>;
  public isUserAuthenticated$: Observable<boolean>;
  public isUserAuthenticatedWithDelay$: Observable<boolean>;

  constructor(
    private auth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.userCollection = db.collection('user');
    this.isUserAuthenticated$ = auth.user.pipe(map((user) => !!user));
    this.isUserAuthenticatedWithDelay$ = this.isUserAuthenticated$.pipe(
      delay(1200)
    );
    this.router.events.subscribe(console.log);
  }

  async createUser(userData: IUser) {
    if (!userData.password) throw new Error('Password not provided');

    // Auth user credentials
    const userCred = await this.auth.createUserWithEmailAndPassword(
      userData.email,
      userData.password
    );

    if (!userCred.user) throw new Error("User can't be found");

    // Insert user data to db
    // Make sure user id is the same as user auth id
    await this.userCollection.doc(userCred.user?.uid).set({
      name: userData.name,
      email: userData.email,
      age: userData.age,
      phoneNumber: userData.phoneNumber,
    });

    await userCred.user.updateProfile({
      displayName: userData.name,
    });
  }

  public async handleLogout($event?: Event) {
    if ($event) $event.preventDefault();

    await this.auth.signOut();
    // when logout redirect to home page
    await this.router.navigateByUrl('/');
  }
}
