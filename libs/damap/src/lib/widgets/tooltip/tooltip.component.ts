import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.css'],
  standalone: false,
})
export class TooltipComponent {
  @Input() tooltip: string;
}
