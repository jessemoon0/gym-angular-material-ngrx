import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { IExercise } from '../Exercise.interface';
import {TrainingService} from '../training.service';
import * as fromTraining from '../training.reducer';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.scss']
})
export class PastTrainingsComponent implements OnInit, AfterViewInit {
  dataSource = new MatTableDataSource<IExercise>();
  // Order matters
  displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private trainingService: TrainingService,
    private store: Store<fromTraining.IState>
  ) { }

  ngOnInit() {

   this.store.select(fromTraining.lazyGetFinishedExercises)
      .subscribe((exercises: IExercise[]) => {
        this.dataSource.data = exercises;
      }
    );
    this.trainingService.fetchFinishedExercises();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
