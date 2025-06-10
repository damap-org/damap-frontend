import { Component, Input } from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'app-flip-card',
  templateUrl: './flip-card.component.html',
  styleUrls: ['./flip-card.component.css'],
})
export class FlipCardComponent {
  @Input() frontContent: string;
  @Input() backContent: string;
  @Input() navigateRoute: string;
  @Input() iconCard: string;

  constructor(private router: Router) {}

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
