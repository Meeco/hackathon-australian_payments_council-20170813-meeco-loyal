import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

import {Item} from '../../models/item';
import {OBP} from '../../providers/obp';

@Injectable()
export class Items {
  constructor(public api: OBP) {}

  query(params?: any) {
    return this.api.api.getBanks();
  }

  add(item: Item) {}

  delete(item: Item) {}
}
