import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";



@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  registrationForm!:FormGroup
  file!:File

  constructor(private authService:AuthService,private router:Router,
    private formBuilder: FormBuilder,private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    
  
    this.registrationForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      adresse: ['', Validators.required],
      age: ['', Validators.required],
      socialAccount: ['', Validators.required],
      gender: ['', Validators.required],
    });
  }
  onFileSelect(event:any) {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
    }
    
    
  }
  onsubmit() {
    const patient = this.registrationForm.value;
    this.spinner.show(); // move show method here
    this.authService.register(this.file, patient)
      .subscribe((data: any) => {      
        Swal.fire({
          icon: 'success',
          title: 'Registered Successfully',
          text: 'You have been Registered '
        });
        this.router.navigate(['/register'])
      }, (error) => {
        console.error('Error registering patient:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error registering patient',
          text: 'Please make sure to input correct information',
        }); 
      })
      .add(() => {
        this.spinner.hide(); // move hide method here
      });
  }
  


}
