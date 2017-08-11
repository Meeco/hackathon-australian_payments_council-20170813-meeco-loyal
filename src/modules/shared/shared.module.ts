import {CommonModule} from '@angular/common';
import {Location} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {BrowserModule} from '@angular/platform-browser';
import {ApiModule, Configuration} from '@obp/sdk';
import {AnalyticsModule} from '../analytics/analytics.module';
// modules
import {MultilingualModule} from '../i18n/multilingual.module';

const SHARED_MODULES: any[] = [
  CommonModule, HttpModule, FormsModule, MultilingualModule, BrowserModule, AnalyticsModule,
  ApiModule
];

@NgModule({imports: [...SHARED_MODULES], declarations: [], exports: [...SHARED_MODULES]})
export class SharedModule {
}
