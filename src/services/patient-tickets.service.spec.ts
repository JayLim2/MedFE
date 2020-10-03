import { TestBed } from '@angular/core/testing';

import { PatientTicketsService } from './patient-tickets.service';

describe('PatientTicketsService', () => {
  let service: PatientTicketsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatientTicketsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
