import { Component, OnInit } from '@angular/core';
import { DoctorService } from 'src/app/services/doctor.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-appointements',
  templateUrl: './appointements.component.html',
  styleUrls: ['./appointements.component.css'],
  providers:[DatePipe]
})
export class AppointementsComponent implements OnInit {
  rv:any

  constructor(private datepipe:DatePipe,private doctorService:DoctorService) { }

  ngOnInit(): void {
    this.getAllRdv()
  }
  getAllRdv(){
    this.doctorService.getallRendezVous().subscribe((data:any)=>{
      
      this.rv=data.map((rdv:{appointmentDate: Date})=>{
        const formattedDate=this.datepipe.transform(rdv.appointmentDate,'dd MMMM yyyy')
        return {...rdv,formattedDate}
        
      })
    })
  }

}
