import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DoctorService } from 'src/app/services/doctor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-medical-field',
  templateUrl: './add-medical-field.component.html',
  styleUrls: ['./add-medical-field.component.css']
})
export class AddMedicalFieldComponent implements OnInit {
  MedicalFieldForm!:FormGroup
  file!:File

  constructor(private doctorService:DoctorService,private formbuilder:FormBuilder) { }
  

  ngOnInit(): void {
    this.MedicalFieldForm=this.formbuilder.group({
      name:["",Validators.required]
    })

  }
  onfileSelect(event:any){
    if(event.target.files.length>0){
      this.file=event.target.files[0]
    }
  }
  createMedicalField(){
    return this.doctorService.createMedicalField(this.file,this.MedicalFieldForm.value).subscribe((data:any)=>{
      Swal.fire({
        icon:"success",
        title:"Medical Field Added successfully",
        timer:1000,
        timerProgressBar:true,
        showCloseButton:false,
        showConfirmButton:false
        
      }).then(()=>{
        this.MedicalFieldForm.reset()
      })
    })
  }

}
