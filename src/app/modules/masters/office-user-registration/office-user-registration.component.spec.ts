import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficeUserRegistrationComponent } from './office-user-registration.component';

describe('OfficeUserRegistrationComponent', () => {
  let component: OfficeUserRegistrationComponent;
  let fixture: ComponentFixture<OfficeUserRegistrationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OfficeUserRegistrationComponent]
    });
    fixture = TestBed.createComponent(OfficeUserRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
