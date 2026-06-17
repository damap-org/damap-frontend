import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackendService } from '../../services/backend.service';
import { Observable } from 'rxjs';
import { TranslateDirective, TranslatePipe } from '@ngx-translate/core';
import { Gdpr } from '../../domain/gdpr';
import { MatExpansionModule } from '@angular/material/expansion';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'damap-gdpr',
  imports: [CommonModule, TranslatePipe, TranslateDirective, MatExpansionModule],
  templateUrl: './gdpr.component.html',
  styleUrls: ['./gdpr.component.css'],
  standalone: true,
})
export class GdprComponent implements OnInit {
  private backendService = inject(BackendService);
  private authService = inject(AuthService);

  gdpr$: Observable<Gdpr[]>;
  userName: string;
  userEmail: string;
  userId: string;

  ngOnInit(): void {
    this.gdpr$ = this.backendService.getGdpr();
    this.userName = this.authService.getDisplayName();
    this.userEmail = this.authService.getEmail();
    this.userId = this.authService.getId();
  }
}
