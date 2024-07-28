import {Inject, Injectable} from '@angular/core';
import * as http from "http";
import {HttpClient, HttpParams} from "@angular/common/http";
import {AppConfig, CONFIG_TOKEN} from "../configuration/config";
import {Observable} from "rxjs";
import {Ticket} from "../models/Ticket";
import {Customer} from "../models/Customer";

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor( private http:HttpClient,
               @Inject(CONFIG_TOKEN) private appConfig:AppConfig) { }

  getAllTickets() :Observable<Ticket[]>{
    return this.http.get<Ticket[]>(this.appConfig.apiUrl+'/tickets')

  }
  save(ticket :Ticket){
    return this.http.post<Ticket>(this.appConfig.apiUrl+'/tickets',ticket);
  }
  delete(id: number):Observable<any> {
    console.log("long id :",id)
    return this.http.delete(`${this.appConfig.apiUrl}/tickets?id=${id}`)
  }


  resolution(ticket :Ticket):Observable<Ticket>{
    return this.http.put<Ticket>(`${this.appConfig.apiUrl}/customers/findHouseCustomer`,ticket)
  }


}
