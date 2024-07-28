import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StylesService {

  statusColors(key:string):string {
    switch (key) {
    // color of status
      case 'WAITING':
        return 'orange';
      case 'ACCEPTED':
        return 'green';
      case 'REFUSED':
        return 'red';
    // color of priority
      case 'HIGH':
        return 'red';
      case 'MEDIUM':
        return 'green';
      case 'LOW':
        return 'orange';
      // default
      default:
        return 'black';
    }
  }
}
