import {
  Component,
  Input,
  inject,
  ChangeDetectionStrategy,
  input,
} from '@angular/core';

import { Router } from '@angular/router';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-flip-card',
  templateUrl: './flip-card.component.html',
  styleUrls: ['./flip-card.component.css'],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [MatIcon],
})
export class FlipCardComponent {
  private router = inject(Router);

  readonly frontContent = input<string>(undefined);
  readonly backContent = input<string>(undefined);
  @Input() navigateRoute: string;
  @Input() iconCard: string;

  navigateTo() {
    if (this.navigateRoute) {
      this.router.navigate([this.navigateRoute]);
    }
  }

  onKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      this.navigateTo();
      event.preventDefault();
    }
  }
}
