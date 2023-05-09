import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Doctor } from 'src/app/models/doctor';
import { Message } from 'src/app/models/message';

import { DoctorService } from 'src/app/services/doctor.service';
import { PatientService } from 'src/app/services/patient.service';
import { DatePipe } from '@angular/common';

import { MessageComponent } from '../message/message.component';

@Component({
  selector: 'app-doctor-profile',
  templateUrl: './doctor-profile.component.html',
  styleUrls: ['./doctor-profile.component.css'],
  providers: [DatePipe]
})
export class DoctorProfileComponent implements OnInit {
  doctor!:Doctor
  doctorId!:number
  onedoctor:any
  stat!:string
  id=this.route.snapshot.params["id"]
  showbutton!:boolean
  messages!:any
  rendezvous:any
  senderId=localStorage.getItem("userid")
  receiverId=this.id
  ratings:any
  numberOfRatings!:number
  average!:number

  constructor(private datePipe: DatePipe,
    private patientservice:PatientService,private route: ActivatedRoute,
     private doctorService:DoctorService,private http: HttpClient) { }

  ngOnInit(): void {
    this.getonedoc()
    this.getusermessages()
    this.getmyrendezvous()
    this.getdoctorratings()
    
  //   const id = this.route.snapshot.paramMap.get('id');
  // console.log("the id is "+id);
  //     this.doctorService.getDoctorById(id).subscribe(doctor => this.doctor = doctor);
  //     console.log("your doc is " +this.doctor)
    }
    
    getonedoc(){
      this.doctorService.getDoctorById(this.id).subscribe((res:any)=>{
        this.onedoctor=res
        let number=0
        this.onedoctor.ratings.forEach((element:any)=>{
          number+=element.rating

        })
        this.average=parseFloat((number/this.onedoctor.ratings.length).toFixed(1))
        console.log("the average is this bro : "+this.average,+number)

        console.log("the doctor patients length : "+this.onedoctor.myPatients[0].username)
        this.check()
        this.check2()
        console.log("the stat is " +this.stat)
      })
    }
    getmyrendezvous(){
      this.patientservice.getpatientrendezvous(this.id).subscribe((data:any)=>{
        this.rendezvous=data.map((rdv:{appointmentDate:Date})=>{
          const formattedDate=this.datePipe.transform(rdv.appointmentDate, 'dd MMMM ');
          return {...rdv,formattedDate}
        })
      })
    }
    check(){
      if (this.onedoctor.confirm==true){
        this.stat="confirmed"
        
      }
      else {
        this.stat="not confirmed"
      }
      console.log("the stat is " +this.stat)
    }
    check2(){
      if (this.onedoctor.confirm==true){
        this.showbutton=false

      }
      else{
        this.showbutton=true
      }
    }
    confirmDoctor(id: number) {
      return this.http.put(`http://127.0.0.1:8088/api/auth/Admin/confirm/${id}`, {}).subscribe(() => {
        window.location.reload();
      });
}
    getusermessages(){
      this.doctorService.getDoctorMessagesById(this.id).subscribe((res:any)=>{
        this.messages=res
        console.log("your messages are "+ this.messages.length)

      })
    }
    getdoctorratings(){
      this.patientservice.getDocratings(this.id).subscribe((data:any)=>{
        this.ratings=data
      })
    }
    // openMessageModal() {
    //   const modalRef = this.modalService.open(MessageComponent);
    //   modalRef.componentInstance.senderId = this.senderId; // Set the sender ID input of the message component
    //   modalRef.componentInstance.receiverId = this.receiverId // Set the receiver ID input of the message component
    // }
    

}
