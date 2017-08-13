import { Component, ViewChild } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Nav, Platform } from 'ionic-angular';

import {CardsPage} from '../pages/cards/cards';
import {ContentPage} from '../pages/content/content';
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
import {MerchantLoginPage} from '../pages/merchant-login/merchant-login';

@Component({
  template: `<ion-menu [content]="content">
    <ion-header>
      <ion-toolbar>
        <ion-title>Pages</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-list>
        <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">
          {{p.title}}
        </button>
      </ion-list>
    </ion-content>

  </ion-menu>
  <ion-nav #content [root]="rootPage"></ion-nav>`
})
export class App {
  rootPage = LoginPage;

  @ViewChild(Nav) nav: Nav;

  pages: any[] = [
    { title: 'Tutorial', component: TutorialPage }, { title: 'Welcome', component: WelcomePage },
    { title: 'Tabs', component: TabsPage }, { title: 'Cards', component: CardsPage },
    { title: 'Content', component: ContentPage }, { title: 'Login', component: LoginPage },
    { title: 'Signup', component: SignupPage }, { title: 'About', component: MapPage },
    { title: 'Master Detail', component: ListMasterPage }, { title: 'Menu', component: MenuPage },
    { title: 'Settings', component: SettingsPage }, { title: 'Search', component: SearchPage },
    { title: 'MerchantLogin', component: MerchantLoginPage }
  ]

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  initTranslate() {
    // this.translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
    //   this.config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
    // });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }
}
