import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DoctorService } from 'src/app/services/doctor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-secretary',
  templateUrl: './add-secretary.component.html',
  styleUrls: ['./add-secretary.component.css']
})
export class AddSecretaryComponent implements OnInit {
  form!:FormGroup
  file!:File

  constructor(private DoctorService:DoctorService,private formbuilder:FormBuilder) { }

  ngOnInit(): void {
    this.form=this.formbuilder.group({
      username:['',Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],

    })
  }
  onFileSelect(event:any){
    if (event.target.files.length>0){
      this.file=event.target.files[0]
    }
  }
  onsubmit(){
    const secretary=this.form.value
    return this.DoctorService.registerSecretary(this.file,secretary).subscribe((data:any)=>{
      Swal.fire({
        title: 'Registration Successful!',
        text: 'The secretary has been registered successfully.',
        icon: 'success',
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false
      });
      
    })
  }

}
