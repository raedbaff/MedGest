import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DoctorService } from 'src/app/services/doctor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medical-office-creation',
  templateUrl: './medical-office-creation.component.html',
  styleUrls: ['./medical-office-creation.component.css']
})
export class MedicalOfficeCreationComponent implements OnInit {
  form!:FormGroup
  secs:any
  editform!:FormGroup
  token:any
  file!:File
  id!:number
  cabinet:any

  constructor(
    private doctorService: DoctorService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getallsecs()
    this.token = localStorage.getItem('token')
    this.getCabinet()
    this.form = this.formBuilder.group({
      nomCabinet: ['', Validators.required],
      adresseCabinet: ['', Validators.required],
      secretary: ['', Validators.required],
      description: ['', Validators.required],
    })
    this.editform = this.formBuilder.group({
      nomCabinet: ['', Validators.required],
      adresseCabinet: ['', Validators.required],
      secretary: ['', Validators.required],
      description: ['', Validators.required],
    })
  }

  onFileSelect(event: any) {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0]
    }
  }

  createMedicalOffice() {
    const Cabinet = this.form.value
    this.doctorService.CreateMedicalOffice(this.token, this.file, Cabinet).subscribe((data: any) => {
      Swal.fire({
        icon: 'success',
        title: 'Medical office created successfully!',
        showConfirmButton: false,
        timer: 2000
      }).then(() => {
        this.router.navigate(['/doc/home/myProfile'])
      });
    })
  }
  updateCabinet(){
    const Cabinet=this.editform.value
    this.doctorService.updateCabinet(this.id,this.token,this.file,Cabinet).subscribe((data:any)=>{
      Swal.fire({
        icon: 'success',
        title: 'Medical office successfully updated',
        showConfirmButton: false,
        timer: 2000
      }).then(() => {
        this.router.navigate(['/doc/home/myProfile'])
      });
    })
  }

  getCabinet() {
    this.doctorService.getcabinet(this.token).subscribe((data: any) => {
      this.cabinet = data
      this.id=this.cabinet.id
      console.log("the sec is "+this.cabinet.secretary.username)
      this.editform.patchValue({
        nomCabinet: this.cabinet.nomCabinet,
        adresseCabinet: this.cabinet.adresseCabinet,
        secretary: this.cabinet.secretary.username,
        description: this.cabinet.description,
      })
    })
  }

  getallsecs() {
    this.doctorService.getallSecretaries().subscribe((data: any) => {
      this.secs=data.filter((element:any)=>!element.cabinet)
      console.log("the lsit is "+this.secs)
    })
  }
}
