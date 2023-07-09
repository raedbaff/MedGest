import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,Validators} from '@angular/forms'
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form!:FormGroup
  username!: string;
  password!: string;
  errorMessagee!: string;


  constructor(private loginService:AuthService,
    private formbuilder:FormBuilder,
    private router:Router,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.form=this.formbuilder.group({
      username:['',[Validators.required]],
      password:['',[Validators.required]]
    })
  }
  
  onSubmit() {
    this.spinner.show()
    
    this.loginService.login(this.form.value).pipe(
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
    ).subscribe((response: any) => {
      
      const roles = response.roles;
      const confirm=response.confirm;
      if (roles.includes('ROLE_PATIENT')) {
        // Save user data and redirect to home page
        localStorage.setItem('userconnected',JSON.stringify(response.username)),
        localStorage.setItem('userid',JSON.stringify(response.id))
        localStorage.setItem('token',response.accessToken),
        localStorage.setItem('refreshToken',response.refreshToken),
        localStorage.setItem('state','0');
        this.router.navigateByUrl('/home');
        
        Swal.fire({
          icon: 'success',
          title: 'Connected',
          text: 'You have been successfully connected to your Account!'
        });
      };
    }).add(() => {
      this.spinner.hide(); // move hide method here
    });;
  }
  
  

}
