import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabAppointmentComponent } from './lab-appointment.component';

describe('LabAppointmentComponent', () => {
  let component: LabAppointmentComponent;
  let fixture: ComponentFixture<LabAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabAppointmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LabAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
