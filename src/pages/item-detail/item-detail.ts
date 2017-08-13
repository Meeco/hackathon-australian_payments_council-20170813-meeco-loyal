import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

@Component({selector: 'page-item-detail', templateUrl: 'item-detail.html'})
export class ItemDetailPage {
  exists: boolean;
  compare
  conversions = [
    {merchant: 'Woolworths', rate: 150},
    {
      merchant: 'IGA',
      rate: 125,
    },
  ];
  conversion = 100;
  merchant: any = 'https://www.nab.com.au';
  links: any[];
  offers: string[] = [
    'https://www.nab.com.au/sites/personal/credit-cards/rewards',
    'https://www.nab.com.au/sites/personal/credit-cards/rewards',
    'https://www.nab.com.au/sites/personal/credit-cards/rewards'
  ];
  mock: {title: string, points: string}[] = [
    {title: 'Platinum Offer', points: '110,000'}, {title: 'Spend $25000', points: '50,000'},
    {title: 'Bonus Points', points: '60,000'},    {title: 'Platinum Offer', points: '110,000'},
    {title: 'Spend $25000', points: '50,000'},    {title: 'Bonus Points', points: '60,000'},
    {title: 'Platinum Offer', points: '110,000'}, {title: 'Spend $25000', points: '50,000'},
    {title: 'Bonus Points', points: '60,000'},    {title: 'Platinum Offer', points: '110,000'},
    {title: 'Spend $25000', points: '50,000'},    {title: 'Bonus Points', points: '60,000'},
    {title: 'Platinum Offer', points: '110,000'}, {title: 'Spend $25000', points: '50,000'},
    {title: 'Bonus Points', points: '60,000'},    {title: 'Platinum Offer', points: '110,000'},
    {title: 'Spend $25000', points: '50,000'},    {title: 'Bonus Points', points: '60,000'},
    {title: 'Platinum Offer', points: '110,000'}, {title: 'Spend $25000', points: '50,000'},
    {title: 'Bonus Points', points: '60,000'},    {title: 'Platinum Offer', points: '110,000'},
    {title: 'Spend $25000', points: '50,000'},    {title: 'Bonus Points', points: '60,000'},

  ];
  total: number = 0;
  constructor(public navCtrl: NavController, navParams: NavParams) {
    const payload = navParams.get('payload');
    this.total = payload.totalSpend;
    this.exists = payload.exists;
    this.merchant = payload.domain;
    this.links = payload.links;
  }
  ngOnInit() {}
  floor(val: number) {
    return Math.floor(val);
  }
  parse(link: string) {
    if (link[0] === '/') {
      return this.merchant + link;
    } else {
      return link
    }
  }
  open(link) {
    return window.open(this.parse(link));
  }
  joinNow() {
    return window.open(this.links[0]);
  }
  getDetails(id: string) {
    return this.conversions.find(({merchant}) => merchant === id);
  }
}
