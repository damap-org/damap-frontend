import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { InfoBoxDetails } from '../../domain/infoBox-details';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-info-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    TranslateModule,
  ],
  templateUrl: './info-card.component.html',
  styleUrl: './info-card.component.css',
})
export class InfoCardComponent implements OnInit, OnChanges {
  @Input() infoLabel: InfoBoxDetails = {};

  public greeting: string;
  public instructions: string;
  public summaryLine: string;
  public isIntroShow: boolean = true;
  public icon: string | number;

  ngOnInit(): void {
    this.setContentCard();
  }

  ngOnChanges(): void {
    this.openIntro();
    this.setContentCard();
  }

  setContentCard() {
    if (Object.keys(this.infoLabel)?.length !== 0) {
      this.icon = this.infoLabel.stepNumber;
      this.instructions = this.infoLabel.instructions;
    } else {
      this.icon = 'info';
      this.instructions =
        "You can create a new DMP by clicking the 'Create New DMP' button";
    }
  }

  closeIntro(): void {
    this.isIntroShow = false;
  }

  openIntro(): void {
    this.isIntroShow = true;
  }
}
