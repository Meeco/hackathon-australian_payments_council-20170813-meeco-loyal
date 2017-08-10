import {Action} from '@ngrx/store';

export const CHANGE = '[Language] Change';

export class MultilingualChangeAction implements Action {
  readonly type = CHANGE;

  constructor(public payload: string) {}
}
export type Actions = MultilingualChangeAction;
