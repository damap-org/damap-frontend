import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  UntypedFormControl,
  UntypedFormGroup,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormService } from '../../../services/form.service';
import { Banner } from '../../../domain/banner';

@Component({
  selector: 'damap-banner-dialog',
  templateUrl: './banner-dialog.component.html',
  styleUrl: './banner-dialog.component.css',
  standalone: false,
})
export class BannerDialogComponent {
  public mode = 'add';
  banner: UntypedFormGroup;

  constructor(
    public dialogRef: MatDialogRef<BannerDialogComponent>,
    private formService: FormService,
    @Inject(MAT_DIALOG_DATA)
    public data: { banner: Banner; mode: string },
  ) {
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
