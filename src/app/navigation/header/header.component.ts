import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import * as fromRoot from '../../app.reducer';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output()
  sideNavToggle = new EventEmitter<void>();
  isAuth$: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private store: Store<fromRoot.IState>
  ) { }

  ngOnInit() {
    this.isAuth$ = this.store.select(fromRoot.getIsAuth);
    // this.authSub = this.authService.authChange
    //   .subscribe(
    //   (authStatus: boolean) => {
    //       this.isAuth = authStatus;
    //     }
    //   );
  }

  onSideNavToggle() {
    this.sideNavToggle.emit();
  }

  onLogout() {
    this.authService.logout();
  }
}
