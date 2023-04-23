import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DoctorAuthService {

  constructor(private http:HttpClient) { }
  register(file:File,Doctor:any):Observable<any>{
    const formData = new FormData();
    formData.append('file', file, file.name);
    formData.append('username', Doctor.username);
    formData.append('email', Doctor.email);
    formData.append('password', Doctor.password);
    formData.append('adresse', Doctor.adresse);
    formData.append('domainMedical', Doctor.domainMedical);
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');

    return this.http.post(`http://127.0.0.1:8088/api/auth/Doctor/signup`, formData, { headers: headers })
      
  }
  login(login:any){
    return this.http.post(`http://127.0.0.1:8088/api/auth/Doctor/login`,login)
  }

  
}
