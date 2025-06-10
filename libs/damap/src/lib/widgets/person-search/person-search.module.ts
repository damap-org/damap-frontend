import { NgModule } from '@angular/core';
import { PersonSearchComponent } from './person-search.component';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [PersonSearchComponent],
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    SharedModule,

    // Materials
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatAutocompleteModule,
    MatOptionModule,
    MatListModule,
  ],
  exports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    PersonSearchComponent,
    SharedModule,

    // Materials
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatAutocompleteModule,
    MatOptionModule,
  ],
})
export class PersonSearchModule {}
