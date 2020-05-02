import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(public api: ApiService) { }

  _getCounts() {
    return this.api.get('/vehicle-count')
  }

  _parkVehicle(vehicleType, registrationNumber) {
    return this.api.post('/park-vehicle', {
      vehicleType,
      registrationNumber
    })
  }

  _getVehicle(registrationNumber) {
    return this.api.get(`/vehicle-slot?registrationNumber=${registrationNumber}`)
  }
}
