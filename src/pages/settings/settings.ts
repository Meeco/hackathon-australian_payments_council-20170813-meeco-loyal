import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { NavController, NavParams } from 'ionic-angular';

import { OBP } from '../../providers/obp';

/**
 * The Settings page is a simple form that syncs with a Settings provider
 * to enable the user to customize settings for the app.
 *
 */
@Component({ selector: 'page-settings', templateUrl: 'settings.html' })
export class SettingsPage {
  // Our local settings object
  options: any;

  settingsReady = false;

  form: FormGroup;

  profileSettings = { page: 'profile', pageTitleKey: 'SETTINGS_PAGE_PROFILE' };

  page: string = 'main';
  pageTitleKey: string = 'SETTINGS_TITLE';
  pageTitle: string;

  subSettings: any = SettingsPage;
  user$: any;
  data: any = {};
  localData: any = {};

  constructor(
    public navCtrl: NavController, public formBuilder: FormBuilder, public navParams: NavParams,
    public translate: TranslateService, public obp: OBP) { }

  ngOnInit() {
    this.user$ = this.obp.api.getCurrentUser();

    //fresh data
    this.data.privateAccountTransactions = [];
    this.data.counterparties = [];
    this.obp.api.getCurrentUser().subscribe(userData => {
      this.data.userData = userData;
    });
    this.obp.api.corePrivateAccountsAllBanks().subscribe((privateAccounts: any) => {
      this.data.privateAccounts = privateAccounts;
      for (let account of this.data.privateAccounts) {
        this.obp.api.getTransactionsForBankAccount('owner', account.id, account.bank_id)
          .subscribe(transactionsReturn => {
            this.data.privateAccountTransactions.push(...transactionsReturn.transactions);
          });

        this.obp.api.getCounterpartiesForAccount('owner', account.id, account.bank_id).subscribe((counterparitesReturn) => {
          this.data.counterparties.push(...counterparitesReturn.counterparties);
        });
      }
    });


    //local storage data
    let accounts = JSON.parse(localStorage.getItem('accounts'));
    this.localData.accounts = accounts ? accounts : {};
    let transactions = JSON.parse(localStorage.getItem('transactions'));
    this.localData.transactions = transactions ? transactions : {};
    let users = JSON.parse(localStorage.getItem('users'));
    this.localData.users = users ? users : {};


  }

  _buildForm() {
    let group: any = {
      option1: [this.options.option1],
      option2: [this.options.option2],
      option3: [this.options.option3]
    };

    switch (this.page) {
      case 'main':
        break;
      case 'profile':
        group = { option4: [this.options.option4] };
        break;
    }
    this.form = this.formBuilder.group(group);
  }

  ionViewDidLoad() {
    // Build an empty form for the template to render
    this.form = this.formBuilder.group({});
  }

  ionViewWillEnter() {
    // Build an empty form for the template to render
    this.form = this.formBuilder.group({});

    this.page = this.navParams.get('page') || this.page;
    this.pageTitleKey = this.navParams.get('pageTitleKey') || this.pageTitleKey;

    this.translate.get(this.pageTitleKey).subscribe((res) => {
      this.pageTitle = res;
    });
  }

  ngOnChanges() {
    console.log('Ng All Changes');
  }
}
