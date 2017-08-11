import {Injectable} from '@angular/core';
import {Func_1_2_1Service, Func_1_3_0Service, Func_1_4_0Service, Func_2_0_0Service, Func_2_1_0Service, Func_2_2_0Service, Func_3_0_0Service} from '@obp/sdk';

@Injectable()
export class OBP {
  constructor(
      public api3: Func_3_0_0Service, public api22: Func_2_2_0Service,
      public api21: Func_2_1_0Service, public api20: Func_2_0_0Service,
      public api14: Func_1_4_0Service, public api13: Func_1_3_0Service,
      public api12: Func_1_2_1Service) {}
  test() {}
}
