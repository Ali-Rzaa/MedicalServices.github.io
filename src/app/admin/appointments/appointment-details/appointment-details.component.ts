import { Component } from '@angular/core';
import { AppointmentModel, Doctor } from 'src/app/models/admin-models';
import { MatTableDataSource } from '@angular/material/table';
import { AccountService } from 'src/app/services/Account/account.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder } from '@angular/forms';
import { AdminService } from 'src/app/services/Admin/admin.service';

@Component({
  selector: 'app-appointment-details',
  templateUrl: './appointment-details.component.html',
  styleUrls: ['./appointment-details.component.scss'],
})
export class AppointmentDetailsComponent {
  dataSource: any;
  columnsToDisplay: string[] = ['Pname', 'gender', 'dateOfBirth', 'phoneNo', 'disease', 'doctorName', 'weight'];

  appointmentDetails: AppointmentModel = {
    appoinmentId: '',
    fee: 0,
    userId: '',
    doctorId: '',
    status: false,
    doctorName: '',
    disease: '',
    diseaseInPast: '',
    email: '',
    phoneNo: '',
    gender: '',
    dob: '',
    timming: '',
    patientName: '',
    weight: 0,
    day: '',
    onlyTime: '',
    onlyDate: '',
    hospitalName: '',
    clinicName: '',
    labName: '',
  };
  appoinmentId: string = '';
  constructor(private route: ActivatedRoute, private adminService: AdminService, private formBuilder: FormBuilder, private modalService: NgbModal, private router: Router, private accountService: AccountService) {
    const routeParams = this.route.snapshot.paramMap;
    this.appoinmentId = routeParams.get('appoinmentId');
  }
  ngOnInit(): void {
    this.getAppointments();
  }
  getAppointments() {
    this.adminService.getAppointmentbyId(this.appoinmentId).subscribe(
      (dt) => {
        debugger;
        this.appointmentDetails = {
          appoinmentId: dt.data.appoinmentId,
          fee: dt.data.fee,
          userId: dt.data.userId,
          doctorId: dt.data.doctorId,
          status: dt.data.status,
          doctorName: dt.data.doctorName,
          disease: dt.data.disease,
          diseaseInPast: dt.data.diseaseInPast,
          email: dt.data.email,
          phoneNo: dt.data.phoneNo,
          gender: dt.data.gender,
          dob: dt.data.dob,
          timming: dt.data.timming,
          patientName: dt.data.patientName,
          weight: dt.data.weight,
          day: dt.data.day,
          onlyTime: dt.data.onlyTime,
          onlyDate: dt.data.onlyDate,
          hospitalName: dt.data.hospitalName,
          clinicName: dt.data.clinicName,
          labName: dt.data.labName,
        };
      },
      (error) => {
        if (error.status == 401) {
          this.accountService.doLogout();
          this.router.navigateByUrl('/signIn');
        }
        console.log('Error in getHospital ' + error.message);
      }
    );
  }
}
