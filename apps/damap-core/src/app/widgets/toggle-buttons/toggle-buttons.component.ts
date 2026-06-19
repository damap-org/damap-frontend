import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {
  Component,
  Input,
  OnInit,
  inject,
  ChangeDetectionStrategy,
  input,
  output,
} from '@angular/core';
import { MatButton } from '@angular/material/button';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-toggle-buttons',
  templateUrl: './toggle-buttons.component.html',
  styleUrls: ['./toggle-buttons.component.css'],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [MatButton, TranslatePipe],
})
export class ToggleButtonsComponent implements OnInit {
  private breakpointObserver = inject(BreakpointObserver);

  @Input() selectedView: 'primaryView' | 'secondaryView' = 'primaryView';
  readonly primaryLabel = input<string>(undefined);
  readonly secondaryLabel = input<string>(undefined);

  readonly selectionChange = output<'primaryView' | 'secondaryView'>();

  cols: number = 2;

  ngOnInit(): void {
    this.emitSelection('primaryView');
    this.breakpointObserver
      .observe([Breakpoints.XSmall, Breakpoints.XSmall])
      .subscribe(result => {
        // If matches handset or tablet, set 1 column, else 2 columns
        this.cols = result.matches ? 1 : 2;
      });
  }

  emitSelection(view: 'primaryView' | 'secondaryView'): void {
    this.selectedView = view;
    this.selectionChange.emit(view);
  }
}
