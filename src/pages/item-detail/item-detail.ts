import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

import {Items} from '../../providers/providers';

@Component({selector: 'page-item-detail', templateUrl: 'item-detail.html'})
export class ItemDetailPage {
  conversion = 100;
  merchant: any = 'https://www.nab.com.au';
  offers: string[] = [
    'https://www.nab.com.au/sites/personal/credit-cards/rewards',
    'https://www.nab.com.au/sites/personal/credit-cards/rewards'
  ];
  mock: string[] = [
    'Signup Bonus: 100,000 points',
    'Purchases In First Month: 20,000 points',
    'Purchases In First Month: 20,000 points',
  ];
  total: number = 650;
  constructor(public navCtrl: NavController, navParams: NavParams, items: Items) {}
  ngOnInit() {}
  floor(val: number) {
    return Math.floor(val);
  }
  open(link) {
    if (link[0] === '/') {
      window.open(this.merchant + link);
      return;
    } else {
      window.open(link, '_blank');
    }
  }
}
