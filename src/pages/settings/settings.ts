import 'rxjs/add/operator/switchMap';

import {
  Component
} from '@angular/core';
import {
  FormBuilder
} from '@angular/forms';
import {
  Http,
} from '@angular/http';
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
import { of
} from 'rxjs/observable/of';

function domain_from_url(url) {
  var parser = document.createElement('a');
  parser.href = url;
  return parser;
}

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
  entitlements$: any;

  transactions$: any;
  data: any = {};
  localData: any = {};
  transactionsArray: any = [];

  constructor(
    public navCtrl: NavController, public formBuilder: FormBuilder, public navParams: NavParams,
    public translate: TranslateService, public obp: OBP, public http: Http) {}

  ngOnInit() {
    this.user$ = this.obp.api.getCurrentUser();
    this.entitlements$ = this.user$.switchMap(({
      user_id
    }) => this.obp.api.getEntitlements(user_id));

    let words = ['rewards', 'reward', 'loyalty', 'points', 'point'];
    this.transactions$ =
      this.obp.api.corePrivateAccountsAllBanks()
      .switchMap((accts: any) => {
        return combineLatest(accts.map((acct) => {
          return this.obp.api.accountById('owner', acct.id, acct.bank_id);
        }));
      })
      .switchMap((accts: any) => {
        let filtered =
          accts.filter((acc) => acc.views_available.find((view) => view.id === 'owner'));
        return combineLatest(filtered.map((acct) => {
          return this.obp.api.getTransactionsForBankAccount('owner', acct.id, acct.bank_id);
        }));
      })
      .map(transactions => {
        let txs = transactions.map(({
            transactions
          }) => transactions)
          .reduce((a, b) => a.concat(b))
          .reduce((a, b) => {
            console.log(b);
            a[b.other_account.metadata.URL] = [...a[b.other_account.metadata.URL] || [], b];
            return a;
          }, {});
        return Object.keys(txs);
      })
      .switchMap((urls) => {
        return combineLatest(urls.filter((url) => url !== 'null').map((url) => {
          let parsed = < any > domain_from_url(url);
          return this.http.get(parsed.origin)
            .catch(() => of ({
              text: function () {
                return '';
              }
            }))
            .map((res) => res.text())
            .filter((val) => !!val)
            .map((str) => {
              let a = str.match(/href="([^\'\"]+)/g);
              if (a === null) {
                return [parsed.origin, []];
              }
              let b = a.map((val) => val.slice(6))
                .filter(
                  (str) => str.includes('rewards') || str.includes('reward') ||
                  str.includes('loyalty') || str.includes('points'));
              return [parsed.origin, b || []];
            });
        }));
      });
  }

  open(domain: string, links: string[]) {
    links.forEach((link) => {
      console.log(link);
      if (link[0] === '/') {
        window.open(domain + link);
        return;
      } else {
        window.open(link, '_blank');
      }
    });
  }

  total(vals: any[]) {
    return vals.reduce((a, b) => {
      let c = a + +b.details.value.amount;
      return c;
    }, 0)
  }
}
