import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DoctorService } from 'src/app/services/doctor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-doc-my-profile',
  templateUrl: './doc-my-profile.component.html',
  styleUrls: ['./doc-my-profile.component.css']
})
export class DocMyProfileComponent implements OnInit {
  doc:any
  id:any
  token:any
  cabinet:any
  editmodal!:boolean
  editform!:FormGroup
  bills!:any
  

  constructor(private doctorService:DoctorService,private formbuilder:FormBuilder) { }

  ngOnInit(): void {
    this.id=localStorage.getItem("userid")
    this.token=localStorage.getItem('token')
    this.getdoc()
    this.getcabinet()
    this.editform=this.formbuilder.group({
      username:['',Validators.required],
      age:['',Validators.required],
      adresse:['',Validators.required],
      description:['',Validators.required],
      email:['',Validators.required],
    })
    
  }
  
  getdoc(){
    this.doctorService.getdoctorinfo(this.id).subscribe((data:any)=>{
      this.doc=data
      this.bills=data.doctorBills
      
    })
  }
  getcabinet(){
    this.doctorService.getcabinet(this.token).subscribe((data:any)=>{
      this.cabinet=data
    })
  }
  openEditModal(){
    this.editmodal=true;
    this.editform.patchValue({
      username:[this.doc.username],
      email:[this.doc.email],
      age:[this.doc.age],
      description:[this.doc.description],
      adresse:[this.doc.adresse]
    })
    console.log("the edit"+this.editmodal)
  }
  editprofile(){
    return this.doctorService.EditProfile(this.editform.value,this.token).subscribe(()=>{
      Swal.fire({
        title:"Profile Edited Succuessfully",
        timer: 3000, // Set the timer option to 3000 milliseconds (3 seconds)
        timerProgressBar: true // Enable the progress bar
        
      }).then(()=>{
        this.getdoc()
        this.close()
      })
    })
  }
  close(){
    this.editmodal=false
  }

}
