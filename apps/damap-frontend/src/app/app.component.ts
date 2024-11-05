import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [],
})
export class AppComponent implements OnInit {
  constructor(private titleService: Title) {}

  ngOnInit(): void {
    if (environment.title) {
      this.titleService.setTitle(environment.title);
    } else {
      this.titleService.setTitle('Damap Frontend');
    }
  }
}
