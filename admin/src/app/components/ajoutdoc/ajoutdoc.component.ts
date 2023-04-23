import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DoctorService } from 'src/app/services/doctor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ajoutdoc',
  templateUrl: './ajoutdoc.component.html',
  styleUrls: ['./ajoutdoc.component.css']
})
export class AjoutdocComponent implements OnInit {
  
  registrationForm!: FormGroup;
  successMessage!: string;
  errorMessage!: string;
  file!: File;
  domains:any


  constructor(private router:Router,private formBuilder: FormBuilder,
    private doctorService: DoctorService) { }

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      domainMedical: ['', Validators.required],
      adresse: ['', Validators.required]
    });
    this.getdomains()
  }
  onFileSelect(event:any) {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
    }
  }
  onSubmit() {
    const doctor = this.registrationForm.value;
    this.doctorService.registerDoctor(this.file, doctor).subscribe(
      data => {
        this.successMessage = data.message;
        this.errorMessage = "null";
        Swal.fire({
          icon: 'success',
          title: 'Added Successfully',
          text: 'You have been successfully Added A Doctor!'
        });
        this.router.navigate(['/home/AllDoctors']);

      },
      error => {
        this.errorMessage = error.error.message;
        this.successMessage = "null";
      }
    );
  }
  getdomains(){
    this.doctorService.getallDomains().subscribe((data:any)=>{
      return this.domains=data
    })
  }

}
