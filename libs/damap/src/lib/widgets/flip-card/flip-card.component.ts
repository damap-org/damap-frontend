import { Component, Input, inject } from '@angular/core';

import { Router } from '@angular/router';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-flip-card',
  templateUrl: './flip-card.component.html',
  styleUrls: ['./flip-card.component.css'],
  imports: [MatIcon],
})
export class FlipCardComponent {
  private router = inject(Router);

  @Input() frontContent: string;
  @Input() backContent: string;
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
