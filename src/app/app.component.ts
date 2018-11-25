import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'router-example';

  routerEventsSubscription: Subscription;

  constructor(private router: Router) {

  }

  ngOnInit() {
    this.routerEventsSubscription = this.router.events.subscribe(
      routerEvent => console.log(routerEvent)
    );
  }

  ngOnDestroy() {
    this.routerEventsSubscription.unsubscribe();
  }

  gotoStart() {
    this.router.navigate(['start']);
  }
}
