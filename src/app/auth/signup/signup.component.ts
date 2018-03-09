import {Component, OnDestroy, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import {AuthService} from '../auth.service';
import {UiService} from '../../shared/ui.service';
import {Subscription} from 'rxjs/Subscription';
import * as fromRoot from '../../app.reducer';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {

  maxDate: Date;
  isLoading$: Observable<boolean>;
  loadingSub: Subscription;

  constructor(
    private authService: AuthService,
    private uiService: UiService,
    private store: Store<{ui: fromRoot.IState}>
  ) { }

  ngOnInit() {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    // this.loadingSub = this.uiService.loadingStateChanged
    //   .subscribe(
    //     (state: boolean) => this.isLoading = state
    //   );
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  ngOnDestroy() {
    if (this.loadingSub) {
      this.loadingSub.unsubscribe();
    }
  }

  onSubmit(form: NgForm) {

    this.authService.registerUser({
      email: form.value.email,
      password: form.value.password
    });
  }

}
