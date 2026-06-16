import { Component, inject } from '@angular/core';
import { AdminModule } from '../admin.module';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-admin-translations',
  templateUrl: './edit-translations-page.component.html',
  styleUrl: './edit-translations-page.component.css',
  standalone: true,
  imports: [
    AdminModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    TranslateModule,
  ],
})
export class EditTranslationsPageComponent {
  private router = inject(Router);


  navigateBack(): void {
    this.router.navigate(['/admin']);
  }
}
