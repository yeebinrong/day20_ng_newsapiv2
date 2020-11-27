// Default imports
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Import modules
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { HttpClientModule } from '@angular/common/http';

// Import Database
import { StorageDatabase } from './storage.database';

// Components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main.component';
import { FormComponent } from './components/form.component';
import { DetailComponent } from './components/detail.component';
//

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    FormComponent,
    DetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatMomentDateModule,
    FlexLayoutModule,
    HttpClientModule,
  ],
  providers: [{provide: MAT_DATE_LOCALE, useValue: 'en-GB'}, StorageDatabase],
  bootstrap: [AppComponent]
})
export class AppModule { }
