import { Component } from '@angular/core';
import { DataService } from './core/services/data/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'parkingLot';
  public countsData = [];
  public busCount;
  public carCount;
  public motorcycleCount;
  public vehicleType = '';
  public registrationNumber = '';
  public search = {
    registrationNumber: '',
    storyNum: '',
    row: ''
  };
  public vehicles = [];
  constructor(
    public dataService: DataService
    ) {
      this.getCounts();
    }

  getCounts() {
    this.dataService._getCounts().subscribe((data) => {
      this.busCount = data.data.find((e) => e._id.type == 'B');
      this.carCount = data.data.find((e) => e._id.type == 'C');
      this.motorcycleCount = data.data.find((e) => e._id.type == 'M');
    });
  }

  parkVehicle() {
    this.dataService._parkVehicle(this.vehicleType, this.registrationNumber).subscribe((data) => {
      alert(data.message);
      this.getCounts();
    }, (error) => {
      alert(error.error.message);
    });
  }

  getVehicle() {
    this.dataService._searchVehicle(this.search).subscribe((data) => {
      console.log(data.data);
      this.vehicles = data.data;
    }, (error) => {
      alert(error.error.message);
    });
  }
}
