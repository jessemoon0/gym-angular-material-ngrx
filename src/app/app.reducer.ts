import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';

import * as fromUi from './shared/ui.reducer';
import * as fromAuth from './auth/auth.reducer';

export interface IState {
  ui: fromUi.IState;
  auth: fromAuth.IState;
}

// ui and auth are the different "global services"
// Training module is lazy loaded, that's why is not here
export const reducers: ActionReducerMap<IState> = {
  ui: fromUi.uiReducer,
  auth: fromAuth.authReducer
};

export const getUiState = createFeatureSelector<fromUi.IState>('ui');
export const getIsLoading = createSelector(getUiState, fromUi.getIsLoading);

export const getAuthState = createFeatureSelector<fromAuth.IState>('auth');
export const getIsAuth = createSelector(getAuthState, fromAuth.getIsAuth);
