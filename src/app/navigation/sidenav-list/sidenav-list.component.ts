import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit {
  @Output()
  sideNavClose = new EventEmitter<void>();
  isAuth$: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private store: Store<fromRoot.IState>
  ) { }

  ngOnInit() {
    this.isAuth$ = this.store.select(fromRoot.getIsAuth);
    // this.authSub = this.authService.authChange
    //   .subscribe(
    //     (authStatus: boolean) => {
    //       this.isAuth = authStatus;
    //     }
    //   );
  }

  onClose() {
    this.sideNavClose.emit();
  }

  onLogout() {
    this.onClose();
    this.authService.logout();
  }

}
