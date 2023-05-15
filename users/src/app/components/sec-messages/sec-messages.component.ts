import { Component, OnInit } from '@angular/core';
import { DoctorService } from 'src/app/services/doctor.service';
import { PatientService } from 'src/app/services/patient.service';
import { SecretaryService } from 'src/app/services/secretary.service';
import { DatePipe } from '@angular/common';
import { Subject, debounceTime } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sec-messages',
  templateUrl: './sec-messages.component.html',
  styleUrls: ['./sec-messages.component.css'],
  providers:[DatePipe]
})
export class SecMessagesComponent implements OnInit {
  private newMessageSubscription: Subscription | undefined;

  constructor(private doctorService:DoctorService,
    private secretaryService:SecretaryService,
    private patientService:PatientService,
    private datepipe:DatePipe,
    private AuthService:AuthService,
    private formbuilder:FormBuilder,
     ) { }
  idSec:any
  sec:any
  patients:any
  msg:any
  pat:any
 
  messageform!:FormGroup
  
  
  newMessageSubject = new Subject<any>();

  ngOnInit(): void {
    this.idSec=localStorage.getItem("userid")
    this.getSecInfo()
    this.messageform=this.formbuilder.group({
      content: ['', Validators.required]})
  }
  ngOnDestroy() {
    if (this.newMessageSubscription) {
      this.newMessageSubscription.unsubscribe();
    }
  }
  
  getSecInfo(){
    return this.secretaryService.getSecretary(this.idSec).subscribe((data:any)=>{
      this.sec=data
      const id=data.cabinet.doctor.id
      this.getpatients(id)
    })
    
  }
  getPatient(id:number){
    this.AuthService.getpatient(id).subscribe((data:any)=>{
      this.pat=data
      })
      
      
      
      
    
  }
  getpatients(id:number){
    return this.doctorService.getdoctorinfo(id).subscribe((data:any)=>{
      this.patients=data.myPatients      
    })
  }
  getMsg(id:number){
    if (this.newMessageSubscription) {
      this.newMessageSubscription.unsubscribe();
    }
    this.getnewmessages(id)
    this.newMessageSubscription = this.newMessageSubject.pipe(
      debounceTime(1500)
    ).subscribe((data: any) => {
      this.getnewmessages(id);
    });
  }
  getnewmessages(id:number){
    this.getPatient(id)
    return this.patientService.getmessages(this.idSec,id).subscribe((data:any)=>{
      this.msg=data
      this.msg.forEach((msg:any)=>{
        msg.timestamp=this.datepipe.transform(msg.timestamp,"shortTime")
      })
      this.newMessageSubject.next(data); 
      
      
    })
  }
  sendmessage(id:number){
    const message=this.messageform.value
    this.patientService.sendmessage(this.idSec,id,message).subscribe((data:any)=>{
      this.getnewmessages(id)
      this.messageform.reset()
      
      console.log("message is sent"+data)
    })
    }

}
