import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InwardItemComponent } from './inward-item.component';

describe('InwardItemComponent', () => {
  let component: InwardItemComponent;
  let fixture: ComponentFixture<InwardItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InwardItemComponent]
    });
    fixture = TestBed.createComponent(InwardItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
