import {Component, Input} from '@angular/core';
import {userItems} from "./header-data-choise";
import {LocalStorageService} from "../../services/storage/local-storage.service";
import {User} from "../../models/User";
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Input() collapsed = false;
  @Input() screenWidth = 0;

   profile = this.localStorageService.getLastName();
   user! : User;
  constructor(private localStorageService:LocalStorageService,private  router:Router,private  userService:UserService) {

    console.log("user connecter est :"+this.localStorageService.getLastName())
  }
  userItems =userItems;
  userName :string ="EL Miraouy ";
  getHeadClass(): string {
    let styleClass = '';
    if(this.collapsed && this.screenWidth > 768) {
      styleClass = 'head-trimmed';
    } else {
      styleClass = 'head-md-screen';
    }
    return styleClass;
  }
  logout(){
    console.log("Logout methode :")
    return this.userService.logout().subscribe(
      {
        next: () => {
          console.log("Logout methode response :")
          this.localStorageService.removeToken();
          this.localStorageService.removeUser();
          this.router.navigate(["/user/login"])
        },
        error: () =>{
          console.log("Logout methode error :")
          this.localStorageService.removeToken();
          this.localStorageService.removeUser();
          this.router.navigate(["/user/login"])
        }
      }
    );
  }
}
