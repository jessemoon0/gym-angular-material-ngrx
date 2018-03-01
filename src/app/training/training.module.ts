import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CurrentTrainingComponent} from './current-training/current-training.component';
import {NewTrainingComponent} from './new-training/new-training.component';
import {PastTrainingsComponent} from './past-trainings/past-trainings.component';
import {TrainingComponent} from './training.component';
import {SharedModule} from '../shared/shared.module';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {StopDialogComponent} from './stop-dialog/stop-dialog.component';
import {TrainingRoutingModule} from './training-routing.module';

@NgModule({
  declarations: [
    TrainingComponent,
    CurrentTrainingComponent,
    NewTrainingComponent,
    PastTrainingsComponent,
    StopDialogComponent
  ],
  imports: [
    SharedModule,
    TrainingRoutingModule
  ]
})
export class TrainingModule { }
