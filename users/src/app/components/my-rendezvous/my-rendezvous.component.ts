import { Component, OnInit } from '@angular/core';
import { PatientService } from 'src/app/services/patient.service';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-my-rendezvous',
  templateUrl: './my-rendezvous.component.html',
  styleUrls: ['./my-rendezvous.component.css'],
  providers:[DatePipe]
})
export class MyRendezvousComponent implements OnInit {
  user:any
  rdv:any
  patient:any
  patient2:any
  id:any

  constructor(private datepipe:DatePipe,private PatientService:PatientService) { }

  ngOnInit(): void {
    this.user=localStorage.getItem("token")
    this.patient=localStorage.getItem("userconnected")
    this.patient2=this.patient?.slice(1,this.patient.length-1)
    this.getMyRdv()
    
  }
  getMyRdv(){
    this.PatientService.getpatientRenezvous(this.user).subscribe((data:any)=>{
      
      this.rdv=data.map((rd:{appointmentDate: Date})=>{
        const formattedDate=this.datepipe.transform(rd.appointmentDate,'dd MMMM yyyy')
        return {...rd,formattedDate}
        
      })
    })
  }
   myCatchError(error: any) {
    return Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'cannot cancel a rendezvous that was already confirmed and a medical bill was created for it',
      timer:1500
    });
  }
  
  deleterendezvous(){
    this.rdv.forEach((element:any) => {
      this.id=element.id
      
    });
    this.PatientService.deleteRendezvous(this.id)
    .subscribe((data: any) => {
      Swal.fire({
      icon: 'success',
      title: 'Rendezvous canceled',
      showConfirmButton: false,
      timer: 1500
      });
      this.getMyRdv()
      },(error:any)=>{
        this.myCatchError(error)
      })
      }
      
      }
  
