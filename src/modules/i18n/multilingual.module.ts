// angular
import {CommonModule} from '@angular/common';
import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Http, HttpModule} from '@angular/http';
// libs
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

// app

// module
import {MultilingualService} from './multilingual.service';

// for AoT compilation
export function translateLoaderFactory(http: Http) {
  return new TranslateHttpLoader(http, `/assets/i18n/`, '.json');
}

/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    TranslateModule.forRoot(
        [{provide: TranslateLoader, deps: [Http], useFactory: (translateLoaderFactory)}]),
  ],
  exports: [TranslateModule],
  providers: [MultilingualService]
})
export class MultilingualModule {
  // optional usage
  // ideally we could use this to override TranslateModule, but it requires the static above at
  // moment
  static forRoot(configuredProviders: Array<any>): ModuleWithProviders {
    return {ngModule: MultilingualModule, providers: configuredProviders};
  }

  constructor(@Optional() @SkipSelf() parentModule: MultilingualModule) {
    if (parentModule) {
      throw new Error('MultilingualModule already loaded; Import in root module only.');
    }
  }
}
