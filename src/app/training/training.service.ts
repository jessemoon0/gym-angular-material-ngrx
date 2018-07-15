import { Injectable } from '@angular/core';
import { IExercise } from './Exercise.interface';
import {map, take} from 'rxjs/operators';
import {AngularFirestore} from 'angularfire2/firestore';
import {Subscription} from 'rxjs';
import {UiService} from '../shared/ui.service';
import {Store} from '@ngrx/store';
import * as UI from '../shared/ui.actions';
import * as Training from './training.actions';
import * as fromTraining from './training.reducer';

@Injectable()
export class TrainingService {

  private fbSubs: Subscription[] = [];

  constructor(
    private db: AngularFirestore,
    private uiService: UiService,
    private store: Store<fromTraining.IState>
  ) { }

  cancelSubscriptions() {
    this.fbSubs.forEach(sub => sub.unsubscribe());
  }

  fetchAvailableExercises() {
    // this.uiService.loadingStateChanged.next(true);
    this.store.dispatch(new UI.StartLoading());
    this.fbSubs.push(this.db.collection('availableExercises')
      .snapshotChanges()
      .pipe(
        map(docArray => {
          // The way to return an array of objects from the snapshotChanges object
          return docArray.map(doc => {
            return {
              id: doc.payload.doc.id,
              ...doc.payload.doc.data()
            } as IExercise;
          });
          // throw(new Error());
        }))
      .subscribe(
        (exercises: IExercise[]) => {
          this.store.dispatch(new UI.StopLoading());
          // this.uiService.loadingStateChanged.next(false);
          this.store.dispatch(new Training.SetAvailableTrainings(exercises));
          // this.availableExercises = exercises;
          // this.exercisesChanged.next([...this.availableExercises]);
        },
        error => {
          this.store.dispatch(new UI.StopLoading());
          // this.uiService.loadingStateChanged.next(false);
          this.uiService.showSnackBar('Fetching Exercises Failed, Please try later');
          // this.exercisesChanged.next(null);
        })
    );
  }

  startExercise(selectedId: string) {
    // SELECT A SINGLE DOC AND SET, DELETE, UPDATE
    // this.db.doc('availableExercises/' + selectedId).update({
    //   lastSelected: new Date()
    // });

    this.store.dispatch(new Training.StartTraining(selectedId));
    // this.runningExercise = this.availableExercises.find(ex => ex.id === selectedId);
    // this.exerciseChanged.next({...this.runningExercise});
  }

  completeExercise() {
    this.store.select(fromTraining.lazyGetActiveExercise)
      .pipe(take(1))
      .subscribe(
        (exercise: IExercise) => {
          // Add properties to the object by using spread operator
          this.addDataToFirestore(
            {...exercise,
              date: new Date(),
              state: 'completed'
            }
          );
          this.store.dispatch(new Training.StopTraining());
          // this.runningExercise = null;
          // this.exerciseChanged.next(null);
        }
      );
  }

  cancelExercise(progress: number) {
    this.store.select(fromTraining.lazyGetActiveExercise)
      .pipe(take(1))
      .subscribe(
        (exercise: IExercise) => {
          // Add properties to the object by using spread operator
          this.addDataToFirestore(
            {...exercise,
              duration: exercise.duration * (progress / 100),
              calories: exercise.calories * (progress / 100),
              date: new Date(),
              state: 'cancelled'
            }
          );
        }
      );

    this.store.dispatch(new Training.StopTraining());
    // this.runningExercise = null;
    // this.exerciseChanged.next(null);
  }

  // getRunningExercise() {
  //   return {...this.runningExercise};
  // }

  fetchFinishedExercises() {
    this.fbSubs.push(this.db.collection('finishedExercises')
      .valueChanges()
      .subscribe(
        (exercises: IExercise[]) => {
          this.store.dispatch(new Training.SetFinishedTrainings(exercises));
          // this.finishedExercisesChanged.next(exercises);
        },
        error => {
          console.log(error);
        })
    );
  }


  private addDataToFirestore(exercise: IExercise) {
    this.db.collection('finishedExercises').add(exercise);
  }

}
