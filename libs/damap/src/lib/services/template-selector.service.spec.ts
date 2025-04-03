import { TestBed } from '@angular/core/testing';

import { TemplateSelectorService } from './template-selector.service';

describe('TemplateSelectorService', () => {
  let service: TemplateSelectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TemplateSelectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
