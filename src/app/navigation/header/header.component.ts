import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output()
  sideNavToggle = new EventEmitter<void>();
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

  onSideNavToggle() {
    this.sideNavToggle.emit();
  }

  onLogout() {
    this.authService.logout();
  }
}
