import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import {FormGroup,FormBuilder,Validators} from '@angular/forms'
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form!:FormGroup
  username!: string;
  password!: string;

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
    this.spinner.show();
    this.loginService.login(this.form.value).subscribe((response:any) => {
      const roles = response.roles;
      if (roles.includes('ROLE_ADMIN')) {
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
        text: 'You have been successfully connected to your dashboard!'
      });
      
      } else {
        // Redirect to unauthorized page
        Swal.fire({
          icon:"error",
          title:"no right to access",
          text: 'you do not have the right to access admin dashboard',
        })
      }
      

      


      

        
      },
      (error) => {
        Swal.fire({
          icon:"error",
          title:"something went wrong",
          text:"username or password is wrong, please check your credentials and try again"
        })
        
      }
    ).add(() => {
      this.spinner.hide(); // move hide method here
    });
  }

}
