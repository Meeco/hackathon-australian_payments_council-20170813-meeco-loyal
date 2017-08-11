import {Component} from '@angular/core';
import {ModalController, NavController} from 'ionic-angular';
import {Observable} from 'rxjs/Observable';

import {Item} from '../../models/item';
import {Items} from '../../providers/providers';
import {ItemCreatePage} from '../item-create/item-create';
import {ItemDetailPage} from '../item-detail/item-detail';

@Component({selector: 'page-list-master', templateUrl: 'list-master.html'})
export class ListMasterPage {
  currentItems$: any;

  constructor(
      public navCtrl: NavController, public items: Items, public modalCtrl: ModalController) {
    this.currentItems$ = this.items.query({id: 'au.01.aum.anz'});
  }

  /**
   * The view loaded, let's query our items for the list
   */
  ionViewDidLoad() {}

  /**
   * Prompt the user to add a new item. This shows our ItemCreatePage in a
   * modal and then adds the new item to our data source if the user created one.
   */
  addItem() {
    let addModal = this.modalCtrl.create(ItemCreatePage);
    addModal.onDidDismiss(item => {
      if (item) {
        this.items.add(item);
      }
    })
    addModal.present();
  }

  /**
   * Delete an item from the list of items.
   */
  deleteItem(item) {
    this.items.delete(item);
  }

  /**
   * Navigate to the detail page for this item.
   */
  openItem(item: Item) {
    this.navCtrl.push(ItemDetailPage, {item: item});
  }
  avatar(short_name: string) {
    return `https://api.adorable.io/avatars/285/${short_name}.png`
  }
}
