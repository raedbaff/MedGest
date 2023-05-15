import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DoctorService } from 'src/app/services/doctor.service';
import { PatientService } from 'src/app/services/patient.service';
import { SecretaryService } from 'src/app/services/secretary.service';
import { DatePipe } from '@angular/common';
import { Subject, debounceTime } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css'],
  providers:[DatePipe]
})
export class PatientListComponent implements OnInit {
  patients:any
  id:any
  id2:any
  sec:any
  username!:String
  photo!:String
  docid:any
  messageModalOpen!:boolean
  medicalbillopen!:boolean
  medicalbillview!:boolean
  messageform!:FormGroup
  newmsg:any
  pat:any
  patient:any
  patientbills:any
  filtered:any
  patientRDV:any
  filteredpatientRDV:any
  medialbillform!:FormGroup
  newMessageSubject = new Subject<any>();
  

  constructor(private doctorService:DoctorService,
    private secretaryService:SecretaryService,
    private formbuilder:FormBuilder,
    private patientService:PatientService,
    private datepipe:DatePipe,
    private AuthService:AuthService,
    

    ) { }

  ngOnInit(): void {
    this.id=localStorage.getItem('userid')
    this.getSecInfo()
    this.messageform=this.formbuilder.group({
      content: ['', Validators.required]})
      this.medialbillform=this.formbuilder.group({
        rendezvous:['',Validators.required],
        Description:['',Validators.required],
        amount:['',Validators.required],
        Tax:['',Validators.required],
        Discount:['',Validators.required],

      })
      
      
  }
  getPatient(id:number){
    this.AuthService.getpatient(id).subscribe((data:any)=>{
      this.pat=data.username
      this.patient=data.id
      this.patientRDV=data.myRendezVous
      this.filteredpatientRDV=this.patientRDV.filter((rd:any)=>rd.doctor.id===this.sec.cabinet.doctor.id)
      this.filtered=data.myBills.filter((bill:any)=>bill.doc.username === this.sec.cabinet.doctor.username)
      
      this.patientbills=this.filtered.map((bill:{date:Date})=>{
        const formattedDate=this.datepipe.transform(bill.date,'dd MMMM yyyy')
        return {...bill,formattedDate}
      })
      
      
      
      
    })
  }
  getnewmessages(id:number){
    return this.patientService.getmessages(this.id,id).subscribe((data:any)=>{
      this.newmsg=data
      this.newmsg.forEach((msg:any)=>{
        msg.timestamp=this.datepipe.transform(msg.timestamp,"shortTime")
      })
      this.newMessageSubject.next(data); 
      
      
    })
  }
  sendmessage(id:number){
    const message=this.messageform.value
    this.patientService.sendmessage(this.id,id,message).subscribe((data:any)=>{
      this.getnewmessages(id)
      this.messageform.reset()
      
      console.log("message is sent"+data)
    })
    }
  getpatients(id:number){
    return this.doctorService.getdoctorinfo(id).subscribe((data:any)=>{
      
      
      this.patients=data.myPatients
      
    })
  }
  getSecInfo(){
    return this.secretaryService.getSecretary(this.id).subscribe((data:any)=>{
      this.sec=data
      this.username=data.username
      this.photo=data.photo
      const docid=this.sec.cabinet.doctor.id
      this.getpatients(docid)
    })
    
  }
  createbill(){
    const bill=this.medialbillform.value
    console.log("the rendezvous id : "+this.medialbillform.get("rendezvous")?.value)
    return this.secretaryService.createMedicalBill(bill).subscribe(()=>{
      
      Swal.fire({
        title: 'Success',
        text: 'bill created successfuly',
        timer: 1000, // Timeout duration in milliseconds
        timerProgressBar: true, // Show progress bar
      })
      
      
      
    })
  }

  
  openMessageModal(id:number){
    this.messageModalOpen = true;
    
    this.getPatient(id)
    this.getnewmessages(id)
    this.newMessageSubject.pipe(
      debounceTime(1500)
    ).subscribe((data:any) => {
      this.getnewmessages(id);
    });
  }
  openMedicalBillModal(id:number){
    this.medicalbillopen=true;
  
    this.getPatient(id);
    
    
    
    }
  openMedicalbill(id:number){
    this.medicalbillview=true;
    console.log("the id is "+id)
    this.getPatient(id)
    }
    
    closeMessageModal(){
      this.messageModalOpen=false;
      this.newMessageSubject.unsubscribe();
    }
    closeMedicalBills(){
      this.medicalbillview=false;
    }
    close(){
      this.medicalbillopen=false
      window.location.reload()
      
      
      
      
    }

}
