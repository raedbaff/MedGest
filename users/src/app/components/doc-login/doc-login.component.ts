import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DoctorAuthService } from 'src/app/services/doctor-auth.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-doc-login',
  templateUrl: './doc-login.component.html',
  styleUrls: ['./doc-login.component.css']
})
export class DocLoginComponent implements OnInit {
  form!:FormGroup
  errorMessagee!: string;


  constructor(private doctorService:DoctorAuthService,private router:Router,
    private formBuilder: FormBuilder,
    private spinner:NgxSpinnerService ) { }

  ngOnInit(): void {this.form=this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', [Validators.required]],
  })
  }
  onsubmit(){
    this.spinner.show()
    const Doctor=this.form.value
    this.doctorService.login(Doctor).pipe(
      catchError((error) => {
        
        let errorMessage = 'An error occurred. Please try again later.';
        if (error.status === 401) {
          this.spinner.hide()
          errorMessage = 'Incorrect username or password. Please try again.';
        } else if (error.status === 403) {
          this.spinner.hide()
          errorMessage = 'Your account is not confirmed. Please confirm your account and try again.';
        }
        this.errorMessagee = errorMessage;
        console.log("the error is "+errorMessage);
        return throwError(() => new Error(errorMessage));
      })
    ).subscribe((response:any)=>{
      const roles = response.roles;
      if (roles.includes('ROLE_DOCTOR')) {
        // Save user data and redirect to home page
        localStorage.setItem('userconnected',JSON.stringify(response.username)),
        localStorage.setItem('userid',JSON.stringify(response.id))
       localStorage.setItem('token',response.accessToken),
       localStorage.setItem('refreshToken',response.refreshToken),
       localStorage.setItem('state','0');
      this.router.navigateByUrl('/doc/home');
      Swal.fire({
        icon: 'success',
        title: 'Connected',
        text: 'You have been successfully connected to your Account!'
      });
      
      } else {
        // Redirect to unauthorized page
        this.router.navigateByUrl('/unauthorized');
        Swal.fire({
          icon:"error",
          title:"no right to access",
          text: 'you do not have the right to access admin dashboard',
        })
      }
    }).add(() => {
      this.spinner.hide(); // move hide method here
    });
  }

}
