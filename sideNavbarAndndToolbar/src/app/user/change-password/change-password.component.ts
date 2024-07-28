import {ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {MatStepper} from "@angular/material/stepper";
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {LocalStorageService} from "../../services/storage/local-storage.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {UserService} from "../../services/user.service";
import {User} from "../../models/User";

@Component({
  selector: 'change-password',
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent {
  user! : User;
  isLoading =false;
  formIsValid =false ;
  passWordNotEquals=false;
  form =this.fb.group({

   email : ['',
     [ Validators.required,
       Validators.maxLength(20),
       Validators.minLength(4)
     ]],
   oldPassWord : ['',
     [ Validators.required,
       Validators.maxLength(30),
       Validators.minLength(4)
     ]],
   newPassWord : ['',
     [ Validators.required,
       Validators.maxLength(20),
       Validators.minLength(4)
     ]],
   confirmNewPassWord : ['',
     [ Validators.required,
       Validators.maxLength(20),
       Validators.minLength(4)
     ]],
 });



  constructor(
    private localstorage:LocalStorageService,
    private snackBar: MatSnackBar,
    private fb:FormBuilder,
    private  userService:UserService,
    private route :Router
  ) {
    this.user=new User();
  }
  changer() {

    this.form.markAllAsTouched();
    if(this.form.valid){
      if(this.form.value.newPassWord === this.form.value.confirmNewPassWord){
        this.user.email=this.form.value.email || '';
        this.user.passWord=this.form.value.oldPassWord || '';
        this.user.newPassWord=this.form.value.newPassWord || '';
        this.changePassWord();
      }
      else {
        this.passWordNotEquals=true;
      }

    }
    else {
      this.formIsValid=!this.formIsValid;
    }
  }

  private changePassWord() {
    this.isLoading=true;
    this.userService.changePassWord(this.user).subscribe({
      next: (response: any) => {
        console.log("response valid :",response)
        // deriger vers login
        this.route.navigateByUrl("/user/login")
        this.formIsValid=true;
        this.isLoading=true;
      },
      error: (error: any) => {
        this.formIsValid=false;
        console.log("response valid : ",error)
          this.snackBar.open('Une erreur s\'est produite. Veuillez réessayer plus tard.', 'Close', {duration: 3000});
          this.isLoading=false;
          this.formIsValid=true;
        },
    });
  }
  login() {
    this.route.navigate(['/user/login']);
  }

}

