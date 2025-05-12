import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'byte',
  standalone: false,
})
export class BytePipe implements PipeTransform {
  transform(value: number): string {
    if (!value) {
      return '';
    }
    if (value < 0) {
      return 'Unkown';
    }
    if (value <= 1000000) {
      return '< ' + (value / 1000).toFixed(0) + ' KB';
    }
    if (value <= 1000000000) {
      return '< ' + (value / 1000000).toFixed(0) + ' MB';
    }
    if (value <= 1000000000000) {
      return '< ' + (value / 1000000000).toFixed(0) + ' GB';
    }
    if (value <= 1000000000000000) {
      return '< ' + (value / 1000000000000).toFixed(0) + ' TB';
    }
    return '> 1PB';
  }
}
