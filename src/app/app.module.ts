import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StartComponent } from './start/start.component';
import { ItemListComponent } from './item-list/item-list.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ItemDetailsComponent } from './item-details/item-details.component';
import { ProtectedContentComponent } from './protected-content/protected-content.component';
import { PopupModule } from './popup/popup.module';
import { BannerComponent } from './banner/banner.component';

@NgModule({
  declarations: [
    AppComponent,
    StartComponent,
    ItemListComponent,
    NotFoundComponent,
    ItemDetailsComponent,
    ProtectedContentComponent,
    BannerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PopupModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
