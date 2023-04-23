import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(private http:HttpClient) { }
  getPatientInvoice(id:any){
    return this.http.get(`http://127.0.0.1:8088/Bill/${id}`)
  }
  getpatient(id:any) {
    return this.http.get(`http://127.0.0.1:8088/api/auth/Patient/${id}`)
  }
}
