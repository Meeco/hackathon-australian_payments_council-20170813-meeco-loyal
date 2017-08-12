import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ItemDetailPage } from '../item-detail/item-detail';

import { Item } from '../../models/item';

import { Items } from '../../providers/providers';


@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage implements OnInit{
  currentItems: any = [];
  counterparties = [];
  users = [];
  transactions = [];
  selected = null;

  constructor(public navCtrl: NavController, public navParams: NavParams, public items: Items) {
    
  }

  ngOnInit(): void {
    this.getCounterparties();
    this.getTransactions();
    this.getUsers();
  }

  /**
   * Perform a service for the proper items.
   */
  getItems(ev) {
    let val = ev.target.value;
    if (!val || !val.trim()) {
      this.currentItems = [];
      return;
    }
    this.currentItems = this.items.query({
      name: val
    });
  }

  /**
   * Navigate to the detail page for this item.
   */
  openItem(item: Item) {
    this.navCtrl.push(ItemDetailPage, {
      item: item
    });
  }

  getList() {
    let userList = {};
    if(this.selected) {
      for(let transaction of this.transactions) {

        if(transaction.other_account.metadata.URL === this.selected.URL) {
          if(!userList[transaction.user_id]) {
            userList[transaction.user_id] = {
              user: this.users[transaction.user_id], 
              amount: parseFloat(transaction.details.value.amount),
              transactions: [transaction]
            }
          } else {
            userList[transaction.user_id].amount = userList[transaction.user_id].amount + parseFloat(transaction.details.value.amount);
            userList[transaction.user_id].transactions.push(transaction)
          }
        }
      }
      
    }
    return Object.keys(userList).map(function(key) {
      return userList[key];
    });
  }

  getCounterparties() {
    let counterparties = JSON.parse(localStorage.getItem('counterparties'));
    this.counterparties = Object.keys(counterparties).map(function(key) {
      return counterparties[key];
    });
  }

  getUsers() {
    this.users = JSON.parse(localStorage.getItem('users'));
  }

  getTransactions() {
    let transactions = JSON.parse(localStorage.getItem('transactions'));
    this.transactions = Object.keys(transactions).map(function(key) {
      return transactions[key];
    });
  }

}
