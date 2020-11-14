import { TestBed } from '@angular/core/testing';

import { MedServicesService } from './med-services.service';

describe('MedServicesService', () => {
  let service: MedServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MedServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
