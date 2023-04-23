import { Component, OnInit } from '@angular/core';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-all-patients',
  templateUrl: './all-patients.component.html',
  styleUrls: ['./all-patients.component.css']
})
export class AllPatientsComponent implements OnInit {
  datalist: any
  p:number=1

  constructor(private patientService:PatientService) { }

  ngOnInit(): void {
    this.getAllPatients()
  }
  getAllPatients(){
    this.patientService.getData().subscribe((data:any)=>{
      this.datalist=data
      console.log("your data is "+this.datalist[2].photo)

    })

  }

}
