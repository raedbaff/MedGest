import { Component,ViewEncapsulation , Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { PatientService } from 'src/app/services/patient.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-profile-modal',
  templateUrl: './edit-profile-modal.component.html',
  styleUrls: ['./edit-profile-modal.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class EditProfileModalComponent implements OnInit {
  id=this.route.snapshot.params["id"]
  user:any
  file!:File
  editform!:FormGroup
  currentPhotoUrl:any
  constructor(private router:Router,private formBuilder: FormBuilder,private route:ActivatedRoute,private patientService:AuthService,private patientservice:PatientService) { }

  ngOnInit(): void {
    this.getpatient()
    this.editform=this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      adresse: ['', Validators.required],
      age: ['', Validators.required],
      socialAccount: ['', Validators.required],
      profession: ['', Validators.required],

    })
  }
  getpatient(){
    return this.patientService.getpatient(this.id).subscribe((data:any)=>{
      this.user=data
      this.editform.patchValue({
        username:this.user.username,
        email:this.user.email,
        adresse:this.user.adresse,
        age:this.user.age,
        socialAccount:this.user.socialAccount,
        profession:this.user.profession
    

      })
    })
  }
  onFileSelected(event:any) {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
      this.currentPhotoUrl = URL.createObjectURL(this.file);
    }
  }
  editProfile() {
    const profile = this.editform.value;
    this.patientservice.editProfile(this.id, this.file, profile).subscribe((data: any) => {
      this.currentPhotoUrl=data.photo
      this.router.navigate(['/home/myProfile']).then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Profile updated',
          showConfirmButton: false,
          timer: 1500
        });
      });
    });
  }
  
  

}
