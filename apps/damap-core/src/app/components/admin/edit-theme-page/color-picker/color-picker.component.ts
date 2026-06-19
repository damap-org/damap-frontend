import {
  Component,
  ViewChild,
  ElementRef,
  ChangeDetectionStrategy,
  input,
  output,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatCheckbox } from '@angular/material/checkbox';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.css'],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [MatCheckbox, ReactiveFormsModule, TranslatePipe],
})
export class ColorPickerComponent {
  readonly control = input.required<FormControl>();
  readonly colorTitle = input.required<string>();
  readonly controlName = input.required<string>();
  readonly canDisable = input(true);

  readonly changedEnableStatus = output<{
    controlName: string;
    enabled: boolean;
  }>();

  @ViewChild('colorInput', { static: true })
  colorInputRef!: ElementRef<HTMLInputElement>;

  onToggleEnabled(checked: boolean): void {
    this.changedEnableStatus.emit({
      controlName: this.controlName(),
      enabled: checked,
    });
    event?.stopPropagation();
  }

  onPickerControlsClick(event: MouseEvent): void {
    if (this.isDisabled) return;
    if ((event.target as HTMLElement).closest('mat-checkbox')) return;
    this.colorInputRef.nativeElement?.click();
  }

  get isDisabled(): boolean {
    return this.control().disabled;
  }
}
