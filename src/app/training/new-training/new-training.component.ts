import {Component, OnInit} from '@angular/core';
import {TrainingService} from '../training.service';
import { IExercise } from '../Exercise.interface';
import { NgForm } from '@angular/forms';


import {UiService} from '../../shared/ui.service';
import * as fromRoot from '../../app.reducer';
import * as fromTraining from '../training.reducer';
import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit {

  exercises$: Observable<IExercise[]>;

  isLoading$: Observable<boolean>;

  constructor(
    private trainingService: TrainingService,
    private uiService: UiService,
    private store: Store<fromTraining.IState>
  ) { }

  ngOnInit() {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    // this.loadingSub = this.uiService.loadingStateChanged
    //   .subscribe(
    //     (isLoading: boolean) => {
    //       this.isLoading = isLoading;
    //     }
    //   );
    this.exercises$ = this.store.select(fromTraining.lazyGetAvailableExercises);
    // this.exerciseSubscription = this.trainingService.exercisesChanged
    //   .subscribe(exercises => {
    //     this.exercises = exercises;
    //   });
    this.fetchExercises();
  }

  fetchExercises() {
    this.trainingService.fetchAvailableExercises();
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }

}
