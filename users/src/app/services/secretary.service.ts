import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http'
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SecretaryService {

  constructor(private http:HttpClient,private router:Router) { }
  EditSecretaryProfile(Secretary:any,id:number){
    
    const formdata=new FormData()
    formdata.append("username",Secretary.username),
    formdata.append("email",Secretary.email),
    formdata.append("age",Secretary.age),
    formdata.append("experience",Secretary.experience)
    
    return this.http.put(`http://127.0.0.1:8088/api/auth/Secretary/edit/${id}`,formdata)
  }
  GetAll():Observable<any>{
    return this.http.get(`http://127.0.0.1:8088/api/auth/Secretary/all`)
  }
  ChangePhoto(file:File,id:number){
    
    const formData = new FormData();
    formData.append('file', file, file.name);
    return this.http.put(`http://127.0.0.1:8088/api/auth/Secretary/editPhoto/${id}`,formData)
  }
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
