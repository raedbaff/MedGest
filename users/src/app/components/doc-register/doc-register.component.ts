import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DoctorAuthService } from 'src/app/services/doctor-auth.service';
import { DoctorService } from 'src/app/services/doctor.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-doc-register',
  templateUrl: './doc-register.component.html',
  styleUrls: ['./doc-register.component.css']
})
export class DocRegisterComponent implements OnInit {
  form!:FormGroup
  file!:File
  domains:any
  id:any
  doctor:any

  constructor(private doctorService:DoctorService,private doctorAuth:DoctorAuthService,
    private router:Router,
    private formBuilder: FormBuilder,
    private spinner:NgxSpinnerService) { }

  ngOnInit(): void {this.form = this.formBuilder.group({
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    adresse: ['', Validators.required],
    domainMedical: ['', Validators.required],
  });
  this.getalldomains()
  this.id=localStorage.getItem("userid")
  }
  onFileSelect(event:any){
    if (event.target.files.length >0){
      this.file=event.target.files[0]

    }

  }
  onsubmit(){
    this.spinner.show()
    const Doctor=this.form.value
    this.doctorAuth.register(this.file,Doctor).subscribe((data:any)=>{
      
      this.router.navigate(['/doc/login'])
      Swal.fire({
        icon:"success",
        title:"successfully registered",
        text:"Please wait for admin confirmation before login in"
      })
    }).add(()=>{
      this.spinner.hide()
    })
  }
  getalldomains(){
    return this.doctorService.getAllDomains().subscribe((data:any)=>{
      this.domains=data
    })
  }
  

}
