// angular
import {TestBed} from '@angular/core/testing';
import {inject} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
// libs
import {Angulartics2Module, Angulartics2Segment} from 'angulartics2';

// module
import {Analytics, AnalyticsService} from './analytics.service';

const testModuleConfig = () => {
  TestBed.configureTestingModule({
    imports: [Angulartics2Module.forRoot([Angulartics2Segment]), RouterTestingModule],
    providers: [AnalyticsService]
  });
};

describe('analytics:', () => {

  beforeEach(testModuleConfig);

  describe('AnalyticsService', () => {

    describe('api works', () => {
      it('track',
         inject([AnalyticsService, Angulartics2Segment], (analyticsService: any, segment: any) => {
           analyticsService.devMode(false);
           spyOn(segment, 'eventTrack');
           analyticsService.track('click', {category: 'TEST', label: 'Testing'});
           expect(segment.eventTrack)
               .toHaveBeenCalledWith('click', {category: 'TEST', label: 'Testing'});
         }));
      it('track devMode: ON',
         inject([AnalyticsService, Angulartics2Segment], (analyticsService: any, segment: any) => {
           spyOn(segment, 'eventTrack');

           // dev mode: shouldn't track anything
           analyticsService.devMode(true);
           analyticsService.track('click', {category: 'TEST', label: 'Testing'});
           expect(segment.eventTrack).not.toHaveBeenCalled();
         }));
      it('pageTrack',
         inject([AnalyticsService, Angulartics2Segment], (analyticsService: any, segment: any) => {
           spyOn(segment, 'pageTrack');
           analyticsService.pageTrack('/testing', {});
           expect(segment.pageTrack).toHaveBeenCalledWith('/testing', {});
         }));
      it('pageTrack devMode: ON',
         inject([AnalyticsService, Angulartics2Segment], (analyticsService: any, segment: any) => {
           spyOn(segment, 'pageTrack');

           // dev mode: shouldn't track anything
           analyticsService.devMode(true);
           analyticsService.pageTrack('/testing', {});
           expect(segment.pageTrack).not.toHaveBeenCalled();
         }));
      it('identify',
         inject([AnalyticsService, Angulartics2Segment], (analyticsService: any, segment: any) => {
           spyOn(segment, 'setUserProperties');
           analyticsService.identify({userId: 1, name: 'Test', email: 'name@domain.com'});
           expect(segment.setUserProperties)
               .toHaveBeenCalledWith({userId: 1, name: 'Test', email: 'name@domain.com'});
         }));
      it('identify devMode: ON',
         inject([AnalyticsService, Angulartics2Segment], (analyticsService: any, segment: any) => {
           spyOn(segment, 'setUserProperties');

           // dev mode: shouldn't track anything
           analyticsService.devMode(true);
           analyticsService.identify({userId: 1, name: 'Test', email: 'name@domain.com'});
           expect(segment.setUserProperties).not.toHaveBeenCalled();
         }));
    });
  });

  describe('Analytics (Base Class)', () => {

    describe('should allow descendants to track actions', () => {
      it('track',
         inject([AnalyticsService, Angulartics2Segment], (analyticsService: any, segment: any) => {
           spyOn(analyticsService, 'track');
           let analytics = new TestAnalytics(analyticsService);
           analytics.category = 'TEST';
           analytics.track('action', {category: analytics.category, label: 'Testing'});
           expect(analyticsService.track)
               .toHaveBeenCalledWith('action', {category: analytics.category, label: 'Testing'});
         }));
    });
  });
});

class TestAnalytics extends Analytics {}
