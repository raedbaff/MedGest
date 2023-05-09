import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SecretaryService } from 'src/app/services/secretary.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sec-patient-profile',
  templateUrl: './sec-patient-profile.component.html',
  styleUrls: ['./sec-patient-profile.component.css']
})
export class SecPatientProfileComponent implements OnInit {

  constructor(private SecretaryService:SecretaryService,private formbuilder:FormBuilder) { }
  sec:any
  id!:number
  editmodal:boolean=false;
  editform!:FormGroup
  token!:string;
  file!:File
  editphoto:boolean=false

  ngOnInit(): void {
    this.id = parseInt(localStorage.getItem("userid") || "0", 10);
    this.token= localStorage.getItem("token") || "";
    console.log("here is the token "+this.token)

    
    this.getSecretary()
    this.editform=this.formbuilder.group({
      username:['',Validators.required],
      email:['',Validators.required],
      experience:['',Validators.required],
      age:['',Validators.required]


    })
    
  }
  onFileSelected(event:any) {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
      
    }
  }
  open(){
    this.editmodal=true
    console.log("the tken is : "+this.token)
    this.editform.patchValue({
      username:this.sec?.username,
      email:this.sec?.email,
      age:this.sec?.age,
      experience:this.sec?.experience
    })
  }
  openphotoChange(){
    
    
    this.editphoto=true
  }
  close(){
    this.editmodal=false;
    this.editphoto=false;
  }
  ChangePhoto(){
    return this.SecretaryService.ChangePhoto(this.file,this.id).subscribe(()=>{
      this.getSecretary()
      this.close()
    })
  }
  
  
  editProfile() {
    const secretary = this.editform.value;
    return this.SecretaryService.EditSecretaryProfile(secretary,this.id).subscribe(() => {
      Swal.fire({
        icon: "success",
        title: "Profile successfully edited",
        timer: 1000,
        timerProgressBar: true,
        showConfirmButton:false
      }).then(() => {
        this.getSecretary();
        this.close()
      });
    }, (error) => {
      Swal.fire({
        icon: "error",
        title: "Something went wrong",
        text: error.message || "An unknown error occurred.",
      });
    });
  }
  
  getSecretary(){
    return this.SecretaryService.getSecretary(this.id).subscribe((data:any)=>{
      this.sec=data
    })
  }

}
