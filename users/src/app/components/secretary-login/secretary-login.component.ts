import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-secretary-login',
  templateUrl: './secretary-login.component.html',
  styleUrls: ['./secretary-login.component.css']
})
export class SecretaryLoginComponent implements OnInit {
  form!:FormGroup
  errorMessagee!: string;

  constructor(private auth:AuthService,
    private router:Router,
    private formbuilder:FormBuilder,
    private spinner:NgxSpinnerService
    ) { }

  ngOnInit(): void {
    this.form=this.formbuilder.group({
      username:['',Validators.required],
      password:['',Validators.required]
    })
  }
  onsubmit(){
    this.spinner.show()
    const Sec=this.form.value
    this.auth.SecretaryLogin(Sec).pipe(
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
      if (roles.includes('ROLE_SECRETARY')) {
        // Save user data and redirect to home page
        localStorage.setItem('userconnected',JSON.stringify(response.username)),
        localStorage.setItem('userid',JSON.stringify(response.id))
       localStorage.setItem('token',response.accessToken),
       localStorage.setItem('refreshToken',response.refreshToken),
       localStorage.setItem('state','0');
      this.router.navigateByUrl('/sec/home');
      Swal.fire({
        icon: 'success',
        title: 'Connected',
        text: 'You have been successfully connected to your Account!'
      });
      
      } else {
        // Redirect to unauthorized page
        Swal.fire({
          icon:"error",
          title:"no right to access",
          text: 'you do not have the right to access admin dashboard',
        })
      }
    }).add(()=>{
      this.spinner.hide()
    })
  }

}
