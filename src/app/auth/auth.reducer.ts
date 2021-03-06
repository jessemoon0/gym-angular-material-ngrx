import { AuthActions, SET_AUTHENTICATED, SET_UNAUTHENTICATED } from './auth.actions';

export interface IState {
  isAuthenticated: boolean;
}

const initialState: IState = {
  isAuthenticated: false
};

export function authReducer(state = initialState, action: AuthActions) {
  switch (action.type) {
    case SET_AUTHENTICATED: {
      return {
        isAuthenticated : true
      };
    }
    case SET_UNAUTHENTICATED: {
      return {
        isAuthenticated : false
      };
    }
    default: {
      return state;
    }
  }
}

export const getIsAuth = (state: IState) => state.isAuthenticated;
