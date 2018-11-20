import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  closePopup() {
    this.router.navigate([{outlets : {popup: null}}]);
  }

}
