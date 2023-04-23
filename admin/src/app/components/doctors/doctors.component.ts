import { Component, OnInit } from '@angular/core';
import { DoctorService } from 'src/app/services/doctor.service';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css']
})
export class DoctorsComponent implements OnInit {
  datalist: any
  showButton: boolean = false;
  p:number=1

  constructor(private doctorservice:DoctorService) { }

  ngOnInit(): void {
    this.getalldoctors()
    

  }
  getalldoctors(){
    this.doctorservice.getData().subscribe((data:any) => {
      this.datalist=data
      console.log("list doctor",this.datalist)
      console.log("the button is"+this.showButton)
      
      console.log("the list is ",this.datalist);
      
      // Do something with the data returned from the server
    });
    
    
  }
 

}
