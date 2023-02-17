import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicVisitComponent } from './clinic-visit.component';

describe('ClinicVisitComponent', () => {
  let component: ClinicVisitComponent;
  let fixture: ComponentFixture<ClinicVisitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClinicVisitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClinicVisitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
