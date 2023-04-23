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
      console.log("the token",+this.token!)
      this.notifications=data;
      console.log("notification",+this.notifications[0].content)
      this.notificationNumber=data.length
    })
  }
  getPatinetinfo(){
    return this.authService.getpatient(this.id).subscribe((data:any)=>{
      this.patient=data
      console.log("your user info is this "+this.patient.photo)

    })
  }

}
