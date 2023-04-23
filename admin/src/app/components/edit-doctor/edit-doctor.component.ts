import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DoctorService } from 'src/app/services/doctor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-doctor',
  templateUrl: './edit-doctor.component.html',
  styleUrls: ['./edit-doctor.component.css']
})
export class EditDoctorComponent implements OnInit {
  onedoctor:any
  id=this.route.snapshot.params["id"]
  registrationForm!: FormGroup;
  successMessage!: string;
  errorMessage!: string;
  file!: File;
  domains:any

  constructor(private router:Router,private formBuilder: FormBuilder,private route: ActivatedRoute, private doctorService:DoctorService,private http: HttpClient) { }

  ngOnInit(): void {
    this.getonedoc()
    this.registrationForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      domainMedical: ['', Validators.required],
      adresse: ['', Validators.required],
      age: ['', Validators.required],
      patients: ['', Validators.required],
      points: ['', Validators.required],

    });
    this.getdomain()
  }
  onFileSelect(event:any) {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
    }
  }
  getonedoc(){
    this.doctorService.getDoctorById(this.id).subscribe((res:any)=>{
      this.onedoctor=res
      console.log(res)
      this.registrationForm.patchValue({
        username:this.onedoctor.username,
        email:this.onedoctor.email,
        adresse:this.onedoctor.adresse,
        points:this.onedoctor.points,
        patients:this.onedoctor.patients,
        age:this.onedoctor.age,
        domainMedical:this.onedoctor.domainMedical.name,

      })
      
      
    })
  }
  onSubmit() {
    const doctor = this.registrationForm.value;
    this.doctorService.EditDoctor(this.id,this.file, doctor).subscribe(
      data => {
        this.successMessage = data.message;
        this.errorMessage = "null";
        Swal.fire({
          icon: 'success',
          title: 'Edit',
          text: 'You have been successfully Edited the Doctor!'
        });
        this.router.navigate(['/home/AllDoctors']);

      },
      error => {
        this.errorMessage = error.error.message;
        this.successMessage = "null";
      }
    );
  }
  getdomain(){
    this.doctorService.getallDomains().subscribe((data:any)=>{
      return this.domains=data
    })
  }

}
