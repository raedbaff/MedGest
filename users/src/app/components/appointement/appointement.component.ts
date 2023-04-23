import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PatientService } from 'src/app/services/patient.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-appointement',
  templateUrl: './appointement.component.html',
  styleUrls: ['./appointement.component.css'],
  providers:[DatePipe]
})
export class AppointementComponent implements OnInit {
  form!:FormGroup
  appointmentDate!: Date;
  appointmentReason!: string;
  doctor:any
  user:any
  docs:any
  dateInput:any
 
  

  constructor(private datepipe:DatePipe,private formbuilder:FormBuilder,
    private router:Router,private patientService:PatientService) { }
    

  ngOnInit(): void {
    
    this.getalldocs()
    this.user=localStorage.getItem("token")
    this.form=this.formbuilder.group({
      appointmentDate:['',[Validators.required]],
      appointmentReason:['',[Validators.required]],
      doctor:['',[Validators.required]],
      time:['',Validators.required]
    })
    // this.dateInput = document.getElementById('date');
    // this.dateInput.addEventListener('input', this.formatDate.bind(this));
  }
  checkDate() {
    const dateSendingToServer = this.datepipe.transform(this.appointmentDate, 'yyyy/MM/dd');
    console.log("the date is"+dateSendingToServer);
  }
 
  // formatDate(event:any) {
  //   // Get the selected date from the input value
  //   const selectedDate = new Date(event.target.value);
  
  //   // Format the date as 'yyyy/mm/dd'
  //   const formattedDate = selectedDate.getFullYear() + '/' + ('0' + (selectedDate.getMonth() + 1)).slice(-2) + '/' + ('0' + selectedDate.getDate()).slice(-2);
  
  //   // Set the input value to the formatted date
  //   const formattedDateParts = formattedDate.split('/');
  //   const year = parseInt(formattedDateParts[0], 10);
  // const month = parseInt(formattedDateParts[1], 10) - 1;
  // const day = parseInt(formattedDateParts[2], 10);
  //  event.target.value = new Date(year, month, day);

  // }
  
  
  requestrd() {
    const doctorId = this.form.get('doctor')?.value
    this.patientService.CreateRendezvous(this.form.value, doctorId, this.user).subscribe((data: any) => {
      console.log('Rendez-vous added');
      Swal.fire({
        icon: 'success',
        title: 'Appointment requested',
        showConfirmButton: false,
        timer: 1500
      });
    }, error => {
      console.log('Error:', error);
    });
  }
  
    getalldocs(){
      return this.patientService.getalldoc().subscribe((data:any)=>{
        this.docs=data
        console.log("thte doc id is "+data[6].id)
      },
      error=>{
        console.log(error)
      })
    }

}
