import {ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';

import * as fromRoot from '../app.reducer';
import {Store} from '@ngrx/store';
import {take} from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private store: Store<fromRoot.IState>) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select(fromRoot.getIsAuth).pipe(take(1));
    // if (this.authService.isAuth()) {
    //   return true;
    // } else {
    //   this.router.navigate(['/']);
    // }
  }

  canLoad(route: Route) {
    return this.store.select(fromRoot.getIsAuth).pipe(take(1));
    // if (this.authService.isAuth()) {
    //   return true;
    // } else {
    //   this.router.navigate(['/']);
    // }
  }
}
