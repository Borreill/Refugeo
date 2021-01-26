import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { CatsListComponent } from '../app/cats-list/cats-list.component';
import { CatInfoComponent } from './cats-list/cat-info/cat-info.component';
import { CatFormComponent } from './cats-list/cat-form/cat-form.component';
import { DogsListComponent } from '../app/dog-section/dogs-list.component';
import { DogInfoComponent } from './dog-section/dog-info/dog-info.component';
import { DogFormComponent } from './dog-section/dog-form/dog-form.component';
import { HeaderComponent } from './header/header.component';
import { AuthService } from './services/auth.service';
import { CatsService } from './services/cats.service';
import { DogsService } from './services/dogs.service';
import { AuthGuardService } from './services/auth-guard.service';
import { HostFamiliesService } from './services/host-family.service';
import { UpdateCatComponent } from './cats-list/update-cat/update-cat.component';
import { UpdateDogComponent } from './dog-section/update-dog/update-dog.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HomeComponent } from './home/home.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { AppointmentFormComponent } from './appointment/appointment-form/appointment-form.component';
import { AppointmentInfoComponent } from './appointment/appointment-info/appointment-info.component';
import { HostFamilyComponent } from './host-family/host-family.component';
import { HostFamilyFormComponent } from './host-family/host-family-form/host-family-form.component';
import { HostFamilyInfoComponent } from './host-family/host-family-info/host-family-info.component';
import { UpdateHostFamilyComponent } from './host-family/update-host-family/update-host-family.component';

import { HttpClientModule } from '@angular/common//http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule, Routes } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/moment';
import * as moment from 'moment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UpdateAppointmentComponent } from './appointment/update-appointment/update-appointment.component';
import {NgxPaginationModule} from 'ngx-pagination';

import { SearchPipe } from './pipes/search.pipe';
import { StatusCatFilterPipe } from './pipes/statusCatFilter.pipe';
import { CategoryCatFilterPipe } from './pipes/categoryCatFilter.pipe';
import { StatusDogFilterPipe } from './pipes/statusDogFilter.pipe';
import { CategoryDogFilterPipe } from './pipes/categoryDogFilter.pipe';

export function momentAdapterFactory() {
  return adapterFactory(moment);
};
const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'auth/signup', component: SignupComponent },
  { path: 'auth/signin', component: SigninComponent },
  { path: 'cats', canActivate: [AuthGuardService], component: CatsListComponent },
  { path: 'cats/new', canActivate: [AuthGuardService], component: CatFormComponent },
  { path: 'cats/view/:id', canActivate: [AuthGuardService], component: CatInfoComponent },
  { path: 'dogs', canActivate: [AuthGuardService], component: DogsListComponent },
  { path: 'dogs/new', canActivate: [AuthGuardService], component: DogFormComponent },
  { path: 'dogs/view/:id', canActivate: [AuthGuardService], component: DogInfoComponent },
  { path: 'appointments', canActivate: [AuthGuardService], component: AppointmentComponent },
  { path: 'appointments/new', component: AppointmentFormComponent },
  { path: 'appointments/view/:id', canActivate: [AuthGuardService], component: AppointmentInfoComponent },
  { path: 'host-families', canActivate: [AuthGuardService], component: HostFamilyComponent },
  { path: 'host-families/new', component: HostFamilyFormComponent },
  { path: 'host-families/view/:id', canActivate: [AuthGuardService], component: HostFamilyInfoComponent },
  { path: 'erreur/404', component: ErrorPageComponent },
  { path: '**', redirectTo: 'erreur/404' }
]

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    CatInfoComponent,
    CatFormComponent,
    CatsListComponent,
    DogInfoComponent,
    DogFormComponent,
    DogsListComponent,
    HeaderComponent,
    UpdateCatComponent,
    UpdateDogComponent,
    ErrorPageComponent,
    SidebarComponent,
    HomeComponent,
    AppointmentComponent,
    AppointmentFormComponent,
    AppointmentInfoComponent,
    UpdateAppointmentComponent,
    HostFamilyComponent,
    HostFamilyFormComponent,
    HostFamilyInfoComponent,
    UpdateHostFamilyComponent,
    SearchPipe,
    StatusCatFilterPipe,
    CategoryCatFilterPipe,
    StatusDogFilterPipe,
    CategoryDogFilterPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    HttpClientModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: momentAdapterFactory }),
    MatDatepickerModule,
    RouterModule.forRoot(appRoutes, { relativeLinkResolution: 'legacy' }),
    MatFormFieldModule,
    MatInputModule,
    NgxPaginationModule
  ],
  providers: [
    AuthService,
    CatsService,
    DogsService,
    AuthGuardService,
    HostFamiliesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
