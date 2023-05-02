import { Component, OnInit } from '@angular/core';
import { DoctorService } from 'src/app/services/doctor.service';
import { PatientService } from 'src/app/services/patient.service';
import { DatePipe } from '@angular/common';
import { Subject, debounceTime } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-my-patients',
  templateUrl: './my-patients.component.html',
  styleUrls: ['./my-patients.component.css'],
  providers:[DatePipe]
})
export class MyPatientsComponent implements OnInit {
  id!:any
  docs:any
  id2:any
  messageModalOpen: boolean = false;
  MedicalFileModalOpen:boolean=false;
  MedicalFileview:boolean=false;
  theactualdoc:any
  newmsg:any
  newMessageSubject = new Subject<any>();
  messageform!:FormGroup
  doctor:any
  patient:any
  id3!:number
  patientToCreateMedicalFileFor:any
  medicalform!:FormGroup
  token!:any
  patientTo:any
  files:any
  id4!:number
  

 


  constructor(private AuthService:AuthService,private formBuilder: FormBuilder,private datePipe: DatePipe,private doctorservice:DoctorService,private patientService:PatientService) { 
    this.messageModalOpen = false;
  }

  ngOnInit(): void {
    
    this.id=localStorage.getItem("userid")
    this.token=localStorage.getItem('token')
    this.getdoc()
    this.messageform=this.formBuilder.group({
      content: ['', Validators.required]})
      this.medicalform = this.formBuilder.group({
        patient: ['', Validators.required],
        medicalHistory: ['', Validators.required],
        allergies: ['', Validators.required],
        diagnoses: ['', Validators.required],
        diagnosesResults: ['', Validators.required],
        progressNotes: ['', Validators.required],
        nextSteps: ['', Validators.required]
      });
  }
  getuser(){
    this.AuthService.getpatient(this.id2).subscribe((data:any)=>{
      this.patient=data.username
      
      console.log("patient is "+this.patient)
    })
  }
  // getnewmessages(){
  //   return this.patientService.getmessages(this.id,id).subscribe((data:any)=>{
  //     this.newmsg=data
  //     this.newmsg.forEach((msg:any)=>{
  //       msg.timestamp=this.datePipe.transform(msg.timestamp,"shortTime")
  //     })
  //     this.newMessageSubject.next(data); 
      
      
  //   })
  // }
  getdoc(){
    return this.doctorservice.getdoctorinfo(this.id).subscribe((data:any)=>{
      this.theactualdoc=data
      console.log("the photo is :"+this.theactualdoc.photo)
      this.docs=data.myPatients
      this.docs.forEach((element :any)=> {
        console.log("the ids of the patients are :"+element.id)
        
      });
    })
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
  getpatient(){
    this.AuthService.getpatient(this.id3).subscribe((data:any)=>{
      this.patientToCreateMedicalFileFor=data
      this.patientTo = this.patientToCreateMedicalFileFor?.id;
    console.log("the patient is " + this.patientTo);
    this.medicalform.patchValue({
      patient: this.patientTo
    });
    })
  }
  openMedicalFileModal(id:number){
    this.MedicalFileModalOpen=true
    this.id3=id
    this.getpatient()
    console.log("the id is "+this.id3)
  }
  submitMedicalFile(){
    const medicalfile=this.medicalform.value
    return this.doctorservice.createMedicalFile(this.token,medicalfile).subscribe((data:any)=>{
      Swal.fire({
        icon:"success",
        title:"successfully created medicalfile"
      })
    },
    error=>{
      Swal.fire({
        icon:"error",
        title:"something went wrong"
      })
    })
  }
  openMessageModal(id:number){
    this.messageModalOpen = true;
    this.id2=id
    this.getuser()
    this.getnewmessages()
    this.newMessageSubject.pipe(debounceTime(1500)).subscribe((data:any) => {
      this.getnewmessages();
    });
    console.log("it is :"+this.messageModalOpen)
    
  }
  getmedicalfile(){
    return this.doctorservice.getMedicalFile(this.id4).subscribe((data:any)=>{
      this.files=data.filter((file:any)=>file.doctor.id==this.id)
      console.log("the length of this user files"+this.files.length)
    })
  }
  openMedicalFile(id:number){
    this.MedicalFileview=true;
    this.id4=id
    this.getmedicalfile()
  
  }
  sendmessage(){
    const message=this.messageform.value
    this.patientService.sendmessage(this.id,this.id2,message).subscribe((data:any)=>{
      this.getnewmessages()
      this.messageform.reset()
      
      console.log("message is sent"+data)
    })
    }

  closeMessageModal(): void {
    this.messageModalOpen = false;
    this.newMessageSubject.unsubscribe()
    this.MedicalFileModalOpen=false;
    this.MedicalFileview=false
  }
  

}
