import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { LayoutComponent } from './components/layout/layout.component';
import { AboutComponent } from './components/about/about.component';
import { ServicesComponent } from './components/services/services.component';
import { DoctorsComponent } from './components/doctors/doctors.component';
import { AuthComponent } from './components/auth/auth.component';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DocProfileComponent } from './components/doc-profile/doc-profile.component';
import { FormsModule } from '@angular/forms'
import { NgxStarRatingModule } from 'ngx-star-rating';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppointementComponent } from './components/appointement/appointement.component';
import { MyRendezvousComponent } from './components/my-rendezvous/my-rendezvous.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { AllDocsComponent } from './components/all-docs/all-docs.component';
import { CabinetsComponent } from './components/cabinets/cabinets.component';
import { EditProfileModalComponent } from './components/edit-profile-modal/edit-profile-modal.component';
import { MessageComponent } from './components/message/message.component';
import { PostsComponent } from './components/posts/posts.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Httpinterceptor } from './interceptor/interceptor.interceptor';
import { ChooseComponent } from './components/choose/choose.component';
import { MedicalFileComponent } from './components/medical-file/medical-file.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { DocRegisterComponent } from './components/doc-register/doc-register.component';
import { DocLoginComponent } from './components/doc-login/doc-login.component';
import { DocHomeComponent } from './components/doc-home/doc-home.component';
import { DocHeaderComponent } from './components/doc-header/doc-header.component';
import { DocLayoutComponent } from './components/doc-layout/doc-layout.component';
import { PredictionComponent } from './components/prediction/prediction.component';
import { CancerPredictionComponent } from './components/cancer-prediction/cancer-prediction.component';
import { MyPatientsComponent } from './components/my-patients/my-patients.component';
import { AddSecretaryComponent } from './components/add-secretary/add-secretary.component';
import { DocMyProfileComponent } from './components/doc-my-profile/doc-my-profile.component';
import { MedicalOfficeCreationComponent } from './components/medical-office-creation/medical-office-creation.component';
import {SecretaryHomeComponent} from './components/secretary-home/secretary-home.component';
import { SecretaryLoginComponent } from './components/secretary-login/secretary-login.component';
import { SecLayoutComponent } from './components/sec-layout/sec-layout.component';
import { SecHeaderComponent } from './components/sec-header/sec-header.component';
import { PatientListComponent } from './components/patient-list/patient-list.component';
import { SecPatientProfileComponent } from './components/sec-patient-profile/sec-patient-profile.component'
import { NgxSpinnerModule } from "ngx-spinner";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SecMessagesComponent } from './components/sec-messages/sec-messages.component';
import { PatientMessagesComponent } from './components/patient-messages/patient-messages.component';





@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    HeaderComponent,
    LayoutComponent,
    AboutComponent,
    ServicesComponent,
    DoctorsComponent,
    AuthComponent,
    LoginComponent,
    DocProfileComponent,
    AppointementComponent,
    MyRendezvousComponent,
    MyProfileComponent,
    AllDocsComponent,
    CabinetsComponent,
    EditProfileModalComponent,
    MessageComponent,
    PostsComponent,
    ChooseComponent,
    MedicalFileComponent,
    DocRegisterComponent,
    DocLoginComponent,
    DocHomeComponent,
    DocHeaderComponent,
    DocLayoutComponent,
    PredictionComponent,
    CancerPredictionComponent,
    MyPatientsComponent,
    AddSecretaryComponent,
    DocMyProfileComponent,
    MedicalOfficeCreationComponent,
    SecretaryHomeComponent,
    SecretaryLoginComponent,
    SecLayoutComponent,
    SecHeaderComponent,
    PatientListComponent,
    SecPatientProfileComponent,
    SecMessagesComponent,
    PatientMessagesComponent
    
    
    
  ],
  entryComponents: [
    EditProfileModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgxStarRatingModule,
    NgbModule,
    NgxPaginationModule,
    NgxSpinnerModule,
    BrowserAnimationsModule
   
  ],
  providers: [ 
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Httpinterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
