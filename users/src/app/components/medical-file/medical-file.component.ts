import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-medical-file',
  templateUrl: './medical-file.component.html',
  styleUrls: ['./medical-file.component.css']
})
export class MedicalFileComponent implements OnInit {
  id=this.route.snapshot.params["id"]
  medicalfile:any

  constructor(private route:ActivatedRoute,private PatientService:PatientService) { }

  ngOnInit(): void {
    this.getMedicalFile()
  }
  getMedicalFile(){
    return this.PatientService.getMedicalFile(this.id).subscribe((data:any)=>{
      this.medicalfile=data

    })
  }

}
