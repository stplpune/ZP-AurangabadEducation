import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherRegistrationComponent } from './other-registration.component';

describe('OtherRegistrationComponent', () => {
  let component: OtherRegistrationComponent;
  let fixture: ComponentFixture<OtherRegistrationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OtherRegistrationComponent]
    });
    fixture = TestBed.createComponent(OtherRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
