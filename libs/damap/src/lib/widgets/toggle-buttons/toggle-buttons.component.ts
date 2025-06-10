import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-toggle-buttons',
  templateUrl: './toggle-buttons.component.html',
  styleUrls: ['./toggle-buttons.component.css'],
})
export class ToggleButtonsComponent {
  @Input() selectedView: 'primaryView' | 'secondaryView' = 'primaryView';
  @Input() primaryLabel: string;
  @Input() secondaryLabel: string;

  @Output() selectionChange = new EventEmitter<
    'primaryView' | 'secondaryView'
  >();

  cols: number = 2;
  constructor(private breakpointObserver: BreakpointObserver) {}

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
