/* eslint no-console: "off" */

import { TestBed } from '@angular/core/testing';
import { describe, expect, it, vi, beforeEach } from 'vitest';

import { LoggerService } from './logger.service';

describe('LoggerService', () => {
  let service: LoggerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoggerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should log in dev mode', () => {
    vi.spyOn(console, 'debug').mockReturnValue(undefined);
    vi.spyOn(console, 'info').mockReturnValue(undefined);
    vi.spyOn(console, 'warn').mockReturnValue(undefined);
    vi.spyOn(console, 'error').mockReturnValue(undefined);
    vi.spyOn(service, 'prod', 'get').mockReturnValue(false);
    service.debug('debug');
    service.info('info');
    service.warn('warn');
    service.error('error');
    expect(service.prod).toBe(false);
    expect(console.debug).toHaveBeenCalledWith('debug');
    expect(console.info).toHaveBeenCalledWith('info');
    expect(console.warn).toHaveBeenCalledWith('warn');
    expect(console.error).toHaveBeenCalledWith('error');
  });

  it('should not log in prod mode', () => {
    vi.spyOn(console, 'debug').mockReturnValue(undefined);
    vi.spyOn(service, 'prod', 'get').mockReturnValue(true);
    service.debug('debug');
    expect(console.debug).not.toHaveBeenCalled();
  });
});
