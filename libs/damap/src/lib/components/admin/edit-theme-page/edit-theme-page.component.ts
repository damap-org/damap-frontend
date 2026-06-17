import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ColorPickerComponent } from './color-picker/color-picker.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { ColorThemeService } from '../../../../../../../apps/damap-frontend/src/app/services/color-theme.service';
import { TranslatePipe } from '@ngx-translate/core';
import { FeedbackService } from '../../../services/feedback.service';
import { FormService } from '../../../services/form.service';

@Component({
  selector: 'app-admin-color-picker',
  templateUrl: './edit-theme-page.component.html',
  styleUrls: ['./edit-theme-page.component.css'],
  standalone: true,
  imports: [
    FormsModule,
    MatCheckbox,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    ColorPickerComponent,
    TranslatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditThemePageComponent implements OnInit {
  private readonly colorThemeService = inject(ColorThemeService);
  private readonly formService = inject(FormService);
  private readonly router = inject(Router);
  private readonly feedBackService = inject(FeedbackService);

  readonly colorsSignal = this.colorThemeService.colorsSignal;
  readonly savedColorsSignal = this.colorThemeService.savedColorsSignal;
  readonly exactColorModeSignal = this.colorThemeService.exactColorModeSignal;
  readonly advancedModeSignal = signal(false);

  colorsForm: any;

  constructor() {}

  ngOnInit() {
    if (
      this.colorsSignal()['primaryContainer'] ||
      this.colorsSignal()['secondaryContainer'] ||
      this.colorsSignal()['tertiaryContainer']
    ) {
      this.advancedModeSignal.set(true);
    }

    this.colorsForm = this.formService.createColorsFormGroup(
      this.colorsSignal(),
      this.savedColorsSignal(),
      this.advancedModeSignal(),
    );

    this.colorsForm.valueChanges.subscribe(value => {
      this.colorsSignal.set(this.colorsForm.getRawValue());
    });
  }

  onSave() {
    this.colorThemeService.saveColors().subscribe({
      next: response => {
        this.feedBackService.success('admin.theme.popup.success');
      },
      error: error => {
        this.feedBackService.error('admin.theme.popup.error');
      },
    });
  }

  onColorEnabledChange(event: { controlName: string; enabled: boolean }): void {
    const { controlName, enabled } = event;
    const control = this.colorsForm.get(controlName);
    if (enabled) {
      const value = this.savedColorsSignal()[controlName] || '#ffffff';
      control?.enable();
      control?.setValue(value);
    } else {
      control?.setValue(null);
      control?.disable();
    }
  }

  navigateBack(): void {
    this.router.navigate(['/admin']);
  }
}
