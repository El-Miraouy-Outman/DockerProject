import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {UserService} from "../services/user.service";
import {LocalStorageService} from "../services/storage/local-storage.service";

export const authorizationGuard: CanActivateFn = () => {
   const auth =inject(LocalStorageService);
   const router=inject(Router);
   if(!auth.isUserLoggedIn()){
     console.log("is login ",auth.isUserLoggedIn())
     console.log("LOCAL ROLES ",auth.getRoles())

     router.navigateByUrl("/user/login").then((r) => console.log("url not exist ! "));
     return false
   }
  return true;
};
