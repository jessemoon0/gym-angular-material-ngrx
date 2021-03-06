import {START_LOADING, STOP_LOADING, UiActions} from './ui.actions';

export interface IState {
  isLoading: boolean;
}

const initialState: IState = {
  isLoading: false
};

export function uiReducer(state = initialState, action: UiActions) {
  switch (action.type) {
    case START_LOADING: {
      return {
        ...state,
        isLoading: true
      };
    }
    case STOP_LOADING: {
      return {
        ...state,
        isLoading: false
      };
    }
    default: {
      return state;
    }
  }
}

export const getIsLoading = (state: IState) => state.isLoading;
