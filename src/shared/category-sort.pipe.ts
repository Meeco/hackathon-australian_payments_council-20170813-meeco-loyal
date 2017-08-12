import {Pipe} from '@angular/core';

@Pipe({name: 'categorySort'})
export class CategorySortPipe {
  transform(array: Array<string>, args: string): Array<string> {
    array.sort((a: any, b: any) => {
      let name1 = a[0].toLowerCase();
      let name2 = b[0].toLowerCase();
      if (name1 < name2) {
        return -1;
      } else if (name1 > name2) {
        return 1;
      } else {
        return 0;
      }
    });
    return array;
  }
}