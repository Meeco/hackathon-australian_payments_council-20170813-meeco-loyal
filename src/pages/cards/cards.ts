import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
// TODO: 
// - skip categories that only have 1 merchant as nothing to compare


@Component({
  selector: 'page-cards',
  templateUrl: 'cards.html'
})
export class CardsPage {
  merchants: any[];
  categories: any[];
  transactions: any[];

  constructor(public navCtrl: NavController) {
    let cp = JSON.parse(localStorage.getItem('counterparties'));
    let parties: any[] = Object.entries(cp);
    let cat = {};
    parties.forEach(party => {
      // We have multiple accounts but we only need 1 to get the URL,
      // which we can use to associate transactions to a merchant
      let account = Object.entries(party[1].accounts)[0][1];
      if (!cat[account.metadata.more_info]) {
        cat[account.metadata.more_info] = [];
      }
      // Add a random points per dollar #
      account.pointsPerDollar = Math.floor(Math.random() * 1000);

      cat[account.metadata.more_info].push(account)
    });
    this.categories = Object.entries(cat).filter((cat: any) => {
      return cat[1].length > 1;
    });

    this.transactions = Object.entries(JSON.parse(localStorage.getItem('transactions')));
  }

  merchantSpend(urlId: string) {
    return this.round(this.transactions.filter(trans => {
      return trans[1].other_account.metadata.URL === urlId;
    }).reduce((a, b) => {
      return a + Math.abs(b[1].details.value.amount);
    }, 0), 2);
  }

  round(value, exp) {
    if (typeof exp === 'undefined' || +exp === 0)
      return Math.round(value);
  
    value = +value;
    exp = +exp;
  
    if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0))
      return NaN;
  
    // Shift
    value = value.toString().split('e');
    value = Math.round(+(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp)));
  
    // Shift back
    value = value.toString().split('e');
    return +(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp));
  }  
}
