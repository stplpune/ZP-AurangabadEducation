import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddQuestionListComponent } from './add-question-list.component';

describe('AddQuestionListComponent', () => {
  let component: AddQuestionListComponent;
  let fixture: ComponentFixture<AddQuestionListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddQuestionListComponent]
    });
    fixture = TestBed.createComponent(AddQuestionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
