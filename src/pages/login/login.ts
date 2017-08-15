import {Component} from '@angular/core';
import {Headers, Http} from '@angular/http';
import {TranslateService} from '@ngx-translate/core';
import {NavController, ToastController} from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { MainPage } from '../../pages/pages';
import { MerchantLoginPage } from "../../pages/merchant-login/merchant-login";
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
      public translateService: TranslateService, public http: Http, public obp: OBP,
      private storage: Storage){

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

  goToMerchantLogin() {
    this.navCtrl.push(MerchantLoginPage);
  }

  async loadAllUserData() {
    this.loadingAllUserData = true;
    for (let user of this.users) {
      this.selected = user;
      console.log(`getting data for ${user.user_name}`);
      let {token} = await this.loginToLoadData(user);
      localStorage.setItem('Authorization', `DirectLogin token="${token}"`);
      await this.getAllTheUsersData();
    }
    localStorage.setItem('Authorization', '');

    let storageUsers = await this.storage.get('users');
    let storageAccounts = await this.storage.get('accounts');
    let storageTransactions = await this.storage.get('transactions');
    let storageCounterparties = await this.storage.get('counterparties');
    
    console.log(`storageUsers are ${JSON.stringify(storageUsers)}`)
    console.log(`storageAccounts are ${JSON.stringify(storageAccounts)}`)
    console.log(`storageTransactions are ${JSON.stringify(storageTransactions)}`)
    console.log(`storageCounterparties are ${JSON.stringify(storageCounterparties)}`)

    this.loadingAllUserData = false;
  }

  loginToLoadData(user) {
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
    // let storageUsers = JSON.parse(localStorage.getItem('users'));
    let storageUsers = await this.storage.get('users');
    storageUsers = storageUsers ? storageUsers : {};
    

    // let storageAccounts = JSON.parse(localStorage.getItem('accounts'));
    let storageAccounts = await this.storage.get('accounts');
    storageAccounts = storageAccounts ? storageAccounts : {};

    // let storageTransactions = JSON.parse(localStorage.getItem('transactions'));
    let storageTransactions = await this.storage.get('transactions');
    storageTransactions = storageTransactions ? storageTransactions : {};

    
    // let storageCounterparties = JSON.parse(localStorage.getItem('counterparties'));
    let storageCounterparties = await this.storage.get('counterparties');
    storageCounterparties = storageCounterparties ? storageCounterparties : {};

    // get user data
    console.log(`using token ${localStorage.getItem('Authorization')}`)
    let userData = <any> await this.obp.api.getCurrentUser().toPromise();
    console.log(`and the return user is ${userData.user_id}`)
    storageUsers[userData.user_id] = userData;
    let userDataFromMock = this.users.find((user) => {
      return user.email === userData.email;
    });
    Object.assign(storageUsers[userData.user_id], userDataFromMock);
    // console.log(`about to save ${JSON.stringify(storageUsers[userData.user_id])}`)
    this.storage.set('users', storageUsers);
    localStorage.setItem('users', JSON.stringify(storageUsers));

    // get all private accounts
    let privateAccounts = <any>await this.obp.api.corePrivateAccountsAllBanks().toPromise();
    for (let account of privateAccounts) {
      storageAccounts[account.id] = account;
      storageAccounts[account.id]['user_id'] = userData.user_id;
    }
    this.storage.set('accounts', storageAccounts);
    // localStorage.setItem('accounts', JSON.stringify(storageAccounts));

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
    this.storage.set('transactions', storageTransactions);
    // localStorage.setItem('transactions', JSON.stringify(storageTransactions));

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
    this.storage.set('counterparties', storageCounterparties);
    // localStorage.setItem('counterparties', JSON.stringify(storageCounterparties));
    console.log(`grabbed everything for that user...`)
  }
}
