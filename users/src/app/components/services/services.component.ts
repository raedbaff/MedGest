import { Component, OnInit } from '@angular/core';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
  domains:any

  constructor(private PatientService:PatientService) { }

  ngOnInit(): void {
    this.getdomains()
  }
  getdomains(){
    return this.PatientService.getalldomains().subscribe((data:any)=>{
      this.domains=data
    })
  }

}
