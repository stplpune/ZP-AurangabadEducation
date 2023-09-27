import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOtherRegistrationComponent } from './add-other-registration.component';

describe('AddOtherRegistrationComponent', () => {
  let component: AddOtherRegistrationComponent;
  let fixture: ComponentFixture<AddOtherRegistrationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddOtherRegistrationComponent]
    });
    fixture = TestBed.createComponent(AddOtherRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
