import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { timer } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { PatientService } from 'src/app/services/patient.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  number:any
  numberofcabinets:any
  numberofdomains:any
  patinets:any
  ComplaintForm!:FormGroup
  PatientToken!:String

  constructor(private PatientService:PatientService,private Authservice:AuthService,
    private formbuilder:FormBuilder) { }

  ngOnInit(): void {
    this.getdocsnumber()
    this.getcabinets()
    this.getalldomains()
    this.getpatients()
    this.PatientToken!=localStorage.getItem('token')
    console.log("the patient token is "+this.PatientToken)
    this.ComplaintForm=this.formbuilder.group({
      description:['',Validators.required]
    })
  }
  getpatients(){
    return this.PatientService.getallpatients().subscribe((data:any)=>{
      this.patinets=data.length
      console.log("the patients"+this.patinets)
    })
  }
  getdocsnumber(){
    this.PatientService.getalldoc().subscribe((data:any)=>
    this.number=data.length)
  }
  getalldomains(){
    return this.PatientService.getalldomains().subscribe((data:any)=>{
      this.numberofdomains=data.length
    })
  }
  getcabinets(){
    return this.PatientService.getallcabinets().subscribe((data:any)=>{
      this.numberofcabinets=data.length
    })
  }
  FileComplaint(){
    const complaint=this.ComplaintForm.value
    return this.PatientService.FileComplaint(complaint,this.PatientToken).subscribe(()=>{
      Swal.fire({
        icon:"success",
        title:"Complaint Filed Successfully",
        text:"thank you for sharing feedback, your complaint will be handled by the admin",
        timer:2000,
        timerProgressBar:true,
        showCloseButton:false
      })
    })

  }

}
