import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';
//Service
import { FakeService } from './services/fake.service';
//ChartsModule
import { ChartsModule } from 'ng2-charts'
//Components
import { AppComponent } from './app.component';
import { ChartComponent } from './components/chart/chart.component';
import { PercentageComponent } from './components/percentage/percentage.component';
import { UserdataComponent } from './components/userdata/userdata.component';
import { TabledataComponent } from './components/tabledata/tabledata.component';
//Flex
import {FlexLayoutModule } from '@angular/flex-layout';
import { OrigaComponent } from './origa/origa.component';
// Material 
import { CdkTableModule } from '@angular/cdk/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
    PercentageComponent,
    UserdataComponent,
    TabledataComponent,
    OrigaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    //ChartsModule
    ChartsModule,
    //FlexLayoutModule
    FlexLayoutModule,
    //Material
    MatPaginatorModule,
    MatTableModule,
    CdkTableModule,
    MatFormFieldModule,
    MatSortModule, 
    MatInputModule,
    MatIconModule,
    MatSnackBarModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [FakeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
