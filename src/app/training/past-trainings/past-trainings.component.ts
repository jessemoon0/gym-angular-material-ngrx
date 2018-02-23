import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { IExercise } from '../Exercise.interface';
import {TrainingService} from '../training.service';

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.scss']
})
export class PastTrainingsComponent implements OnInit {
  dataSource = new MatTableDataSource<IExercise>();
  // Order matters
  displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];

  constructor(private trainingService: TrainingService) { }

  ngOnInit() {
    this.dataSource.data = this.trainingService.getCompletedExercises();
  }

}
