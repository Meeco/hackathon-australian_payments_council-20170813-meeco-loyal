// angular
import {Injectable, InjectionToken} from '@angular/core';
// libs
import {Store} from '@ngrx/store';
import {TranslateService} from '@ngx-translate/core';

// app
import {Analytics, AnalyticsService} from '../analytics/index';
// module
import {MultilingualChangeAction} from './multilingual.action'
import {initialState} from './multilingual.reducer';

// provide supported languages at runtime
export const Languages: InjectionToken<Array<ILang>> = new InjectionToken('Languages');
// optional view helper for language handling
export const LanguageViewHelper: InjectionToken<Array<any>> =
    new InjectionToken('LanguageViewHelper');
export const LanguageProviders =
    [{provide: Languages, useValue: []}, {provide: LanguageViewHelper, useValue: null}];

// service
@Injectable()
export class MultilingualService extends Analytics {
  constructor(
      public analytics: AnalyticsService, private translate: TranslateService,
      private store: Store<any>) {
    super(analytics);
    this.category = 'Multilingual';

    // this language will be used as a fallback when a translation isn't found in the current
    // language
    translate.setDefaultLang(initialState.lang);

    // use browser/platform lang if available
    let userLang = this.translate.getBrowserLang();

    // subscribe to changes
    store.select(s => s.i18n).subscribe((state) => {
      // update ng2-translate which will cause translations to occur wherever the TranslatePipe
      // is used in the view
      this.translate.use(state.lang);
    });

    // init the lang
    this.store.dispatch(new MultilingualChangeAction(userLang));
  }
}
