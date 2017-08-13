import {Pipe} from '@angular/core';

@Pipe({name: 'url'})
export class URLPipe {
  transform(url: string, args: string): string {
    let a: any = document.createElement('a');
    a.href = url;
    return a.host;
  }
}