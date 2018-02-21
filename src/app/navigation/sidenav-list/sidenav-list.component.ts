import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit, OnDestroy {
  @Output()
  sideNavClose = new EventEmitter<void>();
  isAuth = false;
  authSub: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authSub = this.authService.authChange
      .subscribe(
        (authStatus: boolean) => {
          this.isAuth = authStatus;
        }
      );
  }

  ngOnDestroy() {
    this.authSub.unsubscribe();
  }

  onClose() {
    this.sideNavClose.emit();
  }

  onLogout() {
    this.onClose();
    this.authService.logout();
  }

}
