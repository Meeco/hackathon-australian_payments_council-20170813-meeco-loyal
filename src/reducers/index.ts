// lib
import {compose} from '@ngrx/core/compose';
import {ActionReducer, combineReducers} from '@ngrx/store';
import {storeFreeze} from 'ngrx-store-freeze';
import {createSelector} from 'reselect';

import * as fromi18n from '../modules/i18n/multilingual.reducer';

export interface State { i18n: fromi18n.State; }

const reducers = {
  i18n: fromi18n.reducer
};

const developmentReducer: ActionReducer<State> = compose(storeFreeze, combineReducers)(reducers);
// const productionReducer: ActionReducer<State> = combineReducers(reducers);

export function reducer(state: any, action: any) {
  // if (false) {
  //   return productionReducer(state, action);
  // } else {
  return developmentReducer(state, action);
  // }
}

export const geti18nState = (state: State) => state.i18n;

export const getSelectedLanguage = createSelector(geti18nState, fromi18n.getLang);
