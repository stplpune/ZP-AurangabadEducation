import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationApprovalComponent } from './registration-approval.component';

describe('RegistrationApprovalComponent', () => {
  let component: RegistrationApprovalComponent;
  let fixture: ComponentFixture<RegistrationApprovalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistrationApprovalComponent]
    });
    fixture = TestBed.createComponent(RegistrationApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
