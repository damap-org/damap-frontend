import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { TranslationManagementComponent } from '../translation-management/translation-management.component';

@Component({
  selector: 'app-admin-translations',
  templateUrl: './edit-translations-page.component.html',
  styleUrl: './edit-translations-page.component.css',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    TranslatePipe,
    TranslationManagementComponent,
  ],
})
export class EditTranslationsPageComponent {
  private router = inject(Router);

  navigateBack(): void {
    this.router.navigate(['/admin']);
  }
}
