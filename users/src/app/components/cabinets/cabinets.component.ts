import { Component, OnInit } from '@angular/core';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-cabinets',
  templateUrl: './cabinets.component.html',
  styleUrls: ['./cabinets.component.css']
})
export class CabinetsComponent implements OnInit {
  cabinets:any
  activeTab: number = 0;
  id:any
  doc:any
  points:any
  averagerating:any


  constructor(private patientService:PatientService) { }

  ngOnInit(): void {
    this.getcabinets() 
  
  }
  getcabinets(){
    return this.patientService.getallcabinets().subscribe((data:any)=>{
      this.cabinets=data
      this.cabinets.forEach((element:any)=>{
        this.id=element.doctor.id
        console.log("the id is"+this.id)
      })
    })
  }
  toggleTab(tabIndex: number) {
    if (this.activeTab === tabIndex) {
      this.activeTab = -1;
    } else {
      this.activeTab = tabIndex;
    }
  }
  getdoc(doctorId: number){
    this.patientService.getdoctor(doctorId).subscribe((data:any)=>{
      let sum=0
      let average=0
      this.doc=data.ratings
      this.doc.forEach((element:any) => {
        sum=element.rating+sum
        this.points=sum
      })
      average=sum/this.doc.length;
      this.averagerating= average.toFixed(1)
      console.log("this is the average"+this.averagerating)
    })
  }
  

}
