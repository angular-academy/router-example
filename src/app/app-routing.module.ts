import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StartComponent } from './start/start.component';
import { ItemListComponent } from './item-list/item-list.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ItemDetailsComponent } from './item-details/item-details.component';
import { ProtectedContentComponent } from './protected-content/protected-content.component';
import { CheckUserGuard } from './guard/check-user.guard';
import { UserRoles } from './user-roles.enum';
import { BannerComponent } from './banner/banner.component';

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
      granted: 'Access granted!',
      denied: 'Access denied!'
    }
  },
  {
    path: 'lazy',
    loadChildren: './lazy/lazy.module#LazyModule'
  },
  {
    path: 'banner',
    component: BannerComponent,
    outlet: 'footer'
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
