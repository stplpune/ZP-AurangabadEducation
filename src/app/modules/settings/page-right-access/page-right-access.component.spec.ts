import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageRightAccessComponent } from './page-right-access.component';

describe('PageRightAccessComponent', () => {
  let component: PageRightAccessComponent;
  let fixture: ComponentFixture<PageRightAccessComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageRightAccessComponent]
    });
    fixture = TestBed.createComponent(PageRightAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
