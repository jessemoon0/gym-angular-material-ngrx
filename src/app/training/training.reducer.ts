import { IExercise } from './Exercise.interface';
import * as fromRoot from '../app.reducer';
import {
  SET_AVAILABLE_TRAININGS,
  SET_FINISHED_TRAININGS,
  START_TRAINING,
  STOP_TRAINING,
  TrainingActions
} from './training.actions';
import {createFeatureSelector, createSelector} from '@ngrx/store';

export interface IState extends fromRoot.IState {
  training: ITrainingState;
}

export interface ITrainingState {
  availableExercises: IExercise[];
  finishedExercises: IExercise[];
  activeTraining: IExercise;
}

const initialState: ITrainingState = {
  availableExercises: [],
  finishedExercises: [],
  activeTraining: null
};

export function trainingReducer(state = initialState, action: TrainingActions) {
  switch (action.type) {
    case SET_AVAILABLE_TRAININGS: {
      return {
        ...state,
        availableExercises : action.payload
      };
    }
    case SET_FINISHED_TRAININGS: {
      return {
        ...state,
        finishedExercises : action.payload
      };
    }
    case START_TRAINING: {
      return {
        ...state,
        activeTraining : {
          ...state.availableExercises.find(ex => ex.id === action.payload)
        }
      };
    }
    case STOP_TRAINING: {
      return {
        ...state,
        activeTraining : null
      };
    }
    default: {
      return state;
    }
  }
}

const getAvailableExercises = (state: ITrainingState) => state.availableExercises;
const getFinishedExercises = (state: ITrainingState) => state.finishedExercises;
const getActiveExercise = (state: ITrainingState) => state.activeTraining;
const getIsTrainingActive = (state: ITrainingState) => state.activeTraining != null;

// Name must match the name we give it in the training module.
export const getTrainingState = createFeatureSelector<ITrainingState>('training');

// We are just wrapping the upper 3 const to make them available
export const lazyGetAvailableExercises = createSelector(getTrainingState, getAvailableExercises);
export const lazyGetFinishedExercises = createSelector(getTrainingState, getFinishedExercises);
export const lazyGetActiveExercise = createSelector(getTrainingState, getActiveExercise);
export const lazyGetIsTrainingActive = createSelector(getTrainingState, getIsTrainingActive);
