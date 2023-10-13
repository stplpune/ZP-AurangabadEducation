import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalTableComponent } from './global-table.component';

describe('GlobalTableComponent', () => {
  let component: GlobalTableComponent;
  let fixture: ComponentFixture<GlobalTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [GlobalTableComponent]
    });
    fixture = TestBed.createComponent(GlobalTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
