import { Component, OnInit } from '@angular/core';

import { ConfigService } from './services/config.service';
import { Title } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [],
  imports: [RouterOutlet],
})
export class AppComponent implements OnInit {
  constructor(
    private titleService: Title,
    private configService: ConfigService,
  ) {}

  ngOnInit(): void {
    const appTitle = this.configService.getAppTitle();

    if (appTitle) {
      this.titleService.setTitle(appTitle);
    } else {
      this.titleService.setTitle('Damap Frontend');
    }
  }
}
