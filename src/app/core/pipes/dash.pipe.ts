import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dash',
  standalone: true
})
export class DashPipe implements PipeTransform {

  // transform(value: unknown, ...args: unknown[]): unknown {
  //   return null;
  // }

  transform(value: unknown): unknown {
    let val: any;
    if (value == undefined || value == null || value == "" || value == "null" || value == 'undefined' || value == " ") {
      if (value === 0) {
        val = 0;
      }else{
        val = '-';
      }
    } else {
      val = value
    }
    return val;
  }

}
