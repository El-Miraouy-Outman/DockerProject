import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { LoginComponent } from './login/login.component';
import {UserComponent} from "./user.component";
import { NavbarvideComponent } from './navbarvide/navbarvide.component';
import { RegisterComponent } from './register/register.component';
import { BODYComponent } from './body/body.component';
import {MatStep, MatStepLabel, MatStepper, MatStepperNext, MatStepperPrevious} from "@angular/material/stepper";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormField, MatFormFieldModule, MatPrefix, MatSuffix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton, MatIconButton} from "@angular/material/button";
import { ChangePasswordComponent } from './change-password/change-password.component';
import {MatCard, MatCardActions, MatCardContent, MatCardTitle} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import { ForgetPasswordComponent } from './forget-password/forget-password.component';


@NgModule({
    declarations: [
        UserComponent,
        LoginComponent,
        NavbarvideComponent,
        RegisterComponent,
        BODYComponent,
        ChangePasswordComponent,
        ForgetPasswordComponent
    ],
    exports: [
        RegisterComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        UserRoutingModule,
        NgOptimizedImage,
        MatStep,
        ReactiveFormsModule,
        MatFormField,
        MatStepper,
        MatInput,
        MatStepLabel,
        MatButton,
        MatStepperNext,
        MatStepperPrevious,
        MatIconButton,
        MatPrefix,
        MatSuffix,
        MatCardActions,
        MatCardTitle,
        MatCardContent,
        MatCard,
        MatFormFieldModule,
        MatIcon,
        MatCheckbox,
        MatProgressSpinner
    ]
})
export class UserModule { }
