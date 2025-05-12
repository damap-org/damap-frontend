import { Pipe, PipeTransform } from '@angular/core';
import { LicenseDetails } from '../../domain/license-details';

@Pipe({
  name: 'licenseFilter',
  standalone: false,
})
export class LicenseFilterPipe implements PipeTransform {
  transform(data: LicenseDetails[], searchText: string) {
    if (searchText == null || data == null) {
      return data;
    }
    return data.filter(
      item =>
        item.available &&
        item.name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1,
    );
  }
}
