import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }
  register(file: File, patient: any): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, file.name);
    formData.append('username', patient.username);
    formData.append('email', patient.email);
    formData.append('password', patient.password);
    formData.append('adresse', patient.adresse);
    formData.append('age', patient.age);
    formData.append('socialAccount', patient.socialAccount);
    formData.append('gender', patient.gender);
  


    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');

    return this.http.post(`http://127.0.0.1:8088/api/auth/Patient/signup`, formData, { headers: headers })
      
  }
   getTodayDate(): string {
    const today = new Date();
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    return today.toLocaleDateString('en-US', options);
  }
  
  
  
  login(login:any){
    return this.http.post(`http://127.0.0.1:8088/api/auth/Patient/login`,login)
  }
  SecretaryLogin(login:any){
    return this.http.post(`http://127.0.0.1:8088/api/auth/Secretary/login`,login)
  }
  getpatient(id:any):Observable<any>{
    return this.http.get(`http://127.0.0.1:8088/api/auth/Patient/${id}`)
  }
  getJwtToken(){
    return localStorage.getItem('token')
  }
  refreshToken(){
      let refreshToken= localStorage.getItem("refreshToken")
    return this.http.post(`http://127.0.0.1:8088/api/auth/refreshtoken`,refreshToken)
  }
}
