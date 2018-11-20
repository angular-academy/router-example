import { TestBed, async, inject } from '@angular/core/testing';

import { CheckUserGuard } from './check-user.guard';

describe('CheckUserGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CheckUserGuard]
    });
  });

  it('should ...', inject([CheckUserGuard], (guard: CheckUserGuard) => {
    expect(guard).toBeTruthy();
  }));
});
