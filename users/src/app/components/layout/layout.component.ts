import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  number:any
  numberofcabinets:any
  numberofdomains:any
  patinets:any

  constructor(private PatientService:PatientService,private Authservice:AuthService) { }

  ngOnInit(): void {
    this.getdocsnumber()
    this.getcabinets()
    this.getalldomains()
    this.getpatients()
  }
  getpatients(){
    return this.PatientService.getallpatients().subscribe((data:any)=>{
      this.patinets=data.length
      console.log("the patients"+this.patinets)
    })
  }
  getdocsnumber(){
    this.PatientService.getalldoc().subscribe((data:any)=>
    this.number=data.length)
  }
  getalldomains(){
    return this.PatientService.getalldomains().subscribe((data:any)=>{
      this.numberofdomains=data.length
    })
  }
  getcabinets(){
    return this.PatientService.getallcabinets().subscribe((data:any)=>{
      this.numberofcabinets=data.length
    })
  }

}
