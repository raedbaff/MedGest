import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css']
})
export class DoctorsComponent implements OnInit {
  id=this.route.snapshot.params["id"]
  singleDomain:any
  domainname:any

  constructor(private PatientService:PatientService,private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.getdomain()
  }
  getdomain() {
    return this.PatientService.getdomain(this.id).subscribe((data: any) => {
      
      this.domainname=data.name
      
      data.list.forEach((item: any) => {
        
      })
      this.singleDomain=data.list;
    });
  }
  

}
