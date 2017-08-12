import { Component } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { TranslateService } from '@ngx-translate/core';
import { NavController, ToastController } from 'ionic-angular';

import { MainPage } from '../../pages/pages';
import { User } from '../../providers/user';
import { OBP } from "../../providers/obp";


@Component({ selector: 'page-login', templateUrl: 'login.html' })
export class LoginPage {
  selected = { 'user_name': 'Robert.Anz.01', 'password': 'X!f98b6237', 'email': 'robert.anz.01@x.y' };
  users = [
    { 'user_name': 'Robert.Anz.01', 'password': 'X!f98b6237', 'email': 'robert.anz.01@x.y' },
    { 'user_name': 'Susan.Anz.01', 'password': 'X!9a016d94', 'email': 'susan.anz.01@x.y' },
    { 'user_name': 'Anil.Anz.01', 'password': 'X!6eb189e1', 'email': 'anil.anz.01@x.y' },
    { 'user_name': 'Ellie.Anz.01', 'password': 'X!ef92de69', 'email': 'ellie.anz.01@x.y' },
    { 'user_name': 'Robert.Bendigo.01', 'password': 'X!cc95dede', 'email': 'robert.bendigo.01@x.y' },
    { 'user_name': 'Susan.Bendigo.01', 'password': 'X!2e622576', 'email': 'susan.bendigo.01@x.y' },
    { 'user_name': 'Anil.Bendigo.01', 'password': 'X!85385a30', 'email': 'anil.bendigo.01@x.y' },
    { 'user_name': 'Ellie.Bendigo.01', 'password': 'X!8f561d99', 'email': 'ellie.bendigo.01@x.y' },
    { 'user_name': 'Robert.Cba.01', 'password': 'X!f967dba3', 'email': 'robert.cba.01@x.y' },
    { 'user_name': 'Susan.Cba.01', 'password': 'X!3cc9a979', 'email': 'susan.cba.01@x.y' },
    { 'user_name': 'Anil.Cba.01', 'password': 'X!afcf7089', 'email': 'anil.cba.01@x.y' },
    { 'user_name': 'Ellie.Cba.01', 'password': 'X!5cebd05c', 'email': 'ellie.cba.01@x.y' },
    { 'user_name': 'Robert.Coles.01', 'password': 'X!5462a711', 'email': 'robert.coles.01@x.y' },
    { 'user_name': 'Susan.Coles.01', 'password': 'X!d05ba79c', 'email': 'susan.coles.01@x.y' },
    { 'user_name': 'Anil.Coles.01', 'password': 'X!bead9756', 'email': 'anil.coles.01@x.y' },
    { 'user_name': 'Ellie.Coles.01', 'password': 'X!afd870b7', 'email': 'ellie.coles.01@x.y' },
    { 'user_name': 'Robert.Cuscal.01', 'password': 'X!5c20e368', 'email': 'robert.cuscal.01@x.y' },
    { 'user_name': 'Susan.Cuscal.01', 'password': 'X!47c82200', 'email': 'susan.cuscal.01@x.y' },
    { 'user_name': 'Anil.Cuscal.01', 'password': 'X!7ae6bb5d', 'email': 'anil.cuscal.01@x.y' },
    { 'user_name': 'Ellie.Cuscal.01', 'password': 'X!94a2034b', 'email': 'ellie.cuscal.01@x.y' },
    { 'user_name': 'Robert.Eftpos.01', 'password': 'X!e2c92fae', 'email': 'robert.eftpos.01@x.y' },
    { 'user_name': 'Susan.Eftpos.01', 'password': 'X!6a0063c3', 'email': 'susan.eftpos.01@x.y' },
    { 'user_name': 'Anil.Eftpos.01', 'password': 'X!8622bb0b', 'email': 'anil.eftpos.01@x.y' },
    { 'user_name': 'Ellie.Eftpos.01', 'password': 'X!626c841a', 'email': 'ellie.eftpos.01@x.y' },
    {
      'user_name': 'Robert.Mastercard.01',
      'password': 'X!8723ac5f',
      'email': 'robert.mastercard.01@x.y'
    },
    {
      'user_name': 'Susan.Mastercard.01',
      'password': 'X!153d42af',
      'email': 'susan.mastercard.01@x.y'
    },
    {
      'user_name': 'Anil.Mastercard.01',
      'password': 'X!8c508401',
      'email': 'anil.mastercard.01@x.y'
    },
    {
      'user_name': 'Ellie.Mastercard.01',
      'password': 'X!acd1d4bc',
      'email': 'ellie.mastercard.01@x.y'
    },
    { 'user_name': 'Robert.Nab.01', 'password': 'X!e45b5481', 'email': 'robert.nab.01@x.y' },
    { 'user_name': 'Susan.Nab.01', 'password': 'X!c6774d28', 'email': 'susan.nab.01@x.y' },
    { 'user_name': 'Anil.Nab.01', 'password': 'X!0250687d', 'email': 'anil.nab.01@x.y' },
    { 'user_name': 'Ellie.Nab.01', 'password': 'X!c35f31aa', 'email': 'ellie.nab.01@x.y' },
    { 'user_name': 'Robert.Rba.01', 'password': 'X!95ca9b6a', 'email': 'robert.rba.01@x.y' },
    { 'user_name': 'Susan.Rba.01', 'password': 'X!97ed7fa2', 'email': 'susan.rba.01@x.y' },
    { 'user_name': 'Anil.Rba.01', 'password': 'X!7bbe2a47', 'email': 'anil.rba.01@x.y' },
    { 'user_name': 'Ellie.Rba.01', 'password': 'X!8ef5bba3', 'email': 'ellie.rba.01@x.y' },
    { 'user_name': 'Robert.Suncorp.01', 'password': 'X!781a13f1', 'email': 'robert.suncorp.01@x.y' },
    { 'user_name': 'Susan.Suncorp.01', 'password': 'X!eddecaf5', 'email': 'susan.suncorp.01@x.y' },
    { 'user_name': 'Anil.Suncorp.01', 'password': 'X!9951e699', 'email': 'anil.suncorp.01@x.y' },
    { 'user_name': 'Ellie.Suncorp.01', 'password': 'X!8e922ba9', 'email': 'ellie.suncorp.01@x.y' },
    { 'user_name': 'Robert.Tyro.01', 'password': 'X!e91db950', 'email': 'robert.tyro.01@x.y' },
    { 'user_name': 'Susan.Tyro.01', 'password': 'X!722a7a0c', 'email': 'susan.tyro.01@x.y' },
    { 'user_name': 'Anil.Tyro.01', 'password': 'X!0a0c5e50', 'email': 'anil.tyro.01@x.y' },
    { 'user_name': 'Ellie.Tyro.01', 'password': 'X!f76e7acf', 'email': 'ellie.tyro.01@x.y' },
    { 'user_name': 'Robert.Westpac.01', 'password': 'X!5913dbc8', 'email': 'robert.westpac.01@x.y' },
    { 'user_name': 'Susan.Westpac.01', 'password': 'X!fc5c17ed', 'email': 'susan.westpac.01@x.y' },
    { 'user_name': 'Anil.Westpac.01', 'password': 'X!d4e8e7cd', 'email': 'anil.westpac.01@x.y' },
    { 'user_name': 'Ellie.Westpac.01', 'password': 'X!9b26dbbc', 'email': 'ellie.westpac.01@x.y' }
  ];
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type

