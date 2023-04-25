import { Component, OnInit } from '@angular/core';
import { DoctorService } from 'src/app/services/doctor.service';

@Component({
  selector: 'app-medical-fields-list',
  templateUrl: './medical-fields-list.component.html',
  styleUrls: ['./medical-fields-list.component.css']
})
export class MedicalFieldsListComponent implements OnInit {
  p:number=1
  fields:any
  list:boolean=false;
  fieldList:any
  

  constructor(private doctorService:DoctorService) { }

  ngOnInit(): void {
    this.getAllFields()
    
  }
  getdomainbyId(id:number){
    return this.doctorService.getdomainbyid(id).subscribe((data:any)=>{
      this.fieldList=data.list
    })
  }
  getAllFields(){
    return this.doctorService.getAllMedicalFields().subscribe((data:any)=>{
      this.fields=data
      
      
     
      
      
      
      
    })
  }
  
  openListModal(id:number){
    this.list=true
    this.getdomainbyId(id)
    
  }
  close(){
    this.list=false;
  }

}
