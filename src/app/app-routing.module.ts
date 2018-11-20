import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StartComponent } from './start/start.component';
import { ItemListComponent } from './item-list/item-list.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ItemDetailsComponent } from './item-details/item-details.component';
import { ProtectedContentComponent } from './protected-content/protected-content.component';
import { CheckUserGuard } from './guard/check-user.guard';
import { UserRoles } from './user-roles.enum';

const routes: Routes = [
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
  {
    path: 'protected-content',
    component: ProtectedContentComponent,
    canActivate: [CheckUserGuard],
    data: {
      roles: [UserRoles.ADMIN]
    }
  },
  {
    path: 'lazy',
    loadChildren: './lazy/lazy.module#LazyModule'
  },
  {
    path: '',
    redirectTo: '/start',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
