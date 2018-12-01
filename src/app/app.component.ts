import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from './user.service';
import { UserRoles } from './user-roles.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'router-example';

  routerEventsSubscription: Subscription;

  constructor(private router: Router, public userService: UserService) {}

  ngOnInit() {
  }

  ngOnDestroy() {
    this.routerEventsSubscription.unsubscribe();
  }

  gotoStart() {
    this.router.navigate(['start'], {queryParams: {extra: 'zurück'}});
  }
}
