import {Component, Input, OnInit} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../models/User";
import {UserService} from "../services/user.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit{
  constructor(private route:Router) {
    this.route.navigate(["/user/login"]);
  }
  ngOnInit(): void {
  }




}
