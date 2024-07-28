import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserComponent} from "./user.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {ChangePasswordComponent} from "./change-password/change-password.component";
import {ForgetPasswordComponent} from "./forget-password/forget-password.component";

const routes: Routes = [
  {
    path: 'user', component: UserComponent,
    children: [
      {
        path: 'login', component: LoginComponent
      },
      {
        path: 'register', component: RegisterComponent
      },
      {
        path: 'changePassWord', component: ChangePasswordComponent
      },
      {
        path: 'forgetPassWord', component: ForgetPasswordComponent
      },
      {
        path: "", redirectTo: "user", pathMatch: "full"
      }
    ]
  },
  {
    path :'', component : UserComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
