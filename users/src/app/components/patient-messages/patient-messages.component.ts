import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { DoctorService } from 'src/app/services/doctor.service';
import { PatientService } from 'src/app/services/patient.service';
import { SecretaryService } from 'src/app/services/secretary.service';
import { Subject, Subscription, debounceTime } from 'rxjs';


@Component({
  selector: 'app-patient-messages',
  templateUrl: './patient-messages.component.html',
  styleUrls: ['./patient-messages.component.css'],
  providers:[DatePipe]
})
export class PatientMessagesComponent implements OnInit {
  private newMessageSubscription: Subscription | undefined;
  idPatient:any
  sec:any
  patients:any
  msg:any
  patient:any
  doctors:any
  doc:any
  messageform!:FormGroup
  secretaries:any
  newMessageSubject = new Subject<any>();


  constructor(
    private doctorService:DoctorService,
    private secretaryService:SecretaryService,
    private patientService:PatientService,
    private datepipe:DatePipe,
    private AuthService:AuthService,
    private formbuilder:FormBuilder,
  ) { }

  ngOnInit(): void {
    this.idPatient=localStorage.getItem("userid")
    this.getPatient()
    this.GetAllSecretaries()
    this.messageform=this.formbuilder.group({
      content: ['', Validators.required]})
  }
  getPatient(){
    this.AuthService.getpatient(this.idPatient).subscribe((data:any)=>{
      this.patient=data
      this.doctors=data.mydocs
      
      
      
      })
  }
  GetAllSecretaries(){
    return this.secretaryService.GetAll().subscribe((data:any)=>{
      this.secretaries=data
    })
  }
  getDoctor(id:number){
    return this.doctorService.getdoctorinfo(id).subscribe((data:any)=>{
      this.doc=data      
    })
  }
  getnewmessages(id:number){
    this.getDoctor(id)
    
    return this.patientService.getmessages(this.idPatient,id).subscribe((data:any)=>{
      this.msg=data
      this.msg.forEach((msg:any)=>{
        msg.timestamp=this.datepipe.transform(msg.timestamp,"shortTime")
      })
      this.newMessageSubject.next(data); 
      
      
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
  sendmessage(id:number){
    const message=this.messageform.value
    this.patientService.sendmessage(this.idPatient,id,message).subscribe((data:any)=>{
      this.getnewmessages(id)
      this.messageform.reset()
      
      console.log("message is sent"+data)
    })
    }
  }


