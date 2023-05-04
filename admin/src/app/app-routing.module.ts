import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPatientComponent } from './components/add-patient/add-patient.component';
import { AjoutdocComponent } from './components/ajoutdoc/ajoutdoc.component';
import { AllPatientsComponent } from './components/all-patients/all-patients.component';
import { AppointementsComponent } from './components/appointements/appointements.component';
import { BillsComponent } from './components/bills/bills.component';

import { DoctorProfileComponent } from './components/doctor-profile/doctor-profile.component';
import { DoctorsComponent } from './components/doctors/doctors.component';
import { EditDoctorComponent } from './components/edit-doctor/edit-doctor.component';
import { HomeComponent } from './components/home/home.component';
import { InvoiceComponent } from './components/invoice/invoice.component';
import { LayoutComponent } from './components/layout/layout.component';
import { LoginComponent } from './components/login/login.component';
import { MessageComponent } from './components/message/message.component';
import { AuthGuard } from './guard/auth.guard';
import { CommunityPostsComponent } from './components/community-posts/community-posts.component';
import { DeclinedPostsComponent } from './components/declined-posts/declined-posts.component';
import { AddMedicalFieldComponent } from './components/add-medical-field/add-medical-field.component';
import { MedicalFieldsListComponent } from './components/medical-fields-list/medical-fields-list.component';
import { ComplaintsComponent } from './components/complaints/complaints.component';

const routes: Routes = [
  {path:"",component:LoginComponent},
  {
    path: "home",
    canActivate:[AuthGuard],
    component: HomeComponent,
    children: [
      { path: "", component: LayoutComponent },
      { path: "AllDoctors", component: DoctorsComponent },
       { path: "one/:id", component: DoctorProfileComponent },
      {path:"ajout",component:AjoutdocComponent},
      {path:"addDomain",component:AddMedicalFieldComponent},
      {path:"domainList",component:MedicalFieldsListComponent},
       {path:"edit/:id",component:EditDoctorComponent},
       {path:"AllPatients",component:AllPatientsComponent},
       {path:"AddPatient",component:AddPatientComponent},
       {path:"appointements",component:AppointementsComponent},
       {path:"message/:receiver",component:MessageComponent},
       {path:"bills",component:BillsComponent},
       {path:"invoice/:id",component:InvoiceComponent},
       {path:"community",component:CommunityPostsComponent},
       {path:"declinedPosts",component:DeclinedPostsComponent},
       {path:"complaints",component:ComplaintsComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
