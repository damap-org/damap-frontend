import { EventEmitter, Injectable, NgModule, Pipe, PipeTransform, signal } from '@angular/core';
import { TranslateDirective, TranslatePipe, TranslateService } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';

@Pipe({ name: 'translate' })
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
  public onTranslationRefresh: EventEmitter<any> = new EventEmitter();

  private _currentLang = 'en';
  public currentLang = signal<string | null>(this._currentLang);
  public fallbackLang = signal<string | null>('en');
  public isLoading = signal(false);

  public getCurrentLang(): string {
    return this._currentLang;
  }

  public getFallbackLang(): string {
    return 'en';
  }

  public getLangs(): readonly string[] {
    return ['en'];
  }

  public get(key: any): Observable<any> {
    return of(key);
  }

  public getTranslation(lang: string): Observable<any> {
    return of({});
  }

  public getTranslations(_lang: string): Record<string, never> {
    return {};
  }

  public reloadLang(_lang: string): Observable<Record<string, never>> {
    return of({});
  }

  public translate(key: string): any {
    return signal(key);
  }

  public stream(key: any): Observable<any> {
    return of(key);
  }

  public use(key: string): Observable<Record<string, never>> {
    this._currentLang = key;
    this.currentLang.set(key);
    return of({});
  }

  public instant(key: any): any {
    return key;
  }

  public getBrowserLang(): any {
    return 'en';
  }
}

@NgModule({
  imports: [TranslateDirective, TranslatePipeMock],
  providers: [
    { provide: TranslateService, useClass: TranslateServiceStub },
    { provide: TranslatePipe, useClass: TranslatePipeMock },
  ],
  exports: [TranslateDirective, TranslatePipeMock],
})
export class TranslateTestingModule {}
