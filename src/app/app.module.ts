import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here

import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule, MatPaginatorModule, MatDatepicker, MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button'

import { AppComponent } from './app.component';
import { EnvironmentsComponent } from './environments/environments.component';
import { EnvironmentDetailComponent } from './environment-detail/environment-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    EnvironmentsComponent,
    EnvironmentDetailComponent,
  ],
  entryComponents: [EnvironmentDetailComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
