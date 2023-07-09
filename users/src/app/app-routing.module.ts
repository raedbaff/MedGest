import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { AllDocsComponent } from './components/all-docs/all-docs.component';
import { AppointementComponent } from './components/appointement/appointement.component';
import { AuthComponent } from './components/auth/auth.component';
import { CabinetsComponent } from './components/cabinets/cabinets.component';
import { DocProfileComponent } from './components/doc-profile/doc-profile.component';
import { DoctorsComponent } from './components/doctors/doctors.component';
import { EditProfileModalComponent } from './components/edit-profile-modal/edit-profile-modal.component';
import { HomeComponent } from './components/home/home.component';
import { LayoutComponent } from './components/layout/layout.component';
import { LoginComponent } from './components/login/login.component';
import { MessageComponent } from './components/message/message.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { MyRendezvousComponent } from './components/my-rendezvous/my-rendezvous.component';
import { PostsComponent } from './components/posts/posts.component';
import { ServicesComponent } from './components/services/services.component';
import { ChooseComponent } from './components/choose/choose.component';
import { MedicalFileComponent } from './components/medical-file/medical-file.component';
import { GuardGuard } from './guard.guard';
import { DocRegisterComponent } from './components/doc-register/doc-register.component';
import { DocLoginComponent } from './components/doc-login/doc-login.component';
import { DocHomeComponent } from './components/doc-home/doc-home.component';
import { PredictionComponent } from './components/prediction/prediction.component';
import { DocLayoutComponent } from './components/doc-layout/doc-layout.component';
import { CancerPredictionComponent } from './components/cancer-prediction/cancer-prediction.component';
import { MyPatientsComponent } from './components/my-patients/my-patients.component';
import { AddSecretaryComponent } from './components/add-secretary/add-secretary.component';
import { DocMyProfileComponent } from './components/doc-my-profile/doc-my-profile.component';
import { MedicalOfficeCreationComponent } from './components/medical-office-creation/medical-office-creation.component';
import { SecretaryHomeComponent } from './components/secretary-home/secretary-home.component';
import { SecretaryLoginComponent } from './components/secretary-login/secretary-login.component';
import { SecLayoutComponent } from './components/sec-layout/sec-layout.component';
import { PatientListComponent } from './components/patient-list/patient-list.component';
import { SecPatientProfileComponent } from './components/sec-patient-profile/sec-patient-profile.component';
import { SecMessagesComponent } from './components/sec-messages/sec-messages.component';
import { PatientMessagesComponent } from './components/patient-messages/patient-messages.component';

const routes: Routes = [
  {path:"",component:ChooseComponent},
  {path:"register",component:LoginComponent},
  {path:"MedicalFile/:id",component:MedicalFileComponent},
  {path:"login",component:AuthComponent},
  {path:"doc/Register",component:DocRegisterComponent},
  {path:"doc/login",component:DocLoginComponent},
  {path:"sec/login",component:SecretaryLoginComponent},

  {path:"doc/home",
  canActivate:[GuardGuard],
  component:DocHomeComponent,children:[
    {path:"",component:DocLayoutComponent},
    {path:"predict",component:PredictionComponent},
    {path:"predictCancer",component:CancerPredictionComponent},
    {path:"mypatients",component:MyPatientsComponent},
    {path:"addSecretary",component:AddSecretaryComponent},
    {path:"myProfile",component:DocMyProfileComponent},
    {path:"addOffice",component:MedicalOfficeCreationComponent}
  ]},
  {path:"sec/home",
  canActivate:[GuardGuard],
  component:SecretaryHomeComponent,children:[
    {path:"",component:SecLayoutComponent},
    {path:"patientsList",component:PatientListComponent},
    {path:"patientProfile",component:SecPatientProfileComponent},
    {path:"messages",component:SecMessagesComponent}
    
  ]},
  {path:"home",
  canActivate:[GuardGuard],
  component:HomeComponent,children:[
    {path:"",component:LayoutComponent},
    {path:"about",component:AboutComponent},
    {path:"services",component:ServicesComponent},
    {path:"doctors/:id",component:DoctorsComponent},
    {path:"doctor/:id",component:DocProfileComponent},
    {path:"appointement",component:AppointementComponent},
    {path:"myappointements",component:MyRendezvousComponent},
    {path:"myProfile",component:MyProfileComponent},
    {path:"allDocs",component:AllDocsComponent},
    {path:"cabinets",component:CabinetsComponent},
    {path:"edit/:id",component:EditProfileModalComponent},
    {path:"message/:id/:id",component:MessageComponent},
    {path:"community",component:PostsComponent},
    {path:"myMessages",component:PatientMessagesComponent}
    

  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ anchorScrolling: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
