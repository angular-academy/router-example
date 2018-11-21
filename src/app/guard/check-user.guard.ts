import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../user.service';
import { UserRoles } from '../user-roles.enum';

@Injectable({
  providedIn: 'root'
})
export class CheckUserGuard implements CanActivate {

  constructor(private userService: UserService) {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      console.log(`
      Guard checks canActivate: You are ${this.userService.role} and need to be ${UserRoles.USER} or ${UserRoles.ADMIN}.
      ${this.userService.role !== UserRoles.VISITOR ? next.data.granted : next.data.denied}
      `);

      if (this.userService.role === UserRoles.ADMIN || this.userService.role === UserRoles.USER) {
        return true;
      } else {
        return false;
      }
  }
}
