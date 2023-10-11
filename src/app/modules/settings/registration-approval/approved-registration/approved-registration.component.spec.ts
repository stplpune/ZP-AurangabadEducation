import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedRegistrationComponent } from './approved-registration.component';

describe('ApprovedRegistrationComponent', () => {
  let component: ApprovedRegistrationComponent;
  let fixture: ComponentFixture<ApprovedRegistrationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApprovedRegistrationComponent]
    });
    fixture = TestBed.createComponent(ApprovedRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
