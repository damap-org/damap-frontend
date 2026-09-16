import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-info-message',
  templateUrl: './info-message.component.html',
  styleUrls: ['./info-message.component.css'],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [MatIcon],
})
export class InfoMessageComponent {}
