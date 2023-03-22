import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { city } from 'src/app/models/admin-models';
import { AccountService } from 'src/app/services/Account/account.service';
import { AdminService } from 'src/app/services/Admin/admin.service';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.scss'],
})
export class CitiesComponent {
  columnsToDisplay: string[] = ['name'];
  dataSource: any;
  cities: city[] = [];
  showAddCancelBtn: number = 0;
  addCityLoading: boolean = false;
  errorMessage: string = '';
  cityName: string = '';
  cityId: string = '';
  closeModal: string = '';
  dltErrorMessages: string = '';
  cityIndex: string = '';
  deleteLoading: boolean = false;
  constructor(private modalService: NgbModal, private adminService: AdminService, private router: Router, private accountService: AccountService) {}
  ngOnInit(): void {
    this.getCities();
  }
  getCities() {
    this.adminService.getCities().subscribe(
      (dt) => {
        this.cities = [];
        let data = dt.data;
        for (let a = 0; a < data.length; a++) {
          let city: city = {
            cityId: data[a].cityId,
            name: data[a].name,
            isAdded: true,
            index: a + 1,
          };
          this.cities.push(city);
        }
        this.dataSource = new MatTableDataSource(this.cities);
      },
      (error) => {
        if (error.status == 401) {
          this.accountService.doLogout();
          this.router.navigateByUrl('/signIn');
        }
        console.log('Error in getCities: ' + error.message);
      }
    );
  }
  InsertCityRow() {
    let city: city = {
      name: '',
      cityId: '',
      isAdded: false,
      index: 0,
    };
    this.cities.splice(this.cities.length + 1, 0, city);
    this.dataSource = new MatTableDataSource(this.cities);
    this.addCancelBtn('add');
  }
  DeletRow(date: any) {
    this.dataSource.data.splice(date, 1);
    this.dataSource._updateChangeSubscription();
    this.addCancelBtn('remove');
  }
  addCancelBtn(type: any) {
    if (type == 'add') {
      this.showAddCancelBtn++;
    } else {
      this.showAddCancelBtn--;
    }
  }
  onSubmitAddCity() {
    this.errorMessage = '';
    this.addCityLoading = true;
    for (let c = 0; c < this.cities.length; c++) {
      if (this.cities[c].isAdded == false) {
        this.adminService.AddCity(this.cities[c].name).subscribe(
          (dt) => {
            this.getCities();
            this.showAddCancelBtn = 0;
            this.addCityLoading = false;
          },
          (error) => {
            if (error.status == 401) {
              this.accountService.doLogout();
              this.router.navigateByUrl('/signIn');
            }
            this.addCityLoading = false;
            this.errorMessage = error.error.errors.name;
          }
        );
      }
    }
  }
  DeleteCityModel(Item: any, data: any, index: any) {
    this.cityId = data.cityId;
    this.cityIndex = index;
    this.modalService.open(Item, { ariaLabelledBy: 'modal-basic-title', size: 'md' }).result.then(
      (res) => {
        this.closeModal = `Closed with: ${res}`;
      },
      (res) => {
        this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
      }
    );
  }
  DeleteCity() {
    this.dltErrorMessages = '';
    if (this.cityId == '') {
      this.DeletRow(this.cityIndex);
      this.modalService.dismissAll();
    } else {
      this.deleteLoading = true;
      this.adminService.deteleCity(this.cityId).subscribe(
        (dt) => {
          this.DeletRow(this.cityIndex);
          this.showAddCancelBtn = 0;
          this.deleteLoading = false;
          this.modalService.dismissAll();
        },
        (error) => {
          this.deleteLoading = false;
          if (error.status == 401) {
            this.accountService.doLogout();
            this.router.navigateByUrl('/signIn');
          }
          this.deleteLoading = false;
          this.errorMessage = error.error.message;
        }
      );
    }
  }
  cancelBtn() {
    this.getCities();
    this.showAddCancelBtn = 0;
  }
  CancelPopUp() {
    this.modalService.dismissAll();
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
