import {Component, OnDestroy, OnInit} from '@angular/core';
import {TrainingService} from '../training.service';
import { IExercise } from '../Exercise.interface';
import { NgForm } from '@angular/forms';

import { Subscription } from 'rxjs/Subscription';
import {UiService} from '../../shared/ui.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit, OnDestroy {

  exercises: IExercise[];
  exerciseSubscription: Subscription;

  isLoading = false;
  loadingSub: Subscription;

  constructor(private trainingService: TrainingService, private uiService: UiService) { }

  ngOnInit() {
    this.loadingSub = this.uiService.loadingStateChanged
      .subscribe(
        (isLoading: boolean) => {
          this.isLoading = isLoading;
        }
      );
    this.exerciseSubscription = this.trainingService.exercisesChanged
      .subscribe(exercises => {
        this.exercises = exercises;
      });
    this.fetchExercises();
  }

  fetchExercises() {
    this.trainingService.fetchAvailableExercises();
  }

  ngOnDestroy() {
    if (this.exerciseSubscription) {
      this.exerciseSubscription.unsubscribe();
    }
    if (this.loadingSub) {
      this.loadingSub.unsubscribe();
    }
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }

}
