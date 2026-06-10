import { NgModule } from '@angular/core';
import { BytePipe } from './byte.pipe';

@NgModule({
  imports: [BytePipe],
  exports: [BytePipe],
})
export class ByteModule {}
