import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSortModule } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AppComponent } from './app.component';
import { TopFiltersComponent } from './top-filters/top-filters.component';
import { AddMemberComponent } from './add-member/add-member.component';
import { MembersComponent } from './members/members.component';
import { NotificationComponent } from './notification/notification.component';

const angularMaterialModules = [
  MatToolbarModule,
  MatButtonModule,
  MatFormFieldModule,
  MatIconModule,
  MatCardModule,
  MatCheckboxModule,
  MatSortModule,
  MatChipsModule,
  MatInputModule,
  MatDialogModule,
  MatAutocompleteModule,
  MatSelectModule,
  MatDatepickerModule,
  MatSnackBarModule
];

@NgModule({
  declarations: [
    AppComponent,
    TopFiltersComponent,
    AddMemberComponent,
    MembersComponent,
    NotificationComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ...angularMaterialModules
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
