import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-body-management',
  templateUrl: './body-management.component.html',
  styleUrl: './body-management.component.scss'
})
export class BodyManagementComponent {
  @Input() collapsed = false;
  @Input() screenWidth = 0;
  getBodyClass(): string {
    let styleClass = '';
    if(this.collapsed && this.screenWidth > 768) {
      styleClass = 'body-trimmed';
    } else if(this.collapsed && this.screenWidth <= 768 && this.screenWidth > 0) {
      styleClass = 'body-md-screen'
    }
    return styleClass;
  }


}
