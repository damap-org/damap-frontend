import { Pipe, PipeTransform } from '@angular/core';
import { Dataset } from '../../domain/dataset';
import { DataSource } from '../../domain/enum/data-source.enum';

@Pipe({
  name: 'datasetSource',
  standalone: false,
})
export class DatasetSourcePipe implements PipeTransform {
  transform(datasets: Dataset[], source: DataSource): unknown {
    return datasets?.filter(item => item.source === source);
  }
}
