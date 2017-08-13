import { Component} from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import {ListMasterPage} from '../list-master/list-master';

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {

  constructor(public navCtrl: NavController, public platform: Platform) { }

  start() {
    this.navCtrl.push(ListMasterPage);
  }
}
