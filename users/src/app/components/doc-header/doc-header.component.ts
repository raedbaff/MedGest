import { Component, OnInit } from '@angular/core';
import { DoctorService } from 'src/app/services/doctor.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Subject, debounceTime } from 'rxjs';

@Component({
  selector: 'app-doc-header',
  templateUrl: './doc-header.component.html',
  styleUrls: ['./doc-header.component.css'],
  providers:[DatePipe]
})
export class DocHeaderComponent implements OnInit {
  id:any
  doctor:any
  token:any
  number:any
  notifs:any
  newnotificationsubject = new Subject<any>();

  constructor(private router:Router,private doctorservice:DoctorService,private datepipe:DatePipe,private http:HttpClient) { }

  ngOnInit(): void {
    this.id=localStorage.getItem("userid")
    this.token=localStorage.getItem("token")
    this.getdoc()
    this.getnotifs()
    this.newnotificationsubject.pipe(debounceTime(10000)).subscribe(()=>{
      this.getnotifs();
    })
  }
  goToPage(page: string) {
    this.router.navigate([page]);
  }
  getdoc(){
    this.doctorservice.getdoctorinfo(this.id).subscribe((data:any)=>{
      this.doctor=data
      
    })
   
  }
  logout() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    this.http.post('http://127.0.0.1:8088/api/auth/signout', {},{headers}).subscribe(
      response => {
        
        //localStorage.setItem("state","1");
        localStorage.clear()
        
        this.router.navigateByUrl("/doc/login")
        Swal.fire({
          icon: 'success',
          title: 'Disconnected',
          text: 'You have been successfully Logged Out'
        });


        // do any additional logic here
      },
      error => {
       
        // handle the error here
      }
    );

}
  getnotifs(){
    return this.doctorservice.getNotifs(this.token).subscribe((data:any)=>{
      this.number=data.length
      this.notifs=data.map((nt:{timestamp: Date})=>{
        const formattedDate=this.datepipe.transform(nt.timestamp,'dd MMMM yyyy')
        this.newnotificationsubject.next({...nt, formattedDate});
        return {...nt,formattedDate}
    })
    })}
  


}
