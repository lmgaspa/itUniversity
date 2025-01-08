import 'zone.js/testing';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);

// Dynamically import all `.spec.ts` files:
const testFiles = [
  import('./app/app.component.spec'),
];

Promise.all(testFiles).then(() => console.log('All test files loaded.'));
