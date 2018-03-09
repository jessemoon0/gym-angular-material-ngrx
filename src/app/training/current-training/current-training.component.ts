import {Component, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material';
import {StopDialogComponent} from '../stop-dialog/stop-dialog.component';
import {TrainingService} from '../training.service';
import * as fromTraining from '../training.reducer';
import {Store} from '@ngrx/store';
import {IExercise} from '../Exercise.interface';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.scss']
})
export class CurrentTrainingComponent implements OnInit {
  progress = 0;
  timer: any;
  constructor(
    private dialog: MatDialog,
    private trainingService: TrainingService,
    private store: Store<fromTraining.IState>
  ) { }

  ngOnInit() {
    this.startOrResumeTimer();
  }

  startOrResumeTimer() {
    this.store.select(fromTraining.lazyGetActiveExercise)
      .pipe(take(1))
      .subscribe(
      (exercise: IExercise) => {
        const step: number = exercise.duration / 100 * 1000;
        this.timer = setInterval(() => {
          this.progress = this.progress + 1;
          if (this.progress >= 100) {
            this.trainingService.completeExercise();
            clearInterval(this.timer);
          }
        }, step);
      }
    );
  }

  onStop() {
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopDialogComponent, {
      data: {
        progress: this.progress
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.trainingService.cancelExercise(this.progress);
      } else {
        this.startOrResumeTimer();
      }
    });
  }

}
