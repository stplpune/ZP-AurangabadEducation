import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutwardItemComponent } from './outward-item.component';

describe('OutwardItemComponent', () => {
  let component: OutwardItemComponent;
  let fixture: ComponentFixture<OutwardItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OutwardItemComponent]
    });
    fixture = TestBed.createComponent(OutwardItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
