import { Injectable } from '@angular/core';
import { UserRoles } from './user-roles.enum';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public role: UserRoles;

  constructor() {
    this.role = UserRoles.VISITOR;
  }

  switchUser() {
    this.role === UserRoles.VISITOR ? this.role = UserRoles.USER : this.role = UserRoles.VISITOR;
    return this.role;
  }
}
