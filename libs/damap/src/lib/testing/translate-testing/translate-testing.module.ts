import {
  EventEmitter,
  Injectable,
  NgModule,
  Pipe,
  PipeTransform,
} from '@angular/core';
import {
  TranslateFakeLoader,
  TranslateLoader,
  TranslateModule,
  TranslatePipe,
  TranslateService,
} from '@ngx-translate/core';
import { Observable, of } from 'rxjs';

@Pipe({
  name: 'translate',
  standalone: false,
})
export class TranslatePipeMock implements PipeTransform {
  public name = 'translate';

  public transform(value: string): string {
    return value;
  }
}

@Injectable()
export class TranslateServiceStub {
  public onDefaultLangChange: EventEmitter<any> = new EventEmitter();
  public onTranslationChange: EventEmitter<any> = new EventEmitter();
  public onLangChange: EventEmitter<any> = new EventEmitter();

  private _currentLang = 'en';

  get currentLang(): string {
    return this._currentLang;
  }

  public get(key: any): Observable<any> {
    return of(key);
  }

  public use(key: string): void {
    this._currentLang = key;
  }

  public instant(key: any): any {
    return key;
  }

  public getBrowserLang(): any {
    return 'en';
  }
}

@NgModule({
  imports: [
    TranslateModule.forRoot({
      loader: { provide: TranslateLoader, useClass: TranslateFakeLoader },
    }),
  ],
  declarations: [TranslatePipeMock],
  providers: [
    { provide: TranslateService, useClass: TranslateServiceStub },
    { provide: TranslatePipe, useClass: TranslatePipeMock },
  ],
  exports: [TranslatePipeMock],
})
export class TranslateTestingModule {}
