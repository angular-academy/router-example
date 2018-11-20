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
}
