import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInwardItemsComponent } from './add-inward-items.component';

describe('AddInwardItemsComponent', () => {
  let component: AddInwardItemsComponent;
  let fixture: ComponentFixture<AddInwardItemsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddInwardItemsComponent]
    });
    fixture = TestBed.createComponent(AddInwardItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
