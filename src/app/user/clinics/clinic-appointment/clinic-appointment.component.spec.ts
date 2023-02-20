import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicAppointmentComponent } from './clinic-appointment.component';

describe('ClinicAppointmentComponent', () => {
  let component: ClinicAppointmentComponent;
  let fixture: ComponentFixture<ClinicAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClinicAppointmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClinicAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
