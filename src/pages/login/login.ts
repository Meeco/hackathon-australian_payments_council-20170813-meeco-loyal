import {Component} from '@angular/core';
import {Headers, Http} from '@angular/http';
import {TranslateService} from '@ngx-translate/core';
import {NavController, ToastController} from 'ionic-angular';

import { MainPage } from '../../pages/pages';
import { User } from '../../providers/user';
import { OBP } from "../../providers/obp";
import { usersData } from "../../mocks/users-data";

@Component({selector: 'page-login', templateUrl: 'login.html'})
export class LoginPage {
  selected = { 'user_name': 'Robert.Anz.01', 'password': 'X!f98b6237', 'email': 'robert.anz.01@x.y' };
  users = usersData;

  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type

  // Our translated text strings
  private loginErrorString: string;
  loadingAllUserData = false;

  constructor(
      public navCtrl: NavController, public user: User, public toastCtrl: ToastController,
      public translateService: TranslateService, public http: Http, public obp: OBP){

      this.translateService.get('LOGIN_ERROR').subscribe((value) => {
        this.loginErrorString = value;
      })}

  // Attempt to login in through our User service
  doLogin() {
    let headers = new Headers({
      Authorization:
          `DirectLogin username="${
                                   this.selected.user_name
                                 }",   password="${
                                                   this.selected.password
                                                 }",  consumer_key="nsarsbud0jyhx5oxawfqh0xnl3405tt0jb4y3nak"`
    });
    this.http.post('https://apc.openbankproject.com/my/logins/direct', {}, {headers})
        .map(res => res.json())
        .subscribe(
            (resp) => {
              let {token} = resp;
              localStorage.setItem('Authorization', `DirectLogin token="${token}"`);
              this.navCtrl.push(MainPage);
              this.getAllTheUsersData();
            },
            (err) => {

              // this.navCtrl.push(MainPage);
              // Unable to log in
              let toast = this.toastCtrl.create(
                  {message: this.loginErrorString, duration: 3000, position: 'top'});
              toast.present();
            });
  }


  async loadAllUserData() {
    this.loadingAllUserData = true;
    for (let user of this.users) {
      console.log(`getting data for ${user.user_name}`);
      let {token} = await this.loginToLoadData();
      localStorage.setItem('Authorization', `DirectLogin token="${token}"`);
      await this.getAllTheUsersData();
    }
    localStorage.setItem('Authorization', '');
    this.loadingAllUserData = false;
  }

  loginToLoadData() {
    let headers = new Headers({
      Authorization:
          `DirectLogin username="${
                                   this.selected.user_name
                                 }",   password="${
                                                   this.selected.password
                                                 }",  consumer_key="nsarsbud0jyhx5oxawfqh0xnl3405tt0jb4y3nak"`
    });
    return this.http.post('https://apc.openbankproject.com/my/logins/direct', {}, {headers})
        .map(res => res.json())
        .toPromise();
  }

  async getAllTheUsersData() {
    let storageUsers = JSON.parse(localStorage.getItem('users'));
    storageUsers = storageUsers ? storageUsers : {};
    let storageAccounts = JSON.parse(localStorage.getItem('accounts'));
    storageAccounts = storageAccounts ? storageAccounts : {};
    let storageTransactions = JSON.parse(localStorage.getItem('transactions'));
    storageTransactions = storageTransactions ? storageTransactions : {};
    let storageCounterparties = JSON.parse(localStorage.getItem('counterparties'));
    storageCounterparties = storageCounterparties ? storageCounterparties : {};

    // get user data
    let userData = <any>await this.obp.api.getCurrentUser().toPromise();
    storageUsers[userData.user_id] = userData;
    let userDataFromMock = this.users.find((user) => {
      return user.email === userData.email;
    });
    Object.assign(storageUsers[userData.user_id], userDataFromMock);
    localStorage.setItem('users', JSON.stringify(storageUsers));

    // get all private accounts
    let privateAccounts = <any>await this.obp.api.corePrivateAccountsAllBanks().toPromise();
    for (let account of privateAccounts) {
      storageAccounts[account.id] = account;
      storageAccounts[account.id]['user_id'] = userData.user_id;
    }
    localStorage.setItem('accounts', JSON.stringify(storageAccounts));

    // get all transactions
    let transactionRequestPromises = [];
    for (let account of privateAccounts) {
      transactionRequestPromises.push(
          this.obp.api.getTransactionsForBankAccount('owner', account.id, account.bank_id)
              .map((transactionsReturn) => {
                for (let transaction of transactionsReturn.transactions) {
                  transaction['account_id'] = account.id;
                  transaction['user_id'] = userData.user_id;
                }
                return transactionsReturn.transactions;
              })
              .toPromise());
    }
    let transactions = [];
    let transactionArrays = await Promise.all(transactionRequestPromises);
    for (let transactionArray of transactionArrays) {
      for (let transaction of transactionArray) {
        storageTransactions[transaction.id] = transaction;
        transactions.push(transaction);
      }
    }
    localStorage.setItem('transactions', JSON.stringify(storageTransactions));
    console.log('saved all the transactions')

        // get all counterparties
        for (let transaction of transactions) {
      let otherAccount = transaction.other_account;
      if (otherAccount.metadata.URL) {
        if (otherAccount.metadata.URL && !storageCounterparties[otherAccount.metadata.URL]) {
          storageCounterparties[otherAccount.metadata.URL] = {
            accounts: {},
            URL: otherAccount.metadata.URL
          }
        }
        storageCounterparties[otherAccount.metadata.URL]['accounts'][otherAccount.id] =
            otherAccount;
      }
    }
    localStorage.setItem('counterparties', JSON.stringify(storageCounterparties));
  }
}
