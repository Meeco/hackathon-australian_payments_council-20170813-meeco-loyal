import {Component} from '@angular/core';
import {Headers, Http} from '@angular/http';
import {TranslateService} from '@ngx-translate/core';
import {NavController, ToastController} from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { MainPage } from '../../pages/pages';
import { User } from '../../providers/user';
import { OBP } from "../../providers/obp";
import { usersData } from "../../mocks/users-data";
import { LoginPage } from "../login/login";
import { SearchPage } from "../search/search";

@Component({selector: 'merchant-page-login', templateUrl: 'merchant-login.html'})
export class MerchantLoginPage {
  selected = { 'user_name': 'Robert.Anz.01', 'password': 'X!f98b6237', 'email': 'robert.anz.01@x.y' };
  merchants = [];

  constructor(
      public navCtrl: NavController, public user: User, public toastCtrl: ToastController,
      public translateService: TranslateService, public http: Http, public obp: OBP, public storage: Storage){

    this.getCounterparties()
  }

  async getCounterparties() {
    let counterparties = await this.storage.get('counterparties')
    // let counterparties = JSON.parse(localStorage.getItem('counterparties'));
    console.log(`counterparties are ${JSON.stringify(counterparties)}`)
    this.merchants = Object.keys(counterparties).map(function(key) {
      return counterparties[key];
    });
    this.selected = this.merchants[0];
  }

  // Attempt to login in through our User service
  doLogin() {
    console.log("meow meow meow");
    localStorage.setItem('LoggedInMerchant', JSON.stringify(this.selected));
    this.navCtrl.push(SearchPage);
  }

  goToUserLogin() {
    this.navCtrl.push(LoginPage);
  }

}
