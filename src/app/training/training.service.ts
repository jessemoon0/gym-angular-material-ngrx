import { Injectable } from '@angular/core';
import { IExercise } from './Exercise.interface';
import { Subject } from 'rxjs/Subject';
import {map} from 'rxjs/operators';
import {AngularFirestore} from 'angularfire2/firestore';
import {Subscription} from 'rxjs/Subscription';
import {UiService} from '../shared/ui.service';

@Injectable()
export class TrainingService {

  private availableExercises: IExercise [] = [];
  private runningExercise: IExercise;

  exerciseChanged = new Subject<IExercise>();
  exercisesChanged = new Subject<IExercise[]>();
  finishedExercisesChanged = new Subject<IExercise[]>();

  private fbSubs: Subscription[] = [];

  constructor(private db: AngularFirestore, private uiService: UiService) { }

  cancelSubscriptions() {
    this.fbSubs.forEach(sub => sub.unsubscribe());
  }

  fetchAvailableExercises() {
    this.uiService.loadingStateChanged.next(true);
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
          this.uiService.loadingStateChanged.next(false);
          this.availableExercises = exercises;
          this.exercisesChanged.next([...this.availableExercises]);
        },
        error => {
          this.uiService.loadingStateChanged.next(false);
          this.uiService.showSnackBar('Fetching Exercises Failed, Please try later');
          this.exercisesChanged.next(null);
        })
    );
  }

  startExercise(selectedId: string) {
    // SELECT A SINGLE DOC AND SET, DELETE, UPDATE
    // this.db.doc('availableExercises/' + selectedId).update({
    //   lastSelected: new Date()
    // });
    this.runningExercise = this.availableExercises.find(ex => ex.id === selectedId);
    this.exerciseChanged.next({...this.runningExercise});
  }

  completeExercise() {
    // Add properties to the object by using spread operator
    this.addDataToFirestore(
      {...this.runningExercise,
        date: new Date(),
        state: 'completed'});
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  cancelExercise(progress: number) {
    // Add properties to the object by using spread operator
    this.addDataToFirestore(
      {...this.runningExercise,
        duration: this.runningExercise.duration * (progress / 100),
        calories: this.runningExercise.calories * (progress / 100),
        date: new Date(),
        state: 'cancelled'
      }
    );
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  getRunningExercise() {
    return {...this.runningExercise};
  }

  fetchFinishedExercises() {
    this.fbSubs.push(this.db.collection('finishedExercises')
      .valueChanges()
      .subscribe(
        (exercises: IExercise[]) => {
          this.finishedExercisesChanged.next(exercises);
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
