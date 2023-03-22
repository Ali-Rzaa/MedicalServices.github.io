import { Component } from '@angular/core';
import { AppointmentModel, Doctor, UserModel } from 'src/app/models/admin-models';
import { MatTableDataSource } from '@angular/material/table';
import { AccountService } from 'src/app/services/Account/account.service';
import { Router } from '@angular/router';
import { MasterTableService } from 'src/app/services/Admin/master-table.service';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss'],
})
export class PatientsComponent {
  dataSource: any;
  columnsToDisplay: string[] = ['image', 'firstName', 'lastName', 'email', 'empty'];

  users: UserModel[] = [];
  constructor(private masterTableService: MasterTableService, private router: Router, private accountService: AccountService) {}
  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.masterTableService.getUsers().subscribe(
      (dt) => {
        this.users = [];
        let data = dt.data;
        for (let a = 0; a < data.length; a++) {
          let user: UserModel = {
            userId: dt.data[a].userId,
            firstName: dt.data[a].firstName,
            lastName: dt.data[a].lastName,
            email: dt.data[a].email,
            image: dt.data[a].image == null ? './assets/navbar/blank-user.jpg' : dt.data[a].image,
          };
          this.users.push(user);
        }
        this.dataSource = new MatTableDataSource(this.users);
      },
      (error) => {
        if (error.status == 401) {
          this.accountService.doLogout();
          this.router.navigateByUrl('/signIn');
        }
        console.log('Error in getUsers ' + error.message);
      }
    );
  }
}
