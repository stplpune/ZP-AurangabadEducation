import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherTransferComponent } from './teacher-transfer.component';

describe('TeacherTransferComponent', () => {
  let component: TeacherTransferComponent;
  let fixture: ComponentFixture<TeacherTransferComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeacherTransferComponent]
    });
    fixture = TestBed.createComponent(TeacherTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
