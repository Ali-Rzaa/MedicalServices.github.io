import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { city } from 'src/app/models/admin-models';

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

  ngOnInit(): void {
    this.getDoctors();
  }
  getDoctors() {
    this.cities = [];
    for (let a = 0; a < this.cities.length; a++) {
      let city: city = {
        id: '',
        name: '',
      };
      this.cities.push(city);
    }
    this.dataSource = new MatTableDataSource(this.cities);
  }
  InsertCityRow() {
    let city: city = {
      id: '',
      name: '',
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
}
