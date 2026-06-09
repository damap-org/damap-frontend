/* eslint no-console: "off" */

import { Injectable } from '@angular/core';
import { APP_ENV } from '../constants';

export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
}

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  get prod() {
    return APP_ENV.production;
  }

  debug(message: any): void {
    this.log(message, LogLevel.DEBUG);
  }

  info(message: any): void {
    this.log(message, LogLevel.INFO);
  }

  warn(message: any): void {
    this.log(message, LogLevel.WARN);
  }

  error(message: any): void {
    this.log(message, LogLevel.ERROR);
  }

  private log(message: any, level?: LogLevel): void {
    if (!this.prod) {
      switch (level) {
        case LogLevel.DEBUG:
          console.debug(message);  
          break;
        case LogLevel.INFO:
          console.info(message);  
          break;
        case LogLevel.WARN:
          console.warn(message);
          break;
        case LogLevel.ERROR:
          console.error(message);
          break;
        default:
          console.log(message);
      }
    }
  }
}
