import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabVisitComponent } from './lab-visit.component';

describe('LabVisitComponent', () => {
  let component: LabVisitComponent;
  let fixture: ComponentFixture<LabVisitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabVisitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LabVisitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
