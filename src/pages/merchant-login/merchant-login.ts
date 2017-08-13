import {Component} from '@angular/core';
import {Headers, Http} from '@angular/http';
import {TranslateService} from '@ngx-translate/core';
import {NavController, ToastController} from 'ionic-angular';

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

  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type

  // Our translated text strings

  constructor(
      public navCtrl: NavController, public user: User, public toastCtrl: ToastController,
      public translateService: TranslateService, public http: Http, public obp: OBP){

    this.merchants = this.getCounterparties()
    this.selected = this.merchants[0];

  }

  getCounterparties() {
    let counterparties = JSON.parse(localStorage.getItem('counterparties'));
    return Object.keys(counterparties).map(function(key) {
      return counterparties[key];
    });
  }

  // Attempt to login in through our User service
  doLogin() {
    console.log("meow meow meow");
    localStorage.setItem('LoggedInMerchant', JSON.stringify(this.selected));
    this.navCtrl.push(SearchPage);
    // let headers = new Headers({
    //   Authorization:
    //       `DirectLogin username="${
    //                                this.selected.user_name
    //                              }",   password="${
    //                                                this.selected.password
    //                                              }",  consumer_key="nsarsbud0jyhx5oxawfqh0xnl3405tt0jb4y3nak"`
    // });
    // this.http.post('https://apc.openbankproject.com/my/logins/direct', {}, {headers})
    //     .map(res => res.json())
    //     .subscribe(
    //         (resp) => {
    //           let {token} = resp;
    //           localStorage.setItem('Authorization', `DirectLogin token="${token}"`);
    //           this.navCtrl.push(MainPage);
    //         },
    //         (err) => {

    //           // this.navCtrl.push(MainPage);
    //           // Unable to log in
    //           let toast = this.toastCtrl.create(
    //               {message: this.loginErrorString, duration: 3000, position: 'top'});
    //           toast.present();
    //         });
  }

  goToUserLogin() {
    this.navCtrl.push(LoginPage);
  }

}
