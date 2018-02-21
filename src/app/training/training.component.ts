import { Component, OnInit } from '@angular/core';
import { TrainingService } from './training.service';
import {Subscription} from 'rxjs/Subscription';
import {IExercise} from './Exercise.interface';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit {
  ongoingTraining = false;
  exerciseSub: Subscription;
  constructor(private trainingService: TrainingService) { }

  ngOnInit() {
    this.exerciseSub = this.trainingService.exerciseChanged
      .subscribe((exercise: IExercise) => {
        this.ongoingTraining = !!exercise;
      });
  }

}
