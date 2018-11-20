import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PopupComponent } from './popup.component';
import { StartComponent } from '../start/start.component';
import { ItemListComponent } from '../item-list/item-list.component';
import { ItemDetailsComponent } from '../item-details/item-details.component';

const routes: Routes = [
  {
    path: 'popup',
    component: PopupComponent,
    outlet: 'popup',
    children: [
      {
        path: 'start',
        component: StartComponent
      },
      {
        path: 'item-list',
        component: ItemListComponent,
        children: [
          {
            path: 'details/:id',
            component: ItemDetailsComponent
          }
        ]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PopupRoutingModule { }
