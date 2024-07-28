import { Component } from '@angular/core';
import {Observable} from "rxjs";
import {User} from "./models/User";
import {UserService} from "./services/user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'backOffice-front';
   users!: Observable<User[]> ;

  constructor(private userService :UserService) {
    console.log("=======app component =====  ")

  }




}
