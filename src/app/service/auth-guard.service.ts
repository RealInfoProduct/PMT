import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(public authService : AuthService, public router : Router) { }

  canActivate(route : ActivatedRouteSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isAuth:any = localStorage.getItem("UserData");
    const tokan = JSON.parse(isAuth)._token
    if(!tokan) {
      this.router.navigate(['/login']);
      return false;
    } else {
      return true
    }
  }
}
