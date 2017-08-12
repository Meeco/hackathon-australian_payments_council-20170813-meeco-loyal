import 'rxjs/add/operator/switchMap';

import {
  Component
} from '@angular/core';
import {
  FormBuilder,
  FormGroup
} from '@angular/forms';
import {
  TranslateService
} from '@ngx-translate/core';
import {
  NavController,
  NavParams
} from 'ionic-angular';
import {
  combineLatest
} from 'rxjs/observable/combineLatest';

import {
  OBP
} from '../../providers/obp';

/**
 * The Settings page is a simple form that syncs with a Settings provider
 * to enable the user to customize settings for the app.
 *
 */
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {
  user$: any;
  transactions$: any;
  data: any = {};
  localData: any = {};
  transactionsArray: any = [];

  constructor(
    public navCtrl: NavController, public formBuilder: FormBuilder, public navParams: NavParams,
    public obp: OBP) {}

  ngOnInit() {
    this.user$ = this.obp.api.getCurrentUser();

    // local storage data
    let accounts = JSON.parse(localStorage.getItem('accounts'));
    this.localData.accounts = accounts ? accounts : {};

    let transactions = JSON.parse(localStorage.getItem('transactions'));
    this.localData.transactions = transactions ? transactions : {};

    let users = JSON.parse(localStorage.getItem('users'));
    this.localData.users = users ? users : {};

    this.transactions$ =
      this.obp.api.corePrivateAccountsAllBanks()
      .switchMap((accts: any) => {
        return combineLatest(accts.map((acct) => {
          return this.obp.api.getTransactionsForBankAccount('owner', acct.id, acct.bank_id);
        }));
      })
      .map(transactions => {
        let txs = transactions.map(({
            transactions
          }) => transactions)
          .reduce((a, b) => a.concat(b))
          .reduce((a, b) => {
            a[b.other_account.metadata.URL] = [...a[b.other_account.metadata.URL] || [], b];
            return a;
          }, {});
        return Object.keys(txs).map((key) => {
          let tx = txs[key]
          return [key, tx];
        });

      });
  }

  total(vals: any[]) {
    return vals.reduce((a, b) => {
      let c = a + +b.details.value.amount;
      return c;
    }, 0)
  }
}
