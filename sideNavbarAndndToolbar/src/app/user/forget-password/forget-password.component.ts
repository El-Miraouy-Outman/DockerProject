import { Component } from '@angular/core';
import {User} from "../../models/User";
import {FormBuilder, ValidationErrors, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent {
  constructor(private fb: FormBuilder,
              private snackBar: MatSnackBar,
              private userService:UserService,
              private route:Router) {
    this.user = new User();
    console.log("==== register ===");
  }
  user! : User;
  uuidIsValid = false;
  textValidUuid= false;
  stepTreIsValid =false;

  formStepOne =this.fb.group({
    email : ['',
      [ Validators.required,
        Validators.maxLength(30),
        Validators.minLength(8)
      ]]

  });

  formStepTo =this.fb.group({
    uuid : ['',
      [ Validators.required,
        Validators.maxLength(8),
        Validators.minLength(8)
      ]],
  });
  formStepTree =this.fb.group({
    passWord : ['',
      [ Validators.required,
        Validators.maxLength(14),
        Validators.minLength(4)
      ]],
    confirmPassWord : ['',
      [ Validators.required,
        Validators.maxLength(14),
        Validators.minLength(4)
      ]],
  });
  stepOneNext() {

    this.formStepOne.markAllAsTouched();
    console.log("on est dans step One : ---> ")

    if(this.formStepOne.valid) {
      console.log("est valid  : ---> ")
      this.user.email = this.formStepOne.value.email || ''; // Utiliser l'opérateur de coalescence nulle
      this.sendUuidToUser(this.user);
    }
    console.log('user information :', this.user);
  }
  done() {
    this.formStepTo.markAllAsTouched();
    if(this.formStepTree.valid){
      if(this.formStepTree.value.passWord === this.formStepTree.value.confirmPassWord){
        this.user.passWord=this.formStepTree.value.passWord || '';
        this.changePassWord();
      }
      else {
        this.stepTreIsValid=!this.stepTreIsValid;
      }
    }
  }
  sendUuidToUser(user :User){

    this.userService.sendUuidToUser(user).subscribe({
      next: (response: any) => {
        console.log("response send uuid  :",response)
      },
      error: (error: any) => {
        console.log("response : ",error)
        if (error.status === 422) {
          if (this.isValidationErrors(error.error)) {
            const validationErrors = error.error as ValidationErrors;
            const firstError = Object.values(validationErrors)[0];
            this.snackBar.open(firstError, 'Close', {duration: 3000});
          }
        } else {
          this.snackBar.open('Une erreur s\'est produite. Veuillez réessayer plus tard.', 'Close', {duration: 3000});
        }
      },
    });
  }



  private isValidationErrors(obj: any): obj is ValidationErrors {
    return obj && typeof obj === 'object' && !Array.isArray(obj);
  }

  validUuid() {

    this.formStepTo.markAllAsTouched();
    if(this.formStepTo.valid){
      this.user.uuid= this.formStepTo.value.uuid || '';
      this.confirmedEmail(this.user);
    }
  }
  confirmedEmail(user :User){

    this.userService.confirmedEmail(user).subscribe({
      next: (response: any) => {
        console.log("response  confirmation :",response)
        this.uuidIsValid=true;
        this.textValidUuid=false;
      },
      error: (error: any) => {
        console.log("response : ",error)
        this.textValidUuid=true;
        if (error.status === 422) {
          if (this.isValidationErrors(error.error)) {
            const validationErrors = error.error as ValidationErrors;
            const firstError = Object.values(validationErrors)[0];
            this.snackBar.open(firstError, 'Close', {duration: 3000});
          }
        } else {
          this.snackBar.open('Une erreur s\'est produite. Veuillez réessayer plus tard.', 'Close', {duration: 3000});
        }
      },
    });
  }



  private changePassWord() {
    this.userService.changePassWord(this.user).subscribe({
      next: (response: any) => {
        console.log("response valid :",response)
        // deriger vers login
        this.route.navigateByUrl("/user/login")
        this.stepTreIsValid=!this.stepTreIsValid;
      },
      error: (error: any) => {
        console.log("response valid : ",error)
        if (error.status === 422) {
          if (this.isValidationErrors(error.error)) {
            const validationErrors = error.error as ValidationErrors;
            const firstError = Object.values(validationErrors)[0];
            this.snackBar.open(firstError, 'Close', {duration: 3000});
          }
        }
        else {
          this.snackBar.open('Une erreur s\'est produite. Veuillez réessayer plus tard.', 'Close', {duration: 3000});
        }
      },
    });
  }
  login() {
    this.route.navigate(['/user/login']);
  }
}
