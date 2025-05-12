import { Pipe, PipeTransform } from '@angular/core';
import { Storage } from '../../../../domain/storage';
import { InternalStorage } from '../../../../domain/internal-storage';

@Pipe({
  name: 'storageFilter',
  standalone: false,
})
export class StorageFilterPipe implements PipeTransform {
  transform(data: InternalStorage[], selected: Storage[]) {
    return data.filter(
      item => !selected?.find(entry => entry.internalStorageId === item.id),
    );
  }
}
