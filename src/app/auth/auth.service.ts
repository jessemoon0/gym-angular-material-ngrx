import { Injectable } from '@angular/core';


import {IUser} from './User.interface';
import {IAuthData} from './AuthData.interface';
import {Subject} from 'rxjs/Subject';
import {Router} from '@angular/router';

@Injectable()
export class AuthService {
  // If user registered or logged in, it sends true. If logout, it sends false.
  authChange = new Subject<boolean>();
  private user: IUser;

  constructor(private router: Router) { }

  registerUser(authData: IAuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString()
    };
    this.succesfullAuth();
  }

  login(authData: IAuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString()
    };
    this.succesfullAuth();
  }

  logout() {
    this.user = null;
    this.authChange.next(false);
    this.router.navigate(['/login']);
  }

  getUser() {
    return {...this.user};
  }

  isAuth() {
    return this.user != null;
  }

  private succesfullAuth() {
    this.authChange.next(true);
    this.router.navigate(['/training']);
  }

}
