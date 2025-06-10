import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
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
