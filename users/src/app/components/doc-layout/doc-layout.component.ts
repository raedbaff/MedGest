import { Component, OnInit } from '@angular/core';
import { DoctorService } from 'src/app/services/doctor.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-doc-layout',
  templateUrl: './doc-layout.component.html',
  styleUrls: ['./doc-layout.component.css'],
  providers:[DatePipe]
})
export class DocLayoutComponent implements OnInit {
  token:any
  id:any
  rv:any

  constructor(private doctorService:DoctorService,private datepipe:DatePipe) { }

  ngOnInit(): void {
    this.token=localStorage.getItem("token")
    this.getrendezvous()
  }
  getrendezvous(){
    return this.doctorService.getconfirmedRendezvous(this.token).subscribe((data:any)=>{
      this.rv=data.map((rd:{appointmentDate: Date})=>{
        const formattedDate=this.datepipe.transform(rd.appointmentDate,'dd MMMM yyyy')
        return {...rd,formattedDate}
        
      })
    })
  }
  finish(id:number) {
    // Prompt the user for confirmation
    const confirmed = confirm('Are you sure you want to finish these appointments?');
  
    if (confirmed) {
      // Loop through each RendezVous in the array
        // Call the finishappointement method with the ID and subscribe to the response
        this.doctorService.finishappointement(id).subscribe((data: any) => {
          this.getrendezvous()
          // Handle the response as needed
        });
      
    }
  }
  

}
