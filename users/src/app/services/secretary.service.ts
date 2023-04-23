import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http'
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SecretaryService {

  constructor(private http:HttpClient,private router:Router) { }
  getSecretary(id:number){
    return this.http.get(`http://127.0.0.1:8088/api/auth/Secretary/sec/${id}`)
  }
  getRendezvous(id:number){
    return this.http.get(`http://127.0.0.1:8088/api/auth/Secretary/${id}`)
  }
  confirmRendezvous(SecToken:String,id:number){
    return this.http.post(`http://127.0.0.1:8088/RendezVous/confirm/${id}`,{headers:{
      'Authorization':`Bearer ${SecToken}`
    }})
  }
  createMedicalBill(bill:any){
    const formData=new FormData();
    formData.append("rendezvous",bill.rendezvous)
    formData.append("amount",bill.amount)
    formData.append("Description",bill.Description)
    formData.append("Tax",bill.Tax)
    formData.append("Discount",bill.Discount)
    return this.http.post(`http://127.0.0.1:8088/Bill/save`,formData)
  }
  logout() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    this.http.post('http://127.0.0.1:8088/api/auth/signout', {},{headers}).subscribe(
      response => {
        
        //localStorage.setItem("state","1");
        localStorage.clear()
        
        this.router.navigateByUrl("/sec/login")
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

}
