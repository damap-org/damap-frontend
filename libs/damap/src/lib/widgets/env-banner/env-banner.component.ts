import { Component } from '@angular/core';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent } from '@angular/material/card';
import { TranslateModule } from '@ngx-translate/core';
import { TranslatePipeMock } from '../../testing/translate-testing/translate-testing.module';

@Component({
    selector: 'app-env-banner',
    templateUrl: './env-banner.component.html',
    styleUrls: ['./env-banner.component.css'],
    imports: [
        MatCard,
        MatCardHeader,
        MatCardTitle,
        MatCardContent,
        TranslateModule,
        TranslatePipeMock,
    ],
})
export class EnvBannerComponent {}
