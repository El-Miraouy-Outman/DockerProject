import {Component, EventEmitter, Output} from '@angular/core';
import {navbarData} from "../../management/sidenav/nav-data";


interface SideNavToggle{
  screenWidth : number;
  collapsed : boolean;
}
@Component({
  selector: 'app-navbarvide',
  templateUrl: './navbarvide.component.html',
  styleUrl: './navbarvide.component.scss'
})
export class NavbarvideComponent {
  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  collapsed = false;



}
