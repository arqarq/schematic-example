import { TestBed } from '@angular/core/testing';

import { MyLibService } from './my-lib.service';

describe('MyLibService', () => {
  let service: MyLibService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.get(MyLibService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
