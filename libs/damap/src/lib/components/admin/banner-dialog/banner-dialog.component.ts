import { Component, inject, ChangeDetectionStrategy } from '@angular/core';

import {
  FormControl,
  UntypedFormControl,
  UntypedFormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
} from '@angular/material/dialog';
import { FormService } from '../../../services/form.service';
import { Banner } from '../../../domain/banner';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { InputWrapperComponent } from '../../../shared/input-wrapper/input-wrapper.component';
import { MatTooltip } from '@angular/material/tooltip';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatButton } from '@angular/material/button';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'damap-banner-dialog',
  templateUrl: './banner-dialog.component.html',
  styleUrl: './banner-dialog.component.css',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    MatDialogTitle,
    CdkScrollable,
    MatDialogContent,
    FormsModule,
    ReactiveFormsModule,
    InputWrapperComponent,
    MatTooltip,
    MatCheckbox,
    MatDialogActions,
    MatButton,
    TranslatePipe,
  ],
})
export class BannerDialogComponent {
  dialogRef = inject<MatDialogRef<BannerDialogComponent>>(MatDialogRef);
  private formService = inject(FormService);
  data = inject<{
    banner: Banner;
    mode: string;
  }>(MAT_DIALOG_DATA);

  public mode = 'add';
  banner: UntypedFormGroup;

  constructor() {
    const data = this.data;

    this.banner = this.formService.createBannerFormGroup();

    if (data.banner) {
      this.banner.patchValue(data.banner);
    }

    this.mode = data.mode ?? this.mode;
  }

  get title(): UntypedFormControl {
    return this.banner.get('title') as UntypedFormControl;
  }

  get description(): UntypedFormControl {
    return this.banner.get('description') as UntypedFormControl;
  }

  get color(): UntypedFormControl {
    return this.banner.get('color') as UntypedFormControl;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onDialogClose() {
    this.dialogRef.close(this.banner.value);
  }

  isDisabled(): boolean {
    return !this.banner.valid || (!this.banner.dirty && this.mode === 'add');
  }
}
