import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HomeComponent } from './components/home/home.component';
import { LayoutComponent } from './components/layout/layout.component';
import { DoctorsComponent } from './components/doctors/doctors.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DoctorProfileComponent } from './components/doctor-profile/doctor-profile.component';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import Swiper from 'swiper';

import { AjoutdocComponent } from './components/ajoutdoc/ajoutdoc.component';
import { EditDoctorComponent } from './components/edit-doctor/edit-doctor.component';
import { AllPatientsComponent } from './components/all-patients/all-patients.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AddPatientComponent } from './components/add-patient/add-patient.component';
import { AppointementsComponent } from './components/appointements/appointements.component';
import { MessageComponent } from './components/message/message.component';
import { BillsComponent } from './components/bills/bills.component';
import { InvoiceComponent } from './components/invoice/invoice.component';
import { CommunityPostsComponent } from './components/community-posts/community-posts.component';
import { DeclinedPostsComponent } from './components/declined-posts/declined-posts.component';
import { AddMedicalFieldComponent } from './components/add-medical-field/add-medical-field.component';
import { MedicalFieldsListComponent } from './components/medical-fields-list/medical-fields-list.component';
import { ComplaintsComponent } from './components/complaints/complaints.component';
// import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    HomeComponent,
    LayoutComponent,
    DoctorsComponent,
    DoctorProfileComponent,
    LoginComponent,
    AjoutdocComponent,
    EditDoctorComponent,
    AllPatientsComponent,
    AddPatientComponent,
    AppointementsComponent,
    MessageComponent,
    BillsComponent,
    InvoiceComponent,
    CommunityPostsComponent,
    DeclinedPostsComponent,
    AddMedicalFieldComponent,
    MedicalFieldsListComponent,
    ComplaintsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgxSpinnerModule,
    BrowserAnimationsModule
    // NgbModalModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
