import { Component, ChangeDetectionStrategy, input } from '@angular/core';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrls: ['./tag.component.css'],
})
export class TagComponent {
  readonly background = input('var(--custom-blue-tag)');
}
