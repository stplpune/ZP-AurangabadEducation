import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentTransferComponent } from './student-transfer.component';

describe('StudentTransferComponent', () => {
  let component: StudentTransferComponent;
  let fixture: ComponentFixture<StudentTransferComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentTransferComponent]
    });
    fixture = TestBed.createComponent(StudentTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
