import { TestBed } from '@angular/core/testing';

import { AuthguardtwoService } from './authguardtwo.service';

describe('AuthguardtwoService', () => {
  let service: AuthguardtwoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthguardtwoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
