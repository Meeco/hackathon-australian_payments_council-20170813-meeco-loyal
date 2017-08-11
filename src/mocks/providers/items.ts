import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

import {Item} from '../../models/item';
import {OBP} from '../../providers/obp';

@Injectable()
export class Items {
  constructor(public api: OBP) {
    this.api.api13;
    this.api.api14;
    this.api.api20;
    this.api.api21;
    this.api.api22;
  }

  query(params?: any) {
    return this.api.api12.func121GetBanks();
  }

  add(item: Item) {}

  delete(item: Item) {}
}
