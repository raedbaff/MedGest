import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PatientService } from 'src/app/services/patient.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.css']
})
export class AddPatientComponent implements OnInit {
  file!:File
  registrationForm!: FormGroup;

  constructor(private router:Router,private patientService :PatientService,private formbuilder:FormBuilder) { }

  ngOnInit(): void {
    this.registrationForm=this.formbuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      age: ['', Validators.required],
      adresse: ['', Validators.required],
      socialAccount: ['', Validators.required],
      gender: ['', Validators.required]
    })
  }
  onfileselect(event:any){
    if (event.target.files.length>0){
      this.file=event.target.files[0]
    }
  }
  
  onsubmit() {
    const Patient = this.registrationForm.value;
    this.patientService.RegisterPatient(this.file, Patient).subscribe(
      () => {
        Swal.fire({
          icon: 'success',
          title: 'Added Successfully',
          text: 'You have successfully added a patient!'
        }).then(() => {
          this.router.navigateByUrl('/home/AllPatients');
        });
      },
      error => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong! Please try again.',
          footer: `Error: ${error.message}`
        });
      }
    );
  }

}
