import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'damap-damap-info',
  standalone: true,
  imports: [
    TranslateModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatTooltipModule,
    MatDividerModule,
    MatExpansionModule,
  ],
  templateUrl: './damap-info.component.html',
  styleUrl: './damap-info.component.css',
})
export class DamapInfoComponent {
  readonly panelOpenState = signal(true);
}
