import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../user.service';

@Injectable({
  providedIn: 'root'
})
export class CheckUserGuard implements CanActivate {

  constructor(private userService: UserService) {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      console.log('check user guard called', next.data );

      if (next.data.roles && next.data.roles.indexOf( this.userService.role ) !== -1 ) {
        return true;
      } else {
        return false;
      }
  }
}
