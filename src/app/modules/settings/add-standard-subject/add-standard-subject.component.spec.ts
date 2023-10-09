import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStandardSubjectComponent } from './add-standard-subject.component';

describe('AddStandardSubjectComponent', () => {
  let component: AddStandardSubjectComponent;
  let fixture: ComponentFixture<AddStandardSubjectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddStandardSubjectComponent]
    });
    fixture = TestBed.createComponent(AddStandardSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
