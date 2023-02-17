import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalVisitComponent } from './hospital-visit.component';

describe('HospitalVisitComponent', () => {
  let component: HospitalVisitComponent;
  let fixture: ComponentFixture<HospitalVisitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HospitalVisitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HospitalVisitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
