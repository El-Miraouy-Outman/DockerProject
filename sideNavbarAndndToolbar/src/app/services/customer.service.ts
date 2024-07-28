import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {AppConfig, CONFIG_TOKEN} from "../configuration/config";
import {Observable} from "rxjs";
import {Customer} from "../models/Customer";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http:HttpClient,
              @Inject(CONFIG_TOKEN) private appConfig:AppConfig) { }

  getHouseByCustomer( value:string):Observable<Customer>{
    const customer = new Customer();
    const startsWithLetterOrNumber = /^[a-zA-Z]/.test(value);
    if (startsWithLetterOrNumber) {
      customer.email=value
    } else {
      customer.phone_number=value;
    }
    let params = new HttpParams();
    params=params.set('mail',customer.email);
    params=params.set('phone_number',customer.phone_number)

    return this.http.get<Customer>(`${this.appConfig.apiUrl}/customers/findHouseCustomer`,{params : params});
  }
}
