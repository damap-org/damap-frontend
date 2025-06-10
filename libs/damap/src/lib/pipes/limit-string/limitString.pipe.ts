import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'limitString',
  standalone: true,
})
export class LimitStringPipe implements PipeTransform {
  transform(text: string, limit: number): string {
    text = text ?? '';
    return text.length > limit ? `${text.slice(0, limit)}...` : text;
  }
}
