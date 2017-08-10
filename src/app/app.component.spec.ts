import {Location} from '@angular/common';
import {async, TestBed} from '@angular/core/testing';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';
import {IonicModule, Platform} from 'ionic-angular';

import {PlatformMock} from '../mocks/platform/platform.mock'

import {App} from './app.component';

describe('MyApp Component', () => {
  let fixture;
  let component;

  beforeEach(async(
      () => {TestBed.configureTestingModule({
        declarations: [App],
        imports: [IonicModule.forRoot(App)],
        providers: [StatusBar, SplashScreen, {provide: Platform, useClass: PlatformMock}]
      })}));

  beforeEach(() => {
    fixture = TestBed.createComponent(App);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component instanceof App).toBe(true);
  });

  it('should have two pages', () => {
    expect(component.pages.length).toBe(12);
  });

});
