import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { PatientService } from 'src/app/services/patient.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
  providers:[DatePipe]
})
export class MessageComponent implements OnInit {
  id:any
  id2:any
  messages:any
  patient:any
  patient2:any
  photo:any
  messageform!:FormGroup
  newmsg:any
  newMessageSubject = new Subject<any>();
  

  constructor(private datePipe: DatePipe,private formBuilder: FormBuilder,private route:ActivatedRoute,private patientService:PatientService,private AuthService:AuthService) { }

  ngOnInit(): void {
    this.id=localStorage.getItem("userid")
    this.id2=this.route.snapshot.params["id"]
    
    this.getuser()
    this.getuser2()
    this.getmessages()
    this.getnewmessages()
    this.newMessageSubject.subscribe((data:any) => {
      this.getnewmessages();
    });

    this.messageform=this.formBuilder.group({
      content: ['', Validators.required]})

  }
  

  getnewmessages(){
    return this.patientService.getmessages(this.id,this.id2).subscribe((data:any)=>{
      this.newmsg=data
      this.newmsg.forEach((msg:any)=>{
        msg.timestamp=this.datePipe.transform(msg.timestamp,"shortTime")
      })
      this.newMessageSubject.next(data); 
      
      
    })
  }
  sendmessage(){
    const message=this.messageform.value
    this.patientService.sendmessage(this.id,this.id2,message).subscribe((data:any)=>{
      this.getnewmessages()
      this.messageform.reset()
      
      console.log("message is sent"+data)
    })
    }
  getuser2(){
    this.patientService.getdoc(this.id2).subscribe((data:any)=>{
      this.patient2=data.username
      this.photo=data.photo
      console.log("photo"+this.photo)
      console.log("patient2 is "+this.patient2)

    })
  }
  getuser(){
    this.AuthService.getpatient(this.id).subscribe((data:any)=>{
      this.patient=data.username
      
      console.log("patient is "+this.patient)
    })
  }
  getmessages(){
    return this.patientService.getmessages(this.id,this.id2).subscribe((data:any)=>{
      this.messages=data
      this.getnewmessages()
      
      
    })
  }
 
  
  

}
