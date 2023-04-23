import { Component, OnInit } from '@angular/core';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-all-docs',
  templateUrl: './all-docs.component.html',
  styleUrls: ['./all-docs.component.css']
})
export class AllDocsComponent implements OnInit {
  docs:any
  doc:any
  averageRating:any={}
  d:any
  domains:any
  rates:any
  filteredDocs:any
  // declare a variable to hold the selected domain id
selectedDomain: string='' ;

// declare a variable to hold the filter state
showFilter: boolean = false;

  constructor(private patientService:PatientService) { }

  ngOnInit(): void {
    this.getalldomain()
    this.getalldocs()
    
    
  }
  toggleFilter() {
    this.showFilter = !this.showFilter;
  }
  
  // function to apply the selected filter
  applyFilter() {
    if (this.selectedDomain) {
      this.filteredDocs = this.docs.filter((dc:any) => dc.domainMedical.name === this.selectedDomain);
      

      
    } else {
      this.filteredDocs=this.docs;
    }
    this.showFilter = false;
  }
  getalldomain(){
    return this.patientService.getalldomains().subscribe((data:any)=>{
      this.domains=data
    })
  }
  getalldocs(){
    return this.patientService.getalldoc().subscribe((data:any)=>{
      this.docs=data
      this.filteredDocs=data;
      this.docs.forEach((d:any)=>{
        let sum=0
      d.ratings.forEach((element:any) => {
        sum=element.rating+sum
        
      })
      
      let average=sum/d.ratings.length;
      this.averageRating[d.id]= average.toFixed(1)
      

      })
      
    })
  }

}
