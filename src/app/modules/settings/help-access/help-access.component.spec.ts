import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpAccessComponent } from './help-access.component';

describe('HelpAccessComponent', () => {
  let component: HelpAccessComponent;
  let fixture: ComponentFixture<HelpAccessComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HelpAccessComponent]
    });
    fixture = TestBed.createComponent(HelpAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
