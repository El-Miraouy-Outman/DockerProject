import {Component, Inject} from '@angular/core';

import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material/dialog";
import {UserService} from "../../../services/user.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {User} from "../../../models/User";
import {RegisterComponent} from "../../../user/register/register.component";

@Component({
  selector: 'app-edit-add-user',
  templateUrl: './edit-add-user.component.html',
  styleUrl: './edit-add-user.component.scss'
})
export class EditAddUserComponent {
  user! : User;
  userForm! :FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: {user: User, mode: string},
              public dialog: MatDialogRef<EditAddUserComponent>,
              private userService : UserService,
              private _snackBar: MatSnackBar
  ) {
    this.user= this.data.user
    console.log("data user in editComponent  :",this.data.user)
    if (this.data.mode === 'edit') {
      this.user = data.user;

      this.userForm = new FormGroup({
       /* id: new FormControl(this.user.id_),
        email: new FormControl(this.user.email),
        telephone: new FormControl(this.user.telephone_),
        address: new FormControl(this.user.address_),
        firstName: new FormControl(this.user.firstName_),
        lastName: new FormControl(this.user.lastName_),
        roles: new FormControl(this.user.roles_),
        ville: new FormControl(this.user.ville_),*/
    });

    } else {


    }
  }

 close(){
    this.dialog.close()
 }

  saveChanges() {

  }


}

export function openEditCourseDialog(dialog :MatDialog,user :User,mode :string){
  const config =new MatDialogConfig();
  config.disableClose=true;
  config.autoFocus=true;
  config.width='1000px';
  config.height='600px'
  config.data = {
    ...user,mode
  }
  console.log("on est dans la methode openEditCourseDialog :",config.data)
  return dialog.open(EditAddUserComponent,config).afterClosed();

}
