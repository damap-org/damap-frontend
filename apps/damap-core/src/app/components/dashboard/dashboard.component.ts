import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { InfoCardComponent } from '../../widgets/info-card/info-card.component';
import { MatCard, MatCardContent } from '@angular/material/card';
import { FlipCardComponent } from '../../widgets/flip-card/flip-card.component';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    InfoCardComponent,
    MatCard,
    MatCardContent,
    FlipCardComponent,
    TranslatePipe,
  ],
})
export class DashboardComponent {
  readonly breakpointObserver = inject(BreakpointObserver);

  isSmallScreen = false;

  constructor() {
    this.breakpointObserver
      .observe([Breakpoints.Handset, Breakpoints.Tablet])
      .subscribe(result => {
        this.isSmallScreen = result.matches;
      });
  }
}
