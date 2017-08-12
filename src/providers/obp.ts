import {Injectable} from '@angular/core';
import {DefaultService} from '@obp/sdk';

@Injectable()
export class OBP {
  constructor(public api: DefaultService) {}
  test() {}
}
