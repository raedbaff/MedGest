import { Component, OnInit } from '@angular/core';
import { SecretaryService } from 'src/app/services/secretary.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-sec-layout',
  templateUrl: './sec-layout.component.html',
  styleUrls: ['./sec-layout.component.css'],
  providers:[DatePipe]
})
export class SecLayoutComponent implements OnInit {
  id:any
  sec:any
  docid:any
  rvs:any
  token!:String
  doc:any

  constructor(private secretaryService:SecretaryService,private datepipe:DatePipe) { }

  ngOnInit(): void {
    this.id=localStorage.getItem('userid')
    const tok=localStorage.getItem('token')
    if (tok!==null){
      this.token=tok
      console.log("the token is "+this.token)
    }
    this.getSecinfo()
    
    
    
  }
  getSecinfo(){
    return this.secretaryService.getSecretary(this.id).subscribe((data:any)=>{
      this.sec=data
      console.log("the sec doctor id is "+this.sec.cabinet.doctor.id)
      this.getrendezvous(this.sec.cabinet.doctor.id)
      
    })
  }
  getrendezvous(id:number){
    return this.secretaryService.getRendezvous(id).subscribe((data:any)=>{
      this.rvs=data.map((rd:{appointmentDate: Date})=>{
        const formattedDate=this.datepipe.transform(rd.appointmentDate,'dd MMMM yyyy')
        return {...rd,formattedDate}
        
      })
    })
  }
  confirmRendezVous(id:number){
    
    return this.secretaryService.confirmRendezvous(this.token,id).subscribe(()=>{
      this.getSecinfo()
      
    })
  }

}
