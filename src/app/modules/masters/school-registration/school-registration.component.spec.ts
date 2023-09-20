import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolRegistrationComponent } from './school-registration.component';

describe('SchoolRegistrationComponent', () => {
  let component: SchoolRegistrationComponent;
  let fixture: ComponentFixture<SchoolRegistrationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SchoolRegistrationComponent]
    });
    fixture = TestBed.createComponent(SchoolRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
