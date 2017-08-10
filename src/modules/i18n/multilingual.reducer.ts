import * as actions from './multilingual.action';

export interface State { lang: string; }

export const initialState: State = {
  lang: 'en'
};

export function reducer(state: State = initialState, action: actions.Actions): State {
  switch (action.type) {
    case actions.CHANGE:
      if (state.lang !== action.payload)
        return Object.assign({}, state, {lang: action.payload});

      return state;
    default:
      return state;
  }
}

export const getLang = (state: State) => state.lang;
