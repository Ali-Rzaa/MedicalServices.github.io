import { Component } from '@angular/core';
import { AppointmentModel, Doctor } from 'src/app/models/admin-models';
import { MatTableDataSource } from '@angular/material/table';
import { AccountService } from 'src/app/services/Account/account.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder } from '@angular/forms';
import { AdminService } from 'src/app/services/Admin/admin.service';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss'],
})
export class AppointmentsComponent {
  dataSource: any;
  columnsToDisplay: string[] = ['Pname', 'gender', 'dateOfBirth', 'phoneNo', 'disease', 'doctorName', 'weight'];

  appointments: AppointmentModel[] = [];
  constructor(private route: ActivatedRoute, private adminService: AdminService, private formBuilder: FormBuilder, private modalService: NgbModal, private router: Router, private accountService: AccountService) {}
  ngOnInit(): void {
    this.getAppointments();
  }
  getAppointments() {
    this.adminService.getAppointments().subscribe(
      (dt) => {
        this.appointments = [];
        let data = dt.data;
        for (let a = 0; a < data.length; a++) {
          let hospital: AppointmentModel = {
            appoinmentId: dt.data[a].appoinmentId,
            fee: dt.data[a].fee,
            userId: dt.data[a].userId,
            doctorId: dt.data[a].doctorId,
            status: dt.data[a].status,
            doctorName: dt.data[a].doctorName,
            disease: dt.data[a].disease,
            diseaseInPast: dt.data[a].diseaseInPast,
            email: dt.data[a].email,
            phoneNo: dt.data[a].phoneNo,
            gender: dt.data[a].gender,
            dob: dt.data[a].dob,
            timming: dt.data[a].timming,
            patientName: dt.data[a].patientName,
            weight: dt.data[a].weight,
          };
          this.appointments.push(hospital);
        }
        this.dataSource = new MatTableDataSource(this.appointments);
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
