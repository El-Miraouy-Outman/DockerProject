import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ManagementComponent} from "./management.component";
import {DashbordComponent} from "./dashbord/dashbord.component";

import {MangementUserComponent} from "./mangement-user/mangement-user.component";
import {TicketComponent} from "./ticket/ticket.component";
import {ConsultComponent} from "./ticket/consult/consult.component";

const routes: Routes = [
  {
    path: 'management', component: ManagementComponent,
    //canActivate : [authorizationGuard], data :{role :"ADMIN"},
    children: [
      {
        path: 'dashboard', component:DashbordComponent ,
        //canActivate : [authorizationGuard], data :{role :"ADMIN"},
      },
      {
        path: 'tickets', component:TicketComponent ,
        //canActivate : [authorizationGuard], data :{role :"ADMIN"},
      },
      {
        path: 'users', component:MangementUserComponent ,
        //canActivate : [authorizationGuard], data :{role :"ADMIN"},
      },
      {
        path: 'tickets/view', component:ConsultComponent,
        //canActivate : [authorizationGuard], data :{role :"ADMIN"},
      }
      ,
      {
        path: "", redirectTo: "users", pathMatch: "full"        //canActivate : [authorizationGuard], data :{role :"ADMIN"},
      }
    ]
  },
  {
    path :'', component : ManagementComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagementRoutingModule { }
