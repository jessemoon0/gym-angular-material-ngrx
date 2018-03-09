import {Action} from '@ngrx/store';
import {IExercise} from './Exercise.interface';


export const SET_AVAILABLE_TRAININGS = '[Training] Set available trainings';
export const SET_FINISHED_TRAININGS = '[Training] Set finished trainings';
export const START_TRAINING = '[Training] Start training';
export const STOP_TRAINING = '[Training] Stop training';

export class SetAvailableTrainings implements Action {
  readonly type = SET_AVAILABLE_TRAININGS;
  constructor(public payload: IExercise[]) {}
}

export class SetFinishedTrainings implements Action {
  readonly type = SET_FINISHED_TRAININGS;
  constructor(public payload: IExercise[]) {}
}

export class StartTraining implements Action {
  readonly type = START_TRAINING;
  // We use a selectedId: string for the exercise we select
  constructor(public payload: string) {}
}

export class StopTraining implements Action {
  // Doesn't need payload as this just removes the data from the store
  readonly type = STOP_TRAINING;
}

export type TrainingActions = SetAvailableTrainings |
                              SetFinishedTrainings |
                              StartTraining |
                              StopTraining;

