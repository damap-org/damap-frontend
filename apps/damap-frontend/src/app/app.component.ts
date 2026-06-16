import { Component, OnInit, inject } from '@angular/core';

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
  private titleService = inject(Title);
  private configService = inject(ConfigService);

  ngOnInit(): void {
    const appTitle = this.configService.getAppTitle();

    if (appTitle) {
      this.titleService.setTitle(appTitle);
    } else {
      this.titleService.setTitle('Damap Frontend');
    }
  }
}
