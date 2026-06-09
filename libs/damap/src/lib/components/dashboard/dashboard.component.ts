import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { InfoCardComponent } from '../../widgets/info-card/info-card.component';
import { MatCard, MatCardContent } from '@angular/material/card';
import { FlipCardComponent } from '../../widgets/flip-card/flip-card.component';
import { TranslateModule } from '@ngx-translate/core';
@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
    imports: [
        InfoCardComponent,
        MatCard,
        MatCardContent,
        FlipCardComponent,
        TranslateModule,
    ],
})
export class DashboardComponent {
  isSmallScreen = false;

  constructor(readonly breakpointObserver: BreakpointObserver) {
    this.breakpointObserver
      .observe([Breakpoints.Handset, Breakpoints.Tablet])
      .subscribe(result => {
        this.isSmallScreen = result.matches;
      });
  }
}
