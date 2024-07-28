import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ManagementRoutingModule} from './management-routing.module';
import {ManagementComponent} from './management.component';
import {DashbordComponent} from './dashbord/dashbord.component';
import {SidenavComponent} from "./sidenav/sidenav.component";
import {BodyManagementComponent} from './body-management/body-management.component';
import {MatSidenavContainer} from "@angular/material/sidenav";
import {MatToolbarRow} from "@angular/material/toolbar";
import {HeaderComponent} from './header/header.component';
import {OverlayModule} from "@angular/cdk/overlay";
import {CdkMenuModule} from "@angular/cdk/menu";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {MangementUserComponent} from './mangement-user/mangement-user.component';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable
} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, MatSortHeader} from "@angular/material/sort";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton, MatMiniFabButton} from "@angular/material/button";
import {MatTooltip} from "@angular/material/tooltip";
import {TicketComponent} from './ticket/ticket.component';
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {MatError, MatFormField, MatHint, MatLabel} from "@angular/material/form-field";
import {MatInput, MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {EditAddUserComponent} from './mangement-user/edit-add-user/edit-add-user.component';
import {
    MatCard,
    MatCardActions,
    MatCardContent, MatCardFooter,
    MatCardHeader,
    MatCardImage,
    MatCardTitle
} from "@angular/material/card";
import {MatOptgroup, MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {NgToastModule} from "ng-angular-popup";
import {UserModule} from "../user/user.module";
import {TableComponent} from "../ui/table/table.component";
import {CdkTextareaAutosize} from "@angular/cdk/text-field";
import {CommentTicketComponent} from './ticket/comment-ticket/comment-ticket.component';
import {CdkAccordion} from "@angular/cdk/accordion";
import {ConsultComponent} from "./ticket/consult/consult.component";
import {
  MatDatepicker,
  MatDatepickerActions, MatDatepickerApply, MatDatepickerCancel,
  MatDatepickerInput, MatDatepickerModule,
  MatDatepickerToggle
} from "@angular/material/datepicker";
import {MatDialogActions, MatDialogClose, MatDialogContent} from "@angular/material/dialog";



@NgModule({
  declarations: [
    ManagementComponent,
    DashbordComponent,
    SidenavComponent,
    BodyManagementComponent,
    HeaderComponent,
    MangementUserComponent,
    TicketComponent,
    EditAddUserComponent,
    TableComponent,
    ConsultComponent,
    CommentTicketComponent,

  ],
  exports: [
    SidenavComponent
  ],
    imports: [
        CommonModule,
        ManagementRoutingModule,
        MatSidenavContainer,
        MatToolbarRow,
        OverlayModule,
        CdkMenuModule,
        MatProgressSpinner,
        MatTable,
        MatColumnDef,
        MatHeaderCell,
        MatHeaderCellDef,
        MatCell,
        MatCellDef,
        MatRow,
        MatRowDef,
        MatHeaderRow,
        MatHeaderRowDef,
        MatPaginator,
        MatSort,
        MatIcon,
        MatIconButton,
        MatTooltip,
        MatTabGroup,
        MatTab,
        MatMiniFabButton,
        MatButton,
        MatFormField,
        MatInput,
        FormsModule,
        MatCard,
        MatCardTitle,
        MatOption,
        MatCardActions,
        MatSelect,
        MatCardContent,
        ReactiveFormsModule,
        MatLabel,
        MatError,
        MatSortHeader,
        NgToastModule,
        UserModule,
        CdkTextareaAutosize,
        MatOptgroup,
        MatCardHeader,
        MatCardImage,
        CdkAccordion,
        MatHint,
        MatDatepickerModule,
        MatInputModule,
        MatDialogActions,
        MatDialogClose,
        MatDialogContent,
        MatCardFooter
    ]
})
export class ManagementModule {

}
