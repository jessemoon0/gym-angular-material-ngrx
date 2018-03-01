import { Injectable } from '@angular/core';
import {IAuthData} from './AuthData.interface';
import {Subject} from 'rxjs/Subject';
import {Router} from '@angular/router';
import {AngularFireAuth} from 'angularfire2/auth';
import {TrainingService} from '../training/training.service';
import {UiService} from '../shared/ui.service';

@Injectable()
export class AuthService {
  // If user registered or logged in, it sends true. If logout, it sends false.
  authChange = new Subject<boolean>();
  private isAuthenticated = false;

  constructor(
    private router: Router,
    private firestoreAuth: AngularFireAuth,
    private trainingService: TrainingService,
    private uiService: UiService
  ) { }

  initAuthListener() {
    this.firestoreAuth.authState.subscribe(user => {
      if (user) {
        this.isAuthenticated = true;
        this.authChange.next(true);
        this.router.navigate(['/training']);
      } else {
        this.trainingService.cancelSubscriptions();
        this.authChange.next(false);
        this.router.navigate(['/login']);
        this.isAuthenticated = false;
      }
    });
  }

  registerUser(authData: IAuthData) {
    this.uiService.loadingStateChanged.next(true);
    this.firestoreAuth.auth.createUserWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        console.log(result);
        this.uiService.loadingStateChanged.next(false);
      })
      .catch(error => {
        this.uiService.loadingStateChanged.next(false);
        this.uiService.showSnackBar(error.message);
      });
  }

  login(authData: IAuthData) {
    this.uiService.loadingStateChanged.next(true);
    this.firestoreAuth.auth.signInWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        console.log(result);
        this.uiService.loadingStateChanged.next(false);
      })
      .catch(error => {
          this.uiService.loadingStateChanged.next(false);
        this.uiService.showSnackBar(error.message);
      });
  }

  logout() {
    this.firestoreAuth.auth.signOut();
  }

  isAuth() {
    return this.isAuthenticated;
  }

}
