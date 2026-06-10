import { NgModule } from '@angular/core';
import { TreeSelectFormFieldComponent } from './tree-select-form-field.component';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { TranslateModule } from '@ngx-translate/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    // Materials
    MatFormFieldModule,
    MatChipsModule,
    MatInputModule,
    MatAutocompleteModule,
    MatOptionModule,
    MatTreeModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    TreeSelectFormFieldComponent,
  ],
  exports: [
    CommonModule,
    TranslateModule,
    TreeSelectFormFieldComponent,
    // Materials
    MatFormFieldModule,
    MatChipsModule,
    MatInputModule,
    MatAutocompleteModule,
    MatOptionModule,
    MatTreeModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
  ],
})
export class TreeSelectFormFieldModule {}
