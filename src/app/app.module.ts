import {ErrorHandler, NgModule} from '@angular/core';
import {Http} from '@angular/http';
import {RouterModule} from '@angular/router';
import {Camera} from '@ionic-native/camera';
import {GoogleMaps} from '@ionic-native/google-maps';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {TranslateLoader} from '@ngx-translate/core';
import {Configuration} from '@obp/sdk';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';

import {Items} from '../mocks/providers/items';
import {MultilingualEffects} from '../modules/i18n/multilingual.effects';
import {MultilingualModule, translateLoaderFactory} from '../modules/i18n/multilingual.module';
import {SharedModule} from '../modules/shared/shared.module';
import {CardsPage} from '../pages/cards/cards';
import {ContentPage} from '../pages/content/content';
import {ItemCreatePage} from '../pages/item-create/item-create';
import {ItemDetailPage} from '../pages/item-detail/item-detail';
import {ListMasterPage} from '../pages/list-master/list-master';
import {LoginPage} from '../pages/login/login';
import {MapPage} from '../pages/map/map';
import {MenuPage} from '../pages/menu/menu';
import {SearchPage} from '../pages/search/search';
import {SettingsPage} from '../pages/settings/settings';
import {SignupPage} from '../pages/signup/signup';
import {TabsPage} from '../pages/tabs/tabs';
import {TutorialPage} from '../pages/tutorial/tutorial';
import {WelcomePage} from '../pages/welcome/welcome';
import {Api} from '../providers/api';
import {OBP} from '../providers/obp';
import {User} from '../providers/user';
import {reducer} from '../reducers';

import {App} from './app.component';

/**
 * The Pages array lists all of the pages we want to use in our app.
 * We then take these pages and inject them into our NgModule so Angular
 * can find them. As you add and remove pages, make sure to keep this list up to date.
 */
let pages = [
  App, CardsPage, ContentPage, ItemCreatePage, ItemDetailPage, ListMasterPage, LoginPage, MapPage,
  MenuPage, SearchPage, SettingsPage, SignupPage, TabsPage, TutorialPage, WelcomePage
];

export function declarations() {
  return pages;
}

export function entryComponents() {
  return pages;
}

export function providers() {
  return [
    Api, Items, User, Camera, GoogleMaps, SplashScreen, StatusBar, OBP,
    // Keep this to enable Ionic's runtime error handling during development
    {provide: ErrorHandler, useClass: IonicErrorHandler}, {
      provide: Configuration,
      useFactory: () => {
        return new Configuration({apiKeys: {Authotrization: 'bbbb'}});
      }
    }
  ];
}

@NgModule({
  declarations: declarations(),
  imports: [
    IonicModule.forRoot(App),
    SharedModule,
    EffectsModule.run(MultilingualEffects),
    StoreModule.provideStore(reducer),
    RouterModule.forRoot([]),
    MultilingualModule.forRoot(
        [{provide: TranslateLoader, deps: [Http], useFactory: (translateLoaderFactory)}]),
  ],
  bootstrap: [IonicApp],
  entryComponents: entryComponents(),
  providers: providers()
})
export class AppModule {
}
