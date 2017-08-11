import {Component} from '@angular/core';
import {Headers, Http} from '@angular/http';
import {TranslateService} from '@ngx-translate/core';
import {NavController, ToastController} from 'ionic-angular';

import {MainPage} from '../../pages/pages';
import {User} from '../../providers/user';


@Component({selector: 'page-login', templateUrl: 'login.html'})
export class LoginPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: {email: string, password: string} = {email: 'Robert.Anz.01', password: 'X!f98b6237'};

  // Our translated text strings
  private loginErrorString: string;

  constructor(
      public navCtrl: NavController, public user: User, public toastCtrl: ToastController,
      public translateService: TranslateService, public http: Http){

      this.translateService.get('LOGIN_ERROR').subscribe((value) => {
        this.loginErrorString = value;
      })}

  // Attempt to login in through our User service
  doLogin() {
    let headers = new Headers({
      Authorization:
          `DirectLogin username="${
                                   this.account.email
                                 }",   password="${
                                                   this.account.password
                                                 }",  consumer_key="nsarsbud0jyhx5oxawfqh0xnl3405tt0jb4y3nak"`
    });
    this.http.post('https://apc.openbankproject.com/my/logins/direct', {}, {headers})
        .map(res => res.json())
        .subscribe(
            (resp) => {
              let {token} = resp;
              localStorage.setItem('Authorization', token);
              this.navCtrl.push(MainPage);
            },
            (err) => {

              // this.navCtrl.push(MainPage);
              // Unable to log in
              let toast = this.toastCtrl.create(
                  {message: this.loginErrorString, duration: 3000, position: 'top'});
              toast.present();
            });
  }
}
