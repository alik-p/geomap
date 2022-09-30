import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

import { AppComponent } from './app.component';
import { CustomPopupComponent } from './custom-popup/custom-popup.component';
import { DialogComponent } from './dialog/dialog.component';

const ANGULAR_MATERIAL = [
  MatButtonModule,
  MatDialogModule,
];

@NgModule({
  declarations: [
    AppComponent,
    CustomPopupComponent,
    DialogComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    LeafletModule,
    BrowserAnimationsModule,
    ...ANGULAR_MATERIAL,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
