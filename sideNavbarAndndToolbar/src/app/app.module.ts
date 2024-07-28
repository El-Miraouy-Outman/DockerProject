import {NgModule} from '@angular/core';
import {BrowserModule, provideClientHydration} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {UserModule} from './user/user.module';
import {MatFormFieldModule, MatHint} from "@angular/material/form-field";
import {HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withInterceptorsFromDi} from "@angular/common/http";
import {AppHttpInterceptor} from "./interceptors/app-http.interceptor";
import {NgToastModule} from "ng-angular-popup";
import {MatSortModule} from "@angular/material/sort";
import {MatButton} from "@angular/material/button";
import {ManagementModule} from "./management/management.module";
import {MAT_DATE_LOCALE, provideNativeDateAdapter} from "@angular/material/core";

@NgModule({
  declarations: [
    AppComponent,

  ],

    imports: [
        BrowserModule,
        AppRoutingModule,
        UserModule,
        ManagementModule,
        MatFormFieldModule,
        HttpClientModule,
        NgToastModule,
        MatSortModule,
        MatButton,
        MatHint
    ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    provideNativeDateAdapter(),
    {provide: HTTP_INTERCEPTORS, useClass: AppHttpInterceptor, multi: true},
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }

  ],
  exports: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
