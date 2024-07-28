import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpInterceptorFn,
  HttpRequest
} from '@angular/common/http';
import {Injectable} from "@angular/core";
import {catchError, Observable, of, throwError} from "rxjs";
import {UserService} from "../services/user.service";
import {LocalStorageService} from "../services/storage/local-storage.service";

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
   cpt =0;
  constructor(private userService :UserService,private localStorageService :LocalStorageService) {
  }

     intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(
      !request.url.includes("/authenticate")
      && !request.url.includes("/register")
      && !request.url.includes("/confirmedEmail")
      && !request.url.includes("/validUser")
      && !request.url.includes("/sendUuidToUser")
      && !request.url.includes("/changePassWord")
    ) {
       if(!request.url.includes("/refresh")){
         console.log(' appel pour d\'autre lien sont refresh : ')
         let newRequest = request.clone({
           headers: request.headers.set('Authorization', 'Bearer ' + this.localStorageService.getAccessToken())
         })
         console.log("accessToken :",this.localStorageService.getAccessToken())
         return next.handle(newRequest).pipe(catchError(x => this.handleError(x)));
       }
       else {
         console.log(' appel backend refresh : ')
         let newRequest = request.clone({
           headers: request.headers.set('Authorization', 'Bearer ' + this.localStorageService.getRefreshToken())
         })
         return next.handle(newRequest);
       }
       }

    else {
      console.log('  authentication : ')
      return next.handle(request)
    }
  }

  private handleError(error: HttpErrorResponse) :Observable<any>{

    console.log("on a un erreur : .....? : ",error.status)
    const refreshToken=this.localStorageService.getRefreshToken();
      if(error.status === 403 ){

        this.userService.getRefreshToken(refreshToken).subscribe({
          next : (res:any) =>{
            this.localStorageService.setAccessToken(res.accessToken);
            return of("Votre Refresh Token   est mis a jours")
          },
          error : err => {
            this.localStorageService.setIsUserLoggedIn(false);
            this.localStorageService.removeToken()
          }
        });
        return of("Attempting to refrech token ");
      }
      else {
        this.cpt=0;
        return throwError(()=> new Error("Non Authentication erreur "))
      }


  }



}
