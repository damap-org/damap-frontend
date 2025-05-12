import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackendService } from '../../services/backend.service';
import { Observable } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { Gdpr } from '../../domain/gdpr';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'damap-gdpr',
  imports: [CommonModule, TranslateModule, MatExpansionModule],
  templateUrl: './gdpr.component.html',
  styleUrls: ['./gdpr.component.css'],
  standalone: true,
})
export class GdprComponent implements OnInit {
  gdpr$: Observable<Gdpr[]>;

  constructor(private backendService: BackendService) {}

  ngOnInit(): void {
    this.gdpr$ = this.backendService.getGdpr();
  }
}
