import { Component, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { PatientService } from 'src/app/services/patient.service';
import { EventEmitter } from 'stream';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  id=localStorage.getItem("userid")
  patient:any
  token=localStorage.getItem("token")
  notifications:any
  notificationNumber:any

  constructor(private authService:AuthService,private patientService:PatientService) { }

  ngOnInit(): void {
    this.getPatinetinfo()
  }
  getPatientNotifs(){
    this.patientService.getpatientnotifications(this.token!).subscribe((data:any)=>{
      
      this.notifications=data;
      
      this.notificationNumber=data.length
    })
  }
  getPatinetinfo(){
    return this.authService.getpatient(this.id).subscribe((data:any)=>{
      this.patient=data
      

    })
  }

}
