// angular
import 'rxjs/add/operator/map';

import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
// libs
import {Action} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';

import {MultilingualService} from './';
import * as multilingual from './multilingual.action';

@Injectable()
export class MultilingualEffects {
  @Effect()
  change$: Observable<Action> = this.actions$.ofType(multilingual.CHANGE).map(action => {
    let lang = action.payload;
    let langChangedAction = new multilingual.MultilingualChangeAction(lang);
    // track analytics
    this.multilangService.track(langChangedAction.type, {label: langChangedAction.payload});
    // change state
    return {}
  });

  constructor(private actions$: Actions, private multilangService: MultilingualService) {}
}
