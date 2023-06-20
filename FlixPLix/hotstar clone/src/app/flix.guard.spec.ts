import { TestBed } from '@angular/core/testing';

import { FlixGuard } from './flix.guard';

describe('FlixGuard', () => {
  let guard: FlixGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(FlixGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
