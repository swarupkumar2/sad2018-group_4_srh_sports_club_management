import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutes } from './app.routes';
import { RouterModule } from '@angular/router';

import { FormsModule } from '@angular/forms';
import {HttpModule} from '@angular/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { ImageFilterPipe } from './image/shared/filter.pipe';
import { ImageService } from './image/shared/image.service';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth-guard.service';
import { SchedulerComponent } from './scheduler/scheduler.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { BookingComponent } from './booking/booking.component';
import { GalleryComponent } from './gallery/gallery.component';
import { ImageDetailComponent } from './image/image-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    SchedulerComponent,
    NavbarComponent,
    GalleryComponent,
    AboutComponent,
    ImageFilterPipe,
    ContactComponent,
    ImageDetailComponent,
    BookingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutes,
    RouterModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(environment.firebase, 'angular-auth-firebase'),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [ImageService, AuthService, AuthGuard, ImageFilterPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
