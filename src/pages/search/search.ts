import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { ItemDetailPage } from '../item-detail/item-detail';

import { Item } from '../../models/item';

import { Items } from '../../providers/providers';

import { usersMock } from "../../mocks/users";
import { accountsMock } from "../../mocks/accounts";
import { counterpartiesMock } from "../../mocks/counterparties";
import { transactionsMock } from "../../mocks/transactions";


@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage implements OnInit{
  currentItems: any = [];
  counterparties = [];
  users = {};
  transactions = [];
  selected = null;

  constructor(public navCtrl: NavController, public navParams: NavParams, public items: Items, 
    private storage: Storage) {
    this.selected = JSON.parse(localStorage.getItem('LoggedInMerchant'));
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
    let self = this;
    let userList = {};
    if(this.selected) {
      for(let transaction of this.transactions) {


        if(transaction.other_account.metadata.URL === this.selected.URL) {
          if(!userList[transaction.user_id]) {
            userList[transaction.user_id] = {
              user: this.users[transaction.user_id], 
              amount: (parseFloat(transaction.details.value.amount) * -1),
              transactions: [transaction]
            }
          } else {
            userList[transaction.user_id].amount = userList[transaction.user_id].amount + (parseFloat(transaction.details.value.amount) * -1);
            userList[transaction.user_id].transactions.push(transaction)
          }
        }
      }
      
    }
    console.log(`user list is ${JSON.stringify(Object.keys(userList).map(function(key) {
      return userList[key];
    }).length)}`)
    let listToOrder =  Object.keys(userList).map(function(key) {
      return userList[key];
    });
    return listToOrder.sort((a, b) => {
      if(a.amount < b.amount) {
        return 1
      } else if (a.amount > b.amount) {
        return -1
      } else {
        return 0;
      }
    })
  }

  async getCounterparties() {
    let counterparties = counterpartiesMock;
    // let counterparties = await this.storage.get('counterparties');
    // let counterparties = JSON.parse(localStorage.getItem('counterparties'));
    this.counterparties = Object.keys(counterparties).map(function(key) {
      return counterparties[key];
    });
  }

  async getUsers() {
    this.users = usersMock;
    // this.users = await this.storage.get('users');
    // this.users = JSON.parse(localStorage.getItem('users'));
  }

  async getTransactions() {
    let transactions = transactionsMock;
    // let transactions = await this.storage.get('transactions');
    // let transactions = JSON.parse(localStorage.getItem('transactions'));
    this.transactions = Object.keys(transactions).map(function(key) {
      return transactions[key];
    });
  }

}
