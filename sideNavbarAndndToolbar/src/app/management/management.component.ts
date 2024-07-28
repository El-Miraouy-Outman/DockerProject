import { Component } from '@angular/core';


interface SideNavToggle{
  screenWidth : number;
  collapsed : boolean;
}
@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrl: './management.component.scss'
})
export class ManagementComponent {


  isSideNavCollapsed = false;
  screenWidth = 0;

  onToggleSideNav(data: SideNavToggle): void {
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }

}
