import {Inject, Injectable} from '@angular/core';
import * as http from "http";
import {HttpClient, HttpParams} from "@angular/common/http";
import {AppConfig, CONFIG_TOKEN} from "../configuration/config";
import {Observable} from "rxjs";

import {CommentTicket} from "../models/CommentTicket";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor( private http:HttpClient,
               @Inject(CONFIG_TOKEN) private appConfig:AppConfig) { }

  getCommentByTicket(idTicket : number) :Observable<CommentTicket[]>{
    console.log("ticket id ! ",idTicket);
    let params=new HttpParams();
    params=params.set("idTicket",idTicket)
    return this.http.get<CommentTicket[]>(this.appConfig.apiUrl+'/tickets/comments/byTicket',{params})
  }

  delete(id: number):Observable<any> {
    return this.http.delete(`${this.appConfig.apiUrl}/tickets?id=${id}`)
  }
  save(comment :CommentTicket):Observable<CommentTicket>{
    return this.http.post<CommentTicket>(this.appConfig.apiUrl+'/tickets/comments',comment);
  }

}
