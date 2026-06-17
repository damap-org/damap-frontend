import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrls: ['./tag.component.css'],
})
export class TagComponent {
  @Input() background = 'var(--custom-blue-tag)';
}
