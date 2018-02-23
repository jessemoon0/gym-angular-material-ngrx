import { Injectable } from '@angular/core';
import { IExercise } from './Exercise.interface';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class TrainingService {

  private availableExercises: IExercise [] = [
    { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
    { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15 },
    { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
    { id: 'burpees', name: 'Burpees', duration: 60, calories: 8 }
  ];
  private runningExercise: IExercise;
  private completedExercises: IExercise[] = [];
  exerciseChanged = new Subject<IExercise>();

  constructor() { }

  getAvailableExercises() {
    return this.availableExercises.slice();
  }

  startExercise(selectedId: string) {
    this.runningExercise = this.availableExercises.find(ex => ex.id === selectedId);
    this.exerciseChanged.next({...this.runningExercise});
  }

  completeExercise() {
    // Add properties to the object by using spread operator
    this.completedExercises.push(
      {...this.runningExercise,
        date: new Date(),
        state: 'completed'});
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  cancelExercise(progress: number) {
    // Add properties to the object by using spread operator
    this.completedExercises.push(
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

  getCompletedExercises() {
    return [...this.completedExercises];
  }

}
