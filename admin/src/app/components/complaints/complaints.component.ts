import { Component, OnInit } from '@angular/core';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-complaints',
  templateUrl: './complaints.component.html',
  styleUrls: ['./complaints.component.css']
})
export class ComplaintsComponent implements OnInit {

  constructor(private patientService:PatientService) { }
  complaints:any

  ngOnInit(): void {
    this.GetAllComplaints()
  }
  GetAllComplaints(){
    return this.patientService.GetAllComplaints().subscribe((data:any)=>{
      this.complaints=data
    })
  }

}
