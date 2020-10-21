import { TestBed } from '@angular/core/testing';

import { BookingPopupService } from './booking-popup.service';

describe('BookingPopupService', () => {
  let service: BookingPopupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookingPopupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
