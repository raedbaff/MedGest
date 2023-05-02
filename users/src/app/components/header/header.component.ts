import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { HomeComponent } from '../home/home.component';
import { PatientService } from 'src/app/services/patient.service';
import { DatePipe } from '@angular/common';
import { Subject, debounceTime } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers:[DatePipe]
})
export class HeaderComponent implements OnInit {
  patient:any
  id=localStorage.getItem("userid")
  token=localStorage.getItem("token")
  username:any
  photo:any
  notid:any
  notifications:any
  notificationNumber:any
  newnotificationsubject = new Subject<any>();
  

  constructor(private datepipe:DatePipe,private router:Router,private authService:AuthService,private http: HttpClient,private patientService:PatientService) { }

  ngOnInit(): void {
    this.getPatinetinfo()
    this.getPatientNotifs();
    this.newnotificationsubject.pipe(debounceTime(10000)).subscribe(()=>{
      this.getPatientNotifs();
    })
    
  }
  getPatinetinfo(){
    return this.authService.getpatient(this.id).subscribe((data:any)=>{
      this.patient=data
      this.username=this.patient.username
      this.photo=this.patient.photo

    })
  }
  logout() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    this.http.post('http://127.0.0.1:8088/api/auth/signout', {},{headers}).subscribe(
      response => {
        
        //localStorage.setItem("state","1");
        localStorage.clear()
        
        this.router.navigate(['/register']).then(()=>{
          Swal.fire({
            icon: 'success',
            title: 'Disconnected',
            text: 'You have been successfully Logged Out'
          });

        })
        


        // do any additional logic here
      },
      error => {
       
        // handle the error here
      }
    );

}
getPatientNotifs(){
  this.patientService.getpatientnotifications(this.token!).subscribe((data:any)=>{
    this.notificationNumber=data.length
    this.notifications=data.map((nt:{timestamp: Date})=>{
      const formattedDate=this.datepipe.transform(nt.timestamp,'dd MMMM yyyy')
      this.newnotificationsubject.next({...nt, formattedDate});
      return {...nt, formattedDate};
    });
  })
}


deleteNot(id: number) {
  this.patientService.deletenotification(id).subscribe(() => {
    this.getPatientNotifs()
  });
}





}