  // Our translated text strings
  private loginErrorString: string;

  constructor(
    public navCtrl: NavController, public user: User, public toastCtrl: ToastController,
    public translateService: TranslateService, public http: Http, public obp: OBP) {

    this.translateService.get('LOGIN_ERROR').subscribe((value) => {
      this.loginErrorString = value;
    })
  }

  // Attempt to login in through our User service
  doLogin() {
    this.getAllTheUsersData();
    let headers = new Headers({
      Authorization:
      `DirectLogin username="${
      this.selected.user_name
      }",   password="${
      this.selected.password
      }",  consumer_key="nsarsbud0jyhx5oxawfqh0xnl3405tt0jb4y3nak"`
    });
    this.http.post('https://apc.openbankproject.com/my/logins/direct', {}, { headers })
      .map(res => res.json())
      .subscribe(
      (resp) => {
        let { token } = resp;
        localStorage.setItem('Authorization', `DirectLogin token="${token}"`);
        this.navCtrl.push(MainPage);
      },
      (err) => {

        // this.navCtrl.push(MainPage);
        // Unable to log in
        let toast = this.toastCtrl.create(
          { message: this.loginErrorString, duration: 3000, position: 'top' });
        toast.present();
      });
  }

  async getAllTheUsersData() {
    let storageUsers = JSON.parse(localStorage.getItem('users'));
    storageUsers = storageUsers ? storageUsers : {};
    let storageAccounts = JSON.parse(localStorage.getItem('accounts'));
    storageAccounts = storageAccounts ? storageAccounts : {};
    let storageTransactions = JSON.parse(localStorage.getItem('transactions'));
    storageTransactions = storageTransactions ? storageTransactions : {};

    //get user data
    let userData = <any> await this.obp.api.getCurrentUser().toPromise();
    storageUsers[userData.user_id] = userData;
    localStorage.setItem('users', JSON.stringify(storageUsers));

    //get all private accounts
    let privateAccounts = <any>await this.obp.api.corePrivateAccountsAllBanks().toPromise();
    for (let account of privateAccounts) {
      storageAccounts[account.id] = account;
      storageAccounts[account.id]['user_id'] = userData.user_id;
    }
    localStorage.setItem('accounts', JSON.stringify(storageAccounts));

    //get all transactions
    let transactionRequestPromises = [];
    for (let account of privateAccounts) {
      transactionRequestPromises.push(
        this.obp.api.getTransactionsForBankAccount('owner', account.id, account.bank_id)
          .map((transactionsReturn) => {
            for(let transaction of transactionsReturn.transactions) {
              transaction['account_id'] = account.id;
              transaction['user_id'] = userData.user_id;
            }
            return transactionsReturn.transactions;
          })
          .toPromise()
      );
    }
    let transactionArrays = await Promise.all(transactionRequestPromises);
    for(let transactionArray of transactionArrays) {
      for(let transaction of transactionArray) {
        storageTransactions[transaction.id] = transaction;
      }
    }
    localStorage.setItem('transactions', JSON.stringify(storageTransactions));
  }
}