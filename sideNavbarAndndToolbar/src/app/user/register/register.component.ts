import {Component} from '@angular/core';
import {FormBuilder, ValidationErrors, Validators} from '@angular/forms';
import {MatSnackBar} from "@angular/material/snack-bar";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {User} from "../../models/User";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {


  isLinear = false;

  user! : User;
  uuidIsValid = false;
  textValidUuid= false;
  stepTreIsValid =false;

  form =this.fb.group({
    email : ['',
      [ Validators.required,
        Validators.maxLength(30),
        Validators.minLength(8)
      ]],
    firstName : ['',
      [ Validators.required,
        Validators.maxLength(20),
        Validators.minLength(4)
      ]],
    lastName : ['',
      [ Validators.required,
        Validators.maxLength(20),
        Validators.minLength(4)
      ]],
    telephone : ['',
      [ Validators.required,
        Validators.maxLength(14),
        Validators.minLength(4)
      ]],
    passWord : ['tmaneliraouy',
      [ Validators.required,
        Validators.maxLength(14),
        Validators.minLength(4)
      ]],
     ville : ['',
      [ Validators.required,
         Validators.maxLength(14),
        Validators.minLength(4)
       ]],
    address : ['',
      [ Validators.required,
        Validators.maxLength(30),
        Validators.minLength(4)
      ]],
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
  constructor(private fb: FormBuilder,
              private snackBar: MatSnackBar,
              private userService:UserService,
              private route:Router) {
    this.user = new User();
    console.log("==== register ===");
  }

  ngOnInit() {

  }
  registerUser(user :User){

    this.userService.save(user).subscribe({
      next: (response: any) => {
        console.log("response :",response)
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
          this.snackBar.open('Une erreur est produite. Veuillez réessayer plus tard.', 'Close', {duration: 3000});
        }
      },
    });
  }

  stepOneNext() {


    this.form.markAllAsTouched();
    console.log("on est dans step One : ---> ")

    if(this.form.valid) {
      console.log("est valid  : ---> ")
      this.user.lastName = this.form.value.lastName || '';
      this.user.firstName = this.form.value.firstName || '';
      this.user.email = this.form.value.email || '';
      this.user.address = this.form.value.address || '';
      //this.user.ville = this.form.value.ville || '';
      this.user.telephone = this.form.value.telephone || '';
      this.user.passWord = this.form.value.passWord || '';

      console.log('user information :', this.user);
      this.registerUser(this.user);
    }
    console.log('user information :', this.user);
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
          //this.route.navigate(['/user/login']);
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


  done() {
    this.formStepTo.markAllAsTouched();
    if(this.formStepTree.valid){
      if(this.formStepTree.value.passWord === this.formStepTree.value.confirmPassWord){
        this.user.passWord=this.formStepTree.value.passWord || '';
        this.validUser();
      }
      else {
        this.stepTreIsValid=!this.stepTreIsValid;
      }
    }

  }

  private validUser() {
    this.userService.validUser(this.user).subscribe({
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
        } else {
          this.snackBar.open('Une erreur s\'est produite. Veuillez réessayer plus tard.', 'Close', {duration: 3000});
        }
      },
    });
  }
  login() {
    this.route.navigate(['/user/login']);
  }
}
